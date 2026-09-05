<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Spatie\Browsershot\Browsershot;
use Illuminate\Support\Str;
use Carbon\Carbon;

class ApiController extends Controller
{
    /**
     * Generate PDF using Browsershot
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function generatePdf(Request $request)
    {
        try {
            // Validate API Key
            $apiKey = $request->input('api_key');
            if (!$this->validateApiKey($apiKey)) {
                return response()->json([
                    'error' => 'Invalid API key',
                    'message' => 'The provided API key is invalid or expired.'
                ], 401);
            }

            // Validate request
            $validator = Validator::make($request->all(), [
                'template' => 'required|string|in:invoice,receipt,report,contract,certificate,custom',
                'data' => 'required|array',
                'data.html_content' => 'required_if:template,custom|string',
                'options' => 'array|nullable',
                'options.paper_size' => 'string|in:A4,A3,A5,Letter,Legal',
                'options.orientation' => 'string|in:portrait,landscape',
                'options.margin' => 'array|nullable',
                'api_key' => 'required|string'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'error' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Generate HTML content
            $html = $this->generateHtmlContent($request->template, $request->data);

            // Debug: Save rendered HTML for inspection
            if (config('app.debug', false)) {
                Storage::disk('local')->put(
                    'pdfs/debug/rendered_' . time() . '.html',
                    $html
                );
            }

            // Generate unique filename
            $filename = $this->generateUniqueFilename($request->template);

            // Generate PDF using Browsershot with config
            $pdfContent = $this->generatePdfWithBrowsershot($html, $request->options ?? []);

            // Save PDF to storage
            $this->savePdfToStorage($filename, $pdfContent);

            // Generate URL
            $pdfUrl = $this->generatePdfUrl($filename);

            return response()->json([
                'pdf_url' => $pdfUrl,
                'expires_in' => 3600,
                'filename' => $filename,
                'generated_at' => Carbon::now()->toISOString(),
                'pages' => $this->getPdfPageCount($pdfContent)
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'PDF generation failed',
                'message' => $e->getMessage(),
                'trace' => config('app.debug') ? $e->getTraceAsString() : null
            ], 500);
        }
    }

    /**
     * Generate HTML content from template
     *
     * @param string $template
     * @param array $data
     * @return string
     */
    private function generateHtmlContent($template, $data)
    {
        // Add metadata
        $data['generated_at'] = Carbon::now()->format('Y-m-d H:i:s');
        $data['document_id'] = Str::uuid()->toString();
        $data['generated_by'] = 'PDFGen API v1.0';
        $data['generated_timestamp'] = Carbon::now()->toISOString();

        // Get the template view
        $view = "pdf.{$template}";

        if ($template === 'custom') {
            return $this->generateCustomHtml($data);
        }

        if (!view()->exists($view)) {
            return $this->generateCustomHtml($data);
        }

        return view($view, $data)->render();
    }

    /**
     * Generate HTML from custom template with proper Blade rendering
     *
     * @param array $data
     * @return string
     */
    private function generateCustomHtml($data)
    {
        if (!isset($data['html_content'])) {
            return view('pdf.custom', $data)->render();
        }

        $htmlContent = $data['html_content'];

        try {
            // Remove any extra escaping from the JSON
            $htmlContent = stripslashes($htmlContent);

            // Try Blade::render first (Laravel 8+)
            if (method_exists(Blade::class, 'render')) {
                $rendered = Blade::render($htmlContent, $data);

                // Check if rendering was successful (no remaining Blade syntax)
                if (!$this->containsBladeSyntax($rendered)) {
                    return $rendered;
                }
            }

            // Fallback to temporary file method
            return $this->renderBladeWithTempFile($htmlContent, $data);

        } catch (\Exception $e) {
            \Log::error('Blade rendering failed: ' . $e->getMessage());

            // Final fallback: manual rendering
            return $this->renderBladeManually($htmlContent, $data);
        }
    }

    /**
     * Check if string contains Blade syntax
     *
     * @param string $html
     * @return bool
     */
    private function containsBladeSyntax($html)
    {
        return strpos($html, '@') !== false ||
            strpos($html, '{{') !== false ||
            strpos($html, '<?php') !== false;
    }

    /**
     * Render Blade using temporary file
     *
     * @param string $htmlContent
     * @param array $data
     * @return string
     */
    private function renderBladeWithTempFile($htmlContent, $data)
    {
        $tempViewPath = null;

        try {
            // Create a unique temporary file
            $tempViewPath = storage_path('framework/views/temp_' . Str::uuid() . '.blade.php');

            // Ensure the directory exists
            $viewDir = dirname($tempViewPath);
            if (!is_dir($viewDir)) {
                mkdir($viewDir, 0755, true);
            }

            // Write the HTML content to the temporary file
            file_put_contents($tempViewPath, $htmlContent);

            // Render the view with data
            $rendered = view()->file($tempViewPath, $data)->render();

            return $rendered;

        } catch (\Exception $e) {
            \Log::error('Temp file rendering failed: ' . $e->getMessage());
            return $this->renderBladeManually($htmlContent, $data);
        } finally {
            // Clean up the temporary file
            if ($tempViewPath && file_exists($tempViewPath)) {
                @unlink($tempViewPath);
            }
        }
    }

    /**
     * Manual Blade rendering as fallback
     *
     * @param string $html
     * @param array $data
     * @return string
     */
    private function renderBladeManually($html, $data)
    {
        // Handle @php blocks
        $html = $this->handlePhpBlocks($html, $data);

        // Handle @foreach loops
        $html = $this->handleForeachLoops($html, $data);

        // Handle @if statements
        $html = $this->handleIfStatements($html, $data);

        // Handle variables {{ $var }}
        $html = $this->handleVariables($html, $data);

        return $html;
    }

    /**
     * Handle @php blocks
     *
     * @param string $html
     * @param array $data
     * @return string
     */
    private function handlePhpBlocks($html, $data)
    {
        return preg_replace_callback('/@php(.*?)@endphp/s', function ($matches) use ($data) {
            try {
                extract($data);
                ob_start();
                eval ($matches[1]);
                return ob_get_clean();
            } catch (\Exception $e) {
                \Log::error('PHP block execution failed: ' . $e->getMessage());
                return '';
            }
        }, $html);
    }

    /**
     * Handle @foreach loops
     *
     * @param string $html
     * @param array $data
     * @return string
     */
    private function handleForeachLoops($html, $data)
    {
        return preg_replace_callback('/@foreach\(([^)]+)\)(.*?)@endforeach/s', function ($matches) use ($data) {
            $expression = trim($matches[1]);
            $content = $matches[2];

            // Parse the foreach expression
            preg_match('/\$([a-zA-Z0-9_]+)\s+as\s+\$([a-zA-Z0-9_]+)/', $expression, $varMatches);

            $arrayName = $varMatches[1] ?? null;
            $itemName = $varMatches[2] ?? 'item';

            if (!$arrayName || !isset($data[$arrayName])) {
                return '';
            }

            $array = $data[$arrayName];
            if (!is_array($array)) {
                return '';
            }

            $result = '';
            foreach ($array as $key => $value) {
                $itemData = $data;
                $itemData[$itemName] = $value;
                $result .= $this->renderBladeManually($content, $itemData);
            }

            return $result;
        }, $html);
    }

    /**
     * Handle @if statements
     *
     * @param string $html
     * @param array $data
     * @return string
     */
    private function handleIfStatements($html, $data)
    {
        return preg_replace_callback('/@if\(([^)]+)\)(.*?)(?:@elseif\(([^)]+)\)(.*?))?(?:@else(.*?))?@endif/s', function ($matches) use ($data) {
            $condition = trim($matches[1]);
            $ifContent = $matches[2];
            $elseifCondition = isset($matches[3]) ? trim($matches[3]) : null;
            $elseifContent = isset($matches[4]) ? $matches[4] : null;
            $elseContent = isset($matches[5]) ? $matches[5] : '';

            try {
                $conditionResult = $this->evaluateCondition($condition, $data);

                if ($conditionResult) {
                    return $this->renderBladeManually($ifContent, $data);
                } elseif ($elseifCondition && $elseifContent) {
                    $elseifResult = $this->evaluateCondition($elseifCondition, $data);
                    if ($elseifResult) {
                        return $this->renderBladeManually($elseifContent, $data);
                    }
                }

                if ($elseContent) {
                    return $this->renderBladeManually($elseContent, $data);
                }
            } catch (\Exception $e) {
                \Log::error('If statement evaluation failed: ' . $e->getMessage());
                if ($elseContent) {
                    return $this->renderBladeManually($elseContent, $data);
                }
                return $ifContent;
            }

            return '';
        }, $html);
    }

    /**
     * Evaluate a condition expression
     *
     * @param string $condition
     * @param array $data
     * @return bool
     */
    private function evaluateCondition($condition, $data)
    {
        try {
            // Replace variable references with their values
            $condition = preg_replace_callback('/\$([a-zA-Z0-9_]+)(?:\[[\'"]([a-zA-Z0-9_]+)[\'"]\])?(?:->([a-zA-Z0-9_]+))?/', function ($matches) use ($data) {
                $varName = $matches[1];
                $arrayKey = isset($matches[2]) ? $matches[2] : null;
                $property = isset($matches[3]) ? $matches[3] : null;

                $value = null;

                if ($arrayKey && isset($data[$varName][$arrayKey])) {
                    $value = $data[$varName][$arrayKey];
                } elseif ($property && isset($data[$varName]) && is_object($data[$varName]) && property_exists($data[$varName], $property)) {
                    $value = $data[$varName]->$property;
                } elseif (isset($data[$varName])) {
                    $value = $data[$varName];
                }

                return $value !== null ? var_export($value, true) : 'null';
            }, $condition);

            // Handle null coalescing operator
            $condition = preg_replace_callback('/([^\s]+)\s*\?\?\s*([^\s]+)/', function ($matches) {
                return "({$matches[1]} ?? {$matches[2]})";
            }, $condition);

            // Clean up the condition
            $condition = str_replace(' and ', ' && ', $condition);
            $condition = str_replace(' or ', ' || ', $condition);
            $condition = str_replace('AND', '&&', $condition);
            $condition = str_replace('OR', '||', $condition);

            return eval ("return ({$condition});");

        } catch (\ParseError $e) {
            \Log::error('Parse error in condition: ' . $e->getMessage());
            return false;
        } catch (\Exception $e) {
            \Log::error('Condition evaluation failed: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Handle Blade variables {{ $var }}
     *
     * @param string $html
     * @param array $data
     * @return string
     */
    private function handleVariables($html, $data)
    {
        return preg_replace_callback('/\{\{\s*(.+?)\s*\}\}/', function ($matches) use ($data) {
            $expression = trim($matches[1]);

            // Handle null coalescing operator
            if (strpos($expression, '??') !== false) {
                $parts = explode('??', $expression);
                $var = trim($parts[0]);
                $default = isset($parts[1]) ? trim($parts[1]) : '';

                $value = $this->getVariableValue($var, $data);

                if ($value !== null && $value !== '') {
                    return $value;
                }

                $default = trim($default, '"\'');
                return $default;
            }

            $value = $this->getVariableValue($expression, $data);
            return $value !== null ? $value : '';
        }, $html);
    }

    /**
     * Get variable value from expression
     *
     * @param string $expression
     * @param array $data
     * @return mixed
     */
    private function getVariableValue($expression, $data)
    {
        // Handle array access
        if (preg_match('/\$([a-zA-Z0-9_]+)(?:\[[\'"]([a-zA-Z0-9_]+)[\'"]\])?/', $expression, $matches)) {
            $varName = $matches[1];
            $key = isset($matches[2]) ? $matches[2] : null;

            if ($key && isset($data[$varName][$key])) {
                return $data[$varName][$key];
            } elseif (isset($data[$varName])) {
                return $data[$varName];
            }
        }

        // Handle object property
        if (preg_match('/\$([a-zA-Z0-9_]+)->([a-zA-Z0-9_]+)/', $expression, $matches)) {
            $varName = $matches[1];
            $property = $matches[2];

            if (isset($data[$varName]) && is_object($data[$varName]) && property_exists($data[$varName], $property)) {
                return $data[$varName]->$property;
            }
        }

        // Simple variable
        if (isset($data[$expression])) {
            return $data[$expression];
        }

        return null;
    }

    /**
     * Get Node.js binary path from config with fallback
     *
     * @return string
     */
    private function getNodeBinaryPath()
    {
        // Try to get from config first
        $nodePath = config('browsershot.node_binary');

        // If config returns 'node' or null, check if it exists
        if ($nodePath && $nodePath !== 'node' && file_exists($nodePath) && is_executable($nodePath)) {
            \Log::info('Using Node.js from config: ' . $nodePath);
            return $nodePath;
        }

        // If not found or not executable, try fallback paths from config
        $fallbackPaths = config('browsershot.fallback_paths', []);

        foreach ($fallbackPaths as $path) {
            if (file_exists($path) && is_executable($path)) {
                \Log::info('Using Node.js from fallback: ' . $path);
                return $path;
            }
        }

        // Last resort: use 'node' from system PATH
        \Log::info('Using Node.js from system PATH');
        return 'node';
    }

    /**
     * Get Browsershot options from config
     *
     * @param array $requestOptions
     * @return array
     */
    private function getBrowsershotOptions($requestOptions = [])
    {
        $defaultOptions = config('browsershot.options', []);

        return [
            'timeout' => $requestOptions['timeout'] ?? $defaultOptions['timeout'] ?? 120,
            'delay' => $requestOptions['delay'] ?? $defaultOptions['delay'] ?? 2000,
            'window_width' => $requestOptions['window_width'] ?? $defaultOptions['window_width'] ?? 1920,
            'window_height' => $requestOptions['window_height'] ?? $defaultOptions['window_height'] ?? 1080,
            'no_sandbox' => $requestOptions['no_sandbox'] ?? $defaultOptions['no_sandbox'] ?? true,
            'paper_size' => $requestOptions['paper_size'] ?? $defaultOptions['paper_size'] ?? 'A4',
            'orientation' => $requestOptions['orientation'] ?? $defaultOptions['orientation'] ?? 'portrait',
            'margins' => [
                'top' => $requestOptions['margin']['top'] ?? $defaultOptions['margins']['top'] ?? 10,
                'right' => $requestOptions['margin']['right'] ?? $defaultOptions['margins']['right'] ?? 10,
                'bottom' => $requestOptions['margin']['bottom'] ?? $defaultOptions['margins']['bottom'] ?? 10,
                'left' => $requestOptions['margin']['left'] ?? $defaultOptions['margins']['left'] ?? 10,
            ],
        ];
    }

    /**
     * Generate PDF using Browsershot with config
     *
     * @param string $html
     * @param array $options
     * @return string
     */
    private function generatePdfWithBrowsershot($html, $options = [])
    {
        try {
            // Create Browsershot instance
            $browsershot = new Browsershot();

            // Get Node.js path from config
            $nodePath = $this->getNodeBinaryPath();

            // Set Node.js binary path
            if ($nodePath && $nodePath !== 'node') {
                $browsershot->setNodeBinary($nodePath);
            }

            // Get options from config
            $bsOptions = $this->getBrowsershotOptions($options);

            // Set Node.js environment PATH if configured
            $nodeEnvPath = config('browsershot.node_env_path');
            if ($nodeEnvPath && is_dir($nodeEnvPath)) {
                putenv("PATH={$nodeEnvPath}:" . getenv('PATH'));
            }

            // Set HTML content with options
            $browsershot->setHtml($html)
                ->noSandbox()
                ->timeout($bsOptions['timeout'])
                ->windowSize($bsOptions['window_width'], $bsOptions['window_height'])
                ->waitUntilNetworkIdle()
                ->setDelay($bsOptions['delay']);

            // Paper size and orientation
            $paperSize = $bsOptions['paper_size'];
            $orientation = $bsOptions['orientation'];

            // Set paper size
            $browsershot->setOption('paperWidth', $this->getPaperWidth($paperSize));
            $browsershot->setOption('paperHeight', $this->getPaperHeight($paperSize));

            // Set orientation
            if ($orientation === 'landscape') {
                $browsershot->setOption('landscape', true);
            }

            // Set margins
            $margins = $bsOptions['margins'];
            $browsershot->setOption('marginTop', $margins['top'])
                ->setOption('marginRight', $margins['right'])
                ->setOption('marginBottom', $margins['bottom'])
                ->setOption('marginLeft', $margins['left']);

            // Background and print options
            $browsershot->setOption('printBackground', true)
                ->setOption('preferCSSPageSize', true);

            // Generate PDF
            $pdf = $browsershot->pdf();

            return $pdf;

        } catch (\Exception $e) {
            \Log::error('Browsershot error: ' . $e->getMessage());
            throw new \Exception('Browsershot error: ' . $e->getMessage());
        }
    }

    /**
     * Get paper width in millimeters
     *
     * @param string $size
     * @return float
     */
    private function getPaperWidth($size)
    {
        $sizes = [
            'A4' => 210,
            'A3' => 297,
            'A5' => 148,
            'Letter' => 215.9,
            'Legal' => 215.9,
        ];

        return isset($sizes[$size]) ? $sizes[$size] : 210;
    }

    /**
     * Get paper height in millimeters
     *
     * @param string $size
     * @return float
     */
    private function getPaperHeight($size)
    {
        $sizes = [
            'A4' => 297,
            'A3' => 420,
            'A5' => 210,
            'Letter' => 279.4,
            'Legal' => 355.6,
        ];

        return isset($sizes[$size]) ? $sizes[$size] : 297;
    }

    /**
     * Validate API key
     *
     * @param string $apiKey
     * @return bool
     */
    private function validateApiKey($apiKey)
    {
        $validKeys = [
            'sk_live_xxxxx' => [
                'status' => 'active',
                'expires' => null,
                'rate_limit' => 1000,
                'permissions' => ['all']
            ],
            'sk_test_xxxxx' => [
                'status' => 'active',
                'expires' => null,
                'rate_limit' => 100,
                'permissions' => ['invoice', 'receipt']
            ],
        ];

        if (!isset($validKeys[$apiKey])) {
            return false;
        }

        $keyData = $validKeys[$apiKey];

        if ($keyData['status'] !== 'active') {
            return false;
        }

        if ($keyData['expires'] && Carbon::parse($keyData['expires'])->isPast()) {
            return false;
        }

        return true;
    }

    /**
     * Generate unique filename
     *
     * @param string $template
     * @return string
     */
    private function generateUniqueFilename($template)
    {
        $timestamp = Carbon::now()->format('Ymd_His');
        $uuid = Str::uuid()->toString();
        return "{$template}_{$timestamp}_{$uuid}.pdf";
    }

    /**
     * Save PDF to storage
     *
     * @param string $filename
     * @param string $content
     * @return void
     */
    private function savePdfToStorage($filename, $content)
    {
        $path = "pdfs/temp/{$filename}";
        Storage::disk('local')->put($path, $content);

        $metadata = [
            'filename' => $filename,
            'expires_at' => Carbon::now()->addHour()->toISOString(),
            'created_at' => Carbon::now()->toISOString(),
            'size' => strlen($content),
            'generated_by' => 'Browsershot'
        ];

        Storage::disk('local')->put("pdfs/metadata/{$filename}.json", json_encode($metadata));
    }

    /**
     * Generate URL for PDF
     *
     * @param string $filename
     * @return string
     */
    private function generatePdfUrl($filename)
    {
        $expiration = Carbon::now()->addHour();
        return url()->temporarySignedRoute(
            'pdf.download',
            $expiration,
            ['filename' => $filename]
        );
    }

    /**
     * Get PDF page count
     *
     * @param string $pdfContent
     * @return int
     */
    private function getPdfPageCount($pdfContent)
    {
        try {
            preg_match('/\/Count\s+(\d+)/', $pdfContent, $matches);
            return isset($matches[1]) ? (int) $matches[1] : 1;
        } catch (\Exception $e) {
            return 1;
        }
    }

    /**
     * Download PDF
     *
     * @param Request $request
     * @param string $filename
     * @return \Illuminate\Http\Response|\Illuminate\Http\JsonResponse
     */
    public function downloadPdf(Request $request, $filename)
    {
        try {
            if (!$request->hasValidSignature()) {
                return response()->json([
                    'error' => 'Invalid or expired signature',
                    'message' => 'The download link is invalid or has expired.'
                ], 401);
            }

            $path = "pdfs/temp/{$filename}";

            if (!Storage::disk('local')->exists($path)) {
                return response()->json([
                    'error' => 'PDF not found',
                    'message' => 'The requested PDF does not exist or has been deleted.'
                ], 404);
            }

            $metadataPath = "pdfs/metadata/{$filename}.json";
            if (Storage::disk('local')->exists($metadataPath)) {
                $metadata = json_decode(Storage::disk('local')->get($metadataPath), true);
                if (Carbon::parse($metadata['expires_at'])->isPast()) {
                    Storage::disk('local')->delete($path);
                    Storage::disk('local')->delete($metadataPath);
                    return response()->json([
                        'error' => 'PDF expired',
                        'message' => 'This PDF has expired and has been deleted.'
                    ], 410);
                }
            }

            $fileContent = Storage::disk('local')->get($path);
            $headers = [
                'Content-Type' => 'application/pdf',
                'Content-Disposition' => 'attachment; filename="' . $filename . '"',
                'Content-Length' => strlen($fileContent)
            ];

            return response($fileContent, 200, $headers);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Download failed',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Clean expired PDFs
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function cleanExpiredPdfs()
    {
        try {
            $deleted = 0;
            $deletedSize = 0;
            $metadataFiles = Storage::disk('local')->files('pdfs/metadata');

            foreach ($metadataFiles as $metadataFile) {
                $metadata = json_decode(Storage::disk('local')->get($metadataFile), true);

                if (Carbon::parse($metadata['expires_at'])->isPast()) {
                    $filename = $metadata['filename'];
                    $pdfPath = "pdfs/temp/{$filename}";

                    if (Storage::disk('local')->exists($pdfPath)) {
                        $deletedSize += Storage::disk('local')->size($pdfPath);
                        Storage::disk('local')->delete($pdfPath);
                    }

                    Storage::disk('local')->delete($metadataFile);
                    $deleted++;
                }
            }

            return response()->json([
                'success' => true,
                'deleted' => $deleted,
                'freed_space' => $this->formatFileSize($deletedSize),
                'message' => "Cleaned up {$deleted} expired PDFs"
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Cleanup failed',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Format file size
     *
     * @param int $bytes
     * @return string
     */
    private function formatFileSize($bytes)
    {
        $units = ['B', 'KB', 'MB', 'GB'];
        $i = 0;

        while ($bytes >= 1024 && $i < count($units) - 1) {
            $bytes /= 1024;
            $i++;
        }

        return round($bytes, 2) . ' ' . $units[$i];
    }
}