import { CSSProperties } from "react";

export const overlayBackdropStyles: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 50,
  overflowY: "auto",
  backgroundColor: "rgba(66, 66, 66, 0.67)",
  backdropFilter: "blur(15px)",
  WebkitBackdropFilter: "blur(15px)",
};

export const mainContainerStyles: CSSProperties = {
  width: "100%",
  minHeight: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingLeft: "40px", // px-10
  paddingRight: "40px",
  paddingBottom: "40px", // pb-10
  position: "relative",
};

export const closeButtonContainerStyles: CSSProperties = {
  position: "sticky",
  top: 0,
  zIndex: 50,
  width: "100%",
  display: "flex",
  justifyContent: "flex-end",
  paddingTop: "20px", // py-5
  paddingBottom: "20px",
  pointerEvents: "none",
};

export const closeButtonStyles: CSSProperties = {
  width: "36px", // w-9
  height: "36px", // h-9
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "auto",
  background: "none",
  border: "none",
  cursor: "pointer",
};

export const headerStyles: CSSProperties = {
  display: "flex",
  width: "100%",
  maxWidth: "1360px",
  paddingTop: "100px",
  paddingBottom: "20px",
  fontSize: "10px",
  color: "rgba(255, 255, 255, 0.65)",
  fontFamily: '"Helvetica Neue Regular", sans-serif',
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  opacity: 0.65,
};

export const projectsListStyles: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: "1360px",
};
