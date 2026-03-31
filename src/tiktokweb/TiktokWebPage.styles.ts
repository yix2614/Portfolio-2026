import { CSSProperties } from "react";

export const tiktokWebPageStyles = {
  page: {
    width: "100%",
    backgroundColor: "transparent", // Changed from rgb(195, 196, 200) to transparent
    color: "#000",
    fontFamily: "var(--font-tiktok)",
    position: "relative",
    zIndex: 1, // Ensure content is above background
  } as CSSProperties,
  landingSection: {
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    position: "relative",
    boxSizing: "border-box",
  } as CSSProperties,
  container: {
    width: "100vw",
    maxWidth: "100vw",
    height: "100%", // Fill landing section
    margin: "0",
    display: "flex",
    flexDirection: "column",
    gap: "0",
    padding: "32px 40px 0",
    overflow: "hidden",
    position: "relative", // Ensure children positioning context
  } as CSSProperties,
  titleScaleOuter: {
    width: "1840px",
    maxWidth: "1840px",
    boxSizing: "border-box",
  } as CSSProperties,
  titleScaleInner: {
    width: "1840px",
    maxWidth: "1840px",
    transformOrigin: "top left",
  } as CSSProperties,
  fixedSection: {
    width: "100%",
  } as CSSProperties,
  title: {
    fontSize: "120px",
    fontWeight: 400,
    lineHeight: "100%",
    margin: "0",
    letterSpacing: "0",
    color: "#A0A0A0",
    fontFamily: 'var(--TikTok-Sans, "TikTok Sans")',
    width: "100%",
  } as CSSProperties,
  titleLine: {
    display: "block",
  } as CSSProperties,
  divider: {
    width: "100%",
    height: "1px",
    backgroundColor: "rgb(164, 165, 169)",
  } as CSSProperties,
  // Figma: Frame 2147238235 (Root Container)
  metaContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "24px",
    marginTop: "32px",
    alignItems: "flex-start",
    width: "100%",
    justifyContent: "space-between", // Add this to ensure spacing
  } as CSSProperties,

  // Figma: Frame 2147238234 (Left Column: Role + Credit)
  metaColumnLeft: {
    display: "flex",
    flexDirection: "column",
    gap: "42px",
    width: "492px",
    flexShrink: 0,
  } as CSSProperties,

  // Figma: Generic Row Layout (Label + Value)
  metaRow: {
    display: "flex",
    flexDirection: "row",
    gap: "20px",
    alignItems: "flex-start",
  } as CSSProperties,

  // Figma: Label Style (Role, Responsibilities, Time, Credit)
  metaLabel: {
    fontFamily: "var(--font-tiktok)",
    fontSize: "10px",
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: "#696969",
    width: "135px",
    flexShrink: 0,
    lineHeight: "1.3",
  } as CSSProperties,

  // Figma: Value Style
  metaText: {
    fontFamily: "var(--font-tiktok)",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "1.3",
    color: "#2B2B2B",
    whiteSpace: "pre-line",
  } as CSSProperties,

  // Figma: Responsibilities (Middle Column)
  metaColumnMiddle: {
    display: "flex",
    flexDirection: "row",
    gap: "20px",
    flex: 1, // Fill remaining space
  } as CSSProperties,

  // Figma: Time (Right Column)
  metaColumnRight: {
    display: "flex",
    flexDirection: "row",
    gap: "20px",
    justifyContent: "flex-end", // Align right?
    // Figma says Time label width 135px, but layout is Row.
    // If we want it on the right, we might need flex-end or specific width.
    // Let's assume standard row layout for now, but aligned right in container.
  } as CSSProperties,
  metaGridSecondary: {
    display: "grid",
    gridTemplateColumns: "minmax(280px, 30%) minmax(360px, 1fr) auto",
    gap: "0 40px",
    marginTop: "40px",
  } as CSSProperties,

  // Figma: Card 1581:54405
  cardContainer: {
    width: "360px",
    backgroundColor: "#232323",
    borderRadius: "14px",
    padding: "14px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    position: "absolute", // Assuming fixed/absolute bottom left
    bottom: "16px", // Updated to 16px
    left: "20px", // Updated to 20px
    boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
    zIndex: 10,
  } as CSSProperties,
  cardImage: {
    width: "100%",
    height: "auto",
    aspectRatio: "372 / 206", // Original Figma size ratio
    backgroundColor: "#333", // Placeholder
    borderRadius: "8px",
    objectFit: "cover",
  } as CSSProperties,
  cardBottom: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
  } as CSSProperties,
  cardTextCol: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    flex: 1,
  } as CSSProperties,
  cardTitle: {
    fontFamily: "var(--font-tiktok)",
    fontSize: "14px",
    fontWeight: 500,
    color: "#FFFFFF",
    lineHeight: "1.3",
  } as CSSProperties,
  cardSubtitle: {
    fontFamily: "var(--font-tiktok)",
    fontSize: "10px",
    fontWeight: 400,
    color: "#979595",
    lineHeight: "1.3",
  } as CSSProperties,
  cardButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "4px",
    backgroundColor: "#000000",
    borderRadius: "999px",
    padding: "6px 16px",
    height: "32px",
    cursor: "pointer",
    border: "none",
  } as CSSProperties,
  cardButtonText: {
    fontFamily: "var(--font-tiktok)",
    fontSize: "12px",
    fontWeight: 500,
    color: "#FFFFFF",
  } as CSSProperties,
  contentSection: {
    maxWidth: "720px",
    width: "100%",
    margin: "0 auto",
    padding: "100px 20px",
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#333",
    boxSizing: "border-box",
  } as CSSProperties,
};
