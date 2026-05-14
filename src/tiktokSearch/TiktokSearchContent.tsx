import React, { useState, useEffect, useRef } from "react";
import { Text, Badge, Grid } from "@geist-ui/core";
import Lenis from "@studio-freight/lenis";
import ImageComparison from "../tiktokweb/ImageComparison";

// --- Text Scramble Effect Component ---
// --- Static Data ---

const SECTIONS = [
  { id: "section-context", title: "Context" },
  { id: "section01", title: "The Unique Friction" },
  { id: "Generative_Typography", title: "Atomic Precision" },
  { id: "Loading——Animation", title: "The animation" },
  { id: "Visual_addons", title: "Visual add-ons" },
];

const TABLE_DATA = [
  {
    category: "Scope & Content",
    col1: ["Foundation components", "Legacy component standard", "Core page design specs"],
    col2: ["Bridge App feature gaps", "Improve content efficiency", "Boost consumption UX"],
    col3: ["Web exclusive UX (Player, Auth, etc.)", "Leverage Web-native capabilities"],
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

const BREAKPOINTS_DATA = [
  { breakpoint: "≥ 1600px", padding: "32px", gap: "16px", column: "12", paddingTop: "20px" },
  { breakpoint: "1599px - 1200px", padding: "32px", gap: "16px", column: "12", paddingTop: "20px" },
  { breakpoint: "1199px - 1024px", padding: "20px", gap: "16px", column: "12", paddingTop: "20px" },
  { breakpoint: "1023px - 840px", padding: "20px", gap: "16px", column: "12", paddingTop: "20px" },
  { breakpoint: "839px - 600px", padding: "20px", gap: "16px", column: "12", paddingTop: "20px" },
  { breakpoint: "< 600px (minimal size)", padding: "12px", gap: "12px", column: "12", paddingTop: "12px" },
];

const SLIDE_IMAGES = [
  "https://f004.backblazeb2.com/file/xiangyi-assets/grid.png",
  "https://f004.backblazeb2.com/file/xiangyi-assets/content.jpeg",
  "https://f004.backblazeb2.com/file/xiangyi-assets/Anatomy+of+a+grid.jpeg",
];

const VISUAL_IMAGES = [
  {
    url: "https://pub-36c8115632e74d30a6c7c587fefccbe4.r2.dev/BG-1.jpg",
    glow: "rgba(0, 163, 255, 0.15)",
    line: "rgba(0, 163, 255, 0.4)",
  },
  {
    url: "https://pub-36c8115632e74d30a6c7c587fefccbe4.r2.dev/BG.jpg",
    glow: "rgba(200, 110, 45, 0.12)",
    line: "rgba(200, 110, 45, 0.35)",
  },
  {
    url: "https://pub-36c8115632e74d30a6c7c587fefccbe4.r2.dev/BG-2.jpg",
    glow: "rgba(230, 0, 7, 0.12)",
    line: "rgba(230, 0, 7, 0.35)",
  },
];

// --- Reusable Components ---

const MeasurementPill = ({ label, height }: { label: string; height: string | number }) => (
  <div style={{ position: "relative", height, width: "100%" }}>
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: "rgba(103, 232, 249, 0.15)",
        pointerEvents: "none",
      }}
    />
    <div
      style={{
        position: "absolute",
        right: 0,
        top: "50%",
        transform: "translateY(-50%)",
        backgroundColor: "#5ED3F3",
        borderRadius: "12px",
        width: "32px",
        height: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: 5,
      }}
    >
      <span style={{ fontSize: "9px", fontWeight: 800, color: "#FFF", lineHeight: 1 }}>
        {label}
      </span>
    </div>
  </div>
);

const SpecRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 2fr",
      alignItems: "flex-start",
      columnGap: "60px",
    }}
  >
    <Text
      span
      style={{
        fontSize: "12px",
        color: "var(--color-text-muted)",
        textAlign: "right",
        marginTop: "4px",
      }}
    >
      {label}
    </Text>
    {children}
  </div>
);

const TypographySpecsCard = React.memo(() => (
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
    <SpecRow label="H1">
      <Text
        h2
        style={{
          fontSize: "28px",
          fontWeight: 700,
          lineHeight: 1.2,
          margin: 0,
          color: "var(--color-text-primary)",
        }}
      >
        H2 Bold 32px
      </Text>
    </SpecRow>

    <SpecRow label="H2">
      <Text
        h3
        style={{
          fontSize: "24px",
          fontWeight: 700,
          lineHeight: 1.2,
          margin: 0,
          color: "var(--color-text-primary)",
        }}
      >
        H3 Bold 24px
      </Text>
    </SpecRow>

    <SpecRow label="Body Copy title/H3">
      <Text
        span
        style={{
          fontSize: "16px",
          fontWeight: 700,
          lineHeight: 1.2,
          color: "var(--color-text-primary)",
        }}
      >
        Body Headline Bold 16px
      </Text>
    </SpecRow>

    <SpecRow label="Body Copy highlight">
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
          <Text
            span
            style={{
              fontSize: "16px",
              fontWeight: 600,
              color: "var(--color-text-primary)",
              backgroundColor: "rgba(0, 117, 220, 0.19)",
              padding: "2px 4px",
              borderRadius: "2px",
            }}
          >
            Body Headline Semibold
          </Text>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <svg
              width="12"
              height="26"
              viewBox="0 0 12 26"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: "block" }}
            >
              <path d="M6 1 L6 25" stroke="var(--color-border-default)" strokeWidth="1" />
              <path d="M3 4 L6 1 L9 4" fill="none" stroke="var(--color-border-default)" strokeWidth="1" />
              <path d="M3 22 L6 25 L9 22" fill="none" stroke="var(--color-border-default)" strokeWidth="1" />
            </svg>
            <Text span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>
              160%
            </Text>
          </div>
        </div>
      </div>
    </SpecRow>

    <SpecRow label="Body Copy">
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
          <Text span style={{ fontSize: "16px", fontWeight: 400, color: "var(--color-text-primary)" }}>
            Body Headline regular{" "}
          </Text>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <svg
              width="12"
              height="26"
              viewBox="0 0 12 26"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: "block" }}
            >
              <path d="M6 1 L6 25" stroke="var(--color-border-default)" strokeWidth="1" />
              <path d="M3 4 L6 1 L9 4" fill="none" stroke="var(--color-border-default)" strokeWidth="1" />
              <path d="M3 22 L6 25 L9 22" fill="none" stroke="var(--color-border-default)" strokeWidth="1" />
            </svg>
            <Text span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>
              160%
            </Text>
          </div>
        </div>
      </div>
    </SpecRow>

    <SpecRow label="Copy quote">
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
          <Text
            span
            style={{
              fontSize: "16px",
              fontWeight: 400,
              fontStyle: "italic",
              color: "var(--color-text-secondary)",
            }}
          >
            Body Headline regular
          </Text>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <svg
              width="12"
              height="26"
              viewBox="0 0 12 26"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: "block" }}
            >
              <path d="M6 1 L6 25" stroke="var(--color-border-default)" strokeWidth="1" />
              <path d="M3 4 L6 1 L9 4" fill="none" stroke="var(--color-border-default)" strokeWidth="1" />
              <path d="M3 22 L6 25 L9 22" fill="none" stroke="var(--color-border-default)" strokeWidth="1" />
            </svg>
            <Text span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>
              160%
            </Text>
          </div>
        </div>
      </div>
    </SpecRow>

    <SpecRow label="Supportive description">
      <Text span style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>
        P2 regular (12px)
      </Text>
    </SpecRow>
  </div>
));

TypographySpecsCard.displayName = "TypographySpecsCard";

const ResponsiveStressTable = React.memo(() => {
  const columns = Array.from({ length: 10 }, (_, i) => `Col ${i + 1}`);
  const rows = Array.from({ length: 3 }, (_, i) => 
    Array.from({ length: 10 }, (_, j) => `Data ${i + 1}-${j + 1}`)
  );

  return (
    <div style={{ width: "100%", marginTop: "24px", position: "relative", maxWidth: "720px" }}>
      <div
        style={{
          width: "100%",
          overflowX: "auto",
          border: "1px solid var(--color-border-default)",
          borderRadius: "8px",
          backgroundColor: "var(--color-bg-secondary)",
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE/Edge
        }}
      >
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
        `}</style>
        <table 
          className="hide-scrollbar"
          style={{ borderCollapse: "collapse", width: "max-content", tableLayout: "fixed" }}
        >
          <thead>
            <tr style={{ borderBottom: "1px solid var(--color-border-default)" }}>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "var(--color-text-muted)",
                    width: "240px",
                    borderRight: idx < columns.length - 1 ? "1px solid var(--color-border-default)" : "none",
                    backgroundColor: "rgba(0,0,0,0.02)",
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr 
                key={rowIdx} 
                style={{ 
                  borderBottom: rowIdx < rows.length - 1 ? "1px solid var(--color-border-default)" : "none" 
                }}
              >
                {row.map((cell, cellIdx) => (
                  <td
                    key={cellIdx}
                    style={{
                      padding: "12px",
                      fontSize: "13px",
                      color: "var(--color-text-primary)",
                      width: "240px",
                      borderRight: cellIdx < row.length - 1 ? "1px solid var(--color-border-default)" : "none",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Right side fade overlay */}
      <div
        style={{
          position: "absolute",
          top: 1,
          right: 1,
          bottom: 1,
          width: "80px",
          background: "linear-gradient(to right, transparent, var(--color-bg-secondary))",
          pointerEvents: "none",
          borderRadius: "0 8px 8px 0",
          zIndex: 2,
        }}
      />
    </div>
  );
});

ResponsiveStressTable.displayName = "ResponsiveStressTable";

const TypographyPlayground = ({
  placeholderFontSize,
  setPlaceholderFontSize,
  placeholderLineHeightPct,
  setPlaceholderLineHeightPct,
  fontSizeRef,
  lineHeightRef,
  measureRef,
}: {
  placeholderFontSize: number;
  setPlaceholderFontSize: (v: number) => void;
  placeholderLineHeightPct: number;
  setPlaceholderLineHeightPct: (v: number) => void;
  fontSizeRef: React.RefObject<HTMLInputElement | null>;
  lineHeightRef: React.RefObject<HTMLInputElement | null>;
  measureRef: React.RefObject<HTMLSpanElement | null>;
}) => (
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
        @media (prefers-color-scheme: dark) { .range-typography { --slider-active: #FFFFFF; } }
        @media (prefers-color-scheme: light) { .range-typography { --slider-active: #000000; } }
        :root[data-theme="dark"] .range-typography,
        body[data-theme="dark"] .range-typography,
        .dark .range-typography { --slider-active: #FFFFFF; }
        :root[data-theme="light"] .range-typography,
        body[data-theme="light"] .range-typography,
        .light .range-typography { --slider-active: #000000; }
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
);

const SearchCard1 = () => {
  const [activeVisualTab, setActiveVisualTab] = useState(0);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "0",
        marginTop: "24px",
      }}
    >
      <style>{`
        .searchcard2-list {
          list-style-position: outside;
        }
        .searchcard2-list li {
          display: list-item;
          margin-bottom: 8px;
        }
        .searchcard2-list li:last-child {
          margin-bottom: 0;
        }
        .searchcard2-list li::before,
        .searchcard2-list li::after {
          content: none !important;
          display: none !important;
        }
      `}</style>
      <div
        style={{
          display: "flex",
          gap: "0",
          paddingLeft: "4px",
        }}
      >
        {["Image#1", "Image#2", "Image#3"].map((tab, idx) => (
          <div
            key={tab}
            onClick={() => setActiveVisualTab(idx)}
            style={{
              minWidth: "120px",
              padding: "8px 16px",
              cursor: "pointer",
              position: "relative",
              color:
                activeVisualTab === idx
                  ? "var(--color-text-primary)"
                  : "var(--color-text-muted)",
              fontWeight: activeVisualTab === idx ? 600 : 400,
              fontSize: "15px",
              transition: "color 0.2s ease",
              textAlign: "center",
            }}
          >
            {tab}
            {activeVisualTab === idx && (
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  backgroundColor: "var(--color-text-primary)",
                }}
              />
            )}
          </div>
        ))}
      </div>

      <div
        style={{
          width: "100%",
          position: "relative",
          paddingTop: "32px",
          paddingBottom: "60px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "0",
            right: "0",
            height: "1px",
            background: `linear-gradient(to right, transparent, ${VISUAL_IMAGES[activeVisualTab].line} 50%, transparent)`,
            boxShadow: `0 2px 12px ${VISUAL_IMAGES[activeVisualTab].glow}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            height: "140px",
            background: `radial-gradient(50% 100% at 50% 0%, ${VISUAL_IMAGES[activeVisualTab].glow}, transparent)`,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            padding: "0 4px",
          }}
        >
          <div
            style={{
              width: "32%",
              aspectRatio: "3 / 4",
              borderRadius: "16px",
              overflow: "hidden",
              backgroundColor: "var(--color-bg-secondary)",
              border: "1px solid var(--color-border-default)",
              boxShadow: "0 8px 16px rgba(0,0,0,0.08)",
              position: "relative",
            }}
          >
            <img
              src={VISUAL_IMAGES[activeVisualTab].url}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
              alt={["Image#1", "Image#2", "Image#3"][activeVisualTab]}
            />

            <div
              style={{
                position: "absolute",
                bottom: "20px",
                left: "20px",
                right: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                onClick={() =>
                  setActiveVisualTab((prev) =>
                    prev === 0 ? VISUAL_IMAGES.length - 1 : prev - 1,
                  )
                }
                style={{
                  width: "36px",
                  height: "36px",
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "white",
                  backdropFilter: "blur(4px)",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </div>

              <div style={{ display: "flex", gap: "8px" }}>
                {VISUAL_IMAGES.map((_, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveVisualTab(idx)}
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: activeVisualTab === idx ? "white" : "rgba(255, 255, 255, 0.4)",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  />
                ))}
              </div>

              <div
                onClick={() =>
                  setActiveVisualTab((prev) =>
                    prev === VISUAL_IMAGES.length - 1 ? 0 : prev + 1,
                  )
                }
                style={{
                  width: "36px",
                  height: "36px",
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "white",
                  backdropFilter: "blur(4px)",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchCard2 = () => {
  const getTheme = (): "light" | "dark" =>
    document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";

  const [activeVisualTab, setActiveVisualTab] = useState(0);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(getTheme);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isReferencePopoverVisible, setIsReferencePopoverVisible] = useState(false);
  const [isReferencePopoverCardHovered, setIsReferencePopoverCardHovered] = useState(false);

  const bodyTextStyle: React.CSSProperties = {
    fontFamily: "TikTok Sans, Inter, sans-serif",
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: 1.6,
    color: "inherit",
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontFamily: "TikTok Sans, Inter, sans-serif",
    fontSize: "16px",
    fontWeight: 700,
    lineHeight: 1.6,
    color: "var(--color-text-primary)",
  };

  const listStyle: React.CSSProperties = {
    margin: 0,
    paddingLeft: "24px",
    display: "flex",
    flexDirection: "column",
  };

  const nestedListStyle: React.CSSProperties = {
    ...listStyle,
  };

  useEffect(() => {
    const onThemeChange = () => setTheme(getTheme());
    window.addEventListener("themeChange", onThemeChange);
    const observer = new MutationObserver(onThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      window.removeEventListener("themeChange", onThemeChange);
      observer.disconnect();
    };
  }, []);

  const buttonBackgroundColor =
    theme === "dark"
      ? isButtonHovered
        ? "rgba(255, 255, 255, 0.14)"
        : "rgba(255, 255, 255, 0.08)"
      : isButtonHovered
        ? "rgba(0, 0, 0, 0.1)"
        : "rgba(0, 0, 0, 0.05)";

  const dividerColor =
    theme === "dark" ? "rgba(255, 255, 255, 0.14)" : "rgba(0, 0, 0, 0.12)";

  const buttonStyle: React.CSSProperties = {
    height: "32px",
    width: "fit-content",
    borderRadius: "999px",
    backgroundColor: buttonBackgroundColor,
    padding: "8px 12px",
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    color: "var(--color-text-primary)",
  };

  const overlayBackground =
    theme === "dark"
      ? "linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.4) 16%, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 1) 60%)"
      : "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.4) 16%, rgba(255, 255, 255, 0.8) 40%, rgba(255, 255, 255, 1) 60%)";

  const stickyTabBackground = theme === "dark" ? "#0A0A0A" : "#FFFFFF";

  const popoverBackgroundColor = theme === "dark" ? "#1F1F1F" : "#FFFFFF";
  const popoverCardBackgroundColor = theme === "dark" ? "#1F1F1F" : "#FFFFFF";
  const popoverCardHoverBackgroundColor =
    theme === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.04)";
  const popoverShadow =
    theme === "dark"
      ? "0 24px 120px 0 rgba(0, 0, 0, 0.48)"
      : "0 24px 120px 0 rgba(0, 0, 0, 0.16)";
  const popoverPrimaryTextColor = theme === "dark" ? "#FFFFFF" : "#000000";
  const popoverMetaTextColor = theme === "dark" ? "rgba(255, 255, 255, 0.85)" : "#202020";
  const popoverSecondaryTextColor =
    theme === "dark" ? "rgba(255, 255, 255, 0.48)" : "rgba(0, 0, 0, 0.48)";
  const popoverAvatarBorderColor =
    theme === "dark" ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)";
  const popoverAvatarBackground =
    theme === "dark"
      ? "linear-gradient(135deg, #3A3A3A 0%, #232323 100%)"
      : "linear-gradient(135deg, #D9D9D9 0%, #F5F5F5 100%)";
  const isReferencePopoverActive =
    isReferencePopoverVisible || isReferencePopoverCardHovered;

  const popoverMetaTextStyle: React.CSSProperties = {
    fontFamily: "TikTok Sans, Inter, sans-serif",
    fontSize: "13px",
    fontWeight: 400,
    lineHeight: 1.3,
  };

  const popoverTitleStyle: React.CSSProperties = {
    fontFamily: "TikTok Sans, Inter, sans-serif",
    fontSize: "15px",
    fontWeight: 600,
    lineHeight: 1.3,
    color: popoverPrimaryTextColor,
  };

  const visualTabs = ["Top", "User", "Videos"];

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "0",
        marginTop: "24px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "0",
          paddingLeft: "4px",
          position: !isCollapsed ? "sticky" : "relative",
          top: !isCollapsed ? 0 : undefined,
          zIndex: 3,
          backgroundColor: stickyTabBackground,
        }}
      >
        {visualTabs.map((tab, idx) => (
          <div
            key={`${tab}-${idx}`}
            onClick={() => setActiveVisualTab(idx)}
            style={{
              minWidth: "120px",
              padding: "8px 16px",
              cursor: "pointer",
              position: "relative",
              color:
                activeVisualTab === idx
                  ? "var(--color-text-primary)"
                  : "var(--color-text-muted)",
              fontWeight: activeVisualTab === idx ? 600 : 400,
              fontSize: "15px",
              transition: "color 0.2s ease",
              textAlign: "center",
            }}
          >
            {tab}
            {activeVisualTab === idx && (
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  backgroundColor: "var(--color-text-primary)",
                }}
              />
            )}
          </div>
        ))}
        <div
          style={{
            position: "absolute",
            left: 4,
            right: 0,
            bottom: 0,
            height: "0.5px",
            backgroundColor: dividerColor,
            pointerEvents: "none",
          }}
        />
      </div>

      <div
        style={{
          width: "100%",
          position: "relative",
          paddingTop: "32px",
          paddingBottom: "60px",
          overflow: isCollapsed ? "hidden" : "visible",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            padding: "0 4px",
            gap: "16px",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              width: "165px",
              flex: "0 0 165px",
              alignSelf: "flex-start",
              position: !isCollapsed ? "sticky" : "relative",
              top: !isCollapsed ? "72px" : undefined,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "220px",
                borderRadius: "8px",
                overflow: "hidden",
                backgroundColor: "var(--color-bg-secondary)",
                border: "1px solid var(--color-border-default)",
                boxShadow: "0 8px 16px rgba(0,0,0,0.08)",
                position: "relative",
              }}
            >
              <img
                src={VISUAL_IMAGES[activeVisualTab].url}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
                alt={["Image#1", "Image#2", "Image#3"][activeVisualTab]}
              />

              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  left: "20px",
                  right: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  onClick={() =>
                    setActiveVisualTab((prev) =>
                      prev === 0 ? VISUAL_IMAGES.length - 1 : prev - 1,
                    )
                  }
                  style={{
                    width: "28px",
                    height: "28px",
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "white",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  {VISUAL_IMAGES.map((_, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveVisualTab(idx)}
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        backgroundColor:
                          activeVisualTab === idx
                            ? "white"
                            : "rgba(255, 255, 255, 0.4)",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    />
                  ))}
                </div>

                <div
                  onClick={() =>
                    setActiveVisualTab((prev) =>
                      prev === VISUAL_IMAGES.length - 1 ? 0 : prev + 1,
                    )
                  }
                  style={{
                    width: "28px",
                    height: "28px",
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "white",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              color: "var(--color-text-primary)",
              height: isCollapsed ? "220px" : "auto",
              overflow: isCollapsed ? "hidden" : "visible",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                minHeight: "25px",
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                <path d="M8.74992 0.721842C9.52337 0.275294 10.4764 0.275355 11.2499 0.721842L13.4529 1.99382C13.359 2.01702 13.2641 2.03884 13.1693 2.06055C12.6529 2.17882 12.1346 2.29753 11.7358 2.66317C11.6772 2.71685 11.624 2.77422 11.5763 2.83447L10.4166 2.16512C10.1588 2.01638 9.84102 2.0163 9.58325 2.16512L3.42318 5.72184C3.1654 5.87071 3.00651 6.146 3.00651 6.44368V13.5567L3.00855 13.6125C3.02703 13.8884 3.18155 14.1391 3.42318 14.2786L9.58325 17.8353C9.84098 17.984 10.1588 17.984 10.4166 17.8353L16.5771 14.2786C16.8348 14.1297 16.9937 13.8544 16.9937 13.5567V8.54085C17.1179 8.46856 17.2339 8.37693 17.3363 8.26538C17.7016 7.86768 17.8208 7.35093 17.9394 6.83594C17.9992 6.57616 18.059 6.31683 18.1501 6.0734C18.2385 5.8375 18.3154 5.75207 18.5347 5.66447C18.6161 5.91253 18.6604 6.17487 18.6604 6.44368V13.5567C18.6603 14.4498 18.1838 15.2753 17.4104 15.7218L11.2499 19.2786C10.4765 19.725 9.52333 19.7251 8.74992 19.2786L2.58984 15.7218C1.81641 15.2753 1.33991 14.4498 1.33984 13.5567V6.44368C1.33985 5.55056 1.8164 4.72516 2.58984 4.27856L8.74992 0.721842Z" fill="currentColor" />
                <path d="M12.4702 13.9583H10.5488L9.92871 11.7228H6.96403L6.34391 13.9583H4.42253L7.0446 5.43945H9.84814L12.4702 13.9583ZM7.3693 10.2608H9.52262L8.47038 6.46688H8.42196L7.3693 10.2608Z" fill="currentColor" />
                <path d="M13.1681 5.43945C13.4278 5.49914 13.6872 5.55875 13.9306 5.64982C14.1795 5.74299 14.26 5.8232 14.3529 6.07218C14.4439 6.31587 14.5034 6.57554 14.5629 6.83553C14.6453 7.19591 14.7285 7.55686 14.8958 7.8776V13.9583H13.0472V5.43945H13.1681Z" fill="currentColor" />
                <path d="M16.2503 0C16.4979 0 16.599 0.429793 16.724 0.959473C16.8571 1.52404 17.0174 2.20217 17.4096 2.5944C17.8013 2.98427 18.4773 3.14335 19.0404 3.27596C19.5703 3.40072 20.0003 3.50214 20.0003 3.75C20.0003 3.99754 19.5714 4.09911 19.0425 4.22404C18.4788 4.35717 17.8018 4.51707 17.4096 4.90926C17.0174 5.30145 16.8575 5.97851 16.7244 6.54215C16.5994 7.07105 16.4979 7.5 16.2503 7.5C16.0029 7.5 15.9023 7.07147 15.7783 6.54297C15.646 5.97922 15.487 5.30166 15.0947 4.90926C14.7025 4.51703 14.0244 4.35678 13.4598 4.22363C12.9301 4.09872 12.5003 3.99753 12.5003 3.75C12.5003 3.50216 12.9312 3.40071 13.4618 3.27596C14.026 3.14333 14.703 2.98439 15.0947 2.5944C15.4847 2.20266 15.6437 1.52565 15.7763 0.961507C15.901 0.430901 16.0025 0 16.2503 0Z" fill="currentColor" />
              </svg>

              <span
                style={{
                  fontFamily: "TikTok Sans, Inter, sans-serif",
                  fontSize: "22px",
                  fontWeight: 700,
                  lineHeight: 1.25,
                  color: "var(--color-text-primary)",
                  display: "block",
                }}
              >
                Is this a search AI card?
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                flexWrap: "wrap",
              }}
            >
              <Text
                span
                style={{
                  fontSize: "13px",
                  fontWeight: 400,
                  lineHeight: 1.3,
                  color: "var(--color-text-muted)",
                }}
              >
                AI summarized from sources
              </Text>
              <img
                src="https://pub-36c8115632e74d30a6c7c587fefccbe4.r2.dev/Avatar%20Stack.png"
                alt="Avatar Stack"
                style={{
                  height: "16px",
                  width: "auto",
                  display: "block",
                  flexShrink: 0,
                }}
              />
            </div>

            <div
              style={{
                position: "relative",
                marginTop: "8px",
                flex: isCollapsed ? 1 : undefined,
                minHeight: isCollapsed ? 0 : undefined,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  maxHeight: isCollapsed ? "220px" : undefined,
                  overflow: isCollapsed ? "hidden" : "visible",
                  transition: "max-height 0.25s ease",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    <div style={sectionTitleStyle}>Locations of Penguin Habitats</div>
                    <div style={bodyTextStyle}>
                      Penguins live almost exclusively in the Southern Hemisphere. While many people associate them with Antarctica, penguins can be found on every continent in the Southern Hemisphere, including various islands and coastlines.
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "stretch",
                      gap: "16px",
                    }}
                  >
                    <div
                      style={{
                        width: "2px",
                        flex: "0 0 2px",
                        borderRadius: "999px",
                        backgroundColor: "var(--color-border-default)",
                      }}
                    />
                    <div
                      style={{
                        ...bodyTextStyle,
                        fontStyle: "italic",
                      }}
                    >
                      “rem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    <div style={sectionTitleStyle}>Antarctica</div>
                    <div style={bodyTextStyle}>
                      This continent is home to the largest penguin populations, though only two species, the Emperor and Adélie penguins, live there year-round. Other species, like Chinstrap and Gentoo penguins, also breed on the Antarctic Peninsula and nearby islands.
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    <div style={sectionTitleStyle}>Australia and New Zealand</div>
                    <div style={bodyTextStyle}>
                      These countries are home to several species, including the Little Penguin (also known as the Fairy Penguin), the world's smallest
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <div style={sectionTitleStyle}>The standard Lorem</div>
                  <ul
                    className="searchcard2-list"
                    style={{
                      ...listStyle,
                      listStyleType: "disc",
                    }}
                  >
                    <li style={{ ...bodyTextStyle, color: "var(--color-text-primary)" }}>
                      <span style={{ fontWeight: 600 }}>Dense Feathers:</span> Their feathers are tightly packed and waterproof, providing an effective barrier against wind and water. Penguins also have a layer of down feathers for added insulation.
                      <ul
                        className="searchcard2-list"
                        style={{
                          ...nestedListStyle,
                          listStyleType: "circle",
                        }}
                      >
                        <li style={{ ...bodyTextStyle, color: "var(--color-text-primary)" }}>
                          cididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut alipidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                          <span
                            onMouseEnter={() => setIsReferencePopoverVisible(true)}
                            onMouseLeave={() => {
                              if (!isReferencePopoverCardHovered) {
                                setIsReferencePopoverVisible(false);
                              }
                            }}
                            style={{
                              position: "relative",
                              display: "inline-flex",
                              width: "24px",
                              height: "19px",
                              marginLeft: "4px",
                              borderRadius: "100px",
                              alignItems: "center",
                              justifyContent: "center",
                              backgroundColor:
                                theme === "dark"
                                  ? "rgba(255, 255, 255, 0.08)"
                                  : "rgba(0, 0, 0, 0.05)",
                              verticalAlign: "middle",
                              color: theme === "dark" ? "#FFFFFF" : "#000000",
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none" style={{ display: "block" }}>
                              <path d="M0.408539 7.33331L1.78256 4.47491C1.50192 4.42324 1.23064 4.30027 0.996429 4.10382C0.274355 3.49813 0.17966 2.42234 0.785492 1.7005C1.39147 0.978634 2.46859 0.884822 3.19077 1.49054C3.81983 2.01839 3.97206 2.90345 3.59995 3.59991L3.59702 3.6048C3.58124 3.63407 3.56484 3.66316 3.54721 3.69171L1.4437 7.33331H0.408539ZM4.27573 7.33331L5.64877 4.47589C5.36819 4.42422 5.09681 4.3012 4.86264 4.1048C4.14063 3.49917 4.04682 2.4232 4.65268 1.70148C5.2586 0.979975 6.33501 0.885976 7.05698 1.49152C7.68567 2.01907 7.83763 2.9037 7.46616 3.59991L7.4603 3.61066C7.44622 3.63656 7.43189 3.66246 7.41635 3.68781L5.31088 7.33331H4.27573Z" fill="currentColor" fillOpacity="0.48" />
                            </svg>
                            <span
                              style={{
                                position: "absolute",
                                top: "100%",
                                left: "50%",
                                transform: `translateX(-50%) ${isReferencePopoverActive ? "translateY(0) scale(1)" : "translateY(-6px) scale(0.98)"}`,
                                width: "48px",
                                height: "12px",
                                backgroundColor: "transparent",
                                zIndex: 9998,
                                opacity: isReferencePopoverActive ? 1 : 0,
                                pointerEvents: isReferencePopoverActive ? "auto" : "none",
                                transition:
                                  "opacity 0.26s cubic-bezier(0.22, 1, 0.36, 1), transform 0.26s cubic-bezier(0.22, 1, 0.36, 1)",
                              }}
                            />
                            <span
                              onMouseEnter={() => {
                                setIsReferencePopoverVisible(true);
                                setIsReferencePopoverCardHovered(true);
                              }}
                              onMouseLeave={() => {
                                setIsReferencePopoverCardHovered(false);
                                setIsReferencePopoverVisible(false);
                              }}
                              style={{
                                position: "absolute",
                                top: "calc(100% + 12px)",
                                left: "50%",
                                transform: `translateX(-50%) ${isReferencePopoverActive ? "translateY(0) scale(1)" : "translateY(-6px) scale(0.98)"}`,
                                transformOrigin: "top center",
                                width: "368px",
                                height: "117px",
                                boxSizing: "border-box",
                                borderRadius: "12px",
                                backgroundColor: popoverBackgroundColor,
                                boxShadow: popoverShadow,
                                zIndex: 9999,
                                color: popoverPrimaryTextColor,
                                padding: "8px",
                                opacity: isReferencePopoverActive ? 1 : 0,
                                pointerEvents: isReferencePopoverActive ? "auto" : "none",
                                transition:
                                  "opacity 0.26s cubic-bezier(0.22, 1, 0.36, 1), transform 0.26s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.2s ease, box-shadow 0.2s ease",
                              }}
                            >
                                <span
                                  style={{
                                    position: "absolute",
                                    top: "-6px",
                                    left: "50%",
                                    width: "12px",
                                    height: "12px",
                                    backgroundColor: popoverBackgroundColor,
                                    transform: "translateX(-50%) rotate(45deg)",
                                    borderRadius: "2px",
                                  }}
                                />
                                <span
                                  style={{
                                    display: "flex",
                                    width: "352px",
                                    gap: "12px",
                                    padding: "8px",
                                    borderRadius: "8px",
                                    alignItems: "flex-start",
                                    cursor: "pointer",
                                    backgroundColor: isReferencePopoverCardHovered
                                      ? popoverCardHoverBackgroundColor
                                      : popoverCardBackgroundColor,
                                    transition: "background-color 0.2s ease",
                                  }}
                                >
                                  <span
                                    style={{
                                      flex: 1,
                                      minWidth: 0,
                                      display: "flex",
                                      flexDirection: "column",
                                      gap: "4px",
                                    }}
                                  >
                                    <span
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "6px",
                                        minWidth: 0,
                                      }}
                                    >
                                      <span
                                        style={{
                                          width: "20px",
                                          height: "20px",
                                          borderRadius: "999px",
                                          border: `0.5px solid ${popoverAvatarBorderColor}`,
                                          background: popoverAvatarBackground,
                                          overflow: "hidden",
                                          flexShrink: 0,
                                        }}
                                      >
                                        <img
                                          src="https://api.dicebear.com/9.x/notionists/svg?seed=Alexander"
                                          alt="Alexander avatar"
                                          style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            display: "block",
                                          }}
                                        />
                                      </span>
                                      <span
                                        style={{
                                          ...popoverMetaTextStyle,
                                          color: popoverMetaTextColor,
                                          minWidth: 0,
                                          overflow: "hidden",
                                          textOverflow: "ellipsis",
                                          whiteSpace: "nowrap",
                                        }}
                                      >
                                        Alexander
                                      </span>
                                    </span>
                                    <span
                                      style={{
                                        ...popoverTitleStyle,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                      }}
                                    >
                                      How can penguins stay warm in the freezing cold water?
                                    </span>
                                    <span
                                      style={{
                                        ...popoverMetaTextStyle,
                                        color: popoverSecondaryTextColor,
                                        overflow: "hidden",
                                        display: "-webkit-box",
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: "vertical",
                                      }}
                                    >
                                      Aug 26, 2025 — Penguins stay warm in freezing cold water through a combination of physiological adaptations, behavioral strategies, and specialized feathers.
                                    </span>
                                  </span>
                                  <span
                                    style={{
                                      position: "relative",
                                      width: "64px",
                                      height: "85px",
                                      borderRadius: "6px",
                                      overflow: "hidden",
                                      flexShrink: 0,
                                    }}
                                  >
                                    <img
                                      src="https://pub-36c8115632e74d30a6c7c587fefccbe4.r2.dev/BG-1.jpg"
                                      alt="Penguin source thumbnail"
                                      style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        display: "block",
                                      }}
                                    />
                                    <span
                                      style={{
                                        position: "absolute",
                                        left: "22px",
                                        top: "33px",
                                        width: "20px",
                                        height: "20px",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                      }}
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 25 27" fill="none" style={{ display: "block" }}>
                                        <g filter="url(#popoverPlayFilter)">
                                          <path d="M19.8249 13.0831C20.0421 12.5965 20.0421 12.0405 19.8249 11.554C19.6713 11.2101 19.3911 10.9657 19.0962 10.7586C18.804 10.5534 18.4114 10.3282 17.9382 10.0568L8.9047 4.8749C8.43556 4.60577 8.04612 4.38237 7.72367 4.23475C7.39802 4.08567 7.04783 3.96796 6.67536 4.00785C6.14772 4.06435 5.66873 4.34179 5.35717 4.77136C5.13724 5.0746 5.0651 5.43694 5.03238 5.79359C4.99998 6.14675 4.99999 6.59569 5 7.13655L5 17.5005C4.99999 18.0414 4.99998 18.4903 5.03238 18.8435C5.0651 19.2001 5.13724 19.5625 5.35717 19.8657C5.66872 20.2953 6.14772 20.5727 6.67536 20.6292C7.04783 20.6691 7.39802 20.5514 7.72367 20.4023C8.04613 20.2547 8.43557 20.0313 8.90472 19.7621L17.9382 14.5803C18.4114 14.3088 18.804 14.0837 19.0962 13.8784C19.3911 13.6713 19.6713 13.4269 19.8249 13.0831Z" fill="white" />
                                        </g>
                                        <defs>
                                          <filter id="popoverPlayFilter" x="-3.95898" y="-1.68164" width="30" height="30" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                            <feOffset dy="1" />
                                            <feGaussianBlur stdDeviation="2.5" />
                                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0" />
                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2203_35138" />
                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2203_35138" result="shape" />
                                          </filter>
                                        </defs>
                                      </svg>
                                    </span>
                                  </span>
                                </span>
                              </span>
                          </span>
                        </li>
                        <li style={{ ...bodyTextStyle, color: "var(--color-text-primary)" }}>
                          it is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      ...sectionTitleStyle,
                      fontSize: "17px",
                      lineHeight: 1.6000000448787914,
                    }}
                  >
                    Where can I get some
                  </div>
                  <ol
                    className="searchcard2-list"
                    style={{
                      ...listStyle,
                      listStyleType: "decimal",
                    }}
                  >
                    <li style={{ ...bodyTextStyle, color: "var(--color-text-primary)" }}>
                      It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum
                    </li>
                    <li style={{ ...bodyTextStyle, color: "var(--color-text-primary)" }}>
                      le English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                    </li>
                  </ol>
                </div>

                <div
                  style={{
                    fontFamily: "TikTok Sans, Inter, sans-serif",
                    fontSize: "12px",
                    fontWeight: 400,
                    lineHeight: 1.3,
                    color: "var(--color-text-muted)",
                  }}
                >
                  Summarized by AI for reference only.
                </div>
              </div>

              {isCollapsed && (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    paddingTop: "54px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    background: overlayBackground,
                  }}
                >
                  <div
                    onClick={() => {
                      setIsButtonHovered(false);
                      setIsCollapsed(false);
                    }}
                    onMouseEnter={() => setIsButtonHovered(true)}
                    onMouseLeave={() => setIsButtonHovered(false)}
                    style={buttonStyle}
                  >
                    <div
                      style={{
                        fontFamily: "TikTok Sans, Inter, sans-serif",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: 1.3,
                        color: "inherit",
                      }}
                    >
                      View more
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ display: "block", flexShrink: 0, transform: "rotate(180deg)" }}>
                      <path d="M7.7645 4.48557C7.89468 4.3554 8.10601 4.3554 8.23618 4.48557L13.6405 9.88987C13.7702 10.0199 13.7702 10.2305 13.6405 10.3606L13.0272 10.9739C12.897 11.104 12.6857 11.104 12.5555 10.9739L7.99985 6.41819L3.44517 10.9739C3.31502 11.104 3.10367 11.1039 2.97349 10.9739L2.3602 10.3606C2.23052 10.2305 2.23052 10.0199 2.3602 9.88987L7.7645 4.48557Z" fill="currentColor" />
                    </svg>
                  </div>
                </div>
              )}

              {!isCollapsed && (
                <div
                  onClick={() => {
                    setIsButtonHovered(false);
                    setIsCollapsed(true);
                  }}
                  onMouseEnter={() => setIsButtonHovered(true)}
                  onMouseLeave={() => setIsButtonHovered(false)}
                  style={{
                    ...buttonStyle,
                    marginTop: "16px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "TikTok Sans, Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: 600,
                      lineHeight: 1.3,
                      color: "inherit",
                    }}
                  >
                    View less
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ display: "block", flexShrink: 0 }}>
                    <path d="M7.7645 4.48557C7.89468 4.3554 8.10601 4.3554 8.23618 4.48557L13.6405 9.88987C13.7702 10.0199 13.7702 10.2305 13.6405 10.3606L13.0272 10.9739C12.897 11.104 12.6857 11.104 12.5555 10.9739L7.99985 6.41819L3.44517 10.9739C3.31502 11.104 3.10367 11.1039 2.97349 10.9739L2.3602 10.3606C2.23052 10.2305 2.23052 10.0199 2.3602 9.88987L7.7645 4.48557Z" fill="currentColor" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const VisualDiscoveryGallery = () => (
  <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "24px" }}>
    <SearchCard1 />
  </div>
);

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
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const section = document.getElementById(SECTIONS[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          currentActive = SECTIONS[i].id;
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
      setCurrentSlide((prev) => (prev + 1) % SLIDE_IMAGES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const target = document.getElementById(sectionId);
    if (target && lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        offset: -100, // Offset for top padding
        duration: 0.8, // Match the new faster global duration
      });
    } else if (target) {
      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: targetPosition - 100,
        behavior: "smooth",
      });
    }
  };

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

        .animate-content b,
        .animate-content strong {
          font-weight: 600;
        }
      `}</style>

      {/* Left Navigation */}
      <div className="animate-nav">
        {SECTIONS.map((section, index) => {
          const isActive = activeSection === section.id;
          const isHovered = hoveredSection === section.id;

          return (
            <div
              key={section.id}
              style={{ display: "flex", alignItems: "center", gap: "12px" }}
            >
              <a
                href={`#${section.id}`}
                className={`nav-link ${isActive ? "active" : "inactive"}`}
                onClick={(e) => handleNavClick(e, section.id)}
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
            <b>UI library</b> that enables an <b>elegant coexistence</b> between deep AI-driven
            answers and TikTok’s signature video feed.
          </Text>
        </TwoCol>


         <div style={{ width: "100%" }}>
          <img
            src="https://pub-36c8115632e74d30a6c7c587fefccbe4.r2.dev/TTsearchmobile.jpg"
            alt="Moat: Bug fixing & Components"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              borderRadius: "12px",
            }}
          />
        </div>

        <TwoCol
          
          subtitle="The Why Behind AI Integration"
          title="Capitalizing on Mobile Success to Unlock Web Potential"
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
           This architectural shift was directly informed by the <b>proven success on mobile</b>—where AI highlights boosted 
    <b> LT </b> and <b>Search PV </b>. By translating these insights to the desktop, 
    I led the mission to satisfy the <b>unique needs of web users</b> for deep topic research, 
    transforming a <b>high-penetration search surface</b> into a <b>high-efficiency discovery engine</b>.
          </Text>
        </TwoCol>

          <TwoCol
          
          subtitle="The Goal"
          title="Conservative Web Uplift Assumptions"
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
          Based on app holdout results and conservative web assumptions, de‑identified targets show:
          LT7 <mark style={{ backgroundColor: "rgba(34, 197, 94, 0.3)", color: "var(--color-text-primary)", padding: "0 4px", borderRadius: "4px", fontWeight: "600" }}><LockedData text="+0.06%" isUnlocked={isUnlocked} onClick={() => setShowPinOverlay(true)} /></mark> from lower web search penetration and a conservative MVP effectiveness estimate
          Search PV <mark style={{ backgroundColor: "rgba(34, 197, 94, 0.3)", color: "var(--color-text-primary)", padding: "0 4px", borderRadius: "4px", fontWeight: "600" }}><LockedData text="+0.2%" isUnlocked={isUnlocked} onClick={() => setShowPinOverlay(true)} /></mark> scaled from app holdout performance
          Stayduration <mark style={{ backgroundColor: "rgba(34, 197, 94, 0.3)", color: "var(--color-text-primary)", padding: "0 4px", borderRadius: "4px", fontWeight: "600" }}><LockedData text="+0.1%" isUnlocked={isUnlocked} onClick={() => setShowPinOverlay(true)} /></mark> as users scan more information
          Playduration <mark style={{ backgroundColor: "rgba(34, 197, 94, 0.3)", color: "var(--color-text-primary)", padding: "0 4px", borderRadius: "4px", fontWeight: "600" }}><LockedData text="-0.05%" isUnlocked={isUnlocked} onClick={() => setShowPinOverlay(true)} /></mark> since videos sit below the card
          </Text>
        </TwoCol>

        <SectionDivider />

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
                Approach #1
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
                Approach #2
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
              I replaced the mobile-first vertical layout with a <b>dual-column structure</b>. By repositioning images as <b>supplementary thumbnails</b> alongside the text, I eliminated the "scroll-to-visual" gap. This helped establish a clearer hierarchy, making it immediately obvious that the visuals were there to support the written content rather than compete with it. The layout also felt less overwhelming, allowing users to focus more naturally between reading and visual reference without constantly shifting attention.
            
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

          <TwoCol
          title="Why this height？"
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
           A <b>210×280px</b> module serves as the foundational unit, syncing text height with the card container to establish a consistent <b>vertical rhythm</b>. This logic is optimized for the <b>1536px viewport</b>, ensuring the primary cards align perfectly with the grid below. 

           By capping text width at <b>640px</b>—the gold standard for <b>readability</b>—the layout avoids visual fatigue. This constraint balances concise content with a compelling <b>teaser effect</b>, providing just enough information to drive engagement while maintaining a clean, symmetrical interface.
          </Text>
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

        <TwoCol
        
          title="Some results"
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
            Short-term experiment readout shows a lift in search-to-watch conversion and deeper reading engagement.
            LT7 <mark style={{ backgroundColor: "rgba(34, 197, 94, 0.3)", color: "var(--color-text-primary)", padding: "0 4px", borderRadius: "4px", fontWeight: "600" }}><LockedData text="+0.04%" isUnlocked={isUnlocked} onClick={() => setShowPinOverlay(true)} /></mark>,
            Search PV <mark style={{ backgroundColor: "rgba(34, 197, 94, 0.3)", color: "var(--color-text-primary)", padding: "0 4px", borderRadius: "4px", fontWeight: "600" }}><LockedData text="+0.15%" isUnlocked={isUnlocked} onClick={() => setShowPinOverlay(true)} /></mark>,
            Stayduration <mark style={{ backgroundColor: "rgba(34, 197, 94, 0.3)", color: "var(--color-text-primary)", padding: "0 4px", borderRadius: "4px", fontWeight: "600" }}><LockedData text="+0.08%" isUnlocked={isUnlocked} onClick={() => setShowPinOverlay(true)} /></mark>,
            Playduration <mark style={{ backgroundColor: "rgba(34, 197, 94, 0.3)", color: "var(--color-text-primary)", padding: "0 4px", borderRadius: "4px", fontWeight: "600" }}><LockedData text="-0.03%" isUnlocked={isUnlocked} onClick={() => setShowPinOverlay(true)} /></mark>.
          </Text>
        </TwoCol>


        {/* Divider */}
        <SectionDivider id="Generative_Typography" />

        <SectionHeader
          subtitle="Atomic Precision"
          title="The Design System: Mastering Generative Typography & Layout"
          titleWeight={400}
        />

        {/* Typography Playground */}
        <TypographyPlayground
          placeholderFontSize={placeholderFontSize}
          setPlaceholderFontSize={setPlaceholderFontSize}
          placeholderLineHeightPct={placeholderLineHeightPct}
          setPlaceholderLineHeightPct={setPlaceholderLineHeightPct}
          fontSizeRef={fontSizeRef}
          lineHeightRef={lineHeightRef}
          measureRef={measureRef}
        />

        {/* Typography Specs Card */}
        <TypographySpecsCard />


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
            gap: "24px",
          }}
          className="list-card"
        >
          <style>{`
            /* 彻底禁用可能导致横线的伪元素 */
            .list-card li::before { content: none !important; display: none !important; }
            .list-card li::after { content: none !important; display: none !important; }
            
            /* 恢复原生列表样式 */
            .list-card ul { list-style: disc outside !important; list-style-image: none !important; padding-left: 28px !important; margin: 0; }
            .list-card ul ul { list-style: circle outside !important; padding-left: 24px !important; }
            .list-card ol { list-style: decimal outside !important; list-style-image: none !important; padding-left: 28px !important; margin: 0; }
            
            /* 强制控制 Marker 颜色和内容，防止被继承样式覆盖 */
            .list-card ul li::marker { content: "• " !important; color: var(--color-text-primary) !important; font-size: 1.1em; }
            .list-card ul ul li::marker { content: "◦ " !important; color: var(--color-text-secondary) !important; font-size: 1.1em; }
            .list-card ol li::marker { content: counter(list-item) ". " !important; color: var(--color-text-primary) !important; }
            
            /* 确保 li 自身没有奇怪的背景或边框 */
            .list-card li { background: none !important; border: none !important; margin-bottom: 4px; }
          `}</style>
          <SpecRow label="Main Heading">
            <div style={{ color: "var(--color-text-primary)", fontSize: "16px" }}>
              <ul style={{ listStyleType: "disc", paddingLeft: "24px", margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                <li>
                  <Text span style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>Body Headline SemiBold:</Text> <Text span style={{ color: "var(--color-text-primary)" }}>Body Headline regular</Text>
                </li>
              </ul>
            </div>
          </SpecRow>

          <SpecRow label="Nested Section">
            <div style={{ color: "var(--color-text-primary)", fontSize: "16px" }}>
              <ul style={{ listStyleType: "disc", paddingLeft: "24px", margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                <li>
                  <Text span style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>Body Headline SemiBold:</Text> <Text span style={{ color: "var(--color-text-primary)" }}>Body Headline regular</Text>
                  <ul style={{ listStyleType: "circle", paddingLeft: "24px", display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
                    <li><Text span style={{ color: "var(--color-text-primary)" }}>Body Headline regular</Text></li>
                    <li><Text span style={{ color: "var(--color-text-primary)" }}>Body Headline regular</Text></li>
                  </ul>
                </li>
              </ul>
            </div>
          </SpecRow>

          <SpecRow label="Nested Numbering">
            <div style={{ color: "var(--color-text-primary)", fontSize: "16px" }}>
              <ul style={{ listStyleType: "disc", paddingLeft: "24px", margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                <li>
                  <Text span style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>Body Headline SemiBold:</Text> <Text span style={{ color: "var(--color-text-primary)" }}>Body Headline regular</Text>
                  <ol style={{ listStyleType: "decimal", paddingLeft: "24px", marginTop: "8px", display: "flex", flexDirection: "column", gap: "8px" }}>
                    <li><Text span style={{ color: "var(--color-text-primary)" }}>Body Headline regular</Text></li>
                    <li><Text span style={{ color: "var(--color-text-primary)" }}>Body Headline regular</Text></li>
                  </ol>
                </li>
              </ul>
            </div>
          </SpecRow>

          <SpecRow label="Numbered Heading">
            <div style={{ color: "var(--color-text-primary)", fontSize: "16px" }}>
              <ol style={{ listStyleType: "decimal", paddingLeft: "24px", margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                <li><Text span style={{ color: "var(--color-text-primary)" }}>Body Headline regular</Text></li>
                <li><Text span style={{ color: "var(--color-text-primary)" }}>Body Headline regular</Text></li>
              </ol>
            </div>
          </SpecRow>

          <SpecRow label="Quotation Section">
            <div style={{ borderLeft: "2px solid var(--color-border-default)", paddingLeft: "20px", color: "var(--color-text-secondary)", fontStyle: "italic", fontSize: "16px" }}>
              <Text span style={{ color: "var(--color-text-secondary)", fontStyle: "italic" }}>"Quoted Headline regular"</Text>
            </div>
          </SpecRow>
        </div>




       <TwoCol
          subtitle="System & Execution"
          title="Stress Testing: From Figma to Browser"
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
           AI outputs are unpredictable. To make the UI <b>resilient</b>, I mapped out every possible <b>Markdown combination</b>: from simple sentences to <b>deeply nested lists</b> and complex tables. I tested these "stress cases" directly in the browser to ensure the <b>visual structure</b> never breaks, no matter what the AI returns.
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
            gap: "24px",
          }}
          className="list-card-specs"
        >
          <style>{`
            .list-card-specs li::before { content: none !important; display: none !important; }
            .list-card-specs ul { list-style: disc outside !important; padding-left: 28px !important; margin: 0; }
            .list-card-specs ol { list-style: decimal outside !important; padding-left: 28px !important; margin: 0; }
            .list-card-specs li::marker { color: var(--color-text-primary) !important; }
            .list-card-specs li, .list-card-specs p, .list-card-specs h3 { margin: 0 !important; padding: 0 !important; }
          `}</style>
          
          <SpecRow label="Body Paragraph">
            <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
              <Text span style={{ fontSize: "16px", color: "var(--color-text-primary)" }}>Paragraph text paragraph text paragraph text paragraph text paragraph text.</Text>
              <MeasurementPill label="8PX" height="8px" />
              <Text span style={{ fontSize: "16px", color: "var(--color-text-primary)" }}>Paragraph text paragraph text paragraph text paragraph text paragraph text.</Text>
            </div>
          </SpecRow>

          <SpecRow label="Section Spacing">
            <div style={{ color: "var(--color-text-primary)", fontSize: "16px", position: "relative" }}>
              <ul style={{ listStyleType: "disc", paddingLeft: "24px", margin: 0, display: "flex", flexDirection: "column" }}>
                <li>
                  <Text span style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>Body Headline SemiBold:</Text> <Text span style={{ color: "var(--color-text-primary)" }}>Body</Text>
                </li>
                <MeasurementPill label="8PX" height="8px" />
                <li>
                  <Text span style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>Body Headline SemiBold:</Text> <Text span style={{ color: "var(--color-text-primary)" }}>Body</Text>
                </li>
              </ul>
            </div>
          </SpecRow>

          <SpecRow label="List Item Spacing">
            <div style={{ color: "var(--color-text-primary)", fontSize: "16px", position: "relative" }}>
              <ol style={{ listStyleType: "decimal", paddingLeft: "24px", margin: 0, display: "flex", flexDirection: "column" }}>
                <li>
                  <Text span style={{ color: "var(--color-text-primary)" }}>Body Headline regular</Text>
                </li>
                <MeasurementPill label="8PX" height="8px" />
                <li>
                  <Text span style={{ color: "var(--color-text-primary)" }}>Body Headline regular</Text>
                </li>
              </ol>
            </div>
          </SpecRow>

          <SpecRow label="Body Heading">
            <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
              <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
                <Text h3 style={{ fontSize: "20px", fontWeight: 700, margin: 0, color: "var(--color-text-primary)" }}>Body H3 Bold</Text>
                <MeasurementPill label="4PX" height="4px" />
                <Text span style={{ fontSize: "16px", color: "var(--color-text-primary)" }}>Paragraph text paragraph text paragraph text paragraph text paragraph text.</Text>
              </div>
              <MeasurementPill label="8PX" height="8px" />
              <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
                <Text h3 style={{ fontSize: "20px", fontWeight: 700, margin: 0, color: "var(--color-text-primary)" }}>Body H3 Bold</Text>
                <MeasurementPill label="4PX" height="4px" />
                <Text span style={{ fontSize: "16px", color: "var(--color-text-primary)" }}>Paragraph text paragraph text paragraph text paragraph</Text>
              </div>
            </div>
          </SpecRow>
        </div>

       <TwoCol
          subtitle="Visual Precision"
          title="Defining the Spatial Rhythm"
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
          I defined the <b>optimal vertical gapping</b> by testing the <b>rendering behavior</b> across different web browsers. By auditing how <b>paragraph margins</b> and <b>line-height</b> behave in real-world environments, I ensured that the <b>visual rhythm</b> remains consistent and comfortable on large screens.
          </Text>
        </TwoCol>

        <ResponsiveStressTable />

        <TwoCol
          subtitle="Data Density"
          title="Resilient Content Containment"
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
            To handle the <b>unpredictable nature of AI-generated tables</b>, I engineered a <b>horizontal overflow strategy</b> that preserves data integrity without breaking the page grid. By enforcing specific constraints—a <b>Table Max Width of 720px</b>, and individual cells with a <b>Max Width of 240px</b> and a <b>Min Width of 100px</b>—I ensured that even the most complex datasets remain readable and navigable on desktop displays, supported by <b>contextual overlays</b> for a seamless scanning experience.
          </Text>
        </TwoCol>
        <SearchCard2 />
       
       <SectionDivider id="Loading——Animation" />

        <SectionHeader
          subtitle="The animation"
          title="Designing the ‘Thinking’ Process: The Core of AI Interaction"
          titleWeight={400}
        />


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
                Option#1
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
                Option#2
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
                Option#3
              </Badge>
            </div>
          </div>

          {/* Video Container (Auto Height) */}
          <div
            style={{
              width: "100%",
              position: "relative",
              borderRadius: "12px",
              overflow: "hidden",
              backgroundColor: "var(--color-bg-secondary)",
            }}
          >
            <video
              src="https://pub-36c8115632e74d30a6c7c587fefccbe4.r2.dev/Scene-8_1_ftmykn.mp4"
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                display: activeCoreVideo === "challenge1" ? "block" : "none",
              }}
            />
            <video
              src="https://pub-36c8115632e74d30a6c7c587fefccbe4.r2.dev/Option1.mp4"
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                display: activeCoreVideo === "challenge2" ? "block" : "none",
              }}
            />
            <video
              src="https://pub-36c8115632e74d30a6c7c587fefccbe4.r2.dev/Option2.mp4"
              autoPlay
              loop
              muted
              playsInline
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
          subtitle="Iteration & Trade-offs"
          title="Evaluating Loading Strategies"
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
          AI responses aren't instant, creating a <b>latency gap</b> that can lead to user bounce. To manage this, I explored three distinct <b>loading strategies</b>, evaluating them based on <b>Visual Continuity</b> and <b>Layout Shift (CLS)</b>. While <b>Option 2</b> kept below-fold content static to avoid movement, it created awkward <b>white space</b> in weak network scenarios, appearing "broken." <b>Option 3</b> prioritized exposing organic search results earlier, but the <b>sudden layout jump</b> when AI content rendered was too <b>disruptive to the reading flow</b>.
          </Text>
        </TwoCol>




       <SectionDivider id="Visual_addons" />

        <SectionHeader
          subtitle="Visual add-ons"
          title="Beyond Utility: Elevating the Aesthetic Layer"
          titleWeight={400}
        />

        <VisualDiscoveryGallery />


        <TwoCol
          subtitle="Emotional Intelligence"
          title="Contextual Glow & Immersion"
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
          To make the AI feel more <b>intuitive and emotionally intelligent</b>, I explored an advanced <b>visual loading strategy</b>. I engineered a logic that <b>extracts prominent colors</b> directly from the video thumbnails. By applying this extracted palette as a subtle <b>background glow (Glow Effect)</b>, the interface adapts dynamically to the content, creating a seamless <b>visual harmony</b> between the loading state and the final revealed media.
          </Text>
        </TwoCol>

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
