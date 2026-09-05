<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Node.js Binary Path
    |--------------------------------------------------------------------------
    |
    | Path to the Node.js binary. This can be set in your .env file.
    |
    */
    'node_binary' => env('NODEJS_PATH', 'node'),

    /*
    |--------------------------------------------------------------------------
    | npm Binary Path
    |--------------------------------------------------------------------------
    |
    | Path to the npm binary. This can be set in your .env file.
    |
    */
    'npm_binary' => env('NODEJS_NPM_PATH', 'npm'),

    /*
    |--------------------------------------------------------------------------
    | Node.js Environment PATH
    |--------------------------------------------------------------------------
    |
    | Path to the Node.js environment bin directory.
    |
    */
    'node_env_path' => env('NODEJS_ENV_PATH', null),

    /*
    |--------------------------------------------------------------------------
    | Browsershot Options
    |--------------------------------------------------------------------------
    |
    | Default options for Browsershot PDF generation.
    |
    */
    'options' => [
        'timeout' => env('BROWSERSHOT_TIMEOUT', 120),
        'delay' => env('BROWSERSHOT_DELAY', 2000),
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
    | Fallback Paths
    |--------------------------------------------------------------------------
    |
    | If the configured Node.js path doesn't work, try these paths.
    |
    */
    'fallback_paths' => [
        '/home2/frajosan/nodevenv/softwares/pdf/22/bin/node',
        '/home2/frajosan/.nvm/versions/node/v22.23.2/bin/node',
        '/home2/frajosan/.nvm/versions/node/v20.11.0/bin/node',
        '/usr/local/bin/node',
        '/usr/bin/node',
    ],
];