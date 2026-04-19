import os
import glob

# FontAwesome link
fa_link = '  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />\n</head>'

replacements = {
    '📘': '<i class="fa-brands fa-facebook" style="color: #1877F2;"></i>',
    '🐦': '<i class="fa-brands fa-twitter" style="color: #1DA1F2;"></i>',
    '💼': '<i class="fa-brands fa-linkedin" style="color: #0A66C2;"></i>',
    '📸': '<i class="fa-brands fa-instagram" style="color: #E1306C;"></i>',
    '▶️': '<i class="fa-brands fa-youtube" style="color: #FF0000;"></i>',
    '🎵': '<i class="fa-brands fa-pinterest" style="color: #E60023;"></i>',
    '</head>': fa_link
}

html_files = glob.glob('d:/SMM/SMM 2/*.html')
for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'font-awesome' in content:
        replacements.pop('</head>', None)
        
    for text, replacement in replacements.items():
        content = content.replace(text, replacement)
        
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("Successfully replaced emojis with original logos in all HTML files.")
