const fs = require('fs');
let code = fs.readFileSync('src/tiktokweb/TiktokWebContent.tsx', 'utf-8');

const imgBadgeRegex = /<div style=\{\{\s*position:\s*"relative",\s*width:\s*"100%"\s*\}\}>\s*<img\s*src="([^"]+)"\s*alt="([^"]+)"\s*style=\{\{\s*width:\s*"100%",\s*height:\s*"auto",\s*display:\s*"block",\s*borderRadius:\s*"12px"\s*\}\}\s*\/>\s*<div style=\{\{\s*position:\s*"absolute",\s*right:\s*12,\s*bottom:\s*12,\s*pointerEvents:\s*"none"\s*\}\}>\s*<Badge style=\{\{\s*borderRadius:\s*"9999px",\s*backgroundColor:\s*"([^"]+)",\s*color:\s*"#FFFFFF",\s*border:\s*"none",\s*fontWeight:\s*500,\s*padding:\s*"0 8px",\s*height:\s*"24px",\s*display:\s*"flex",\s*alignItems:\s*"center"\s*\}\}>\s*([^<]+)\s*<\/Badge>\s*<\/div>\s*<\/div>/g;

let count = 0;
code = code.replace(imgBadgeRegex, (match, src, alt, bg, text) => {
  count++;
  return `<ImgCard src="${src}" alt="${alt}" badge="${text.trim()}" badgeColor="${bg}" />`;
});
console.log("Replaced ImgCards:", count);

fs.writeFileSync('src/tiktokweb/TiktokWebContent.tsx', code);
