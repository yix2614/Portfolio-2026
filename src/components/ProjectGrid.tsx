import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Lenis from "@studio-freight/lenis";
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
  coverAspectRatio,
  isDisabled,
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
  coverAspectRatio?: string;
  isDisabled?: boolean;
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
    if (!videoUrl) return;
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;

    if (isInView) {
      const result = video.play();
      if (result && typeof (result as Promise<void>).catch === "function") {
        (result as Promise<void>).catch(() => {});
      }
    } else {
      video.pause();
    }
  }, [videoUrl, isInView]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }, [mouseX, mouseY]);


  const cardStyle = isBig ? projectGridStyles.bigCard : (isTall ? projectGridStyles.tallCard : projectGridStyles.card);
  
  const coverAspectRatioValue = coverAspectRatio ?? ((isBig || isTall) ? "auto" : "1.3 / 1");
  const coverFlex = (isBig || isTall) ? 1 : "none";

  return (
    <div 
      ref={cardRef}
      style={{
        ...cardStyle,
        cursor: onClick && !isDisabled ? "pointer" : "default",
        opacity: isDisabled ? 0.2 : 1,
        pointerEvents: isDisabled ? "none" : "auto",
        transition: "opacity 0.2s ease"
      }}
      onMouseEnter={!isDisabled ? () => setIsHovered(true) : undefined}
      onMouseLeave={!isDisabled ? () => setIsHovered(false) : undefined}
      onMouseMove={!isDisabled ? handleMouseMove : undefined}
      onClick={!isDisabled ? onClick : undefined}
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
            aspectRatio: coverAspectRatioValue,
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

const BentoRow = ({
  tallCardProps,
  topSmallCardProps,
  bottomSmallCardProps,
  bigCardProps,
  delays = [0.1, 0.2, 0.3, 0.4],
}: {
  tallCardProps: React.ComponentProps<typeof ProjectCard>;
  topSmallCardProps: React.ComponentProps<typeof ProjectCard>;
  bottomSmallCardProps: React.ComponentProps<typeof ProjectCard>;
  bigCardProps: React.ComponentProps<typeof ProjectCard>;
  delays?: number[];
}) => {
  return (
    <>
      <div style={{ flex: 1, display: "flex", gap: "8px" }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, delay: delays[0] }} style={{ flex: 1, display: "flex" }}>
          <ProjectCard isTall {...tallCardProps} />
        </motion.div>
        <div style={projectGridStyles.gridColumn}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, delay: delays[1] }}>
            <ProjectCard {...topSmallCardProps} />
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, delay: delays[2] }}>
            <ProjectCard {...bottomSmallCardProps} />
          </motion.div>
        </div>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, delay: delays[3] }} style={{ flex: 1, display: "flex" }}>
        <ProjectCard isBig {...bigCardProps} />
      </motion.div>
    </>
  );
};

const BigLeftBentoRightRow = ({
  bigCardProps,
  tallCardProps,
  topSmallCardProps,
  bottomSmallCardProps,
  delays = [0.1, 0.2, 0.3, 0.4],
}: {
  bigCardProps: React.ComponentProps<typeof ProjectCard>;
  tallCardProps: React.ComponentProps<typeof ProjectCard>;
  topSmallCardProps: React.ComponentProps<typeof ProjectCard>;
  bottomSmallCardProps: React.ComponentProps<typeof ProjectCard>;
  delays?: number[];
}) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, delay: delays[0] }}
        style={{ flex: 1, display: "flex" }}
      >
        <ProjectCard isBig {...bigCardProps} />
      </motion.div>
      <div style={{ flex: 1, display: "flex", gap: "8px" }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, delay: delays[1] }} style={{ flex: 1, display: "flex" }}>
          <ProjectCard isTall {...tallCardProps} />
        </motion.div>
        <div style={projectGridStyles.gridColumn}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, delay: delays[2] }}>
            <ProjectCard {...topSmallCardProps} />
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, delay: delays[3] }}>
            <ProjectCard {...bottomSmallCardProps} />
          </motion.div>
        </div>
      </div>
    </>
  );
};

const TwoBigRow = ({
  leftCardProps,
  rightCardProps,
  delays = [0.1, 0.2],
}: {
  leftCardProps: React.ComponentProps<typeof ProjectCard>;
  rightCardProps: React.ComponentProps<typeof ProjectCard>;
  delays?: number[];
}) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, delay: delays[0] }}
        style={{ flex: 1, display: "flex" }}
      >
        <ProjectCard isBig {...leftCardProps} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, delay: delays[1] }}
        style={{ flex: 1, display: "flex" }}
      >
        <ProjectCard isBig {...rightCardProps} />
      </motion.div>
    </>
  );
};

const ProjectGrid = ({ children, style }: { children?: React.ReactNode; style?: React.CSSProperties }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
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
    { id: "All", count: "7" },
    { id: "Product", count: "2" },
    { id: "Tech", count: "2" },
    { id: "Creative", count: "4" }
  ], []);
  const visibleCategories = useMemo(() => categories, [categories]);
  const isCompact = windowWidth <= 1024;
  const isCardDisabled = useCallback((categoryIds: string[]) => {
    if (activeCategory === "All") return false;
    return !categoryIds.includes(activeCategory);
  }, [activeCategory]);

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
          {windowWidth >= 1024 && (
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
                  const tabBgColor = isActive
                    ? (isDark ? "#FFFFFF" : "#000000")
                    : (isDark ? "#5A5A5A" : "#F6F6F6");
                  const tabTextColor = isActive
                    ? (isDark ? "#000000" : "#FFFFFF")
                    : (isDark ? "#F0F0F0" : "#8A8A8A");
                  const tabCountBgColor = isActive ? tabTextColor : "#FFFFFF";
                  const tabCountTextColor = isActive ? tabBgColor : "#9A9A9A";
                  return (
                    <motion.div
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      initial={false}
                      animate={{
                        opacity: 1,
                      }}
                      whileHover={{
                        opacity: 1,
                      }}
                      style={{
                        ...projectGridStyles.tabItem,
                        cursor: "pointer",
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
                          backgroundColor: tabCountBgColor,
                          color: tabCountTextColor,
                        }}
                      >
                        {cat.count}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
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
                  onClick={() => window.location.href = '/tiktokweb'}
                  firstCursorTag="View Project"
                  cursorTag="TikTok.com"
                  isDisabled={isCardDisabled(["Product", "Tech"])}
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
                  isDisabled={isCardDisabled(["Tech"])}
                />
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, delay: (randomDelays[3] || 0) + 0.1 }}>
                <ProjectCard 
                  videoUrl="https://res.cloudinary.com/dkjokhb4w/video/upload/v1774905085/Scene-8_1_ftmykn.mp4"
                  title="AI Search"
                  subtitle="Markdwon / Modularized UI / Web Design"
                  firstCursorTag="Coming soon"
                  isDisabled={isCardDisabled(["Product"])}
                />
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, delay: (randomDelays[4] || 0) + 0.1 }}>
                <ProjectCard 
                  videoUrl="https://f004.backblazeb2.com/file/xiangyi-assets/nikesf.mp4"
                  title="Nike Shoe Finder"
                  subtitle="3D motion"
                  subtitleStyle={{ textAlign: "right", lineHeight: "19.2px" }}
                  firstCursorTag="Coming soon"
                  isDisabled={isCardDisabled(["Creative"])}
                />
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, delay: (randomDelays[7] || 0) + 0.1 }}>
                <ProjectCard 
                  imageUrl="https://res.cloudinary.com/dkjokhb4w/image/upload/v1774926600/downloadcover_heynsl.jpg"
                  title="TT Download Page"
                  subtitle="SEO / Branding / Web Design"
                  firstCursorTag="View website"
                  coverAspectRatio="16 / 11"
                  onClick={() => window.open('https://tiktokdownload.framer.website', '_blank', 'noopener,noreferrer')}
                  isDisabled={isCardDisabled(["Creative"])}
                />
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, delay: (randomDelays[8] || 0) + 0.1 }}>
                <ProjectCard 
                  videoUrl="https://f004.backblazeb2.com/file/xiangyi-assets/kv_pc.mp4"
                  title="Nike Shoe Chart"
                  subtitle="Creative UX / Web Design"
                  firstCursorTag="View website"
                  coverAspectRatio="16 / 11"
                  onClick={() => window.open('https://nike.jp/running/shoeschart/', '_blank', 'noopener,noreferrer')}
                  isDisabled={isCardDisabled(["Creative"])}
                />
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, delay: (randomDelays[9] || 0) + 0.1 }}>
                <ProjectCard 
                  imageUrl="https://f004.backblazeb2.com/file/xiangyi-assets/google.jpg"
                  title="Google I/O 2022 - 2023"
                  subtitle="Creative UX / O2O / Web Design"
                  firstCursorTag="View website"
                  coverAspectRatio="16 / 11"
                  onClick={() => window.open('https://ioconnectchina.googlecnapps.cn/2023/intl/en_cn/', '_blank', 'noopener,noreferrer')}
                  isDisabled={isCardDisabled(["Creative"])}
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
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.45, delay: (randomDelays[4] || 0) + 0.1 }}
                  style={{ flex: 1, display: "flex" }}
                >
                  <ProjectCard 
                    isTall
                    imageUrl="https://res.cloudinary.com/dkjokhb4w/image/upload/v1774903555/ttcomcover_f9qmat.jpg"
                    title="TikTok.com Product Iteration"
                    subtitle="Design Engineering / Full-Stack / Data Analysis"
                    onClick={() => window.location.href = '/tiktokweb'}
                    firstCursorTag="View Project"
                    cursorTag="TikTok.com"
                    isDisabled={isCardDisabled(["Product", "Tech"])}
                  />
                </motion.div>
                <div style={{ flex: 1, display: "flex", gap: "8px" }}>
                  <div style={projectGridStyles.gridColumn}>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.45, delay: (randomDelays[5] || 0) + 0.1 }}
                    >
                      <ProjectCard 
                        videoUrl="https://res.cloudinary.com/dkjokhb4w/video/upload/v1774908949/Scene-9_1_a8odck.mp4"
                        title=""
                        subtitle="Design System"
                        subtitleStyle={{ textAlign: "left", lineHeight: "19.2px" }}
                        onClick={() => window.location.href = '/tiktokweb'}
                        firstCursorTag="View Project"
                        cursorTag="TikTok.com"
                        isDisabled={isCardDisabled(["Product", "Tech"])}
                      />
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.45, delay: (randomDelays[6] || 0) + 0.1 }}
                    >
                      <ProjectCard 
                        videoUrl="https://f004.backblazeb2.com/file/xiangyi-assets/nav.mp4"
                        title=""
                        subtitle="Nav & Panel"
                        subtitleStyle={{ textAlign: "left", lineHeight: "19.2px" }}
                        onClick={() => window.location.href = '/tiktokweb'}
                        firstCursorTag="View Project"
                        cursorTag="TikTok.com"
                        isDisabled={isCardDisabled(["Product", "Tech"])}
                      />
                    </motion.div>
                  </div>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.45, delay: (randomDelays[7] || 0) + 0.1 }}
                    style={{ flex: 1, display: "flex" }}
                  >
                    <ProjectCard 
                      isTall
                      imageUrl="https://res.cloudinary.com/dkjokhb4w/image/upload/v1774906952/TTSeo_bscy0l.jpg"
                      title=""
                      subtitle="SEO Design"
                      subtitleStyle={{ textAlign: "left", lineHeight: "19.2px" }}
                      onClick={() => window.location.href = '/tiktokweb'}
                      firstCursorTag="View Project"
                      cursorTag="TikTok.com"
                      isDisabled={isCardDisabled(["Product", "Tech"])}
                    />
                  </motion.div>
                </div>
              </div>
              <div style={{
                ...projectGridStyles.motionContainer,
                flexDirection: "row"
              }}>
                <BentoRow 
                  delays={[
                    (randomDelays[8] || 0) + 0.1,
                    (randomDelays[9] || 0) + 0.1,
                    (randomDelays[10] || 0) + 0.1,
                    (randomDelays[11] || 0) + 0.1
                  ]}
                  tallCardProps={{
                    videoUrl: "https://res.cloudinary.com/dkjokhb4w/video/upload/v1774912323/Scene-10_noyfer.mp4",
                    overlayText: "Vibe Coding",
                    title: "Vibe Coding Gallery",
                    subtitle: "",
                    cursorTag: "Vibing gallery",
                    onClick: () => window.open('/vibe-coding', '_blank', 'noopener,noreferrer'),
                    isDisabled: isCardDisabled(["Tech"])
                  }}
                  topSmallCardProps={{
                    videoUrl: "https://res.cloudinary.com/dkjokhb4w/video/upload/v1774914422/20260330-164535_1_nechjv.mp4",
                    title: "",
                    subtitle: "TikTok Pro Component",
                    subtitleStyle: { textAlign: "left", lineHeight: "19.2px" },
                    cursorTag: "Vibing gallery",
                    onClick: () => window.open('/vibe-coding', '_blank', 'noopener,noreferrer'),
                    isDisabled: isCardDisabled(["Tech"])
                  }}
                  bottomSmallCardProps={{
                    imageUrl: "https://res.cloudinary.com/dkjokhb4w/image/upload/v1774919613/vibe_qkwojg.jpg",
                    title: "",
                    subtitle: "Gallary Card",
                    subtitleStyle: { textAlign: "left", lineHeight: "19.2px" },
                    cursorTag: "Vibing gallery",
                    onClick: () => window.open('/vibe-coding', '_blank', 'noopener,noreferrer'),
                    isDisabled: isCardDisabled(["Tech"])
                  }}
                  bigCardProps={{
                    videoUrl: "https://res.cloudinary.com/dkjokhb4w/video/upload/v1774905085/Scene-8_1_ftmykn.mp4",
                    title: "AI Search",
                    subtitle: "Markdwon / Modularized UI / Web Design",
                    firstCursorTag: "Coming soon",
                    isDisabled: isCardDisabled(["Product"])
                  }}
                />
              </div>
              <div style={{
                ...projectGridStyles.motionContainer,
                flexDirection: "row"
              }}>
                <BigLeftBentoRightRow
                  delays={[
                    (randomDelays[15] || 0) + 0.1,
                    (randomDelays[12] || 0) + 0.1,
                    (randomDelays[13] || 0) + 0.1,
                    (randomDelays[14] || 0) + 0.1
                  ]}
                  bigCardProps={{
                    imageUrl: "https://res.cloudinary.com/dkjokhb4w/image/upload/v1774926600/downloadcover_heynsl.jpg",
                    title: "TT Download Page",
                    subtitle: "SEO / Branding / Web Design",
                    firstCursorTag: "View website",
                    coverAspectRatio: "16 / 11",
                    onClick: () => window.open('https://tiktokdownload.framer.website', '_blank', 'noopener,noreferrer'),
                    isDisabled: isCardDisabled(["Creative"])
                  }}
                  tallCardProps={{
                    imageUrl: "https://f004.backblazeb2.com/file/xiangyi-assets/SFD.jpg",
                    title: "Nike Shoe Finder",
                    subtitle: "",
                    firstCursorTag: "Coming soon",
                    isDisabled: isCardDisabled(["Creative"])
                  }}
                  topSmallCardProps={{
                    videoUrl: "https://f004.backblazeb2.com/file/xiangyi-assets/nikesf.mp4",
                    title: "",
                    subtitle: "3D motion",
                    subtitleStyle: { textAlign: "left", lineHeight: "19.2px" },
                    firstCursorTag: "Coming soon",
                    isDisabled: isCardDisabled(["Creative"])
                  }}
                  bottomSmallCardProps={{
                    imageUrl: "https://f004.backblazeb2.com/file/xiangyi-assets/SFD_cover.jpg",
                    title: "",
                    subtitle: "Gamification / Creative UX",
                    subtitleStyle: { textAlign: "left", lineHeight: "19.2px" },
                    firstCursorTag: "Coming soon",
                    isDisabled: isCardDisabled(["Creative"])
                  }}
                />
              </div>
              <div style={{
                ...projectGridStyles.motionContainer,
                flexDirection: "row"
              }}>
                <TwoBigRow
                  delays={[
                    (randomDelays[16] || 0) + 0.1,
                    (randomDelays[17] || 0) + 0.1
                  ]}
                  leftCardProps={{
                    videoUrl: "https://f004.backblazeb2.com/file/xiangyi-assets/kv_pc.mp4",
                    title: "Nike Shoe Chart",
                    subtitle: "Creative UX / Web Design",
                    firstCursorTag: "View website",
                    coverAspectRatio: "16 / 11",
                    onClick: () => window.open('https://nike.jp/running/shoeschart/', '_blank', 'noopener,noreferrer'),
                    isDisabled: isCardDisabled(["Creative"])
                  }}
                  rightCardProps={{
                    imageUrl: "https://f004.backblazeb2.com/file/xiangyi-assets/google.jpg",
                    title: "Google I/O 2022 - 2023",
                    subtitle: "Creative UX / O2O / Web Design",
                    firstCursorTag: "View website",
                    coverAspectRatio: "16 / 11",
                    onClick: () => window.open('https://ioconnectchina.googlecnapps.cn/2023/intl/en_cn/', '_blank', 'noopener,noreferrer'),
                    isDisabled: isCardDisabled(["Creative"])
                  }}
                />
              </div>
              {children}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectGrid;
