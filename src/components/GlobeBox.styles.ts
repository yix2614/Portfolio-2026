import { CSSProperties } from "react";

export const globeBoxClasses = {
  label: "globe-box__label max-[600px]:!text-[8px] max-[1200px]:!left-[8px] max-[1200px]:!top-[8px]",
  footer: "globe-box__footer max-[1200px]:!bottom-[8px]",
  footerText: "max-[600px]:!text-[8px]"
};

export const globeBoxStyles = {
	box: {
    backgroundColor: "var(--color-bg-secondary, rgb(245, 245, 245))",
    border: "1px solid var(--color-border-default, rgb(219, 219, 219))",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    boxShadow:
      "0px 0.36px 1.23px -1px rgba(0, 0, 0, 0.07), 0px 1.37px 4.67px -2px rgba(0, 0, 0, 0.07), 0px 6px 20.4px -3px rgba(0, 0, 0, 0.05)",
    flex: "none",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    position: "relative",
    willChange: "transform",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as CSSProperties,
  globeContainer: {
    aspectRatio: "0.94 / 1",
    height: "100%", // Scale relative to container
    width: "85%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as CSSProperties,
	globeMask: {
		aspectRatio: "1 / 1",
		maskImage:
			"radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 70%)",
		maxWidth: 800,
		MozMaskImage:
			"radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 70%)",
		WebkitMaskImage:
			"radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 70%)",
		width: "100%",
	} as CSSProperties,
	globeCanvas: {
		contain: "layout paint size",
		cursor: "auto",
		height: "100%",
		userSelect: "none",
		width: "100%",
	} as CSSProperties,
	label: {
		color: "var(--color-text-muted, rgb(153, 153, 153))",
		fontFamily: '"Helvetica Neue", Arial, sans-serif',
		fontSize: 12,
		left: 16,
		lineHeight: "14px",
		position: "absolute",
		top: 12,
		whiteSpace: "pre",
	} as CSSProperties,
	footer: {
		alignItems: "center",
		bottom: 12,
		display: "flex",
		flexDirection: "row",
		gap: 10,
		height: 17,
		justifyContent: "center",
		left: 0,
		overflow: "hidden",
		padding: 0,
		position: "absolute",
		width: "100%",
	} as CSSProperties,
	footerText: {
		color: "var(--color-text-muted, rgb(153, 153, 153))",
		fontFamily: '"Helvetica Neue", Arial, sans-serif',
		fontSize: 11,
		lineHeight: "13px",
		transition: "opacity 200ms ease, transform 200ms ease",
	} as CSSProperties,
};
