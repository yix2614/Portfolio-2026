const fs = require('fs');
let code = fs.readFileSync('src/tiktokweb/TiktokWebContent.tsx', 'utf-8');

const twoColRegex = /<div(?: id="([^"]+)")? className="mobile-stack" style=\{\{\s*display:\s*"grid",\s*gridTemplateColumns:\s*"1fr 2fr",\s*gap:\s*"(\d+px)",\s*width:\s*"100%",\s*alignItems:\s*"start"\s*\}\}>\s*<div style=\{\{\s*display:\s*"flex",\s*flexDirection:\s*"column",\s*gap:\s*"8px",\s*width:\s*"100%"\s*\}\}>\s*(?:<Text span style=\{\{\s*fontSize:\s*"12px",\s*color:\s*"var\(--color-text-muted\)",\s*lineHeight:\s*1\.3\s*\}\}>\s*([^<]+)\s*<\/Text>\s*)?<Text span style=\{\{\s*fontFamily:\s*'"Instrument Serif", serif',\s*fontSize:\s*"22px",\s*color:\s*"var\(--color-text-primary\)",\s*lineHeight:\s*1\.1\s*\}\}>\s*([^<]+)\s*<\/Text>\s*<\/div>\s*<div style=\{\{\s*flex:\s*1\s*\}\}>\s*([\s\S]*?)\s*<\/div>\s*<\/div>/g;

let count = 0;
code = code.replace(twoColRegex, (match, id, gap, subtitle, title, content) => {
  count++;
  let props = [];
  if (id) props.push(`id="${id}"`);
  if (gap && gap !== "12px") props.push(`gap="${gap}"`);
  if (subtitle) props.push(`subtitle="${subtitle.trim()}"`);
  props.push(`title="${title.trim()}"`);
  return `<TwoCol ${props.join(" ")}>\n${content}\n</TwoCol>`;
});
console.log("Replaced TwoCol:", count);

fs.writeFileSync('src/tiktokweb/TiktokWebContent.tsx', code);
