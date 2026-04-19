const fs = require('fs');
const path = require('path');
const dir = 'd:/SMM/SMM 2';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
files.forEach(file => {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');

  // Insert FontAwesome before </head> if not present
  if (!content.includes('font-awesome')) {
    content = content.replace('</head>', '  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />\n</head>');
  }

  // Replace emojis with FontAwesome brand icons + original colors
  content = content.replace(/📘/g, '<i class="fa-brands fa-facebook" style="color: #1877F2;"></i>');
  content = content.replace(/🐦/g, '<i class="fa-brands fa-twitter" style="color: #1DA1F2;"></i>');
  content = content.replace(/💼/g, '<i class="fa-brands fa-linkedin" style="color: #0A66C2;"></i>');
  content = content.replace(/📸/g, '<i class="fa-brands fa-instagram" style="color: #E1306C;"></i>');
  content = content.replace(/▶️/g, '<i class="fa-brands fa-youtube" style="color: #FF0000;"></i>');
  content = content.replace(/🎵/g, '<i class="fa-brands fa-pinterest" style="color: #E60023;"></i>');

  fs.writeFileSync(path.join(dir, file), content, 'utf8');
});
console.log('Icons and FontAwesome added to ' + files.length + ' files.');
