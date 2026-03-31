import { CSSProperties } from "react";

export const clientsBoxClasses = {
  header: "max-[1200px]:!p-[8px]"
};

export const clientsBoxStyles = {
  container: {
    width: "100%",
    height: "100%",
    minHeight: "0",
    backgroundColor: "var(--color-bg-secondary, rgb(245, 245, 245))",
    border: "1px solid var(--color-border-default, rgb(219, 219, 219))",
    borderRadius: "20px",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Center the content container horizontally
    containerType: "inline-size",
  } as CSSProperties,

  header: {
    padding: "clamp(12px, 3cqw, 24px) clamp(16px, 4cqw, 32px)",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
    pointerEvents: "none",
  } as CSSProperties,

  headerText: {
    fontFamily: '"Helvetica Neue Regular", "Helvetica Neue", sans-serif',
    fontSize: "clamp(16px, 6cqw, 48px)",
    color: "var(--color-text-muted, rgb(153, 153, 153))",
    margin: 0,
    textAlign: "left",
  } as CSSProperties,

  // Container for the content (Moon + Ticker)
  // Ratio: 536.5 / 181 ≈ 2.964
  contentContainer: {
    position: "absolute",
    bottom: "20px",
    width: "96%",
    aspectRatio: "536.5 / 181",
  } as CSSProperties,

  // The white shape background (Moon)
  backgroundContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
  } as CSSProperties,

  // The Ticker area
  tickerContainer: {
    position: "absolute",
    top: "50%",
    left: 0,
    width: "100%",
    height: "48%",
    transform: "translateY(-50%)",
    zIndex: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    overflow: "hidden",
    // Mask for fade effect on edges
    maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
    WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
  } as CSSProperties,
  
  tickerPlaceholder: {
      width: "100%",
      height: "100%",
  } as CSSProperties,

  tickerMotion: {
      display: 'flex', 
      gap: '40px', 
      alignItems: 'center', 
      paddingRight: '40px',
  } as CSSProperties,

  tickerLogo: {
      flexShrink: 0, 
      color: 'var(--color-text-muted, #999)', 
      display: 'flex', 
      alignItems: 'center',
  } as CSSProperties,
};
