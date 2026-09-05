<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Node.js Binary Path
    |--------------------------------------------------------------------------
    */
    'node_binary' => env('NODEJS_PATH', 'node'),

    /*
    |--------------------------------------------------------------------------
    | npm Binary Path
    |--------------------------------------------------------------------------
    */
    'npm_binary' => env('NODEJS_NPM_PATH', 'npm'),

    /*
    |--------------------------------------------------------------------------
    | Node.js Environment PATH
    |--------------------------------------------------------------------------
    */
    'node_env_path' => env('NODEJS_ENV_PATH', null),

    /*
    |--------------------------------------------------------------------------
    | Chromium/Chrome Path
    |--------------------------------------------------------------------------
    */
    'chromium_path' => env('CHROMIUM_PATH', null),
    'chromium_fallback_path' => env('CHROMIUM_FALLBACK_PATH', null),

    /*
    |--------------------------------------------------------------------------
    | PDF Driver
    |--------------------------------------------------------------------------
    */
    'driver' => env('PDF_DRIVER', 'browsershot'),

    /*
    |--------------------------------------------------------------------------
    | Browsershot Options
    |--------------------------------------------------------------------------
    */
    'options' => [
        'timeout' => env('BROWSERSHOT_TIMEOUT', 300),
        'delay' => env('BROWSERSHOT_DELAY', 5000),
        'window_width' => env('BROWSERSHOT_WINDOW_WIDTH', 1920),
        'window_height' => env('BROWSERSHOT_WINDOW_HEIGHT', 1080),
        'no_sandbox' => true,
        'paper_size' => env('BROWSERSHOT_PAPER_SIZE', 'A4'),
        'orientation' => env('BROWSERSHOT_ORIENTATION', 'portrait'),
        'margins' => [
            'top' => env('BROWSERSHOT_MARGIN_TOP', 10),
            'right' => env('BROWSERSHOT_MARGIN_RIGHT', 10),
            'bottom' => env('BROWSERSHOT_MARGIN_BOTTOM', 10),
            'left' => env('BROWSERSHOT_MARGIN_LEFT', 10),
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Fallback Paths (Auto-detected if env not set)
    |--------------------------------------------------------------------------
    */
    'fallback_paths' => [
        // cPanel paths
        '/home2/frajosan/nodevenv/softwares/pdf/22/bin/node',
        '/home2/frajosan/.nvm/versions/node/v22.23.2/bin/node',
        '/usr/local/bin/node',
        '/usr/bin/node',

        // Windows paths (for local development)
        'C:\\Program Files\\nodejs\\node.exe',
        'C:\\Program Files (x86)\\nodejs\\node.exe',
    ],
];