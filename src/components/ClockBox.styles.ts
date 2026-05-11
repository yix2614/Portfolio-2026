import { CSSProperties } from "react";

export const clockBoxStyles = {
  container: {
    width: "100%",
    height: "auto",
    minHeight: "0",
    aspectRatio: "1 / 1",
    backgroundColor: "transparent",
    border: "none",
    borderRadius: "12px",
    position: "relative",
    // overflow 必须保持 visible，否则 flip + translateZ 时
    // 透视放大会让指针被矩形容器裁掉
    overflow: "visible",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  } as CSSProperties,

  // Inner clock container
  clockContainer: {
    width: "100%", // Enlarged from 80%
    aspectRatio: "1 / 1",
    position: "relative",
  } as CSSProperties,

  // 3D flip 舞台：给子级一个 perspective，让 rotateY 产生景深效果
  flipScene: {
    width: "100%",
    height: "100%",
    position: "relative",
    perspective: "1200px",
  } as CSSProperties,

  // flip 卡片：实际做 Y 轴翻转的容器
  flipCard: {
    width: "100%",
    height: "100%",
    position: "relative",
    transformStyle: "preserve-3d",
    transition: "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
    willChange: "transform",
  } as CSSProperties,

  // flip 正反面：绝对定位 + 背面不可见 + 保留 3D，让内部 translateZ 生效
  flipFace: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    transformStyle: "preserve-3d",
  } as CSSProperties,

  // The clock face SVG
  clockFace: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  } as CSSProperties,

  // Hands Container (centered)
  handsContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    transformStyle: "preserve-3d",
  } as CSSProperties,

  // 指针整体相对表盘抬高，flip 时呈现立体层次；背面隐藏避免 flip 到另一面时残留可见
  handsLifted: {
    transform: "translateZ(40px)",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
  } as CSSProperties,

  // Hour Hand Wrapper
  hourHandWrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "80%", // from .framer-g22zlm
    height: "80%", // aspect ratio 1/1
    pointerEvents: "none",
  } as CSSProperties,

  // Hour Hand Element
  hourHand: {
    position: "absolute",
    top: "50%", // centered pivot
    left: "50%",
    width: "6px",
    height: "50%", // length
    backgroundColor: "rgb(51, 51, 51)", // Fixed dark color to ignore dark mode
    transformOrigin: "bottom center", // Pivot at bottom
    borderRadius: "999px",
    transform: "translate(-50%, -100%)", // Move up so bottom is at center
  } as CSSProperties,

  // Minute Hand Wrapper
  minuteHandWrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "92%", // from .framer-1ercpjg
    height: "92%",
    pointerEvents: "none",
  } as CSSProperties,

  // Minute Hand Element
  minuteHand: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "4px",
    height: "50%",
    backgroundColor: "rgb(51, 51, 51)", // Fixed dark color to ignore dark mode
    transformOrigin: "bottom center",
    borderRadius: "999px",
    transform: "translate(-50%, -100%)",
  } as CSSProperties,

  // Second Hand Wrapper
  secondHandWrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "92%", // from .framer-1bh7rmk
    height: "92%",
    pointerEvents: "none",
  } as CSSProperties,

  // Second Hand Element
  secondHand: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "3px",
    height: "50%",
    backgroundColor: "rgb(255, 0, 0)",
    transformOrigin: "bottom center",
    borderRadius: "999px",
    boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.24)",
    transform: "translate(-50%, -100%)",
  } as CSSProperties,

  // Center Dot
  centerDot: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "12px",
    height: "12px",
    transform: "translate(-50%, -50%)",
    zIndex: 10,
  } as CSSProperties,
  
  // Background images/shapes
  backgroundImage: {
      position: "absolute",
      // Based on .framer-6mg4se
      top: "-16px",
      left: "-28px",
      right: "-24px",
      bottom: "-16px", // approx
      width: "calc(100% + 52px)",
      height: "auto",
      objectFit: "cover",
      opacity: 0, // Hidden in source? "opacity: 0"
  } as CSSProperties,

  backgroundShape: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      opacity: 0, // Hidden in source? "opacity: 0"
  } as CSSProperties

};
