@if(isset($html_content))
    {!! $html_content !!}
@elseif(isset($data['html_content']))
    {!! $data['html_content'] !!}
@else
    <!DOCTYPE html>
    <html>

    <head>
        <meta charset="UTF-8">
        <title>Document</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                padding: 40px;
                color: #333;
            }

            .content {
                max-width: 800px;
                margin: 0 auto;
            }

            h1 {
                color: #4A90E2;
            }
        </style>
    </head>

    <body>
        <div class="content">
            <h1>No content provided</h1>
            <p>Please provide HTML content in the request.</p>
        </div>
    </body>

    </html>
@endif