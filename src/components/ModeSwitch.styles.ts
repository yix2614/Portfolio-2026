import { CSSProperties } from "react";

export const modeSwitchStyles = {
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "var(--color-bg-secondary, rgb(245, 245, 245))",
    borderRadius: "999px",
    border: "1px solid var(--color-border-default, rgb(219, 219, 219))",
    display: "flex",
    alignItems: "center",
    padding: "4%", // Changed from fixed 8px to percentage based on width
    cursor: "pointer",
    boxSizing: "border-box",
    boxShadow: "0px 0.36px 1.23px -1px rgba(0, 0, 0, 0.07), 0px 1.37px 4.67px -2px rgba(0, 0, 0, 0.07), 0px 6px 20.4px -3px rgba(0, 0, 0, 0.05)",
    position: "relative",
  } as CSSProperties,

  knob: {
    height: "100%",
    aspectRatio: "1 / 1",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  } as CSSProperties,

  // Orange circle state (Light mode)
  knobLight: {
    backgroundColor: "rgb(240, 92, 0)", // Brand orange, might not have a token yet
  } as CSSProperties,

  // Transparent state (Dark mode)
  knobDark: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  } as CSSProperties,

  moonIcon: {
    width: "100%",
    height: "100%",
    fill: "var(--color-text-primary, rgb(51, 51, 51))",
  } as CSSProperties,
};
