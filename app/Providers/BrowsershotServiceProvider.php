<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Spatie\Browsershot\Browsershot;

class BrowsershotServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->singleton('browsershot', function () {
            return (new Browsershot())
                ->noSandbox()
                ->timeout(60)
                ->windowSize(1920, 1080);
        });
    }
}