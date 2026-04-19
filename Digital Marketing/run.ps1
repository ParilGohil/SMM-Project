$ErrorActionPreference = "Stop"
$files = Get-ChildItem -Path "d:\SMM\SMM 2\*.html"

$fb = [string][char]0xD83D + [string][char]0xDCD8
$tw = [string][char]0xD83D + [string][char]0xDC26
$li = [string][char]0xD83D + [string][char]0xDCBC
$ig = [string][char]0xD83D + [string][char]0xDCF8
$yt = [string][char]0x25B6 + [string][char]0xFE0F
$pt = [string][char]0xD83C + [string][char]0xDFB5

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    if (-not $content.Contains("font-awesome")) {
        $content = $content.Replace("</head>", "  <link rel=`"stylesheet`" href=`"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css`" />`r`n</head>")
    }

    $content = $content.Replace($fb, "<i class=`"fa-brands fa-facebook`" style=`"color: #1877F2;`"></i>")
    $content = $content.Replace($tw, "<i class=`"fa-brands fa-twitter`" style=`"color: #1DA1F2;`"></i>")
    $content = $content.Replace($li, "<i class=`"fa-brands fa-linkedin`" style=`"color: #0A66C2;`"></i>")
    $content = $content.Replace($ig, "<i class=`"fa-brands fa-instagram`" style=`"color: #E1306C;`"></i>")
    $content = $content.Replace($yt, "<i class=`"fa-brands fa-youtube`" style=`"color: #FF0000;`"></i>")
    $content = $content.Replace($pt, "<i class=`"fa-brands fa-pinterest`" style=`"color: #E60023;`"></i>")
    
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
}
Write-Output "Done"
