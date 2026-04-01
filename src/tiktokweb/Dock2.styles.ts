import { CSSProperties } from "react";

export const dock2ContainerStyles: CSSProperties = {
  position: "relative",
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-end",
  width: "fit-content",
  margin: "0 auto",
  zIndex: 10,
};

export const dock2GlassStyles: CSSProperties = {
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  boxSizing: "border-box",
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

export const dock2ButtonsStyles: CSSProperties = {
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

export const dock2ModeSwitchContainerStyles: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "80px",
  height: "40px",
  marginRight: "12px",
  borderRadius: "99em",
  overflow: "hidden",
  position: "relative",
  cursor: "pointer",
};

export const dock2ModeSwitchBgStyles: CSSProperties = {
  position: "absolute",
  inset: "4px",
  borderRadius: "99em",
  backgroundColor: "color-mix(in srgb, var(--dock-glass) 18%, transparent)",
  zIndex: 1,
};

export const dock2ModeKnobStyles: CSSProperties = {
  height: "100%",
  aspectRatio: "1 / 1",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  overflow: "hidden",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  zIndex: 2,
};

export const dock2ModeKnobLight: CSSProperties = {
  backgroundColor: "rgb(240, 92, 0)",
};

export const dock2ModeKnobDark: CSSProperties = {
  backgroundColor: "rgba(0, 0, 0, 0)",
};

export const dock2ModeMoonIcon: CSSProperties = {
  width: "100%",
  height: "100%",
  fill: "var(--color-text-primary, rgb(51, 51, 51))",
};

export const dock2ItemStyles: CSSProperties = {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  width: "24px",
  height: "24px",
};

export const dock2IconContainerStyles: CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "25px",
  backgroundColor: "transparent",
  position: "relative",
  zIndex: 2,
};

export const dock2TooltipStyles: CSSProperties = {
  position: "absolute",
  left: "50%",
  top: "-26px",
  transform: "translateX(-50%)",
  backgroundColor: "rgb(51, 51, 51)",
  color: "rgb(187, 187, 187)",
  padding: "3px 7px 2px 7px",
  borderRadius: "5px",
  fontSize: "13px",
  fontFamily: '"Helvetica Neue Regular", "Helvetica Neue Regular Placeholder", sans-serif',
  whiteSpace: "pre",
  pointerEvents: "none",
  boxShadow: "0px 0px 0px 1px rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(4px)",
  WebkitBackdropFilter: "blur(4px)",
  zIndex: 1,
};
