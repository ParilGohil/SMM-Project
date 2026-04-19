$ErrorActionPreference = "Stop"

$files = Get-ChildItem -Path "d:\SMM\SMM 2\*.html"
foreach ($file in $files) {
    # Read the file with UTF-8
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    # Add FontAwesome if not exists
    if (-not $content.Contains("font-awesome")) {
        $content = $content -replace "</head>", "  <link rel=`"stylesheet`" href=`"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css`" />`n</head>"
    }

    # Replace emojis with original colored FontAwesome icons
    $content = $content.Replace("📘", "<i class=`"fa-brands fa-facebook`" style=`"color: #1877F2;`"></i>")
    $content = $content.Replace("🐦", "<i class=`"fa-brands fa-twitter`" style=`"color: #1DA1F2;`"></i>")
    $content = $content.Replace("💼", "<i class=`"fa-brands fa-linkedin`" style=`"color: #0A66C2;`"></i>")
    $content = $content.Replace("📸", "<i class=`"fa-brands fa-instagram`" style=`"color: #E1306C;`"></i>")
    $content = $content.Replace("▶️", "<i class=`"fa-brands fa-youtube`" style=`"color: #FF0000;`"></i>")
    $content = $content.Replace("🎵", "<i class=`"fa-brands fa-pinterest`" style=`"color: #E60023;`"></i>")
    
    # Save back with UTF-8 encoding
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
}

Write-Output "Successfully updated logos!"
