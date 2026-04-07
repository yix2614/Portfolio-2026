import React, { useState, useEffect, useRef } from "react";
import { Text, Badge, Grid } from "@geist-ui/core";
import Lenis from "@studio-freight/lenis";
import ImageComparison from "../tiktokweb/ImageComparison";

// --- Text Scramble Effect Component ---
const ScrambleText = ({
  text,
  duration = 800,
  delay = 0,
  style,
}: {
  text: string;
  duration?: number;
  delay?: number;
  style?: React.CSSProperties;
}) => {
  const [displayText, setDisplayText] = useState("");
  // Reverted to a half-width character set to match English text widths perfectly
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";

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
      <span style={{ opacity: 0, pointerEvents: "none", userSelect: "none" }}>
        {text}
      </span>
      {/* Absolute positioned animated text */}
      <span
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {displayText}
      </span>
    </span>
  );
};

// --- Reusable Components ---

const ImageTicker = ({ images }: { images: string[] }) => (
  <div
    style={{
      width: "100%",
      overflow: "hidden",
      position: "relative",
      display: "flex",
      maskImage:
        "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      WebkitMaskImage:
        "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
    }}
  >
    <div
      style={{
        display: "flex",
        gap: "12px",
        animation: "ticker-scroll 20s linear infinite",
        width: "max-content",
      }}
    >
      {[...images, ...images].map((src, i) => (
        <img
          key={i}
          src={src}
          alt="Ticker item"
          style={{
            width: "320px",
            height: "auto",
            display: "block",
            borderRadius: "12px",
            objectFit: "cover",
          }}
        />
      ))}
    </div>
  </div>
);

const AutoVideo = ({
  src,
  style,
}: {
  src: string;
  style?: React.CSSProperties;
}) => (
  <video
    src={src}
    autoPlay
    loop
    muted
    playsInline
    style={{
      width: "100%",
      height: "auto",
      display: "block",
      borderRadius: "12px",
      backgroundColor: "var(--color-bg-secondary)",
      ...style,
    }}
  />
);

const SectionDivider = ({
  id,
  dotSize = 4,
  dotHeight,
  lineThickness = 0.5,
}: {
  id?: string;
  dotSize?: number;
  dotHeight?: number;
  lineThickness?: number;
}) => (
  <div
    id={id}
    style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%" }}
  >
    <div
      style={{
        flex: 1,
        height: `${lineThickness}px`,
        backgroundColor: "var(--color-border-default)",
      }}
    />
    <div
      style={{
        width: `${dotSize}px`,
        height: `${dotHeight || dotSize}px`,
        borderRadius: "9999px",
        backgroundColor: "var(--color-border-default)",
      }}
    />
    <div
      style={{
        flex: 1,
        height: `${lineThickness}px`,
        backgroundColor: "var(--color-border-default)",
      }}
    />
  </div>
);

const SectionHeader = ({
  id,
  subtitle,
  title,
  titleWeight,
}: {
  id?: string;
  subtitle: string;
  title: string;
  titleWeight?: number;
}) => (
  <div id={id} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
    <Text
      span
      style={{
        fontSize: "12px",
        textTransform: "none",
        color: "var(--color-text-muted)",
        lineHeight: 1.3,
      }}
    >
      {subtitle}
    </Text>
    <Text
      h2
      style={{
        fontFamily: '"Instrument Serif", serif',
        fontSize: "28px",
        lineHeight: 1.1,
        margin: 0,
        color: "var(--color-text-primary)",
        fontWeight: titleWeight,
      }}
    >
      {title}
    </Text>
  </div>
);

const TwoCol = ({
  id,
  gap = "12px",
  title,
  subtitle,
  children,
}: {
  id?: string;
  gap?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div
    id={id}
    className="mobile-stack"
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 2fr",
      gap,
      width: "100%",
      alignItems: "start",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        width: "100%",
      }}
    >
      {subtitle && (
        <Text
          span
          style={{
            fontSize: "12px",
            color: "var(--color-text-muted)",
            lineHeight: 1.3,
          }}
        >
          {subtitle}
        </Text>
      )}
      <Text
        span
        style={{
          fontFamily: '"Instrument Serif", serif',
          fontSize: "22px",
          color: "var(--color-text-primary)",
          lineHeight: 1.1,
        }}
      >
        {title}
      </Text>
    </div>
    <div style={{ flex: 1 }}>{children}</div>
  </div>
);

const PText = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => (
  <Text
    span
    style={{
      fontSize: "14px",
      color: "var(--color-text-primary)",
      lineHeight: 1.6,
      whiteSpace: "pre-wrap",
      ...style,
    }}
  >
    {children}
  </Text>
);

const ImgCard = ({
  src,
  alt,
  badge,
  badgeColor,
}: {
  src: string;
  alt: string;
  badge?: string;
  badgeColor?: string;
}) => (
  <div style={{ position: "relative", width: "100%" }}>
    <img
      src={src}
      alt={alt}
      style={{
        width: "100%",
        height: "auto",
        display: "block",
        borderRadius: "12px",
      }}
    />
    {badge && (
      <div
        style={{
          position: "absolute",
          right: 12,
          bottom: 12,
          pointerEvents: "none",
        }}
      >
        <Badge
          style={{
            borderRadius: "9999px",
            backgroundColor: badgeColor,
            color: "#FFFFFF",
            border: "none",
            fontWeight: 500,
            padding: "0 8px",
            height: "24px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {badge}
        </Badge>
      </div>
    )}
  </div>
);

// --- Pin Overlay Component ---
const PinOverlay = ({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) => {
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

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
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
    <div
      style={{
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
        animation: "fadeIn 0.3s ease",
      }}
      onClick={onClose}
    >
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
        <Text
          h3
          style={{
            margin: 0,
            color: "var(--color-text-primary)",
            fontFamily: '"Instrument Serif", serif',
            fontSize: "32px",
          }}
        >
          Unlock Data
        </Text>
        <div style={{ display: "flex", gap: "12px" }}>
          {pin.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
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
                outline: "none",
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
const LockedData = ({
  text,
  isUnlocked,
  onClick,
}: {
  text: string;
  isUnlocked: boolean;
  onClick: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const scrambled = React.useMemo(() => {
    const chars = "!@#$%&*?";
    return text
      .split("")
      .map((c) =>
        /[0-9.]/.test(c) ? chars[Math.floor(Math.random() * chars.length)] : c,
      )
      .join("");
  }, [text]);

  if (isUnlocked) {
    return <>{text}</>;
  }

  return (
    <span
      style={{
        position: "relative",
        cursor: "pointer",
        display: "inline-block",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <span style={{ fontFamily: "monospace" }}>{scrambled}</span>
      {isHovered && (
        <div
          style={{
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
            fontWeight: 500,
          }}
        >
          Click to unlock
        </div>
      )}
    </span>
  );
};

const TiktokSearchContent = () => {
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
      col4: ["Load performance", "Recommendation UX"],
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
    {
      breakpoint: "≥ 1600px",
      padding: "32px",
      gap: "16px",
      column: "12",
      paddingTop: "20px",
    },
    {
      breakpoint: "1599px - 1200px",
      padding: "32px",
      gap: "16px",
      column: "12",
      paddingTop: "20px",
    },
    {
      breakpoint: "1199px - 1024px",
      padding: "20px",
      gap: "16px",
      column: "12",
      paddingTop: "20px",
    },
    {
      breakpoint: "1023px - 840px",
      padding: "20px",
      gap: "16px",
      column: "12",
      paddingTop: "20px",
    },
    {
      breakpoint: "839px - 600px",
      padding: "20px",
      gap: "16px",
      column: "12",
      paddingTop: "20px",
    },
    {
      breakpoint: "< 600px (minimal size)",
      padding: "12px",
      gap: "12px",
      column: "12",
      paddingTop: "12px",
    },
  ];

  const renderList = (items: string[]) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {items.map((item, index) => (
        <div key={`${item}-${index}`}>• {item}</div>
      ))}
    </div>
  );

  const slideImages = [
    "https://f004.backblazeb2.com/file/xiangyi-assets/grid.png",
    "https://f004.backblazeb2.com/file/xiangyi-assets/content.jpeg",
    "https://f004.backblazeb2.com/file/xiangyi-assets/Anatomy+of+a+grid.jpeg",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [hoveredSection, setHoveredSection] = useState("");
  const [activeCoreVideo, setActiveCoreVideo] = useState("challenge1");
  const [activeFeatureTab, setActiveFeatureTab] = useState("like");
  const [activeSolution, setActiveSolution] = useState("solution1");
  const [placeholderFontSize, setPlaceholderFontSize] = useState<number>(16);
  const [placeholderLineHeightPct, setPlaceholderLineHeightPct] = useState<number>(160);
  const [placeholderMaxHeight, setPlaceholderMaxHeight] = useState<number | null>(null);
  const measureRef = useRef<HTMLSpanElement | null>(null);
  const fontSizeRef = useRef<HTMLInputElement | null>(null);
  const lineHeightRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      if (measureRef.current) {
        const h = measureRef.current.offsetHeight;
        setPlaceholderMaxHeight(h);
      }
    }, 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const applyFill = (el: HTMLInputElement | null) => {
      if (!el) return;
      const min = Number(el.min);
      const max = Number(el.max);
      const val = Number(el.value);
      const pct = ((val - min) / (max - min)) * 100;
      el.style.setProperty("--sx", pct + "%");
    };
    applyFill(fontSizeRef.current);
    applyFill(lineHeightRef.current);
  }, [placeholderFontSize, placeholderLineHeightPct]);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPinOverlay, setShowPinOverlay] = useState(false);

  const sections = [
    { id: "section-context", title: "Context" },
    { id: "section-growth", title: "How TikTok.com drive growth" },
    { id: "section-bug-fixing", title: "The Foundation" },
    { id: "section-core", title: "Core Iterations, Steady Growth." },
    { id: "section-innovations", title: "Unique and Key Innovations" },
    { id: "section-design-engineering", title: "Design Engineering" },
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
      orientation: "vertical",
      gestureOrientation: "vertical",
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
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;
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
                duration: 0.8, // Match the new faster global duration
              });
            } else if (target) {
              // Fallback
              const targetPosition =
                target.getBoundingClientRect().top + window.scrollY;
              window.scrollTo({
                top: targetPosition - 100, // Offset for top padding
                behavior: "smooth",
              });
            }
          };

          return (
            <div
              key={section.id}
              style={{ display: "flex", alignItems: "center", gap: "12px" }}
            >
              <a
                href={`#${section.id}`}
                className={`nav-link ${isActive ? "active" : "inactive"}`}
                onClick={handleNavClick}
                onMouseEnter={() => setHoveredSection(section.id)}
                onMouseLeave={() => setHoveredSection("")}
                style={{
                  color:
                    isHovered && !isActive
                      ? "var(--color-text-secondary)"
                      : "var(--color-text-primary)",
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
      <div
        className="animate-minimap"
        style={{
          position: "fixed",
          top: "50%",
          transform: "translateY(-50%)",
          right: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end", // Align to the right
          gap: "4px", // Highly dense gap
          zIndex: 50,
        }}
      >
        {[...Array(totalTicks)].map((_, i) => {
          const isMajor = i % ticksPerMajor === 0;
          const baseWidth = isMajor ? 20 : 10; // Slightly shorter base width for high density
          // Use a very light grey with high transparency so it's subtle
          const color = isMajor
            ? "var(--color-text-muted)"
            : "var(--color-border-default)";

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
            <div
              key={i}
              style={{
                width: `${baseWidth}px`,
                height: "2px",
                backgroundColor: color,
                transformOrigin: "100% 0", // Transform from the right edge
                transform: `scaleX(${scaleX})`,
                transition: "transform 0.1s linear",
                borderRadius: "1px",
              }}
            />
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
          gap: "60px",
        }}
      >
        {/* Context anchor */}
        <div
          id="section-context"
          style={{ position: "relative", top: "-100px" }}
        />

        {/* Add your content here */}
        <h1
          style={{
            fontFamily: '"Instrument Serif", serif',
            fontSize: "36px",
            lineHeight: 1.2,
            margin: 0,
            color: "var(--color-text-primary)",
            fontWeight: 400,
          }}
        >
          <ScrambleText
            text="TikTok Search: Integrating Generative AI into the Web Discovery Ecosystem."
            duration={800}
            delay={500}
          />
        </h1>

        <Grid.Container gap={2} style={{ margin: 0 }}>
          <Grid xs={12} direction="column" style={{ padding: 0 }}>
            <Text
              span
              style={{
                fontSize: "12px",
                textTransform: "uppercase",
                color: "#A0A0A0",
                lineHeight: 1.3,
              }}
            >
              Role
            </Text>
            <Text
              span
              style={{
                fontSize: "14px",
                color: "var(--color-text-primary)",
                lineHeight: 1.3,
                whiteSpace: "pre-wrap",
              }}
            >
              Product designer
            </Text>
          </Grid>

          <Grid xs={12} direction="column" style={{ padding: 0 }}>
            <Text
              span
              style={{
                fontSize: "12px",
                textTransform: "uppercase",
                color: "#A0A0A0",
                lineHeight: 1.3,
              }}
            >
              Credits
            </Text>
            <Text
              span
              style={{
                fontSize: "14px",
                color: "var(--color-text-primary)",
                lineHeight: 1.3,
                whiteSpace: "pre-wrap",
              }}
            >
              Simin T. /PM{"\n"}Chenxiao W. /R&D
            </Text>
          </Grid>

          <Grid
            xs={24}
            direction="column"
            style={{ marginTop: "20px", padding: 0 }}
          >
            <Text
              span
              style={{
                fontSize: "12px",
                textTransform: "uppercase",
                color: "#A0A0A0",
                lineHeight: 1.3,
              }}
            >
              Time
            </Text>
            <Text
              span
              style={{
                fontSize: "14px",
                color: "var(--color-text-primary)",
                lineHeight: 1.3,
                whiteSpace: "pre-wrap",
              }}
            >
              2025 Q4
            </Text>
          </Grid>
        </Grid.Container>

        <div style={{ width: "100%", marginTop: "0px", marginBottom: "0px" }}>
          <AutoVideo src="https://pub-36c8115632e74d30a6c7c587fefccbe4.r2.dev/Scene-8_1_ftmykn.mp4" />
        </div>

        {/* Text Section After Image Comparison */}
        <TwoCol
          id="section-context"
          subtitle="What I did"
          title="Bridging AI Intelligence with Video Discovery"
        >
          <Text
            span
            style={{
              fontSize: "14px",
              color: "var(--color-text-primary)",
              lineHeight: 1.3,
              whiteSpace: "pre-wrap",
            }}
          >
            This project explores the{" "}
            <b>seamless integration of Generative AI</b> within TikTok’s web
            ecosystem. I spearheaded the development of a{" "}
            <b>dynamic layout system</b> tailored for large screens, addressing
            critical pain points such as <b>unpredictable output formats</b> and
            visual hierarchy displacement. From <b>modular typography</b> to{" "}
            <b>adaptive data tables</b>, I built a comprehensive{" "}
            <b>UI library</b>
            that enables an <b>elegant coexistence</b> between deep AI-driven
            answers and TikTok’s signature video feed.
          </Text>
        </TwoCol>

        <SectionDivider dotHeight={4} />

        {/* The trick */}
        <SectionHeader
          id="section01"
          subtitle="The Unique Friction"
          title="Evolving SERP Hierarchy: Adapting AI for the Large Screen"
          titleWeight={400}
        />

        {/* Core Iterations Video Toggle Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            width: "100%",
          }}
        >
          {/* Badge Controllers */}
          <div style={{ display: "flex", gap: "12px" }}>
            <div
              onClick={() => setActiveCoreVideo("challenge1")}
              style={{ cursor: "pointer", transition: "opacity 0.2s ease" }}
            >
              <Badge
                style={{
                  backgroundColor:
                    activeCoreVideo === "challenge1"
                      ? "var(--badge-bg-active)"
                      : "transparent",
                  color:
                    activeCoreVideo === "challenge1"
                      ? "var(--badge-text-active)"
                      : "var(--color-text-primary)",
                  border:
                    activeCoreVideo === "challenge1"
                      ? "1px solid var(--badge-border-active)"
                      : "1px solid var(--color-border-default)",
                  padding: "6px 12px",
                  fontSize: "14px",
                  borderRadius: "9999px",
                }}
              >
                Challenge#1
              </Badge>
            </div>
            <div
              onClick={() => setActiveCoreVideo("challenge2")}
              style={{ cursor: "pointer", transition: "opacity 0.2s ease" }}
            >
              <Badge
                style={{
                  backgroundColor:
                    activeCoreVideo === "challenge2"
                      ? "var(--badge-bg-active)"
                      : "transparent",
                  color:
                    activeCoreVideo === "challenge2"
                      ? "var(--badge-text-active)"
                      : "var(--color-text-primary)",
                  border:
                    activeCoreVideo === "challenge2"
                      ? "1px solid var(--badge-border-active)"
                      : "1px solid var(--color-border-default)",
                  padding: "6px 12px",
                  fontSize: "14px",
                  borderRadius: "9999px",
                }}
              >
                Challenge#2
              </Badge>
            </div>
            <div
              onClick={() => setActiveCoreVideo("challenge3")}
              style={{ cursor: "pointer", transition: "opacity 0.2s ease" }}
            >
              <Badge
                style={{
                  backgroundColor:
                    activeCoreVideo === "challenge3"
                      ? "var(--badge-bg-active)"
                      : "transparent",
                  color:
                    activeCoreVideo === "challenge3"
                      ? "var(--badge-text-active)"
                      : "var(--color-text-primary)",
                  border:
                    activeCoreVideo === "challenge3"
                      ? "1px solid var(--badge-border-active)"
                      : "1px solid var(--color-border-default)",
                  padding: "6px 12px",
                  fontSize: "14px",
                  borderRadius: "9999px",
                }}
              >
                Challenge#3
              </Badge>
            </div>
          </div>

          {/* Image Container (Auto Height) */}
          <div
            style={{
              width: "100%",
              position: "relative",
              borderRadius: "12px",
              overflow: "hidden",
              backgroundColor: "var(--color-bg-secondary)",
            }}
          >
            <img
              src="https://pub-36c8115632e74d30a6c7c587fefccbe4.r2.dev/seachchallenge1.jpg"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                display: activeCoreVideo === "challenge1" ? "block" : "none",
              }}
            />
            <img
              src="https://pub-36c8115632e74d30a6c7c587fefccbe4.r2.dev/seachchallenge3.jpg"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                display: activeCoreVideo === "challenge2" ? "block" : "none",
              }}
            />
            <img
              src="https://pub-36c8115632e74d30a6c7c587fefccbe4.r2.dev/seachchallenge2.jpg"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                display: activeCoreVideo === "challenge3" ? "block" : "none",
              }}
            />
          </div>
        </div>

        <TwoCol
          title={
            activeCoreVideo === "challenge1"
              ? "The Space & Equity Tension"
              : activeCoreVideo === "challenge2"
                ? "Fragmented Reading Flow"
                : "Non-deterministic Content"
          }
        >
          {activeCoreVideo === "challenge1" ? (
            <>
              <Text
                span
                style={{
                  fontSize: "14px",
                  color: "var(--color-text-primary)",
                  lineHeight: 1.6,
                  whiteSpace: "pre-wrap",
                  display: "block",
                  minHeight: "60px",
                }}
              >
                The "infinite canvas" of the web is often a trap. While we have
                more <b>screen real estate</b>, an oversized AI module can
                easily become an <b>information silo</b>, pushing TikTok’s most
                vital asset—the <b>organic video feed</b>—below the fold.
              </Text>{" "}
              <br />
              <Text
                span
                style={{
                  fontSize: "14px",
                  color: "var(--color-text-primary)",
                  lineHeight: 1.6,
                  whiteSpace: "pre-wrap",
                  display: "block",
                  minHeight: "60px",
                }}
              >
                <b>Core Tension:</b> How can we leverage the{" "}
                <b>horizontal width</b> to enhance AI content richness without
                sacrificing the <b>above-the-fold visibility</b> of our core
                discovery engine?
              </Text>
            </>
          ) : activeCoreVideo === "challenge2" ? (
            <Text
              span
              style={{
                fontSize: "14px",
                color: "var(--color-text-primary)",
                lineHeight: 1.6,
                whiteSpace: "pre-wrap",
                display: "block",
                minHeight: "60px",
              }}
            >
              Simply porting the mobile vertical stack—text followed by images
              and a "View More" button—fails on a larger web canvas. When{" "}
              <b>textual descriptions</b> and <b>visual assets</b> are
              physically separated by long distances, the{" "}
              <b>contextual association</b> is lost. Users are forced to
              memorize text while scrolling down to see images, significantly
              increasing <b>cognitive load</b> and breaking the reading flow.
            </Text>
          ) : (
            <Text
              span
              style={{
                fontSize: "14px",
                color: "var(--color-text-primary)",
                lineHeight: 1.6,
                whiteSpace: "pre-wrap",
                display: "block",
                minHeight: "60px",
              }}
            >
              <b>We cannot control AI outputs.</b> When a response lacks visual
              assets, the UI must gracefully handle{" "}
              <b>purely textual content</b>. On a large screen, sticking to the
              standard <b>search results grid</b> is a mistake—it forces text to
              span excessive line lengths or creates overwhelming{" "}
              <b>visual density</b>. Without a dedicated{" "}
              <b>typographic framework</b>, long-form AI answers become a "wall
              of text" that discourages reading and{" "}
              <b>breaks the search experience</b>.
            </Text>
          )}
        </TwoCol>

        {/* Solution Toggle Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            width: "100%",
            marginTop: "32px",
          }}
        >
          {/* Badge Controllers */}
          <div style={{ display: "flex", gap: "12px" }}>
            <div
              onClick={() => setActiveSolution("solution1")}
              style={{ cursor: "pointer", transition: "opacity 0.2s ease" }}
            >
              <Badge
                style={{
                  backgroundColor:
                    activeSolution === "solution1"
                      ? "var(--badge-bg-active)"
                      : "transparent",
                  color:
                    activeSolution === "solution1"
                      ? "var(--badge-text-active)"
                      : "var(--color-text-primary)",
                  border:
                    activeSolution === "solution1"
                      ? "1px solid var(--badge-border-active)"
                      : "1px solid var(--color-border-default)",
                  padding: "6px 12px",
                  fontSize: "14px",
                  borderRadius: "9999px",
                }}
              >
                Solution#1
              </Badge>
            </div>
            <div
              onClick={() => setActiveSolution("solution2")}
              style={{ cursor: "pointer", transition: "opacity 0.2s ease" }}
            >
              <Badge
                style={{
                  backgroundColor:
                    activeSolution === "solution2"
                      ? "var(--badge-bg-active)"
                      : "transparent",
                  color:
                    activeSolution === "solution2"
                      ? "var(--badge-text-active)"
                      : "var(--color-text-primary)",
                  border:
                    activeSolution === "solution2"
                      ? "1px solid var(--badge-border-active)"
                      : "1px solid var(--color-border-default)",
                  padding: "6px 12px",
                  fontSize: "14px",
                  borderRadius: "9999px",
                }}
              >
                Solution#2
              </Badge>
            </div>
          </div>

          {/* Media Container (Auto Height based on content) */}
          <div
            style={{
              width: "100%",
              position: "relative",
              borderRadius: "12px",
              overflow: "hidden",
              backgroundColor: "var(--color-bg-secondary)",
            }}
          >
            <div
              style={{
                width: "100%",
                display: activeSolution === "solution1" ? "block" : "none",
              }}
            >
              <AutoVideo
                src="https://pub-36c8115632e74d30a6c7c587fefccbe4.r2.dev/20260405-175656.mp4"
                style={{ borderRadius: "0px", backgroundColor: "transparent" }}
              />
            </div>
            <div
              style={{
                width: "100%",
                display: activeSolution === "solution2" ? "block" : "none",
              }}
            >
                <AutoVideo
                src="https://pub-36c8115632e74d30a6c7c587fefccbe4.r2.dev/ttsearchso.mp4"
                style={{ borderRadius: "0px", backgroundColor: "transparent" }}
              />
            </div>
          </div>
        </div>

        <TwoCol
          subtitle={
            activeSolution === "solution1"
              ? "Contextual Re-alignment"
              : "Elastic Typographic Framework"
          }
          title={
            activeSolution === "solution1"
              ? "From Linear Stacking to Parallel Association"
              : "Responsive Content Containment"
          }
        >
          {activeSolution === "solution1" ? (
            <Text
              span
              style={{
                fontSize: "14px",
                color: "var(--color-text-primary)",
                lineHeight: 1.6,
                whiteSpace: "pre-wrap",
                display: "block",
                minHeight: "60px",
              }}
            >
              I replaced the mobile-first vertical layout with a <b>dual-column structure</b>. By repositioning images as <b>supplementary thumbnails</b> alongside the text, I eliminated the "scroll-to-visual" gap. This allows users to seamlessly cross-reference <b>textual insights</b> with visual proof at a glance, significantly reducing <b>cognitive switching costs</b> and preserving the reading flow.
            </Text>
          ) : (
            <Text
              span
              style={{
                fontSize: "14px",
                color: "var(--color-text-primary)",
                lineHeight: 1.6,
                whiteSpace: "pre-wrap",
                display: "block",
                minHeight: "60px",
              }}
            >
             To handle the <b>unpredictable nature of AI outputs</b>, I implemented a <b>dynamic max-width strategy</b> across multiple breakpoints. By setting specific <b>character-per-line (CPL)</b> constraints, I ensured that even in "text-only" scenarios, the layout remains <b>legible and structured</b> on large screens. This prevents the dreaded "wall of text" and maintains an <b>optimal reading rhythm</b> regardless of content density.
            </Text>
          )}
        </TwoCol>



        <div style={{ width: "100%" }}>
          <img
            src="https://pub-36c8115632e74d30a6c7c587fefccbe4.r2.dev/thumbnailttsearch.jpg"
            alt="Moat: Bug fixing & Components"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              borderRadius: "12px",
            }}
          />
        </div>

        {/* Text Section After Image Comparison */}
        <TwoCol
          subtitle="The Thumbnail"
          title="Intuitive Media Affordance"
        >
          <Text
            span
            style={{
              fontSize: "14px",
              color: "var(--color-text-primary)",
              lineHeight: 1.3,
              whiteSpace: "pre-wrap",
            }}
          >
            This thumbnail is more than just a preview. It features <b>real-time metadata labels</b> for quick content filtering and a <b>prominent play hint</b> to encourage <b>video exploration</b>. Optimized for <b>Large Screen navigation</b>, the component uses <b>horizontal alignment with edge-peeking</b> to signal "more," transforming a static image list into an <b>interactive discovery carousel</b>.
          </Text>
        </TwoCol>


        <div style={{ width: "100%", marginTop: "0px", marginBottom: "0px" }}>
          <AutoVideo src="https://pub-36c8115632e74d30a6c7c587fefccbe4.r2.dev/ttsearchexpand.mp4" />
        </div>
   

        {/* Text Section After Image Comparison */}
        <TwoCol
          subtitle="Progressive Content Disclosure"
          title="Preserving SERP Integrity"
        >
          <Text
            span
            style={{
              fontSize: "14px",
              color: "var(--color-text-primary)",
              lineHeight: 1.3,
              whiteSpace: "pre-wrap",
            }}
          >
           To prevent long-form AI insights from overwhelming the <b>organic search results</b>, I implemented a <b>expandable container logic</b>. By using a <b>gradient text overlay</b> as a subtle <b>visual cue</b>, I signaled the existence of more content without sacrificing vertical space. This <b>on-demand expansion</b> ensures that the AI response remains compact, allowing the <b>core discovery feed</b> to stay within reach while giving users <b>granular control</b> over how much they want to read.
          </Text>
        </TwoCol>

        <div style={{ width: "100%", marginTop: "0px", marginBottom: "0px" }}>
          <AutoVideo src="https://pub-36c8115632e74d30a6c7c587fefccbe4.r2.dev/ttsearchscroll.mp4" />
        </div>
   

        {/* Text Section After Image Comparison */}
        <TwoCol
          subtitle="Sticky Media Anchorin"
          title="Leveraging Desktop Multi-Tasking"
        >
          <Text
            span
            style={{
              fontSize: "14px",
              color: "var(--color-text-primary)",
              lineHeight: 1.3,
              whiteSpace: "pre-wrap",
            }}
          >
           Unlike mobile, the desktop canvas allows for <b>simultaneous content viewing</b>. I designed the thumbnail component to be <b>temporarily fixed (sticky)</b> during long-text exploration. This removes the friction of "lost visuals"—users can finish a deep-dive read and <b>immediately trigger a video</b> without losing their place. This <b>non-linear navigation</b> significantly boosts the <b>conversion from search to watch</b>.
          </Text>
        </TwoCol>


        {/* Divider */}
        <SectionDivider id="Generative_Typography" />

        <SectionHeader
          subtitle="Atomic Precision"
          title="The Design System: Mastering Generative Typography & Layout"
          titleWeight={400}
        />

        {/* Typography Playground: 控制字号与行高的占位文本组件 */}
        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "24px",
            alignItems: "start",
            position: "relative",
            gridAutoFlow: "dense",
          }}
        >
          {/* 隐藏的测量元素：用于计算 17px / 200% 时的最大高度 */}
          <span
            ref={measureRef}
            style={{
              position: "absolute",
              opacity: 0,
              pointerEvents: "none",
              userSelect: "none",
              width: "100%",
              fontSize: "17px",
              lineHeight: 2,
              whiteSpace: "pre-wrap",
              top: 0,
            }}
          >
            This is a placeholder paragraph used to observe readability and rhythm under different font sizes and line-heights. Switching between 14, 15, 16, and 17 pixels helps evaluate body copy balance across desktop canvases, while 140%, 160%, 180%, and 200% line-height reveals changes in breathing space and text density. The goal is to validate typographic consistency in a real layout with sufficiently long content that mimics practical reading scenarios across various resolutions and user preferences.
          </span>

          {/* 固定到最大高度的卡片容器 */}
          <div
            style={{
              width: "100%",
              gridColumn: "2 / 3",
              alignSelf: "start",
              gridRow: "1",
            }}
          >
            <Text
              span
              style={{
                fontSize: `${placeholderFontSize}px`,
                color: "var(--color-text-primary)",
                lineHeight: placeholderLineHeightPct / 100,
                whiteSpace: "pre-wrap",
              }}
            >
              This is a placeholder paragraph used to observe readability and rhythm under different font sizes and line-heights. Switching between 14, 15, 16, and 17 pixels helps evaluate body copy balance across desktop canvases, while 140%, 160%, 180%, and 200% line-height reveals changes in breathing space and text density. The goal is to validate typographic consistency in a real layout with sufficiently long content that mimics practical reading scenarios across various resolutions and user preferences.
            </Text>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "stretch", gridColumn: "1 / 2", alignSelf: "start", gridRow: "1" }}>
            <style>{`
              .range-typography {
                -webkit-appearance: none;
                appearance: none;
                width: 100%;
                background: transparent;
                --sx: 0%;
                --slider-active: #000;
                --tick-color: var(--color-text-muted);
              }
              .range-typography:focus { outline: none; }
              /* WebKit */
              .range-typography::-webkit-slider-runnable-track {
                height: 4px;
                border-radius: 999px;
                background:
                  linear-gradient(var(--slider-active) 0 0) 0/var(--sx) 100% no-repeat,
                  repeating-linear-gradient(to right, var(--tick-color), var(--tick-color) 2px, transparent 2px, transparent 33.3333%),
                  var(--color-border-default);
              }
              .range-typography::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 8px;
                height: 16px;
                border-radius: 4px;
                background: var(--slider-active);
                margin-top: -6px;
              }
              /* Firefox */
              .range-typography::-moz-range-track {
                height: 4px;
                border-radius: 999px;
                background:
                  linear-gradient(var(--slider-active) 0 0) 0/var(--sx) 100% no-repeat,
                  repeating-linear-gradient(to right, var(--tick-color), var(--tick-color) 2px, transparent 2px, transparent 33.3333%),
                  var(--color-border-default);
              }
              .range-typography::-moz-range-thumb {
                width: 8px;
                height: 16px;
                border-radius: 4px;
                background: var(--slider-active);
                border: none;
              }
              /* 主题联动：暗色纯白，亮色纯黑 */
              @media (prefers-color-scheme: dark) {
                .range-typography { --slider-active: #FFFFFF; }
              }
              @media (prefers-color-scheme: light) {
                .range-typography { --slider-active: #000000; }
              }
              :root[data-theme="dark"] .range-typography,
              body[data-theme="dark"] .range-typography,
              .dark .range-typography {
                --slider-active: #FFFFFF;
              }
              :root[data-theme="light"] .range-typography,
              body[data-theme="light"] .range-typography,
              .light .range-typography {
                --slider-active: #000000;
              }
            `}</style>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Text span style={{ fontSize: "12px", color: "var(--color-text-muted)", textTransform: "none" }}>Font size</Text>
                <Text span style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>{placeholderFontSize}px</Text>
              </div>
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
                <div style={{ flex: 1 }}>
                  <input
                    type="range"
                    min={14}
                    max={17}
                    step={1}
                    value={placeholderFontSize}
                    onChange={(e) => setPlaceholderFontSize(parseInt(e.target.value))}
                    className="range-typography"
                    ref={fontSizeRef}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Text span style={{ fontSize: "12px", color: "var(--color-text-muted)", textTransform: "none" }}>Line height</Text>
                <Text span style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>{placeholderLineHeightPct}%</Text>
              </div>
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
                <div style={{ flex: 1 }}>
                  <input
                    type="range"
                    min={140}
                    max={200}
                    step={20}
                    value={placeholderLineHeightPct}
                    onChange={(e) => setPlaceholderLineHeightPct(parseInt(e.target.value))}
                    className="range-typography"
                    ref={lineHeightRef}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            border: "1px solid var(--color-border-default)",
            borderRadius: "12px",
            backgroundColor: "var(--color-bg-secondary)",
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", alignItems: "center", columnGap: "60px" }}>
              <Text span style={{ fontSize: "12px", color: "var(--color-text-muted)", textAlign: "right" }}>H1</Text>
              <Text h2 style={{ fontSize: "28px", fontWeight: 700, lineHeight: 1.2, margin: 0, color: "var(--color-text-primary)" }}>H2 Bold 32px</Text>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", alignItems: "center", columnGap: "60px" }}>
              <Text span style={{ fontSize: "12px", color: "var(--color-text-muted)", textAlign: "right" }}>H2</Text>
              <Text h3 style={{ fontSize: "24px", fontWeight: 700, lineHeight: 1.2, margin: 0, color: "var(--color-text-primary)" }}>H3 Bold 24px</Text>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", alignItems: "center", columnGap: "60px" }}>
              <Text span style={{ fontSize: "12px", color: "var(--color-text-muted)", textAlign: "right" }}>Body Copy title/H3</Text>
              <Text span style={{ fontSize: "16px", fontWeight: 700, lineHeight: 1.2, color: "var(--color-text-primary)" }}>Body Headline Bold 16px</Text>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", alignItems: "center", columnGap: "60px" }}>
              <Text span style={{ fontSize: "12px", color: "var(--color-text-muted)", marginTop: "2px", textAlign: "right" }}>Body Copy highlight</Text>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  <Text span style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-text-primary)", backgroundColor: "rgba(0, 117, 220, 0.19)", padding: "2px 4px", borderRadius: "2px" }}>Body Headline Semibold</Text>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    <svg width="12" height="26" viewBox="0 0 12 26" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
                      <path d="M6 1 L6 25" stroke="var(--color-border-default)" strokeWidth="1" />
                      <path d="M3 4 L6 1 L9 4" fill="none" stroke="var(--color-border-default)" strokeWidth="1" />
                      <path d="M3 22 L6 25 L9 22" fill="none" stroke="var(--color-border-default)" strokeWidth="1" />
                    </svg>
                    <Text span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>160%</Text>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", alignItems: "center", columnGap: "60px" }}>
              <Text span style={{ fontSize: "12px", color: "var(--color-text-muted)", marginTop: "2px", textAlign: "right" }}>Body Copy</Text>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  <Text span style={{ fontSize: "16px", fontWeight: 400, color: "var(--color-text-primary)" }}>Body Headline regular </Text>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    <svg width="12" height="26" viewBox="0 0 12 26" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
                      <path d="M6 1 L6 25" stroke="var(--color-border-default)" strokeWidth="1" />
                      <path d="M3 4 L6 1 L9 4" fill="none" stroke="var(--color-border-default)" strokeWidth="1" />
                      <path d="M3 22 L6 25 L9 22" fill="none" stroke="var(--color-border-default)" strokeWidth="1" />
                    </svg>
                    <Text span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>160%</Text>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", alignItems: "center", columnGap: "60px" }}>
              <Text span style={{ fontSize: "12px", color: "var(--color-text-muted)", marginTop: "2px", textAlign: "right" }}>Copy quote</Text>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  <Text span style={{ fontSize: "16px", fontWeight: 400, fontStyle: "italic", color: "var(--color-text-secondary)" }}>Body Headline regular</Text>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    <svg width="12" height="26" viewBox="0 0 12 26" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
                      <path d="M6 1 L6 25" stroke="var(--color-border-default)" strokeWidth="1" />
                      <path d="M3 4 L6 1 L9 4" fill="none" stroke="var(--color-border-default)" strokeWidth="1" />
                      <path d="M3 22 L6 25 L9 22" fill="none" stroke="var(--color-border-default)" strokeWidth="1" />
                    </svg>
                    <Text span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>160%</Text>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", alignItems: "center", columnGap: "60px" }}>
              <Text span style={{ fontSize: "12px", color: "var(--color-text-muted)", textAlign: "right" }}>Supportive description</Text>
              <Text span style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>P2 regular (12px)</Text>
            </div>
          </div>
        </div>


 <TwoCol
          subtitle="Evidence-Based Design"
          title="The ChatGPT Benchmark"
        >
          <Text
            span
            style={{
              fontSize: "14px",
              color: "var(--color-text-primary)",
              lineHeight: 1.3,
              whiteSpace: "pre-wrap",
            }}
          >
           To define the optimal <b>reading rhythm</b> for generative content, I conducted a deep-dive <b>competitive audit</b> of industry leaders like ChatGPT. By deconstructing their <b>spatial systems</b> and <b>typographic scales</b>, I analyzed how they balance <b>information density</b> with <b>legibility</b> on large screens. This research allowed me to reverse-engineer a <b>proven spacing logic</b>—optimizing <b>line-height, paragraph margins, and nested list padding</b>—to ensure TikTok's AI insights feel both native to the web and highly professional.
          </Text>
        </TwoCol>



        <div
          style={{
            width: "100%",
            border: "1px solid var(--color-border-default)",
            borderRadius: "12px",
            backgroundColor: "var(--color-bg-secondary)",
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            gap: "40px",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: "24px" }}>
            <div style={{ width: "200px", color: "var(--color-text-muted)", fontSize: "14px", paddingTop: "4px", flexShrink: 0 }}>
              Main Heading
            </div>
            <div style={{ flexGrow: 1, color: "var(--color-text-primary)", fontSize: "14px" }}>
              <ul style={{ margin: 0, paddingLeft: "24px" }}>
                <li style={{ marginBottom: "8px" }}>
                  <span style={{ fontWeight: 600 }}>Body Headline SemiBold:</span> Body Headline regular
                </li>
              </ul>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "24px" }}>
            <div style={{ width: "200px", color: "var(--color-text-muted)", fontSize: "14px", paddingTop: "4px", flexShrink: 0 }}>
              Nested Section
            </div>
            <div style={{ flexGrow: 1, color: "var(--color-text-primary)", fontSize: "14px" }}>
              <ul style={{ margin: 0, paddingLeft: "24px" }}>
                <li style={{ marginBottom: "8px" }}>
                  <span style={{ fontWeight: 600 }}>Body Headline SemiBold:</span> Body Headline regular
                  <ul style={{ marginTop: "8px", paddingLeft: "24px", listStyleType: "circle" }}>
                    <li style={{ marginBottom: "8px" }}>Body Headline regular</li>
                    <li style={{ marginBottom: "8px" }}>Body Headline regular</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "24px" }}>
            <div style={{ width: "200px", color: "var(--color-text-muted)", fontSize: "14px", paddingTop: "4px", flexShrink: 0 }}>
              Nested Numbering
            </div>
            <div style={{ flexGrow: 1, color: "var(--color-text-primary)", fontSize: "14px" }}>
              <ul style={{ margin: 0, paddingLeft: "24px" }}>
                <li style={{ marginBottom: "8px" }}>
                  <span style={{ fontWeight: 600 }}>Body Headline SemiBold:</span> Body Headline regular
                  <ol style={{ marginTop: "10px", paddingLeft: "24px", listStylePosition: "outside" }}>
                    <li style={{ marginBottom: "8px", paddingLeft: "8px" }}>Body Headline regular</li>
                    <li style={{ marginBottom: "8px", paddingLeft: "8px" }}>Body Headline regular</li>
                  </ol>
                </li>
              </ul>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "24px" }}>
            <div style={{ width: "200px", color: "var(--color-text-muted)", fontSize: "14px", paddingTop: "4px", flexShrink: 0 }}>
              Numbered Heading
            </div>
            <div style={{ flexGrow: 1, color: "var(--color-text-primary)", fontSize: "14px" }}>
              <ol style={{ margin: 0, paddingLeft: "24px", listStylePosition: "outside" }}>
                <li style={{ marginBottom: "8px", paddingLeft: "8px" }}>Body Headline regular</li>
                <li style={{ marginBottom: "8px", paddingLeft: "8px" }}>Body Headline regular</li>
              </ol>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "24px" }}>
            <div style={{ width: "200px", color: "var(--color-text-muted)", fontSize: "14px", paddingTop: "4px", flexShrink: 0 }}>
              Quotation Section
            </div>
            <div style={{ flexGrow: 1 }}>
              <div style={{ borderLeft: "2px solid var(--color-border-default)", paddingLeft: "20px", color: "var(--color-text-secondary)", fontStyle: "italic", fontSize: "18px" }}>
                "Quoted Headline regular"
              </div>
            </div>
          </div>
        </div>

        

       
        
             
              

          

        

        {/* To be continued */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "40px", // space between text and divider
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        >
          <Text
            span
            style={{
              fontFamily: '"Instrument Serif", serif',
              fontSize: "20px",
              color: "var(--color-text-secondary)", // Slightly darker color
              fontStyle: "italic",
              opacity: 0.8, // Increased opacity
            }}
          >
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

export default TiktokSearchContent;
