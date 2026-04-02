const fs = require('fs');
let code = fs.readFileSync('src/tiktokweb/TiktokWebContent.tsx', 'utf-8');

const ptextRegex = /<Text span style=\{\{\s*fontSize:\s*"14px",\s*color:\s*"var\(--color-text-primary\)",\s*lineHeight:\s*1\.6(?:,\s*whiteSpace:\s*"pre-wrap")?\s*\}\}>\s*([\s\S]*?)\s*<\/Text>/g;

let count = 0;
code = code.replace(ptextRegex, (match, content) => {
  count++;
  return `<PText>\n${content}\n</PText>`;
});
console.log("Replaced PText:", count);

fs.writeFileSync('src/tiktokweb/TiktokWebContent.tsx', code);
