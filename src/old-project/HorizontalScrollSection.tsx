import React, { useRef, useState, useEffect } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { horizontalScrollSectionStyles } from "./HorizontalScrollSection.styles";

const HorizontalScrollSection = ({ children, style }: { children: React.ReactNode, style?: React.CSSProperties }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [xRange, setXRange] = useState(["0px", "0px"]);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  useEffect(() => {
    const calculateWidth = () => {
      if (contentRef.current) {
        const contentWidth = contentRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        
        // We want to scroll until the end of the content is visible
        // Total scroll distance = content width - viewport width
        // If content is narrower than viewport, distance is 0
        const distance = contentWidth - viewportWidth;
        const maxScroll = distance > 0 ? -distance : 0;
        
        // Add a small buffer (e.g. 40px) to the end scroll if needed, 
        // or just ensure we scroll exactly to the end.
        // Given we have right padding, scrolling 'distance' amount aligns the right edge.
        setXRange(["0px", `${maxScroll}px`]);
      }
    };

    // Initial calculation
    calculateWidth();

    // Recalculate on resize
    window.addEventListener("resize", calculateWidth);
    
    // Also recalculate after a short delay to ensure children have rendered/loaded
    // (especially for images that might affect layout, though ProjectBox has fixed dimensions usually)
    const timeoutId = setTimeout(calculateWidth, 100);

    return () => {
      window.removeEventListener("resize", calculateWidth);
      clearTimeout(timeoutId);
    };
  }, [children]);

  const x = useTransform(scrollYProgress, [0, 1], xRange);
  const indicatorX = useTransform(scrollYProgress, [0, 1], [0, 40]); // 72px width - 8px padding - 24px circle = 40px travel

  return (
    <section ref={targetRef} style={{ ...horizontalScrollSectionStyles.section, ...style }}>
      <div style={horizontalScrollSectionStyles.stickyContainer}>
        {/* Header Section */}
        <div style={horizontalScrollSectionStyles.header}>
          <h1 style={horizontalScrollSectionStyles.title}>
            Selected work(s)
          </h1>
          
          <div style={horizontalScrollSectionStyles.metaContainer}>
            <div style={horizontalScrollSectionStyles.metaItem}>
              <span style={horizontalScrollSectionStyles.metaLabel}>Time</span>
              <span style={horizontalScrollSectionStyles.metaValue}>2021 - 2024</span>
            </div>
            <div style={horizontalScrollSectionStyles.metaItem}>
              <span style={horizontalScrollSectionStyles.metaLabel}>@Yi Xiang</span>
              <span style={horizontalScrollSectionStyles.metaValue}>Keep Updating</span>
            </div>
            
            {/* Pill Indicator */}
            <div style={horizontalScrollSectionStyles.pillIndicator}>
                 <motion.div 
                   style={{ 
                     ...horizontalScrollSectionStyles.pillCircle,
                     x: indicatorX,
                   }}
                 />
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div style={horizontalScrollSectionStyles.scrollContent}>
          <motion.div 
            ref={contentRef}
            style={{ 
              ...horizontalScrollSectionStyles.motionContainer,
              x 
            }} 
          >
            {children}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalScrollSection;
