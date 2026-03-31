import { CSSProperties } from "react";

export const horizontalScrollSectionStyles = {
  section: {
    position: "relative",
    height: "300vh",
    backgroundColor: "var(--color-bg-page, #ffffff)",
  } as CSSProperties,
  stickyContainer: {
    position: "sticky",
    top: 0,
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    overflow: "hidden",
  } as CSSProperties,
  header: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingLeft: "8px", // padding-x 8px
    paddingRight: "8px", // padding-x 8px
    paddingTop: "24px", // padding-y 24px
    paddingBottom: "24px", // padding-y 24px
    flex: "none",
  } as CSSProperties,
  title: {
    fontSize: "90px", // text-[90px]
    lineHeight: 1, // leading-none
    letterSpacing: "-0.025em", // tracking-tight
    color: "#E6E6E6",
    fontFamily: 'Helvetica, sans-serif',
    fontWeight: 400,
    margin: 0,
    width: "60%", // 60% width
  } as CSSProperties,
  metaContainer: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between", // Distribute children
    width: "40%", // 40% width
    paddingTop: "16px", // pt-4
  } as CSSProperties,
  metaItem: {
    display: "flex",
    flexDirection: "column",
    gap: "4px", // gap-1
  } as CSSProperties,
  metaLabel: {
    fontSize: "12px", // text-xs
    color: "#E6E6E6",
    fontFamily: 'Helvetica, sans-serif',
  } as CSSProperties,
  metaValue: {
    fontSize: "14px", // text-sm
    color: "#E6E6E6",
    fontFamily: 'Helvetica, sans-serif',
  } as CSSProperties,
  pillIndicator: {
    width: "72px",
    height: "12px",
    backgroundColor: "#E6E6E6",
    borderRadius: "9999px",
    position: "relative",
    display: "flex",
    alignItems: "center",
    paddingLeft: "4px",
    paddingRight: "4px",
  } as CSSProperties,
  pillCircle: {
    width: "24px",
    height: "8px",
    backgroundColor: "white",
    borderRadius: "9999px",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  } as CSSProperties,
  scrollContent: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    width: "100%",
  } as CSSProperties,
  motionContainer: {
    display: "flex",
    gap: "32px", // gap-8
    alignItems: "center",
    width: "max-content", // w-max
    paddingLeft: "8px", // px-2
    paddingRight: "8px", // px-2
  } as CSSProperties,
};
