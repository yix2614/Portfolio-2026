const fs = require('fs');
let code = fs.readFileSync('src/tiktokweb/TiktokWebContent.tsx', 'utf-8');

const components = `
// --- Reusable Components ---
const AutoVideo = ({ src, style }: { src: string, style?: React.CSSProperties }) => (
  <video
    src={src}
    autoPlay
    loop
    muted
    playsInline
    style={{ width: "100%", height: "auto", display: "block", borderRadius: "12px", backgroundColor: "var(--color-bg-secondary)", ...style }}
  />
);

const SectionDivider = ({ dotSize = 4 }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%" }}>
    <div style={{ flex: 1, height: "0.5px", backgroundColor: "var(--color-border-default)" }} />
    <div style={{ width: \`\${dotSize}px\`, height: \`\${dotSize}px\`, borderRadius: "9999px", backgroundColor: "var(--color-border-default)" }} />
    <div style={{ flex: 1, height: "0.5px", backgroundColor: "var(--color-border-default)" }} />
  </div>
);

const SectionHeader = ({ id, subtitle, title }: { id?: string, subtitle: string, title: string }) => (
  <div id={id} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
    <Text span style={{ fontSize: "12px", textTransform: "none", color: "var(--color-text-muted)", lineHeight: 1.3 }}>
      {subtitle}
    </Text>
    <Text h2 style={{
      fontFamily: '"Instrument Serif", serif',
      fontSize: "28px",
      lineHeight: 1.1,
      margin: 0,
      color: "var(--color-text-primary)"
    }}>
      {title}
    </Text>
  </div>
);

const TwoCol = ({ id, gap = "12px", title, subtitle, children }: { id?: string, gap?: string, title: React.ReactNode, subtitle?: React.ReactNode, children: React.ReactNode }) => (
  <div id={id} className="mobile-stack" style={{
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
    gap,
    width: "100%",
    alignItems: "start"
  }}>
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%" }}>
      {subtitle && <Text span style={{ fontSize: "12px", color: "var(--color-text-muted)", lineHeight: 1.3 }}>{subtitle}</Text>}
      <Text span style={{ fontFamily: '"Instrument Serif", serif', fontSize: "22px", color: "var(--color-text-primary)", lineHeight: 1.1 }}>
        {title}
      </Text>
    </div>
    <div style={{ flex: 1 }}>
      {children}
    </div>
  </div>
);

const PText = ({ children, style }: { children: React.ReactNode, style?: React.CSSProperties }) => (
  <Text span style={{ fontSize: "14px", color: "var(--color-text-primary)", lineHeight: 1.6, whiteSpace: "pre-wrap", ...style }}>
    {children}
  </Text>
);

const ImgCard = ({ src, alt, badge, badgeColor }: { src: string, alt: string, badge?: string, badgeColor?: string }) => (
  <div style={{ position: "relative", width: "100%" }}>
    <img src={src} alt={alt} style={{ width: "100%", height: "auto", display: "block", borderRadius: "12px" }} />
    {badge && (
      <div style={{ position: "absolute", right: 12, bottom: 12, pointerEvents: "none" }}>
        <Badge style={{ borderRadius: "9999px", backgroundColor: badgeColor, color: "#FFFFFF", border: "none", fontWeight: 500, padding: "0 8px", height: "24px", display: "flex", alignItems: "center" }}>
          {badge}
        </Badge>
      </div>
    )}
  </div>
);
`;

if (!code.includes('// --- Reusable Components ---')) {
  code = code.replace('const TiktokWebContent = () => {', components + '\nconst TiktokWebContent = () => {');
}

// Write back
fs.writeFileSync('src/tiktokweb/TiktokWebContent.tsx', code);
console.log("Added components definition");
