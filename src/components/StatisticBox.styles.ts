import { CSSProperties } from "react";

export const statisticBoxClasses = {
  header: "max-[600px]:!text-[8px] max-[1200px]:!left-[8px] max-[1200px]:!top-[8px]",
  infoGroup: "max-[1200px]:!px-[8px]",
  rowContent: "max-[600px]:!pb-[4px] max-[600px]:!pt-[2px]",
  text8px: "max-[600px]:!text-[8px]",
  radarWrapper: "max-[1200px]:!px-[8px]"
};

export const statisticBoxStyles = {
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
  // Header (Top Left)
  header: {
    position: "absolute",
    top: "12px",
    left: "16px",
    zIndex: 2,
    fontFamily: '"Helvetica Neue Regular", "Helvetica Neue Regular Placeholder", sans-serif',
    fontSize: "12px",
    color: "var(--color-text-muted, rgb(153, 153, 153))",
    margin: 0,
    whiteSpace: "pre",
  } as CSSProperties,
  // Main Info Container (Mileage)
  infoContainer: {
    position: "absolute",
    top: "46px",
    left: "0",
    width: "100%",
    height: "calc(100% - 46px)", // Take up remaining height
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between", // Distribute gap
    zIndex: 2,
    alignItems: "center",
    padding: 0,
  } as CSSProperties,
  infoGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    padding: "0 16px",
    width: "100%",
    marginTop: "8px", // Push down a bit from header
  } as CSSProperties,
  separator: {
    width: "100%",
    height: "1px",
    backgroundColor: "var(--color-border-strong, rgb(221, 221, 221))",
    marginBottom: "6px",
  } as CSSProperties,
  rowContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingBottom: "6px",
  } as CSSProperties,
  rowLabel: {
    fontFamily: '"Inter", sans-serif',
    fontSize: "12px",
    color: "var(--color-text-disabled, rgb(187, 187, 187))",
    margin: 0,
  } as CSSProperties,
  rowValue: {
    fontFamily: '"Helvetica Neue Regular", "Helvetica Neue Regular Placeholder", sans-serif',
    fontSize: "12px",
    color: "var(--color-text-disabled, rgb(187, 187, 187))",
    margin: 0,
    textAlign: "right",
    lineHeight: "1em",
  } as CSSProperties,
  trackContainer: {
    width: "100%",
    height: "auto",
    position: "relative",
    marginTop: "10px",
    aspectRatio: "4.337899543378995 / 1",
  } as CSSProperties,
  
  // Bottom Container (Holds Full Stack & Projects)
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "56%",
    zIndex: 2,
    display: "flex",
    flexDirection: "row",
    padding: "40px 16px 0px 16px",
    gap: "20px",
    boxSizing: "border-box",
    backgroundColor: "var(--color-bg-tertiary, rgb(235, 235, 235))",
    borderRadius: "12px",
  } as CSSProperties,
  
  // Full Stack Box (Left)
  fullStackBox: {
    flex: 1,
    height: "100%",
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
    // Base styles (non-hover)
    // backgroundColor: "rgb(245, 245, 245)", // Removed to allow bottomContainer bg to show (quarter circle effect)
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
    borderBottomLeftRadius: "12px",
    borderBottomRightRadius: "12px",
  } as CSSProperties,
  fullStackCirclesContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
  } as CSSProperties,
  fullStackText: {
    position: "absolute",
    bottom: "4px",
    left: "4px",
    fontFamily: '"Helvetica Neue Regular", "Helvetica Neue Regular Placeholder", sans-serif',
    fontSize: "12px",
    color: "var(--color-text-inverse, rgb(255, 255, 255))",
    margin: 0,
    zIndex: 10,
    pointerEvents: "none",
  } as CSSProperties,

  // Circle Styles
  outerCircle: {
    width: "200%",
    aspectRatio: "1 / 1",
    borderRadius: "999px",
    position: "absolute",
    top: "103%",
    left: "0%",
    transform: "translate(-50%, -50%)",
    zIndex: 1,
  } as CSSProperties,
  innerCircle: {
    width: "80%",
    aspectRatio: "1 / 1",
    borderRadius: "999px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  } as CSSProperties,

  // Projects Box (Right)
  projectsBox: {
    flex: 1,
    height: "100%",
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
    // Base styles (non-hover)
    backgroundColor: "var(--color-bg-secondary, rgb(245, 245, 245))", 
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
    borderBottomLeftRadius: "12px",
    borderBottomRightRadius: "12px",
  } as CSSProperties,
  chartContainer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    height: "auto",
    aspectRatio: "0.53 / 1",
  } as CSSProperties,
  projectsText: {
    position: "absolute",
    bottom: "4px",
    left: "4px",
    fontFamily: '"Helvetica Neue Regular", "Helvetica Neue Regular Placeholder", sans-serif',
    fontSize: "12px",
    color: "var(--color-text-inverse, rgb(255, 255, 255))",
    margin: 0,
    zIndex: 10,
  } as CSSProperties,
  
  // Wave Animation
  waveWrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  } as CSSProperties,

  // Radar Chart
  radarWrapper: {
    width: "100%",
    padding: "0 16px",
    marginTop: "auto", // This forces it to align to the bottom
    flexShrink: 0,
    backgroundColor: "var(--color-bg-tertiary)",
    borderRadius: "12px", // All corners 12px to match StatisticBox container
    aspectRatio: "1 / 1", // Set the requested aspect ratio to 1:1
  } as CSSProperties,
  
  radarChartContainer: {
    width: "100%",
    height: "100%", // Match parent aspect ratio instead of 1/1
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0",
  } as CSSProperties,
};
