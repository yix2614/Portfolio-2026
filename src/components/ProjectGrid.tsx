import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { projectGridStyles } from "./ProjectGrid.styles";

const ProjectCard = React.memo(({ 
  isBig, 
  isTall, 
  imageUrl, 
  videoUrl,
  title = "Project Name", 
  subtitle = "Project Description",
  titleStyle,
  subtitleStyle,
  firstCursorTag = "View Project",
  cursorTag,
  overlayText,
  onClick
}: { 
  isBig?: boolean; 
  isTall?: boolean; 
  imageUrl?: string;
  videoUrl?: string;
  title?: string; 
  subtitle?: string;
  titleStyle?: React.CSSProperties;
  subtitleStyle?: React.CSSProperties;
  firstCursorTag?: string;
  cursorTag?: string;
  overlayText?: string;
  onClick?: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 300 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 300 });

  useEffect(() => {
    if (!videoUrl) return;
    const node = cardRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setShouldLoadVideo(true);
        } else {
          setIsInView(false);
        }
      },
      { rootMargin: "200px", threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [videoUrl]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isInView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isInView]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }, [mouseX, mouseY]);


  const cardStyle = isBig ? projectGridStyles.bigCard : (isTall ? projectGridStyles.tallCard : projectGridStyles.card);
  
  const coverAspectRatio = (isBig || isTall) ? "auto" : "1.3 / 1";
  const coverFlex = (isBig || isTall) ? 1 : "none";

  return (
    <div 
      ref={cardRef}
      style={{
        ...cardStyle,
        cursor: onClick ? "pointer" : "default"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={onClick}
    >
      <div style={{ position: "relative", width: "100%", flex: coverFlex, display: "flex", flexDirection: "column" }}>
        <div 
          className="shimmer-border"
          style={{
            ...projectGridStyles.shimmerGlow,
            opacity: isHovered ? 0.6 : 0,
          }}
        />
        <div 
          style={{ 
            ...projectGridStyles.cardCover, 
            aspectRatio: coverAspectRatio,
            flex: 1,
            backgroundImage: (!videoUrl && imageUrl) ? `url(${imageUrl})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            zIndex: 1,
            overflow: "hidden",
          }} 
        >
          {videoUrl && shouldLoadVideo && (
            <video
              ref={videoRef}
              src={shouldLoadVideo ? videoUrl : undefined}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              crossOrigin="anonymous"
              onLoadedData={(e) => {
                const video = e.currentTarget;
                video.play().catch(() => {});
              }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                top: 0,
                left: 0,
              opacity: 1,
              }}
            />
          )}
          {overlayText && (
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 5,
              pointerEvents: "none",
              padding: "0 20px",
              boxSizing: "border-box",
            }}>
              <span style={{
                fontFamily: "'Doto', sans-serif",
                fontWeight: 900,
                fontSize: "72px",
                lineHeight: "1",
                color: "#FFFFFF",
                textAlign: "center",
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
                maxWidth: "100%",
                wordWrap: "break-word",
              }}>
                {overlayText}
              </span>
            </div>
          )}
        </div>
        <div 
          className="shimmer-border"
          style={{
            ...projectGridStyles.shimmerWrapper,
            opacity: isHovered ? 1 : 0,
            zIndex: 2,
          }}
        />
      </div>
      <div style={projectGridStyles.cardInfo}>
        {title && (
          <div style={{
            ...projectGridStyles.cardTitle,
            fontSize: "16px",
            ...titleStyle
          }}>
            {title}
          </div>
        )}
        {subtitle && (
          <div style={{
            ...projectGridStyles.cardMeta,
            fontSize: "12px",
            ...subtitleStyle
          }}>
            {subtitle}
          </div>
        )}
      </div>

      {isHovered && (
        <motion.div
          style={{
            ...projectGridStyles.cursorTagContainer,
            left: smoothX,
            top: smoothY,
            x: 10,
            y: 10,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
        >
          <div style={projectGridStyles.cursorTag}>
            {firstCursorTag}
          </div>
          {cursorTag && (
             <div style={projectGridStyles.cursorTag}>
               {cursorTag}
             </div>
          )}
        </motion.div>
      )}
    </div>
  );
});

const ProjectGrid = ({ children, style }: { children?: React.ReactNode; style?: React.CSSProperties }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [hoveredManualIndex, setHoveredManualIndex] = useState<number | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 300 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 300 });

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  useEffect(() => {
    const handleThemeChange = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    let resizeRaf: number | null = null;
    const handleResize = () => {
      if (resizeRaf !== null) return;
      resizeRaf = requestAnimationFrame(() => {
        resizeRaf = null;
        const nextWidth = window.innerWidth;
        setWindowWidth((prevWidth) => (prevWidth === nextWidth ? prevWidth : nextWidth));
      });
    };
    window.addEventListener('themeChange', handleThemeChange);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('themeChange', handleThemeChange);
      window.removeEventListener('resize', handleResize);
      if (resizeRaf !== null) cancelAnimationFrame(resizeRaf);
    };
  }, []);

  const randomDelays = useMemo(() => {
    const delays = Array.from({ length: 20 }, (_, i) => i * 0.08);
    for (let i = delays.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [delays[i], delays[j]] = [delays[j], delays[i]];
    }
    return delays;
  }, []);

  const categories = useMemo(() => [
    { id: "All", count: "3" },
    { id: "Filter not ready", count: "0", inactive: true },
    { id: "Product", count: "4", hidden: true },
    { id: "Creative", count: "4", hidden: true },
    { id: "Tech", count: "4", hidden: true },
  ], []);
  const visibleCategories = useMemo(() => categories.filter((cat) => !cat.hidden), [categories]);
  const isCompact = windowWidth <= 1024;

  return (
    <section style={{ ...projectGridStyles.section, ...style }}>
      <div style={projectGridStyles.stickyContainer}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0 }}
          style={{
            ...projectGridStyles.header,
            flexDirection: "row",
            alignItems: "flex-end",
            gap: "0px",
            background: isDark 
              ? "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)" 
              : "linear-gradient(to bottom, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <h1 
            style={{ 
              ...projectGridStyles.title,
              color: isDark ? "var(--color-bg-tertiary)" : "#E6E6E6",
              fontSize: "60px",
              width: "60%"
            }}
          >
            Selected work(s)
          </h1>
          <div style={{
            ...projectGridStyles.metaContainer,
            width: "40%",
            justifyContent: "flex-end"
          }}>
            <div style={{
              ...projectGridStyles.tabsContainer,
              flexWrap: "wrap",
              gap: "8px"
            }}>
              {visibleCategories.map((cat) => {
                const isActive = activeCategory === cat.id;
                const tabBgColor = isDark ? "#FFFFFF" : "#000000";
                const tabTextColor = isDark ? "#000000" : "#FFFFFF";
                const isInactive = Boolean(cat.inactive);
                
                return (
                  <motion.div
                    key={cat.id}
                    onClick={() => !isInactive && setActiveCategory(cat.id)}
                    initial={false}
                    animate={{
                      opacity: isInactive ? 0.3 : (isActive ? 1 : 0.3),
                    }}
                    whileHover={{
                      opacity: isInactive ? 0.3 : (isActive ? 1 : 0.4),
                    }}
                    style={{
                      ...projectGridStyles.tabItem,
                      cursor: isInactive ? "default" : "pointer",
                      backgroundColor: tabBgColor,
                    }}
                  >
                    <span
                      style={{
                        ...projectGridStyles.tabText,
                        color: tabTextColor,
                      }}
                    >
                      {cat.id}
                    </span>
                    <div
                      style={{
                        ...projectGridStyles.tabCount,
                        backgroundColor: tabTextColor,
                        color: tabBgColor,
                      }}
                    >
                      {cat.count}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        <div style={projectGridStyles.scrollContent}>
          {isCompact ? (
            <div style={{
              ...projectGridStyles.motionContainer,
              flexDirection: "column",
              marginTop: "0px",
              gap: "8px"
            }}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, delay: (randomDelays[1] || 0) + 0.1 }}>
                <ProjectCard 
                  imageUrl="https://res.cloudinary.com/dkjokhb4w/image/upload/v1774903555/ttcomcover_f9qmat.jpg"
                  title="TikTok.com Product Iteration"
                  subtitle="Design Engineering / Full-Stack / Data Analysis"
                />
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, delay: (randomDelays[2] || 0) + 0.1 }}>
                <ProjectCard 
                  videoUrl="https://res.cloudinary.com/dkjokhb4w/video/upload/v1774912323/Scene-10_noyfer.mp4"
                  overlayText="Vibe Coding"
                  title="Vibe Coding Gallery" 
                  subtitle="" 
                  cursorTag="Vibing gallery"
                  onClick={() => window.open('/vibe-coding', '_blank', 'noopener,noreferrer')}
                />
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, delay: (randomDelays[3] || 0) + 0.1 }}>
                <ProjectCard 
                  imageUrl="https://res.cloudinary.com/dkjokhb4w/image/upload/v1774926600/downloadcover_heynsl.jpg"
                  title="TT Download Page"
                  subtitle="SEO / Branding / Web Design"
                  onClick={() => window.open('https://tiktokdownload.framer.website', '_blank', 'noopener,noreferrer')}
                />
              </motion.div>
            </div>
          ) : (
            <>
              <div style={{
                ...projectGridStyles.motionContainer,
                flexDirection: "row",
                marginTop: "0px"
              }}>
                <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.45, delay: (randomDelays[4] || 0) + 0.1 }}
                style={{ flex: 1, display: "flex" }}
                onMouseEnter={() => setHoveredManualIndex(0)}
                onMouseLeave={() => setHoveredManualIndex(null)}
                onMouseMove={handleMouseMove}
              >
                <div style={projectGridStyles.card}>
                  <div style={{ position: "relative", width: "100%", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div 
                      className="shimmer-border"
                      style={{
                        ...projectGridStyles.shimmerGlow,
                        opacity: hoveredManualIndex === 0 ? 0.6 : 0,
                      }}
                    />
                    <div style={{ ...projectGridStyles.cardCover, flex: 1, aspectRatio: "auto", backgroundImage: "url(https://res.cloudinary.com/dkjokhb4w/image/upload/v1774903555/ttcomcover_f9qmat.jpg)", backgroundSize: "cover", backgroundPosition: "center", position: "relative", zIndex: 1 }} />
                    <div 
                      className="shimmer-border"
                      style={{
                        ...projectGridStyles.shimmerWrapper,
                        opacity: hoveredManualIndex === 0 ? 1 : 0,
                        zIndex: 2,
                      }}
                    />
                  </div>
                  <div style={projectGridStyles.cardInfo}>
                    <div style={projectGridStyles.cardTitle}>TikTok.com Product Iteration</div>
                    <div style={projectGridStyles.cardMeta}>Design Engineering / Full-Stack / Data Analysis</div>
                  </div>
                </div>
              </motion.div>
              <div style={{ flex: 1, display: "flex", gap: "8px" }}>
                <div style={projectGridStyles.gridColumn}>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.45, delay: (randomDelays[5] || 0) + 0.1 }}
                    style={projectGridStyles.card}
                    onMouseEnter={() => setHoveredManualIndex(1)}
                    onMouseLeave={() => setHoveredManualIndex(null)}
                    onMouseMove={handleMouseMove}
                  >
                    <div style={{ position: "relative", width: "100%", display: "flex", flexDirection: "column" }}>
                      <div 
                        className="shimmer-border"
                        style={{
                          ...projectGridStyles.shimmerGlow,
                          opacity: hoveredManualIndex === 1 ? 0.6 : 0,
                        }}
                      />
                      <div style={{ ...projectGridStyles.cardCover, aspectRatio: "1.3 / 1", position: "relative", zIndex: 1 }}>
                        <video src="https://res.cloudinary.com/dkjokhb4w/video/upload/v1774908949/Scene-9_1_a8odck.mp4" autoPlay muted loop playsInline preload="auto" crossOrigin="anonymous" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <div 
                        className="shimmer-border"
                        style={{
                          ...projectGridStyles.shimmerWrapper,
                          opacity: hoveredManualIndex === 1 ? 1 : 0,
                          zIndex: 2,
                        }}
                      />
                    </div>
                    <div style={projectGridStyles.cardInfo}>
                      <div style={{ ...projectGridStyles.cardMeta, textAlign: "left", lineHeight: "19.2px" }}>AI Search</div>
                    </div>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.45, delay: (randomDelays[6] || 0) + 0.1 }}
                    style={projectGridStyles.card}
                    onMouseEnter={() => setHoveredManualIndex(2)}
                    onMouseLeave={() => setHoveredManualIndex(null)}
                    onMouseMove={handleMouseMove}
                  >
                    <div style={{ position: "relative", width: "100%", display: "flex", flexDirection: "column" }}>
                      <div 
                        className="shimmer-border"
                        style={{
                          ...projectGridStyles.shimmerGlow,
                          opacity: hoveredManualIndex === 2 ? 0.6 : 0,
                        }}
                      />
                      <div style={{ ...projectGridStyles.cardCover, aspectRatio: "1.3 / 1", position: "relative", zIndex: 1 }}>
                        <video src="https://res.cloudinary.com/dkjokhb4w/video/upload/v1774905085/Scene-8_1_ftmykn.mp4" autoPlay muted loop playsInline preload="auto" crossOrigin="anonymous" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <div 
                        className="shimmer-border"
                        style={{
                          ...projectGridStyles.shimmerWrapper,
                          opacity: hoveredManualIndex === 2 ? 1 : 0,
                          zIndex: 2,
                        }}
                      />
                    </div>
                    <div style={projectGridStyles.cardInfo}>
                      <div style={{ ...projectGridStyles.cardMeta, textAlign: "left", lineHeight: "19.2px" }}>Design System</div>
                    </div>
                  </motion.div>
                </div>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.45, delay: (randomDelays[7] || 0) + 0.1 }}
                  style={{ ...projectGridStyles.card, flex: 1 }}
                  onMouseEnter={() => setHoveredManualIndex(3)}
                  onMouseLeave={() => setHoveredManualIndex(null)}
                  onMouseMove={handleMouseMove}
                >
                  <div style={{ position: "relative", width: "100%", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div 
                      className="shimmer-border"
                      style={{
                        ...projectGridStyles.shimmerGlow,
                        opacity: hoveredManualIndex === 3 ? 0.6 : 0,
                      }}
                    />
                    <div style={{ ...projectGridStyles.cardCover, flex: 1, aspectRatio: "auto", backgroundImage: "url(https://res.cloudinary.com/dkjokhb4w/image/upload/v1774906952/TTSeo_bscy0l.jpg)", backgroundSize: "cover", backgroundPosition: "center", position: "relative", zIndex: 1 }} />
                    <div 
                      className="shimmer-border"
                      style={{
                        ...projectGridStyles.shimmerWrapper,
                        opacity: hoveredManualIndex === 3 ? 1 : 0,
                        zIndex: 2,
                      }}
                    />
                  </div>
                  <div style={projectGridStyles.cardInfo}>
                    <div style={{ ...projectGridStyles.cardMeta, textAlign: "left", lineHeight: "19.2px" }}>SEO Design</div>
                  </div>
                </motion.div>
              </div>
                </>
              </div>
              <div style={{
                ...projectGridStyles.motionContainer,
                flexDirection: "row"
              }}>
                <>
              <div style={{ flex: 1, display: "flex", gap: "8px" }}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, delay: (randomDelays[8] || 0) + 0.1 }} style={{ flex: 1, display: "flex" }}>
                  <ProjectCard 
                    isTall 
                    videoUrl="https://res.cloudinary.com/dkjokhb4w/video/upload/v1774912323/Scene-10_noyfer.mp4"
                    overlayText="Vibe Coding"
                    title="Vibe Coding Gallery"
                    subtitle=""
                    cursorTag="Vibing gallery"
                    onClick={() => window.open('/vibe-coding', '_blank', 'noopener,noreferrer')}
                  />
                </motion.div>
                <div style={projectGridStyles.gridColumn}>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, delay: (randomDelays[9] || 0) + 0.1 }}>
                    <ProjectCard 
                  videoUrl="https://res.cloudinary.com/dkjokhb4w/video/upload/v1774914422/20260330-164535_1_nechjv.mp4"
                  title=""
                  subtitle="TikTok Pro Component"
                  subtitleStyle={{ textAlign: "left", lineHeight: "19.2px" }}
                  cursorTag="Vibing gallery"
                  onClick={() => window.open('/vibe-coding', '_blank', 'noopener,noreferrer')}
                />
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, delay: (randomDelays[10] || 0) + 0.1 }}>
                    <ProjectCard 
                      imageUrl="https://res.cloudinary.com/dkjokhb4w/image/upload/v1774919613/vibe_qkwojg.jpg"
                      title=""
                      subtitle="Gallary Card"
                      subtitleStyle={{ textAlign: "left", lineHeight: "19.2px" }}
                      cursorTag="Vibing gallery"
                      onClick={() => window.open('/vibe-coding', '_blank', 'noopener,noreferrer')}
                    />
                  </motion.div>
                </div>
              </div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, delay: (randomDelays[11] || 0) + 0.1 }} style={{ flex: 1, display: "flex" }}>
                <ProjectCard 
                  isBig 
                  imageUrl="https://res.cloudinary.com/dkjokhb4w/image/upload/v1774926600/downloadcover_heynsl.jpg"
                  title="TT Download Page"
                  subtitle="SEO / Branding / Web Design"
                  onClick={() => window.open('https://tiktokdownload.framer.website', '_blank', 'noopener,noreferrer')}
                />
              </motion.div>
                </>
                {children}
              </div>
            </>
          )}
        </div>
      </div>
      {hoveredManualIndex !== null && (
        <motion.div
          style={{
            ...projectGridStyles.cursorTagContainer,
            left: smoothX,
            top: smoothY,
            x: 10,
            y: 10,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
        >
          <div style={projectGridStyles.cursorTag}>
            {(hoveredManualIndex >= 0 && hoveredManualIndex <= 3) ? "Coming soon" : "View Project"}
          </div>
          {(hoveredManualIndex >= 0 && hoveredManualIndex <= 3) && (
            <div style={projectGridStyles.cursorTag}>
              TikTok.com
            </div>
          )}
        </motion.div>
      )}
    </section>
  );
};

export default ProjectGrid;
