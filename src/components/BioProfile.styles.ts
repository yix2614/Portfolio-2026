import { CSSProperties } from "react";

export const bioProfileClasses = {
  timeText: "max-[1200px]:!text-[8px]",
  dividerWrapper: "max-[1200px]:!px-[8px]",
  content: "max-[1200px]:!px-[8px] max-[480px]:!gap-0",
  headingRow: "max-[480px]:!min-h-[12px] max-[480px]:!h-[12px]",
  headingText: "max-[480px]:!text-[8px]",
  typewriter: "max-[480px]:!text-[8px]",
  descriptionText: "max-[480px]:!text-[7px]",
  footer: "max-[1200px]:!p-[8px]"
};

export const bioProfileStyles = {
  container: {
    backgroundColor: "var(--color-bg-secondary, rgb(245, 245, 245))",
    border: "1px solid var(--color-border-strong, rgb(221, 221, 221))",
    borderRadius: "12px",
    boxShadow:
      "0px 0.36px 1.23px -1px rgba(0, 0, 0, 0.07), 0px 1.37px 4.67px -2px rgba(0, 0, 0, 0.07), 0px 6px 20.4px -3px rgba(0, 0, 0, 0.05)",
    overflow: "hidden",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    fontFamily: '"Helvetica Neue", sans-serif',
    containerType: "inline-size",
  } as CSSProperties,

  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "clamp(4px, 1.2cqw, 12px)",
    padding: "clamp(8px, 2.5cqw, 24px)",
  } as CSSProperties,

  statusDot: {
    width: "clamp(16px, 5cqw, 48px)",
    height: "clamp(16px, 5cqw, 48px)",
    backgroundColor: "rgb(0, 255, 247)",
    borderRadius: "999px",
    flexShrink: 0,
  } as CSSProperties,

  headerText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 0,
  } as CSSProperties,

  name: {
    fontFamily: '"Helvetica Neue", sans-serif',
    fontSize: "clamp(8px, 2.2cqw, 20px)",
    color: "var(--color-text-primary, rgb(51, 51, 51))",
    margin: 0,
    fontWeight: 500,
    whiteSpace: "nowrap",
  } as CSSProperties,

  role: {
    fontFamily: '"Helvetica Neue", sans-serif',
    fontSize: "clamp(6px, 1.8cqw, 16px)",
    color: "var(--color-text-secondary, rgb(119, 119, 119))",
    margin: 0,
    whiteSpace: "nowrap",
  } as CSSProperties,

  dividerWrapper: {
    padding: "0 16px",
    marginTop: "0px", 
    marginBottom: "0px",
  } as CSSProperties,

  divider: {
    height: "1px",
    backgroundColor: "var(--color-border-strong, rgb(221, 221, 221))",
    width: "100%",
  } as CSSProperties,

  content: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    padding: "0 16px",
    flex: "1 1 auto",
    justifyContent: "flex-end",
  } as CSSProperties,

  headingRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "clamp(4px, 1cqw, 8px)",
    height: "auto",
    minHeight: "clamp(20px, 4cqw, 40px)",
  } as CSSProperties,

  headingText: {
    fontFamily: '"Helvetica Neue", sans-serif',
    fontSize: "clamp(10px, 3.5cqw, 28px)",
    fontWeight: 500,
    color: "var(--color-text-primary, rgb(51, 51, 51))",
    margin: 0,
  } as CSSProperties,

  typewriter: {
    fontFamily: '"Helvetica Neue", sans-serif',
    fontSize: "clamp(10px, 3.5cqw, 28px)",
    fontWeight: 500,
    color: "var(--color-text-muted, rgb(153, 153, 153))",
  } as CSSProperties,

  description: {
    marginTop: "4px",
    flex: "0 0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  } as CSSProperties,

  descriptionText: {
    margin: 0,
    fontFamily: '"Helvetica Neue", sans-serif',
    fontSize: "clamp(8px, 2.6cqw, 18px)",
    color: "var(--color-text-primary, rgb(51, 51, 51))",
    lineHeight: 1.4,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  } as CSSProperties,

  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "16px",
    marginTop: "auto",
    flexShrink: 0,
  } as CSSProperties,

  timeText: {
    fontFamily: '"Helvetica Neue", sans-serif',
    fontSize: "12px",
    color: "var(--color-text-disabled, rgb(187, 187, 187))",
    margin: 0,
    lineHeight: 1,
    display: "block",
  } as CSSProperties,
};
