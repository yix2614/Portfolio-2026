import React, { useState, useEffect, useRef } from "react";
import { Text, Badge, Grid } from "@geist-ui/core";
import Lenis from '@studio-freight/lenis'
import ImageComparison from "./ImageComparison";

// --- Text Scramble Effect Component ---
const ScrambleText = ({ text, duration = 800, delay = 0, style }: { text: string, duration?: number, delay?: number, style?: React.CSSProperties }) => {
  const [displayText, setDisplayText] = useState("");
  // Reverted to a half-width character set to match English text widths perfectly
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
  
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let frameId: number;
    let startTime: number;
    
    // Start after the delay
    timeoutId = setTimeout(() => {
      const run = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        if (progress === 1) {
          setDisplayText(text);
          return;
        }
        
        let scrambled = "";
        for (let i = 0; i < text.length; i++) {
          // If the character's relative position is less than our progress, show the real char
          if (i / text.length < progress) {
            scrambled += text[i];
          } 
          // Keep spaces as spaces
          else if (text[i] === " ") {
            scrambled += " ";
          }
          // Otherwise show a random character
          else {
            scrambled += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        
        setDisplayText(scrambled);
        frameId = requestAnimationFrame(run);
      };
      
      frameId = requestAnimationFrame(run);
    }, delay);
    
    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(frameId);
    };
  }, [text, duration, delay]);
  
  return (
    <span style={{ position: "relative", display: "inline-block", ...style }}>
      {/* Invisible placeholder to maintain exact height and width from the start */}
      <span style={{ opacity: 0, pointerEvents: "none", userSelect: "none" }}>{text}</span>
      {/* Absolute positioned animated text */}
      <span style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%" }}>
        {displayText}
      </span>
    </span>
  );
};


// --- Reusable Components ---

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

const SectionDivider = ({ id, dotSize = 4, dotHeight, lineThickness = 0.5 }: { id?: string, dotSize?: number, dotHeight?: number, lineThickness?: number }) => (
  <div id={id} style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%" }}>
    <div style={{ flex: 1, height: `${lineThickness}px`, backgroundColor: "var(--color-border-default)" }} />
    <div style={{ width: `${dotSize}px`, height: `${dotHeight || dotSize}px`, borderRadius: "9999px", backgroundColor: "var(--color-border-default)" }} />
    <div style={{ flex: 1, height: `${lineThickness}px`, backgroundColor: "var(--color-border-default)" }} />
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

// --- Pin Overlay Component ---
const PinOverlay = ({ onClose, onSuccess }: { onClose: () => void, onSuccess: () => void }) => {
  const [pin, setPin] = useState(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newPin = [...pin];
    if (value.length > 1) {
      const pasted = value.slice(0, 4).split("");
      for (let i = 0; i < pasted.length; i++) {
        if (index + i < 4) newPin[index + i] = pasted[i];
      }
      setPin(newPin);
      const nextIndex = Math.min(index + pasted.length, 3);
      inputRefs.current[nextIndex]?.focus();
    } else {
      newPin[index] = value;
      setPin(newPin);
      if (value !== "" && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && pin[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    if (pin.join("") === "2614") {
      setTimeout(() => {
        onSuccess();
      }, 200);
    }
  }, [pin, onSuccess]);

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      zIndex: 9999,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      animation: "fadeIn 0.3s ease"
    }} onClick={onClose}>
      <div 
        style={{
          backgroundColor: "transparent",
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Text h3 style={{ margin: 0, color: "var(--color-text-primary)", fontFamily: '"Instrument Serif", serif', fontSize: "32px" }}>Unlock Data</Text>
        <div style={{ display: "flex", gap: "12px" }}>
          {pin.map((digit, index) => (
            <input
              key={index}
              ref={el => { inputRefs.current[index] = el; }}
              type="password"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              style={{
                width: "48px",
                height: "64px",
                fontSize: "24px",
                textAlign: "center",
                borderRadius: "8px",
                border: "1px solid var(--color-border-default)",
                backgroundColor: "var(--color-bg-secondary)",
                color: "var(--color-text-primary)",
                outline: "none"
              }}
              autoFocus={index === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Locked Data Component ---
const LockedData = ({ text, isUnlocked, onClick }: { text: string, isUnlocked: boolean, onClick: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  const scrambled = React.useMemo(() => {
    const chars = "!@#$%&*?";
    return text.split('').map(c => /[0-9.]/.test(c) ? chars[Math.floor(Math.random() * chars.length)] : c).join('');
  }, [text]);

  if (isUnlocked) {
    return <>{text}</>;
  }

  return (
    <span 
      style={{ position: "relative", cursor: "pointer", display: "inline-block" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <span style={{ fontFamily: "monospace" }}>{scrambled}</span>
      {isHovered && (
        <div style={{
          position: "absolute",
          bottom: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          marginBottom: "8px",
          backgroundColor: "var(--color-bg-page)",
          color: "var(--color-text-primary)",
          padding: "6px 10px",
          borderRadius: "6px",
          fontSize: "12px",
          whiteSpace: "nowrap",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          border: "1px solid var(--color-border-default)",
          zIndex: 10,
          pointerEvents: "none",
          fontWeight: 500
        }}>
          Click to unlock
        </div>
      )}
    </span>
  );
};

const TiktokWebContent = () => {
  const tableData = [
    {
      category: "Scope & Content",
      col1: [
        "Foundation components",
        "Legacy component standard",
        "Core page design specs",
      ],
      col2: [
        "Bridge App feature gaps",
        "Improve content efficiency",
        "Boost consumption UX",
      ],
      col3: [
        "Web exclusive UX (Player, Auth, etc.)",
        "Leverage Web-native capabilities",
      ],
      col4: [
        "Load performance",
        "Recommendation UX",
      ],
    },
    {
      category: "Design Role",
      col1: "High",
      col2: "High",
      col3: "High",
      col4: "Minimal",
    },
    {
      category: "Value / Impact",
      col1: "Strategic: Long-term value",
      col2: "Tactical: Reliable returns",
      col3: "Growth: High potential",
      col4: "Direct: Immediate impact",
    },
  ];

  const breakpointsData = [
    { breakpoint: "≥ 1600px", padding: "32px", gap: "16px", column: "12", paddingTop: "20px" },
    { breakpoint: "1599px - 1200px", padding: "32px", gap: "16px", column: "12", paddingTop: "20px" },
    { breakpoint: "1199px - 1024px", padding: "20px", gap: "16px", column: "12", paddingTop: "20px" },
    { breakpoint: "1023px - 840px", padding: "20px", gap: "16px", column: "12", paddingTop: "20px" },
    { breakpoint: "839px - 600px", padding: "20px", gap: "16px", column: "12", paddingTop: "20px" },
    { breakpoint: "< 600px (minimal size)", padding: "12px", gap: "12px", column: "12", paddingTop: "12px" },
  ];

  const renderList = (items: string[]) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {items.map((item, index) => (
        <div key={`${item}-${index}`}>
          • {item}
        </div>
      ))}
    </div>
  );

  const slideImages = [
    "https://f004.backblazeb2.com/file/xiangyi-assets/grid.png",
    "https://f004.backblazeb2.com/file/xiangyi-assets/content.jpeg",
    "https://f004.backblazeb2.com/file/xiangyi-assets/Anatomy+of+a+grid.jpeg"
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [hoveredSection, setHoveredSection] = useState("");
  const [activeCoreVideo, setActiveCoreVideo] = useState("sidenav");
  const [activeFeatureTab, setActiveFeatureTab] = useState("like");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPinOverlay, setShowPinOverlay] = useState(false);

  const sections = [
    { id: "section-context", title: "Context" },
    { id: "section-growth", title: "How TikTok.com drive growth" },
    { id: "section-bug-fixing", title: "The Foundation" },
    { id: "section-core", title: "Core Iterations, Steady Growth." },
    { id: "section-innovations", title: "Unique and Key Innovations" },
    { id: "section-design-engineering", title: "Design Engineering" }
  ];

  // Minimap / Ruler states
  const totalTicks = 45; // Increased from 25 to make it denser
  const ticksPerMajor = 4; // Adjusted major tick frequency to match new density
  const [scrollProgress, setScrollProgress] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis for global smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8, // Reduced from 1.2 to make it faster
      easing: (t) => 1 - Math.pow(1 - t, 4), // Changed to a faster, more natural ease-out-quart curve
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.2, // Slightly increased to make scrolling feel lighter
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.4; // Trigger when section reaches top 40% of viewport
      
      let currentActive = "";
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          currentActive = sections[i].id;
          break;
        }
      }
      setActiveSection(currentActive);

      // Calculate overall page scroll progress (0 to 1)
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    // Trigger once on mount
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [slideImages.length]);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link 
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap" 
        rel="stylesheet" 
      />

      <style>{`
        @keyframes slideInFromLeft {
          0% { transform: translate(-50px, -50%); opacity: 0; }
          100% { transform: translate(0, -50%); opacity: 1; }
        }
        @keyframes slideInFromRight {
          0% { transform: translate(50px, -50%); opacity: 0; }
          100% { transform: translate(0, -50%); opacity: 1; }
        }
        @keyframes fadeInUp {
          0% { transform: translateY(40px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        .animate-nav {
          animation: slideInFromLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          position: fixed;
          top: 50%;
          transform: translateY(-50%);
          left: 16px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          z-index: 50;
          font-family: "Instrument Serif", serif;
        }

        .animate-minimap {
          animation: slideInFromRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-content {
          animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Responsive Navigation Typography */
        .nav-link {
          text-decoration: none;
          transition: all 0.3s ease;
          line-height: 1.2;
        }
        
        .nav-link.active {
          font-size: 28px;
          font-weight: 500;
          opacity: 1;
        }
        
        .nav-link.inactive {
          font-size: 20px;
          font-weight: 400;
        }

        @media (max-width: 1200px) {
          .nav-link.active {
            font-size: 20px;
          }
          .nav-link.inactive {
            font-size: 14px;
          }
          .animate-nav {
            gap: 8px; /* Reduce gap for smaller screens */
          }
        }

        /* Hide elements on smaller screens (mobile/tablet portrait) */
        @media (max-width: 840px) {
          .animate-nav, .animate-minimap {
            display: none !important;
          }
        }

        /* Pure Black/White Toggle for Badges */
        :root {
          --badge-bg-active: #000000;
          --badge-text-active: #FFFFFF;
          --badge-border-active: #000000;
        }
        
        [data-theme="dark"] {
          --badge-bg-active: #FFFFFF;
          --badge-text-active: #000000;
          --badge-border-active: #FFFFFF;
        }

        /* Mobile specific layout adjustments */
        @media (max-width: 480px) {
          .mobile-stack {
            display: flex !important;
            flex-direction: column !important;
            gap: 16px !important;
          }
        }
      `}</style>

      {/* Left Navigation */}
      <div className="animate-nav">
          {sections.map((section, index) => {
            const isActive = activeSection === section.id;
            const isHovered = hoveredSection === section.id;
            
            const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              const target = document.getElementById(section.id);
              if (target && lenisRef.current) {
                // Use Lenis scrollTo method for perfectly smooth scrolling with easing
                lenisRef.current.scrollTo(target, {
                  offset: -100, // Offset for top padding
                  duration: 0.8 // Match the new faster global duration
                });
              } else if (target) {
                // Fallback
                const targetPosition = target.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({
                  top: targetPosition - 100, // Offset for top padding
                  behavior: "smooth"
                });
              }
            };

            return (
              <div key={section.id} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <a
                  href={`#${section.id}`}
                  className={`nav-link ${isActive ? "active" : "inactive"}`}
                  onClick={handleNavClick}
                  onMouseEnter={() => setHoveredSection(section.id)}
                  onMouseLeave={() => setHoveredSection("")}
                  style={{
                    color: isHovered && !isActive ? "var(--color-text-secondary)" : "var(--color-text-primary)",
                    opacity: isActive ? 1 : isHovered ? 0.8 : 0.4,
                  }}
                >
                  {section.title}
                </a>
              </div>
            );
          })}
        </div>

        {/* Dynamic Minimap Ruler (Right side) */}
      <div className="animate-minimap" style={{
          position: "fixed",
          top: "50%",
          transform: "translateY(-50%)",
          right: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end", // Align to the right
          gap: "4px", // Highly dense gap
          zIndex: 50,
        }}>
          {[...Array(totalTicks)].map((_, i) => {
            const isMajor = i % ticksPerMajor === 0;
            const baseWidth = isMajor ? 20 : 10; // Slightly shorter base width for high density
            // Use a very light grey with high transparency so it's subtle
            const color = isMajor ? "var(--color-text-muted)" : "var(--color-border-default)";
            
            // Calculate distance from current scroll position
            const tickProgress = i / (totalTicks - 1);
            const distance = Math.abs(tickProgress - scrollProgress);
            
            // Parabolic curve: closer = wider (scaleX > 1).
            const spread = 0.12; // Narrower spread for high density
            const intensity = 0.8;
            let scaleX = 1;
            
            if (distance < spread) {
              const curve = Math.cos((distance / spread) * (Math.PI / 2));
              scaleX = 1 + curve * intensity;
            }

            return (
              <div key={i} style={{
                width: `${baseWidth}px`,
                height: "2px",
                backgroundColor: color,
                transformOrigin: "100% 0", // Transform from the right edge
                transform: `scaleX(${scaleX})`,
                transition: "transform 0.1s linear",
                borderRadius: "1px"
              }} />
            );
          })}
        </div>
      
      <div 
        id="container"
        className="animate-content"
        style={{
          width: "100%",
          maxWidth: "744px",
          padding: "0 12px",
          boxSizing: "border-box",
          margin: "0 auto",
          fontFamily: "var(--font-tiktok)",
          display: "flex",
          flexDirection: "column",
          gap: "60px"
        }}
      >
        {/* Context anchor */}
        <div id="section-context" style={{ position: "relative", top: "-100px" }} />
        
        {/* Add your content here */}
        <h1 style={{ 
          fontFamily: '"Instrument Serif", serif', 
          fontSize: "36px", 
          lineHeight: 1.2,
          margin: 0,
          color: "var(--color-text-primary)",
        }}>
          <ScrambleText text="Driving TikTok.com growth through continuous product iteration and data-driven insights." duration={800} delay={500} />
        </h1>
        
        <Grid.Container gap={2} style={{ margin: 0 }}>
          <Grid xs={12} direction="column" style={{ padding: 0 }}>
            <Text span style={{ fontSize: "12px", textTransform: "uppercase", color: "#A0A0A0", lineHeight: 1.3 }}>
              Role
            </Text>
            <Text span style={{ fontSize: "14px", color: "var(--color-text-primary)", lineHeight: 1.3, whiteSpace: "pre-wrap" }}>
              Sole Product designer{"\n"}Design Engineer
            </Text>
          </Grid>

          <Grid xs={12} direction="column" style={{ padding: 0 }}>
            <Text span style={{ fontSize: "12px", textTransform: "uppercase", color: "#A0A0A0", lineHeight: 1.3 }}>
              Credits
            </Text>
            <Text span style={{ fontSize: "14px", color: "var(--color-text-primary)", lineHeight: 1.3, whiteSpace: "pre-wrap" }}>
              Huiqiao Z. /Design manger{"\n"}Yiming M. Jason L. /PM
            </Text>
          </Grid>

          <Grid xs={24} direction="column" style={{ marginTop: "20px", padding: 0 }}>
            <Text span style={{ fontSize: "12px", textTransform: "uppercase", color: "#A0A0A0", lineHeight: 1.3 }}>
              Time
            </Text>
            <Text span style={{ fontSize: "14px", color: "var(--color-text-primary)", lineHeight: 1.3, whiteSpace: "pre-wrap" }}>
              2025 Q2 - Present
            </Text>
          </Grid>
        </Grid.Container>

        {/* Image Comparison Section */}
        <div style={{ width: "100%" }}>
          <ImageComparison 
            beforeImage="https://f004.backblazeb2.com/file/xiangyi-assets/Before.jpg"
            afterImage="https://f004.backblazeb2.com/file/xiangyi-assets/After.jpg"
          />
        </div>

        {/* Text Section After Image Comparison */}
        <TwoCol id="section-context" subtitle="There and here" title="Blurring the boundaries">
<Text span style={{ fontSize: "14px", color: "var(--color-text-primary)", lineHeight: 1.3, whiteSpace: "pre-wrap" }}>
              Before I joined, the lean team prioritized rapid shipping over scalability, leaving a legacy of fragmented design assets, a visible quality gap relative to TikTok’s global brand, and UX flaws that undermined conversion.{"\n\n"}Upon joining, I took full end-to-end ownership—bridging PM, Design, and Engineering—to formalize design standards and technical rules, successfully closing the quality gap and elevating the product to premium brand standards."
            </Text>
</TwoCol>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px",
          width: "100%"
        }}>
          <ImgCard src="https://f004.backblazeb2.com/file/xiangyi-assets/PM.jpg" alt="PM" badge="PM" badgeColor="#7C3AED" />
          <ImgCard src="https://f004.backblazeb2.com/file/xiangyi-assets/Design.jpg" alt="Design" badge="Design" badgeColor="#2563EB" />
          <ImgCard src="https://f004.backblazeb2.com/file/xiangyi-assets/Enginner.jpg" alt="Engineer" badge="Engineer" badgeColor="#000000" />
        </div>

        <SectionDivider dotHeight={4} />

        {/* The trick */}
        <SectionHeader id="section-growth" subtitle="The trick" title="How TikTok.com Drives Growth from a Design Perspective" />

        <style>{`
          .tiktokweb-table table {
            border-collapse: collapse;
            width: 100%;
            background-color: transparent;
          }
          .tiktokweb-table thead th {
            font-weight: 600;
            color: var(--color-text-primary);
            text-align: left;
          }
          .tiktokweb-table th,
          .tiktokweb-table td {
            vertical-align: top;
            padding: 12px;
            border-bottom: 1px solid var(--color-border-default);
            font-size: 14px;
            color: var(--color-text-secondary);
          }
          .tiktokweb-table tbody td:first-child {
            font-weight: 600;
            color: var(--color-text-primary);
          }
          .tiktokweb-table tr:last-child td {
            border-bottom: none;
          }
          @keyframes ticker-scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-50% - 6px));
            }
          }
        `}</style>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
          <div style={{ position: "relative", width: "100%" }}>
            <div style={{
              position: "relative",
              boxSizing: "border-box",
              border: "1px solid var(--color-border-default)",
              borderRadius: "12px",
              padding: "20px",
              backgroundColor: "var(--color-bg-page)",
              overflow: "hidden"
            }}>
              <div style={{ overflowX: "auto", width: "100%", margin: "-20px", padding: "20px" }}>
                <div style={{ minWidth: "1200px" }} className="tiktokweb-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>Design Systems &amp; Foundational Experience</th>
                        <th>Core Web Framework Iterations</th>
                        <th>Web Innovative Features</th>
                        <th>Performance &amp; Recommendations</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((row, index) => (
                        <tr key={index}>
                          <td>{row.category}</td>
                          <td>{Array.isArray(row.col1) ? renderList(row.col1) : row.col1}</td>
                          <td>{Array.isArray(row.col2) ? renderList(row.col2) : row.col2}</td>
                          <td>{Array.isArray(row.col3) ? renderList(row.col3) : row.col3}</td>
                          <td>{Array.isArray(row.col4) ? renderList(row.col4) : row.col4}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "100px",
                  height: "100%",
                  pointerEvents: "none",
                  background: "linear-gradient(90deg, rgba(0,0,0,0) 0%, var(--color-bg-page) 100%)",
                }}
              />
            </div>
          </div>

          <div style={{ width: "100%" }}>
            <Text span style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6 }}>
              *Core data: DAU + Life Time (LT) + Playtime
            </Text>
          </div>
        </div>

        {/* New Text Section (Copied Layout) */}
        <TwoCol subtitle="The three tricks" title="Fundations & Innovations">
<Text span style={{ fontSize: "14px", color: "var(--color-text-primary)", lineHeight: 1.3, whiteSpace: "pre-wrap" }}>
              Our strategy focuses on <strong>fortifying the design system</strong> for seamless scalability, <strong>optimizing the Web framework</strong> for high-certainty growth, and <strong>pioneering Web-native innovations</strong> to unlock unique, high-value user experiences.
              <br /> <br />To demonstrate how this strategy translates into production-level implementation, I will walk through several key initiatives below.
            </Text>
</TwoCol>

        {/* Divider */}
        <SectionDivider id="section-bug-fixing" />

         <SectionHeader  subtitle="The foundations" title="Our Moat: System Robustness & Component Excellence" />

        <div style={{ width: "100%" }}>
          <img
            src="https://f004.backblazeb2.com/file/xiangyi-assets/web+bug.jpg"
            alt="Moat: Bug fixing & Components"
            style={{ width: "100%", height: "auto", display: "block", borderRadius: "12px" }}
          />
        </div>

        <TwoCol gap="20px" title="Bug Dashboard">
<Text span style={{ fontSize: "14px", color: "var(--color-text-primary)", lineHeight: 1.3, whiteSpace: "pre-wrap" }}>
             For a <strong>lean Web team</strong>, new features drive growth, often leaving foundational polish as a "nice-to-have" afterthought. We are bridging this gap by <strong>stealthily turning UX debt into a competitive moat</strong>. Through systematic <strong>design audits</strong> and <strong>bug dashboards</strong>, we make invisible friction visible and non-negotiable. 
              </Text>
</TwoCol>

        <TwoCol gap="20px" title="Some key results">
<Text span style={{ fontSize: "14px", color: "var(--color-text-primary)", lineHeight: 1.6, whiteSpace: "pre-wrap", display: "block", marginBottom: "8px" }}>
              Since the launch of our Bug Dashboard, systematic design audits have directly driven growth across our core FYP and Preview metrics: PlayTime/Play: <mark style={{ backgroundColor: "rgba(34, 197, 94, 0.3)", color: "var(--color-text-primary)", padding: "0 4px", borderRadius: "4px", fontWeight: "600" }}><LockedData text="+0.1325%" isUnlocked={isUnlocked} onClick={() => setShowPinOverlay(true)} /></mark>, Finish/Play: <mark style={{ backgroundColor: "rgba(34, 197, 94, 0.3)", color: "var(--color-text-primary)", padding: "0 4px", borderRadius: "4px", fontWeight: "600" }}><LockedData text="+0.1853%" isUnlocked={isUnlocked} onClick={() => setShowPinOverlay(true)} /></mark>, Play/I: <mark style={{ backgroundColor: "rgba(34, 197, 94, 0.3)", color: "var(--color-text-primary)", padding: "0 4px", borderRadius: "4px", fontWeight: "600" }}><LockedData text="+0.0198%" isUnlocked={isUnlocked} onClick={() => setShowPinOverlay(true)} /></mark>, Preview VV/U: <mark style={{ backgroundColor: "rgba(34, 197, 94, 0.3)", color: "var(--color-text-primary)", padding: "0 4px", borderRadius: "4px", fontWeight: "600" }}><LockedData text="+0.2441%" isUnlocked={isUnlocked} onClick={() => setShowPinOverlay(true)} /></mark>.
            </Text>
</TwoCol>

         <div style={{ width: "100%" }}>
          <img
            src="https://f004.backblazeb2.com/file/xiangyi-assets/%E3%80%90TikTok-Design-UG%E3%80%91-%E9%A1%B9%E6%80%BF+%E6%99%8B%E5%8D%87%E7%AD%94%E8%BE%A9%E6%9D%90%E6%96%99-Cover-1.jpg"
            alt="Cover"
            style={{ width: "100%", height: "auto", display: "block", borderRadius: "12px" }}
          />
        </div>

        <TwoCol gap="20px" title="Web Guidelines">
<Text span style={{ fontSize: "14px", color: "var(--color-text-primary)", lineHeight: 1.3, whiteSpace: "pre-wrap" }}>
             Establish <strong>high-level design standards</strong> to align the entire team on core objectives and <strong>minimize communication overhead</strong>.
          </Text>
</TwoCol>

        {/* Two Columns Images with Description */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              width: "100%"
            }}>
              <img
                src="https://f004.backblazeb2.com/file/xiangyi-assets/max-width+do+not.jpg"
                alt="Max width do not"
                style={{ width: "100%", height: "auto", display: "block", borderRadius: "12px" }}
              />
              <img
                src="https://f004.backblazeb2.com/file/xiangyi-assets/max-width+do.jpg"
                alt="Max width do"
                style={{ width: "100%", height: "auto", display: "block", borderRadius: "12px" }}
              />
            </div>
            <Text span style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, padding: "0 12px" }}>
              <strong>*Compact Content:</strong> Focus on responsive design with precise grids and max-width constraints to ensure rich detail on large screens while streamlining secondary content for an immersive video experience.
            </Text>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              width: "100%"
            }}>
              <img
                src="https://f004.backblazeb2.com/file/xiangyi-assets/%E3%80%90TikTok-Design-UG%E3%80%91-%E9%A1%B9%E6%80%BF+%E6%99%8B%E5%8D%87%E7%AD%94%E8%BE%A9%E6%9D%90%E6%96%99-ezgif-3-0727c27ddf.gif"
                alt="Max width do not"
                style={{ width: "100%", height: "auto", display: "block", borderRadius: "12px" }}
              />
              <img
                src="https://f004.backblazeb2.com/file/xiangyi-assets/%E3%80%90TikTok-Design-UG%E3%80%91-%E9%A1%B9%E6%80%BF+%E6%99%8B%E5%8D%87%E7%AD%94%E8%BE%A9%E6%9D%90%E6%96%99-ezgif-3-78dccfe6e9.gif"
                alt="Max width do"
                style={{ width: "100%", height: "auto", display: "block", borderRadius: "12px" }}
              />
            </div>
            <Text span style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, padding: "0 12px" }}>
              <strong>Compact Interaction:</strong> Keep interactions within reach by prioritizing flat structures. Perform actions within the current page layer whenever possible, rather than redirecting to secondary pages or opening pop-up windows.
            </Text>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
            <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
          width: "100%"
        }}>
              <img
                src="https://f004.backblazeb2.com/file/xiangyi-assets/%E3%80%90TikTok-Design-UG%E3%80%91-%E9%A1%B9%E6%80%BF+%E6%99%8B%E5%8D%87%E7%AD%94%E8%BE%A9%E6%9D%90%E6%96%99-image-3.png"
                alt="Max width do not"
                style={{ width: "100%", height: "auto", display: "block", borderRadius: "12px" }}
              />
              <img
                src="https://f004.backblazeb2.com/file/xiangyi-assets/%E3%80%90TikTok-Design-UG%E3%80%91-%E9%A1%B9%E6%80%BF+%E6%99%8B%E5%8D%87%E7%AD%94%E8%BE%A9%E6%9D%90%E6%96%99-header+1.jpg"
                alt="Max width do"
                style={{ width: "100%", height: "auto", display: "block", borderRadius: "12px" }}
              />
            </div>
            <Text span style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, padding: "0 12px" }}>
             <strong>Modular Page Construction: </strong> Prioritize adaptive logic for independent components, using fill for fluid containers and fixed width for structural stability. Combine these via a page-level grid to ensure a stable, responsive interface.
            </Text>
          </div>
        </div>

        {/* 6 Images Ticker */}
        <ImageTicker images={[
          "https://f004.backblazeb2.com/file/xiangyi-assets/Chips.jpg",
          "https://f004.backblazeb2.com/file/xiangyi-assets/video+player.jpg",
          "https://f004.backblazeb2.com/file/xiangyi-assets/Comment.jpg",
          "https://f004.backblazeb2.com/file/xiangyi-assets/Side+nav.jpg",
          "https://f004.backblazeb2.com/file/xiangyi-assets/In-app+push.jpg",
          "https://f004.backblazeb2.com/file/xiangyi-assets/Toolbar.jpg"
        ]} />

         <TwoCol gap="20px" title="Component Libraries">
<Text span style={{ fontSize: "14px", color: "var(--color-text-primary)", lineHeight: 1.3, whiteSpace: "pre-wrap" }}>
             Tailored individual components based on specific business needs rather than a "one-size-fits-all" library, resulting in a more <strong>unified UI</strong>.
          </Text>
</TwoCol>

        {/* Bottom Container for Video, Table, and Slide Show */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px", width: "100%", marginTop: "12px" }}>
          {/* Video Section */}
          <div style={{ width: "100%" }}>
            <AutoVideo src="https://f004.backblazeb2.com/file/xiangyi-assets/Scene-1+(4).mp4" />
          </div>

          {/* Breakpoints Table Section */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
            <div style={{
              position: "relative",
              boxSizing: "border-box",
              border: "1px solid var(--color-border-default)",
              borderRadius: "12px",
              backgroundColor: "var(--color-bg-page)",
              overflow: "hidden"
            }}>
              <div style={{ overflowX: "auto", width: "100%" }}>
                <div style={{ minWidth: "600px", padding: "20px" }} className="tiktokweb-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Breakpoints</th>
                        <th>Padding left/right</th>
                        <th>Gap</th>
                        <th>Column</th>
                        <th>Padding Top</th>
                      </tr>
                    </thead>
                    <tbody>
                      {breakpointsData.map((row, index) => (
                        <tr key={index}>
                          <td>{row.breakpoint}</td>
                          <td>{row.padding}</td>
                          <td>{row.gap}</td>
                          <td>{row.column}</td>
                          <td>{row.paddingTop}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "100px",
                  height: "100%",
                  pointerEvents: "none",
                  background: "linear-gradient(90deg, rgba(0,0,0,0) 0%, var(--color-bg-page) 100%)",
                }}
              />
            </div>
          </div>

          {/* Slide Show Section */}
          <div style={{ width: "100%" }}>
            <div style={{
              position: "relative",
              width: "100%",
              aspectRatio: "3 / 2", // Fixed aspect ratio to prevent height jumping
            }}>
              {slideImages.map((src, index) => (
                <div
                  key={src}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: currentSlide === index ? 1 : 0,
                    transition: "opacity 0.5s ease-in-out",
                    pointerEvents: currentSlide === index ? "auto" : "none"
                  }}
                >
                  <div style={{
                    position: "relative",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    display: "inline-flex",
                    borderRadius: "12px",
                    overflow: "hidden"
                  }}>
                    <img
                      src={src}
                      alt={`Slide ${index + 1}`}
                      style={{
                        display: "block",
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain"
                      }}
                    />
                  </div>
                </div>
              ))}

              {/* Slide Indicators */}
              <div style={{
                position: "absolute",
                bottom: "16px",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: "8px",
                zIndex: 10
              }}>
                {slideImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      backgroundColor: currentSlide === index ? "var(--color-text-primary)" : "var(--color-border-default)",
                      transition: "background-color 0.3s ease",
                    }}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          
        </div>

        <TwoCol gap="20px" title="Breakpoint & Grids">
<PText>
As a core pillar of Web architecture, our grid system is informed by <strong>TikTok.com’s screen resolution distribution</strong>. By analyzing user traffic across different dimensions, we’ve identified the most <strong>critical breakpoints</strong> to ensure an <strong>optimized experience</strong> for our primary audience.
</PText>
</TwoCol>

        {/* Grid Comparison Section */}
          <div style={{ width: "100%" }}>
            <ImageComparison
              beforeImage="https://f004.backblazeb2.com/file/xiangyi-assets/Beforegrid.jpg"
              afterImage="https://f004.backblazeb2.com/file/xiangyi-assets/Aftergrid.jpg"
            />
          </div>

         <TwoCol gap="20px" title="Some key results">
<Text span style={{ fontSize: "14px", color: "var(--color-text-primary)", lineHeight: 1.6, whiteSpace: "pre-wrap", display: "block", marginBottom: "8px" }}>
              Within the <strong>Explore and Profile pages</strong>, VV per User increased by <mark style={{ backgroundColor: "rgba(34, 197, 94, 0.3)", color: "var(--color-text-primary)", padding: "0 4px", borderRadius: "4px", fontWeight: "600" }}><LockedData text="+0.2069%" isUnlocked={isUnlocked} onClick={() => setShowPinOverlay(true)} /></mark>, while Play Time per User grew by <mark style={{ backgroundColor: "rgba(34, 197, 94, 0.3)", color: "var(--color-text-primary)", padding: "0 4px", borderRadius: "4px", fontWeight: "600" }}><LockedData text="+0.0038%" isUnlocked={isUnlocked} onClick={() => setShowPinOverlay(true)} /></mark>.
            </Text>
            
            <Text span style={{ fontSize: "14px", color: "var(--color-text-primary)", lineHeight: 1.6, whiteSpace: "pre-wrap", display: "block" }}>
              <strong>Search Results Performance</strong> Last 1-day Active Days: <mark style={{ backgroundColor: "rgba(34, 197, 94, 0.3)", color: "var(--color-text-primary)", padding: "0 4px", borderRadius: "4px", fontWeight: "600" }}><LockedData text="+0.1479%" isUnlocked={isUnlocked} onClick={() => setShowPinOverlay(true)} /></mark>
              Last 1-day Active Days (Non-logged in): <mark style={{ backgroundColor: "rgba(34, 197, 94, 0.3)", color: "var(--color-text-primary)", padding: "0 4px", borderRadius: "4px", fontWeight: "600" }}><LockedData text="+0.2605%" isUnlocked={isUnlocked} onClick={() => setShowPinOverlay(true)} /></mark>
              PlayDays/Days: <mark style={{ backgroundColor: "rgba(34, 197, 94, 0.3)", color: "var(--color-text-primary)", padding: "0 4px", borderRadius: "4px", fontWeight: "600" }}><LockedData text="+0.0187%" isUnlocked={isUnlocked} onClick={() => setShowPinOverlay(true)} /></mark>
              Play Rate (New Users v1): <mark style={{ backgroundColor: "rgba(34, 197, 94, 0.3)", color: "var(--color-text-primary)", padding: "0 4px", borderRadius: "4px", fontWeight: "600" }}><LockedData text="+0.0679%" isUnlocked={isUnlocked} onClick={() => setShowPinOverlay(true)} /></mark>
            </Text>
</TwoCol>

        {/* Additional Image */}
          <div style={{ width: "100%" }}>
            <img
              src="https://f004.backblazeb2.com/file/xiangyi-assets/web+fyp+grid.jpg"
              alt="Web FYP Grid"
              style={{ width: "100%", height: "auto", display: "block", borderRadius: "12px" }}
            />
          </div>


        <TwoCol title="FYP Responsiveness">
<PText>
To put it simply, the adaptivity of the FYP (For You Page) relies on <strong>dynamic padding</strong>. By adjusting the whitespace, we ensure the video content remains <strong>centered</strong> and maintains its visual focus regardless of the viewport size.
</PText>
</TwoCol>

        {/* Divider */}
        <SectionDivider id="section-foundations" />

        {/* Core Iterations */}
        <SectionHeader id="section-core" subtitle="A No-Brainer" title="Core Iterations, Steady Growth." />

        {/* Core Iterations Video Toggle Section */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>
          {/* Badge Controllers */}
          <div style={{ display: "flex", gap: "12px" }}>
            <div 
              onClick={() => setActiveCoreVideo("sidenav")}
              style={{ cursor: "pointer", transition: "opacity 0.2s ease" }}
            >
              <Badge 
                style={{ 
                  backgroundColor: activeCoreVideo === "sidenav" ? "var(--badge-bg-active)" : "transparent", 
                  color: activeCoreVideo === "sidenav" ? "var(--badge-text-active)" : "var(--color-text-primary)",
                  border: activeCoreVideo === "sidenav" ? "1px solid var(--badge-border-active)" : "1px solid var(--color-border-default)",
                  padding: "6px 12px",
                  fontSize: "14px",
                  borderRadius: "9999px"
                }}
              >
                Side nav redesign
              </Badge>
            </div>
            <div 
              onClick={() => setActiveCoreVideo("suggest")}
              style={{ cursor: "pointer", transition: "opacity 0.2s ease" }}
            >
              <Badge 
                style={{ 
                  backgroundColor: activeCoreVideo === "suggest" ? "var(--badge-bg-active)" : "transparent", 
                  color: activeCoreVideo === "suggest" ? "var(--badge-text-active)" : "var(--color-text-primary)",
                  border: activeCoreVideo === "suggest" ? "1px solid var(--badge-border-active)" : "1px solid var(--color-border-default)",
                  padding: "6px 12px",
                  fontSize: "14px",
                  borderRadius: "9999px"
                }}
              >
                Suggest account
              </Badge>
            </div>
          </div>

          {/* Video Container */}
          <div style={{ width: "100%", position: "relative", borderRadius: "12px", overflow: "hidden", backgroundColor: "var(--color-bg-secondary)", aspectRatio: "16 / 9" }}>
            <AutoVideo
              src="https://f004.backblazeb2.com/file/xiangyi-assets/20260401-180210+(1).mp4"
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "contain", display: activeCoreVideo === "sidenav" ? "block" : "none" }}
            />
            <AutoVideo
              src="https://f004.backblazeb2.com/file/xiangyi-assets/Lark20260401-181435.mp4"
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "contain", display: activeCoreVideo === "suggest" ? "block" : "none" }}
            />
          </div>
        </div>

        <TwoCol title="Boosting Distribution Efficiency">
{activeCoreVideo === "sidenav" ? (
              <Text span style={{ fontSize: "14px", color: "var(--color-text-primary)", lineHeight: 1.6, whiteSpace: "pre-wrap", display: "block", minHeight: "60px" }}>
                As a core pillar of our Web architecture, we are proposing a <strong>long-term design blueprint</strong> to streamline the current UI complexity of the <strong>Side Nav</strong>. This vision introduces <strong>distinct partitioning</strong> for <strong>Discovery (Consumption)</strong>, <strong>Functional</strong>, and <strong>Sub-menu zones</strong>, while implementing a new <strong>Right-side Functional Drawer</strong> that is <strong>synchronized with the Top Navigation</strong> to create a unified system synergy.
              </Text>
            ) : (
              <Text span style={{ fontSize: "14px", color: "var(--color-text-primary)", lineHeight: 1.6, whiteSpace: "pre-wrap", display: "block", minHeight: "60px" }}>
                By introducing <strong>Related Recommendations</strong>, we are creating more <strong>entry points</strong> to <strong>Personal Profiles</strong>, enabling users to discover and engage with a broader community.
              </Text>
            )}
</TwoCol>

        {/* Two Side-by-Side Videos */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", width: "100%" }}>
          <AutoVideo src="https://f004.backblazeb2.com/file/xiangyi-assets/Lark20260401-193101.mp4" />
          <AutoVideo src="https://f004.backblazeb2.com/file/xiangyi-assets/Lark20260401-193106.mp4" />
        </div>

       <TwoCol gap="20px" title="TikTok Stroy">
<PText>
<strong>Web-Adaptive Video Experience:</strong> To optimize <strong>feed real estate</strong> on larger screens, I architected a <strong>specialized Sky-window (Picture-in-Picture)</strong> entry. By implementing a <strong>minimalist pill component</strong> with <strong>hover-to-expand</strong> interactions, I successfully balanced <strong>content discoverability</strong> with a clean, unobtrusive user interface.
</PText>
</TwoCol>

       
        
        {/* To be continued */}
        <div style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "40px", // space between text and divider
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "20px",
          paddingBottom: "20px"
        }}>
          <Text span style={{
            fontFamily: '"Instrument Serif", serif',
            fontSize: "20px",
            color: "var(--color-text-secondary)", // Slightly darker color
            fontStyle: "italic",
            opacity: 0.8 // Increased opacity
          }}>
            To be continued...
          </Text>
          
          

          
        </div>

        {/* Final Divider */}
          <SectionDivider />

        {/* The trick */}
        <SectionHeader id="section-innovations" subtitle="The hand one" title="Unique and Key Innovations" />
        {/* Emoji Image Comparison */}
        <div style={{ width: "100%" }}>
          <ImageComparison
            beforeImage="https://f004.backblazeb2.com/file/xiangyi-assets/Beforeemoji.jpg"
            afterImage="https://f004.backblazeb2.com/file/xiangyi-assets/Afteremoji.jpg"
          />
        </div>

        <TwoCol gap="20px" title="Incentive NUJ">
<PText>
By integrating <strong>Emoji-based categorization</strong>, we’ve transformed the interest selection process into a more <strong>scannable, low-friction experience</strong>. This reduces <strong>cognitive load</strong>, effectively discouraging users from skipping and ensuring more <strong>comprehensive user profiling</strong> for our data models.
</PText>
</TwoCol>

        {/* Feature Tabs (Follow, Explore, etc.) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%", marginTop: "24px" }}>
          {/* Badge Controllers */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {[
              { id: "like", label: "Like", img: "https://f004.backblazeb2.com/file/xiangyi-assets/Like.png" },
              { id: "comment", label: "Comment", img: "https://f004.backblazeb2.com/file/xiangyi-assets/Comment.png" },
              { id: "bookmark", label: "Bookmark", img: "https://f004.backblazeb2.com/file/xiangyi-assets/Bookmark.png" },
              { id: "follow", label: "Follow", img: "https://f004.backblazeb2.com/file/xiangyi-assets/Follow.png" },
              { id: "explore", label: "Explore page", img: "https://f004.backblazeb2.com/file/xiangyi-assets/Explore+page.png" },
              { id: "live", label: "LIVE", img: "https://f004.backblazeb2.com/file/xiangyi-assets/LIVE.png" }
            ].map((tab) => (
              <div 
                key={tab.id}
                onClick={() => setActiveFeatureTab(tab.id)}
                style={{ cursor: "pointer", transition: "opacity 0.2s ease" }}
              >
                <Badge 
                  style={{ 
                    backgroundColor: activeFeatureTab === tab.id ? "var(--badge-bg-active)" : "transparent", 
                    color: activeFeatureTab === tab.id ? "var(--badge-text-active)" : "var(--color-text-primary)",
                    border: activeFeatureTab === tab.id ? "1px solid var(--badge-border-active)" : "1px solid var(--color-border-default)",
                    padding: "6px 12px",
                    fontSize: "14px",
                    borderRadius: "9999px"
                  }}
                >
                  {tab.label}
                </Badge>
              </div>
            ))}
          </div>

          {/* Image Display */}
          <div style={{ width: "100%", borderRadius: "12px", overflow: "hidden", backgroundColor: "var(--color-bg-secondary)" }}>
            <img
              src={
                activeFeatureTab === "like" ? "https://f004.backblazeb2.com/file/xiangyi-assets/Like.png" :
                activeFeatureTab === "comment" ? "https://f004.backblazeb2.com/file/xiangyi-assets/Comment.png" :
                activeFeatureTab === "bookmark" ? "https://f004.backblazeb2.com/file/xiangyi-assets/Bookmark.png" :
                activeFeatureTab === "follow" ? "https://f004.backblazeb2.com/file/xiangyi-assets/Follow.png" :
                activeFeatureTab === "explore" ? "https://f004.backblazeb2.com/file/xiangyi-assets/Explore+page.png" :
                "https://f004.backblazeb2.com/file/xiangyi-assets/LIVE.png"
              }
              alt={`${activeFeatureTab} interface`}
              style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }}
            />
          </div>
        </div>



       

           <TwoCol gap="20px" title="Growth Hacking">
<PText>
Since our Web platform allows <strong>unauthenticated consumption</strong>, converting passive viewers into <strong>logged-in users</strong> is a top priority. We’ve strategically integrated <strong>high-engagement visual cues</strong> and <strong>micro-animations</strong> across key <strong>user touchpoints</strong> to incentivize account creation and sign-ins.
</PText>
</TwoCol>

 {/* To be continued */}
        <div style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "40px", // space between text and divider
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "20px",
          paddingBottom: "20px"
        }}>
          <Text span style={{
            fontFamily: '"Instrument Serif", serif',
            fontSize: "20px",
            color: "var(--color-text-secondary)", // Slightly darker color
            fontStyle: "italic",
            opacity: 0.8 // Increased opacity
          }}>
            To be continued...
          </Text>
          
          

          
        </div>

        
       {/* Scene 11 Video */}
        <div style={{ width: "100%", marginTop: "24px", marginBottom: "24px" }}>
          <AutoVideo src="https://f004.backblazeb2.com/file/xiangyi-assets/Scene-11.mp4" />
        </div>

         <TwoCol gap="20px" title="Frictionless Messaging">
<PText>
Current DM is a <strong>standalone page</strong> that interrupts the <strong>consumption flow</strong>, leading to a <strong><LockedData text="12.1%" isUnlocked={isUnlocked} onClick={() => setShowPinOverlay(true)} /> DAU drop-off</strong>. We are transitioning from <strong>Jump-to-Interact</strong> to <strong>In-feed Messaging</strong> to minimize churn and ensure social interaction <strong>complements</strong> the video experience.
</PText>
</TwoCol>
        
         {/* Divider */}
        <SectionDivider id="section-bug-fixing" />



        {/* The trick */}
        <SectionHeader id="section-design-engineering" subtitle="The new method" title="Design Engineering" />

        {/* Emoji Image Comparison */}
        <div style={{ width: "100%" }}>
          <ImageComparison
            beforeImage="https://f004.backblazeb2.com/file/xiangyi-assets/beforecomment.jpg"
            afterImage="https://f004.backblazeb2.com/file/xiangyi-assets/Aftercomment.jpg"
          />
        </div>

         <TwoCol gap="20px" title="Optimizing the Comment Panel Hierarchy">
         <PText>
         The comment panel was restructured to better align <strong>visual weight</strong> with user engagement. To reduce cognitive noise, we decreased the <strong>visual footprint</strong> of low-CTR secondary actions like avatars and usernames. Conversely, we increased the contrast of the high-engagement "Reply" action to improve <strong>discoverability</strong>. Finally, we optimized the "Like" button's layout to prevent it from consuming excessive horizontal space and <strong>truncating the comment text</strong>, ultimately prioritizing <strong>reading comfort</strong> and core content.
         </PText>
         </TwoCol>

      

        {/* Emoji Image Comparison */}
        <div style={{ width: "100%" }}>
          <ImageComparison
            beforeImage="https://f004.backblazeb2.com/file/xiangyi-assets/beforeheader.jpg"
            afterImage="https://f004.backblazeb2.com/file/xiangyi-assets/afterheader.jpg"
          />
        </div>

{/* To be continued */}
        <div style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "40px", // space between text and divider
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "20px",
          paddingBottom: "20px"
        }}>
          <Text span style={{
            fontFamily: '"Instrument Serif", serif',
            fontSize: "20px",
            color: "var(--color-text-secondary)", // Slightly darker color
            fontStyle: "italic",
            opacity: 0.8 // Increased opacity
          }}>
            To be continued...
          </Text>
          
          

          
        </div>

        

      </div>
      {showPinOverlay && (
        <PinOverlay 
          onClose={() => setShowPinOverlay(false)} 
          onSuccess={() => {
            setIsUnlocked(true);
            setShowPinOverlay(false);
          }} 
        />
      )}
    </>
  );
};

export default TiktokWebContent;
