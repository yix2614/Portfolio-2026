const fs = require('fs');
let code = fs.readFileSync('src/tiktokweb/TiktokWebContent.tsx', 'utf-8');

const tickerDef = `
const ImageTicker = ({ images }: { images: string[] }) => (
  <div style={{
    width: "100%",
    overflow: "hidden",
    position: "relative",
    display: "flex",
    maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
    WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
  }}>
    <div style={{
      display: "flex",
      gap: "12px",
      animation: "ticker-scroll 20s linear infinite",
      width: "max-content"
    }}>
      {[...images, ...images].map((src, i) => (
        <img key={i} src={src} alt="Ticker item" style={{ width: "320px", height: "auto", display: "block", borderRadius: "12px", objectFit: "cover" }} />
      ))}
    </div>
  </div>
);
`;

code = code.replace(/const AutoVideo/g, tickerDef + "\nconst AutoVideo");

const tickerRegex = /\{\/\* 6 Images Ticker \*\/\}\s*<div style=\{\{\s*width:\s*"100%",\s*overflow:\s*"hidden",[\s\S]*?<\/div>\s*<\/div>/;
const tickerImages = [
  "https://f004.backblazeb2.com/file/xiangyi-assets/Chips.jpg",
  "https://f004.backblazeb2.com/file/xiangyi-assets/video+player.jpg",
  "https://f004.backblazeb2.com/file/xiangyi-assets/Comment.jpg",
  "https://f004.backblazeb2.com/file/xiangyi-assets/Side+nav.jpg",
  "https://f004.backblazeb2.com/file/xiangyi-assets/In-app+push.jpg",
  "https://f004.backblazeb2.com/file/xiangyi-assets/Toolbar.jpg"
];

code = code.replace(tickerRegex, `{/* 6 Images Ticker */}
        <ImageTicker images={[
          ${tickerImages.map(img => `"${img}"`).join(',\n          ')}
        ]} />`);

fs.writeFileSync('src/tiktokweb/TiktokWebContent.tsx', code);
console.log("Replaced Ticker");
