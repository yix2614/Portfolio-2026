import { CSSProperties } from "react";

export const tiktokWebPageStyles = {
  page: {
    width: "100%",
    backgroundColor: "var(--color-bg-page)",
    color: "var(--color-text-primary)",
    fontFamily: "var(--font-tiktok)",
    position: "relative",
    zIndex: 1, // Ensure content is above background
  } as CSSProperties,
  landingSection: {
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    position: "sticky",
    top: "0",
    zIndex: 1,
    boxSizing: "border-box",
  } as CSSProperties,
  container: {
    width: "100%",
    maxWidth: "100%",
    height: "100%", // Fill landing section
    margin: "0",
    display: "flex",
    flexDirection: "column",
    gap: "0",
    padding: "32px 40px 0",
    overflow: "visible",
    position: "relative", // Ensure children positioning context
    boxSizing: "border-box",
  } as CSSProperties,
  titleScaleOuter: {
    width: "100%",
    maxWidth: "100%",
    boxSizing: "border-box",
    overflow: "hidden",
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
    color: "var(--color-text-muted)",
    fontFamily: 'var(--TikTok-Sans, "TikTok Sans")',
    width: "100%",
  } as CSSProperties,
  titleLine: {
    display: "block",
    whiteSpace: "nowrap",
  } as CSSProperties,
  divider: {
    width: "100%",
    height: "1px",
    backgroundColor: "var(--color-border-default)",
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
    width: "calc(25% - 16px)",
    flex: "0 0 calc(25% - 16px)",
    boxSizing: "border-box",
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
    color: "var(--color-text-muted)",
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
    color: "var(--color-text-primary)",
    whiteSpace: "pre-line",
  } as CSSProperties,

  // Figma: Responsibilities (Middle Column)
  metaColumnMiddle: {
    display: "flex",
    flexDirection: "row",
    gap: "20px",
    width: "calc(25% - 16px)",
    flex: "0 0 calc(25% - 16px)",
    boxSizing: "border-box",
  } as CSSProperties,

  // Figma: Time (Right Column)
  metaColumnRight: {
    display: "flex",
    flexDirection: "row",
    gap: "20px",
    justifyContent: "flex-end", // Align right?
    width: "calc(50% - 16px)",
    flex: "0 0 calc(50% - 16px)",
    boxSizing: "border-box",
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
    backgroundColor: "var(--color-bg-secondary)",
    borderRadius: "14px",
    padding: "14px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    position: "fixed",
    bottom: "16px", // Updated to 16px
    right: "20px",
    boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
    zIndex: 10,
  } as CSSProperties,
  cardImage: {
    width: "100%",
    height: "auto",
    aspectRatio: "auto", // Let the video dictate the natural ratio
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
    color: "var(--color-text-primary)",
    lineHeight: "1.3",
  } as CSSProperties,
  cardSubtitle: {
    fontFamily: "var(--font-tiktok)",
    fontSize: "10px",
    fontWeight: 400,
    color: "var(--color-text-muted)",
    lineHeight: "1.3",
  } as CSSProperties,
  cardButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "4px",
    backgroundColor: "var(--color-bg-page)",
    borderRadius: "999px",
    paddingTop: "2px",
    paddingBottom: "2px",
    paddingLeft: "16px",
    paddingRight: "16px",
    height: "32px",
    cursor: "pointer",
    border: "none",
  } as CSSProperties,
  cardButtonText: {
    fontFamily: "var(--font-tiktok)",
    fontSize: "12px",
    fontWeight: 500,
    color: "var(--color-text-primary)",
  } as CSSProperties,
  contentSection: {
    width: "100vw",
    margin: 0,
    padding: "120px 0",
    fontSize: "14px",
    lineHeight: 1.6,
    color: "var(--color-text-primary)",
    boxSizing: "border-box",
    position: "relative",
    zIndex: 2,
    backgroundColor: "var(--color-bg-page)"
  } as CSSProperties,
  contentInner: {
    width: "840px",
    maxWidth: "840px",
    margin: "0 auto",
    padding: "0 20px",
    boxSizing: "border-box",
  } as CSSProperties,
  dockWrapper: {
    position: "fixed",
    bottom: "8px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 100,
  } as CSSProperties,
};
