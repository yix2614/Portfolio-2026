const fs = require('fs');
let code = fs.readFileSync('src/tiktokweb/TiktokWebContent.tsx', 'utf-8');

// Replace standard video
const videoRegex = /<video\s+src="([^"]+)"\s+autoPlay\s+loop\s+muted\s+playsInline\s+style=\{\{\s*width:\s*"100%",\s*height:\s*"auto",\s*display:\s*"block",\s*borderRadius:\s*"12px"(?:,\s*backgroundColor:\s*"var\(--color-bg-secondary\)")?\s*\}\}\s*\/>/g;
let matches = code.match(videoRegex);
if (matches) {
  code = code.replace(videoRegex, '<AutoVideo src="$1" />');
  console.log("Replaced videos:", matches.length);
}

// Replace dividers
const dividerRegex = /<div style=\{\{\s*display:\s*"flex",\s*alignItems:\s*"center",\s*gap:\s*"8px",\s*width:\s*"100%"\s*\}\}>\s*<div style=\{\{\s*flex:\s*1,\s*height:\s*"0\.5px",\s*backgroundColor:\s*"var\(--color-border-default\)"\s*\}\}\s*\/>\s*<div style=\{\{\s*width:\s*"(\d+)px",\s*height:\s*"\1px",\s*borderRadius:\s*"9999px",\s*backgroundColor:\s*"var\(--color-border-default\)"\s*\}\}\s*\/>\s*<div style=\{\{\s*flex:\s*1,\s*height:\s*"0\.5px",\s*backgroundColor:\s*"var\(--color-border-default\)"\s*\}\}\s*\/>\s*<\/div>/g;
let divMatches = code.match(dividerRegex);
if (divMatches) {
  code = code.replace(dividerRegex, (match, p1) => {
    if (p1 === "4") return '<SectionDivider />';
    return `<SectionDivider dotSize={${p1}} />`;
  });
  console.log("Replaced dividers:", divMatches.length);
}

fs.writeFileSync('src/tiktokweb/TiktokWebContent.tsx', code);
