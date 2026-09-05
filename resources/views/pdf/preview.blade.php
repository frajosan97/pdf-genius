<!DOCTYPE html>
<html>

<head>
    <title>PDF Preview</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            background: #f5f5f5;
        }

        .preview-container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            overflow: hidden;
        }

        .preview-header {
            padding: 20px;
            background: #4A90E2;
            color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .preview-body {
            padding: 20px;
            background: white;
        }

        iframe {
            width: 100%;
            min-height: 800px;
            border: none;
        }

        .btn {
            padding: 10px 20px;
            background: white;
            color: #4A90E2;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
            text-decoration: none;
        }

        .btn:hover {
            background: #f0f0f0;
        }
    </style>
</head>

<body>
    <div class="preview-container">
        <div class="preview-header">
            <h2>PDF Preview</h2>
            <button onclick="window.print()" class="btn">Print/Export PDF</button>
        </div>
        <div class="preview-body">
            <iframe srcdoc="{{ htmlspecialchars($html) }}"></iframe>
        </div>
    </div>
</body>

</html>