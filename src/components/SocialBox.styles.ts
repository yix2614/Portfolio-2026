import { CSSProperties } from "react";

export const socialBoxClasses = {
  contactHeader: "max-[600px]:!text-[8px] max-[1200px]:!left-[8px] max-[1200px]:!top-[8px]",
  infoGroup: "max-[1200px]:!px-[8px]",
  iconWrapper: "max-[600px]:!w-[16px] max-[600px]:!h-[16px]"
};

export const socialBoxStyles = {
  container: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundColor: "var(--color-bg-secondary, rgb(245, 245, 245))",
    borderRadius: "12px",
    border: "1px solid var(--color-border-strong, rgb(221, 221, 221))",
    overflow: "hidden",
    containerType: "inline-size",
  } as CSSProperties,
  imageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 0,
  } as CSSProperties,
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: "blur(49px)",
    opacity: 0.8,
    transition: "filter 0.3s ease, opacity 0.3s ease",
  } as CSSProperties,
  // Contact Header (Top Left)
  contactHeader: {
    fontFamily: '"Helvetica Neue Regular", "Helvetica Neue Regular Placeholder", sans-serif',
    fontSize: "12px",
    fontWeight: 400,
    color: "var(--color-text-muted, rgb(153, 153, 153))",
    margin: 0,
    position: "absolute",
    top: "12px",
    left: "16px",
    zIndex: 2,
  } as CSSProperties,
  overlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 1,
    pointerEvents: "none",
  } as CSSProperties,
  // Arrow Icon (Top Right)
  arrowContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "30%", // Or a specific fixed size like 84px based on your needs
    height: "auto", // Let aspect ratio dictate height
    aspectRatio: "1 / 1",
    zIndex: 2,
    opacity: 0.7,
    color: "var(--color-text-muted, rgb(153, 153, 153))",
    display: "flex",
    justifyContent: "flex-end", // Align right
    alignItems: "flex-start", // Align top
  } as CSSProperties,
  
  arrowIconShape: {
    width: "100%", // Stretch to parent wrapper
    height: "100%",
  } as CSSProperties,
  // Main Info Container (Phone & Email)
  infoContainer: {
    position: "absolute",
    top: "clamp(80px, 35cqw, 140px)",
    left: "0",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "clamp(12px, 6cqw, 24px)",
    zIndex: 2,
  } as CSSProperties,
  infoGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    padding: "0 clamp(8px, 4cqw, 16px)",
    width: "100%",
  } as CSSProperties,
  separator: {
    width: "100%",
    height: "1px",
    backgroundColor: "rgb(255, 255, 255)", // Fixed white, not theme variable
    opacity: 0.2,
  } as CSSProperties,
  rowContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingTop: "4px",
  } as CSSProperties,
  rowLabel: {
    fontFamily: '"Helvetica Neue Regular", "Helvetica Neue Regular Placeholder", sans-serif',
    fontSize: "clamp(8px, 4cqw, 16px)",
    color: "var(--color-text-muted, rgb(153, 153, 153))",
    margin: 0,
  } as CSSProperties,
  rowValueContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  } as CSSProperties,
  rowValue: {
    fontFamily: '"Helvetica Neue Regular", "Helvetica Neue Regular Placeholder", sans-serif',
    fontSize: "clamp(8px, 5cqw, 18px)",
    color: "rgba(255, 255, 255, 0.7)", // Fixed white with opacity
    margin: 0,
    textAlign: "right",
    // User requested no underline for phone/email
    cursor: "pointer",
    whiteSpace: "nowrap",
  } as CSSProperties,
  // Resume Section (Bottom Center)
  resumeContainer: {
    position: "absolute",
    bottom: "clamp(60px, 22cqw, 90px)",
    left: "0",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "4px", 
    zIndex: 2,
    padding: "0 clamp(8px, 4cqw, 16px)",
  } as CSSProperties,
  resumeContent: {
    display: "flex",
    flexDirection: "row", // Changed to row
    justifyContent: "space-between", // Space between Other and Resume
    alignItems: "flex-start",
    width: "100%",
    paddingTop: "4px", // Padding after separator
  } as CSSProperties,
  resumeLabel: {
    fontFamily: '"Helvetica Neue Regular", "Helvetica Neue Regular Placeholder", sans-serif',
    fontSize: "clamp(8px, 4cqw, 16px)",
    color: "var(--color-text-muted, rgb(153, 153, 153))",
    margin: 0,
  } as CSSProperties,
  resumeLink: {
    fontFamily: '"Helvetica Neue Regular", "Helvetica Neue Regular Placeholder", sans-serif',
    fontSize: "clamp(8px, 5cqw, 18px)",
    color: "rgba(255, 255, 255, 0.7)", // Fixed white with opacity
    textTransform: "capitalize",
    margin: 0,
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "color 0.2s ease", // Add transition for hover
  } as CSSProperties,
  // Social Icons (Bottom Center)
  socialIcons: {
    display: "flex",
    flexDirection: "row",
    gap: "17px",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: "12px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 2,
    width: "100%",
  } as CSSProperties,
  icon: {
    width: "24px",
    height: "24px",
    color: "rgb(255, 255, 255)", // Fixed white
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  } as CSSProperties,
};
