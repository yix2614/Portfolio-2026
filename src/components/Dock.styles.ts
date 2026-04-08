import { CSSProperties } from "react";

export const dockContainerStyles: CSSProperties = {
  position: "relative",
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-end",
  width: "fit-content",
  margin: "0 auto",
  zIndex: 10,
};

// The outer glass container
export const dockGlassStyles: CSSProperties = {
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  borderRadius: "99em",
  backgroundColor: "color-mix(in srgb, var(--dock-glass) 12%, transparent)",
  backdropFilter: "blur(8px) saturate(var(--dock-saturation))",
  WebkitBackdropFilter: "blur(8px) saturate(var(--dock-saturation))",
  boxShadow:
    "inset 0 0 0 1px color-mix(in srgb, var(--dock-light) calc(var(--dock-reflex-light) * 10%), transparent), inset 1.8px 3px 0px -2px color-mix(in srgb, var(--dock-light) calc(var(--dock-reflex-light) * 90%), transparent), inset -2px -2px 0px -2px color-mix(in srgb, var(--dock-light) calc(var(--dock-reflex-light) * 80%), transparent), inset -3px -8px 1px -6px color-mix(in srgb, var(--dock-light) calc(var(--dock-reflex-light) * 60%), transparent), inset -0.3px -1px 4px 0px color-mix(in srgb, var(--dock-dark) calc(var(--dock-reflex-dark) * 12%), transparent), inset -1.5px 2.5px 0px -2px color-mix(in srgb, var(--dock-dark) calc(var(--dock-reflex-dark) * 20%), transparent), inset 0px 3px 4px -2px color-mix(in srgb, var(--dock-dark) calc(var(--dock-reflex-dark) * 20%), transparent), inset 2px -6.5px 1px -4px color-mix(in srgb, var(--dock-dark) calc(var(--dock-reflex-dark) * 10%), transparent), 0px 1px 5px 0px color-mix(in srgb, var(--dock-dark) calc(var(--dock-reflex-dark) * 10%), transparent), 0px 6px 16px 0px color-mix(in srgb, var(--dock-dark) calc(var(--dock-reflex-dark) * 8%), transparent)",
  height: "40px",
  padding: "8px",
  gap: "8px",
  zIndex: 2,
};

// The inner buttons container
export const dockButtonsStyles: CSSProperties = {
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  gap: "4px",
  padding: "0",
  height: "100%",
  borderRadius: "99em",
  backdropFilter: "none",
  WebkitBackdropFilter: "none",
  zIndex: 3,
};

export const dockSwitchContainerStyles: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "240px",
  height: "40px",
  marginRight: "12px",
  borderRadius: "99em",
  backgroundColor: "color-mix(in srgb, var(--dock-glass) 12%, transparent)",
  boxShadow:
    "inset 0 0 0 1px color-mix(in srgb, var(--dock-light) calc(var(--dock-reflex-light) * 10%), transparent), inset 1.8px 3px 0px -2px color-mix(in srgb, var(--dock-light) calc(var(--dock-reflex-light) * 90%), transparent), inset -2px -2px 0px -2px color-mix(in srgb, var(--dock-light) calc(var(--dock-reflex-light) * 80%), transparent), inset -3px -8px 1px -6px color-mix(in srgb, var(--dock-light) calc(var(--dock-reflex-light) * 60%), transparent), inset -0.3px -1px 4px 0px color-mix(in srgb, var(--dock-dark) calc(var(--dock-reflex-dark) * 12%), transparent), inset -1.5px 2.5px 0px -2px color-mix(in srgb, var(--dock-dark) calc(var(--dock-reflex-dark) * 20%), transparent), inset 0px 3px 4px -2px color-mix(in srgb, var(--dock-dark) calc(var(--dock-reflex-dark) * 20%), transparent), inset 2px -6.5px 1px -4px color-mix(in srgb, var(--dock-dark) calc(var(--dock-reflex-dark) * 10%), transparent), 0px 1px 5px 0px color-mix(in srgb, var(--dock-dark) calc(var(--dock-reflex-dark) * 10%), transparent), 0px 6px 16px 0px color-mix(in srgb, var(--dock-dark) calc(var(--dock-reflex-dark) * 8%), transparent)",
  overflow: "hidden",
};

export const dockSwitchOptionStyles: CSSProperties = {
  flex: 1,
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  background: "transparent",
  color: "var(--color-text-muted)",
  fontSize: "12px",
  fontFamily: "TikTok Sans, Inter, sans-serif",
  cursor: "pointer",
};

export const dockItemStyles: CSSProperties = {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  width: "24px",
  height: "24px",
};

export const iconContainerStyles: CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "25px", // Base radius
  backgroundColor: "transparent",
  position: "relative",
  zIndex: 2,
};

export const tooltipStyles: CSSProperties = {
  position: "absolute",
  left: "50%",
  top: "-26px",
  transform: "translateX(-50%)",
  backgroundColor: "rgb(51, 51, 51)",
  color: "rgb(187, 187, 187)",
  padding: "3px 7px 2px 7px", // Match social2 padding
  borderRadius: "5px",
  fontSize: "13px",
  fontFamily: '"Helvetica Neue Regular", "Helvetica Neue Regular Placeholder", sans-serif',
  whiteSpace: "pre",
  pointerEvents: "none",
  boxShadow: "0px 0px 0px 1px rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(4px)",
  WebkitBackdropFilter: "blur(4px)",
  zIndex: 1,
  // Initial state handled by motion
};

export const dotStyles: CSSProperties = {
  position: "absolute",
  width: "4px",
  height: "4px",
  borderRadius: "10px",
  backgroundColor: "rgb(153, 153, 153)", // Match social2 color
  bottom: "-8px", // social2 puts it roughly here? It's absolute in social2.
  // In social2: framer-11i2l8a is the dot. 
  // It's inside the item.
  // We'll position it absolutely relative to the item.
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 2,
};
