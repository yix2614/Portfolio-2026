const fs = require('fs');
let code = fs.readFileSync('src/tiktokweb/TiktokWebContent.tsx', 'utf-8');

// Update SectionDivider to accept ID and custom heights
const newSectionDividerDef = `const SectionDivider = ({ id, dotSize = 4, dotHeight }: { id?: string, dotSize?: number, dotHeight?: number }) => (
  <div id={id} style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%" }}>
    <div style={{ flex: 1, height: "0.5px", backgroundColor: "var(--color-border-default)" }} />
    <div style={{ width: \`\${dotSize}px\`, height: \`\${dotHeight || dotSize}px\`, borderRadius: "9999px", backgroundColor: "var(--color-border-default)" }} />
    <div style={{ flex: 1, height: "0.5px", backgroundColor: "var(--color-border-default)" }} />
  </div>
);`;
code = code.replace(/const SectionDivider[\s\S]*?<\/div>\n\);/m, newSectionDividerDef);

// Replace dividers with ID
const divRegex = /<div(?: id="([^"]+)")? style=\{\{\s*display:\s*"flex",\s*alignItems:\s*"center",\s*gap:\s*"8px",\s*width:\s*"100%"\s*\}\}>\s*<div style=\{\{\s*flex:\s*1,\s*height:\s*"0\.5px",\s*backgroundColor:\s*"var\(--color-border-default\)"\s*\}\}\s*\/>\s*<div style=\{\{\s*width:\s*"(\d+)px",\s*height:\s*"(\d+)px",\s*borderRadius:\s*"9999px",\s*backgroundColor:\s*"var\(--color-border-default\)"\s*\}\}\s*\/>\s*<div style=\{\{\s*flex:\s*1,\s*height:\s*"0\.5px",\s*backgroundColor:\s*"var\(--color-border-default\)"\s*\}\}\s*\/>\s*<\/div>/g;

let count = 0;
code = code.replace(divRegex, (match, id, w, h) => {
  count++;
  let props = [];
  if (id) props.push(`id="${id}"`);
  if (w !== "4") props.push(`dotSize={${w}}`);
  if (h !== w) props.push(`dotHeight={${h}}`);
  return `<SectionDivider ${props.join(" ")} />`.replace("  ", " ");
});
console.log("Replaced dividers:", count);

// Also let's replace SectionHeader
const headerRegex = /<div(?: id="([^"]+)")? style=\{\{\s*display:\s*"flex",\s*flexDirection:\s*"column",\s*gap:\s*"4px"\s*\}\}>\s*<Text span style=\{\{\s*fontSize:\s*"12px",\s*textTransform:\s*"none",\s*color:\s*"var\(--color-text-muted\)",\s*lineHeight:\s*1\.3\s*\}\}>\s*([^<]+)\s*<\/Text>\s*<Text h2 style=\{\{\s*fontFamily:\s*'"Instrument Serif", serif',\s*fontSize:\s*"28px",\s*lineHeight:\s*1\.1,\s*margin:\s*0,\s*color:\s*"var\(--color-text-primary\)"\s*\}\}>\s*([^<]+)\s*<\/Text>\s*<\/div>/g;
let hCount = 0;
code = code.replace(headerRegex, (match, id, sub, title) => {
  hCount++;
  let props = [];
  if (id) props.push(`id="${id}"`);
  return `<SectionHeader ${props.join(" ")} subtitle="${sub.trim()}" title="${title.trim()}" />`;
});
console.log("Replaced headers:", hCount);

fs.writeFileSync('src/tiktokweb/TiktokWebContent.tsx', code);
