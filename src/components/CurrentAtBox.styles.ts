import { CSSProperties } from "react";

export const currentAtBoxClasses = {
  headerText: "max-[1200px]:!top-[8px] max-[1200px]:!left-[8px] max-[600px]:!text-[8px]",
  topRightIcon: "max-[1200px]:!top-[8px] max-[1200px]:!right-[8px] max-[600px]:!w-[16px] max-[600px]:!h-[16px]",
  bottomTextContainer: "max-[1200px]:!right-[8px] max-[1200px]:!bottom-[8px]",
  roleText: "max-[600px]:!text-[8px]",
  companyText: "max-[600px]:!text-[8px]"
};

export const currentAtBoxStyles = {
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundColor: "var(--color-bg-secondary, rgb(245, 245, 245))",
    borderRadius: "12px",
    border: "1px solid var(--color-border-default, rgb(219, 219, 219))",
    boxShadow: "0px 0.36px 1.23px -1px rgba(0, 0, 0, 0.07), 0px 1.37px 4.67px -2px rgba(0, 0, 0, 0.07), 0px 6px 20.4px -3px rgba(0, 0, 0, 0.05)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  } as CSSProperties,

  // Top Left "Currently at"
  headerText: {
    position: "absolute",
    top: "12px",
    left: "16px",
    fontFamily: '"Helvetica Neue Regular", "Helvetica Neue Regular Placeholder", sans-serif',
    fontSize: "12px",
    color: "rgb(153, 153, 153)",
    margin: 0,
    zIndex: 10,
    pointerEvents: "none",
  } as CSSProperties,

  // Top Right Icon
  topRightIcon: {
    position: 'absolute' as const,
    top: '12px',
    right: '12px',
    width: '16px',
    height: '16px',
    opacity: 0.57,
    zIndex: 10
  },

  // Bottom Right Text Group
  bottomTextContainer: {
    position: "absolute",
    bottom: "12px",
    right: "12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "0px",
    zIndex: 10,
    pointerEvents: "none",
  } as CSSProperties,

  roleText: {
    fontFamily: '"Helvetica Neue Regular", "Helvetica Neue Regular Placeholder", sans-serif',
    fontSize: "10px",
    color: "rgb(187, 187, 187)",
    textAlign: "right",
    margin: 0,
  } as CSSProperties,

  companyText: {
    fontFamily: '"Helvetica Neue Regular", "Helvetica Neue Regular Placeholder", sans-serif',
    fontSize: "10px",
    color: "rgb(187, 187, 187)",
    textAlign: "right",
    margin: 0,
  } as CSSProperties,

  // Inner TikTok Animation Container
  animationContainer: {
    width: "85%",
    aspectRatio: "1 / 1",
    position: "relative",
    overflow: "visible", // Inner content might overflow slightly or need to be visible
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  } as CSSProperties,

  // TikTok Animation Internal Elements
  tiktokWrapper: {
    width: "100%",
    height: "100%",
    position: "relative",
    overflow: "visible", // Changed from hidden to avoid hard edges
    borderRadius: "0px", 
  } as CSSProperties,

  tiktokBg: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgb(221, 221, 221)",
    borderRadius: "999px",
    filter: "blur(15px)",
    WebkitFilter: "blur(15px)",
    opacity: 0,
  } as CSSProperties,

  tiktokGif: {
    position: "absolute",
    top: "51%",
    left: "50%",
    width: "90%",
    height: "auto",
    transform: "translate(-50%, -50%)",
    objectFit: "cover",
  } as CSSProperties,

  tiktokGlass: {
    position: "absolute",
    top: "-20px",
    left: "50%",
    width: "120%",
    height: "120%", // aspect ratio 1/1 + extra
    transform: "translateX(-50%)",
    backgroundColor: "rgba(255, 255, 255, 0)",
  } as CSSProperties,

  tiktokText: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "60%",
    height: "auto",
    transform: "translate(-50%, -50%)",
    filter: "blur(14px)",
    WebkitFilter: "blur(14px)",
  } as CSSProperties,
};
