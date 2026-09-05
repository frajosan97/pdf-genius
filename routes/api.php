<?php

use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Route;

// PDF Generation Routes
Route::prefix('v1')->group(function () {
    Route::post('/generate', [ApiController::class, 'generatePdf']);
    Route::post('/generate-from-url', [ApiController::class, 'generateFromUrl']);
    Route::post('/preview', [ApiController::class, 'previewPdf']);
});

// PDF Download (with signed URL)
Route::get('/pdf/download/{filename}', [ApiController::class, 'downloadPdf'])
    ->name('pdf.download')
    ->middleware('signed');

// PDF Info
Route::get('/pdf/info/{filename}', [ApiController::class, 'getPdfInfo']);

// Admin routes for cleanup
Route::middleware(['auth:api'])->group(function () {
    Route::get('/pdf/cleanup', [ApiController::class, 'cleanExpiredPdfs']);
});