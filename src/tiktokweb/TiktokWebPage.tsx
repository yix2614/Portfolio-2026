import React from "react";
import { motion } from "framer-motion";
import { tiktokWebPageStyles } from "./TiktokWebPage.styles";
import RippleBackground from "./RippleBackground";

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 37.1716L22 5C22 4.44772 22.4477 4 23 4H25C25.5523 4 26 4.44771 26 5L26 37.1716L37.8787 25.2929C38.2692 24.9024 38.9024 24.9024 39.2929 25.2929L40.7071 26.7071C41.0976 27.0976 41.0976 27.7308 40.7071 28.1213L25.4142 43.4142C25.0391 43.7893 24.5304 44 24 44C23.4696 44 22.9609 43.7893 22.5858 43.4142L7.29289 28.1213C6.90237 27.7308 6.90237 27.0976 7.29289 26.7071L8.70711 25.2929C9.09763 24.9024 9.7308 24.9024 10.1213 25.2929L22 37.1716Z" fill="currentColor"/>
  </svg>
);

const FloatingCard = () => (
  <div style={tiktokWebPageStyles.cardContainer}>
    {/* Image Placeholder */}
    <img 
      style={tiktokWebPageStyles.cardImage} 
      src="https://res.cloudinary.com/dkjokhb4w/image/upload/v1771142525/Control_j7h5zo.jpg"
      alt="Card preview"
    />
    
    {/* Bottom Info */}
    <div style={tiktokWebPageStyles.cardBottom}>
      <div style={tiktokWebPageStyles.cardTextCol}>
        <span style={tiktokWebPageStyles.cardTitle}>TikTok.com</span>
        <span style={tiktokWebPageStyles.cardSubtitle}>TikTok for the larger screen experience.</span>
      </div>
      <button style={tiktokWebPageStyles.cardButton}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 3.5C4.2 3.5 1.75 5.25 0.875 7C1.75 8.75 4.2 10.5 7 10.5C9.8 10.5 12.25 8.75 13.125 7C12.25 5.25 9.8 3.5 7 3.5ZM7 9.1C5.845 9.1 4.9 8.155 4.9 7C4.9 5.845 5.845 4.9 7 4.9C8.155 4.9 9.1 5.845 9.1 7C9.1 8.155 8.155 9.1 7 9.1ZM7 5.95C6.4225 5.95 5.95 6.4225 5.95 7C5.95 7.5775 6.4225 8.05 7 8.05C7.5775 8.05 8.05 7.5775 8.05 7C8.05 6.4225 7.5775 5.95 7 5.95Z" fill="white"/>
        </svg>
        <span style={tiktokWebPageStyles.cardButtonText}>Explore</span>
      </button>
    </div>
  </div>
);

const ScrollHint = () => (
  <motion.div
    className="scroll-hint"
    style={{
      position: 'absolute',
      right: '8px',
      bottom: '8px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '10px',
      zIndex: 10,
      pointerEvents: 'none'
    }}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.5 }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F05C00',
        borderRadius: '999px',
        width: '22px',
        height: '22px',
        boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        position: 'relative',
        color: 'white'
      }}
    >
      <motion.div
        style={{ position: 'absolute', width: '100%', height: '100%' }}
        initial={{ y: 0 }}
        animate={{ y: '100%' }}
        transition={{
          duration: 0.6,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatDelay: 2
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ArrowIcon />
        </div>
        <div style={{ position: 'absolute', top: '-100%', left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ArrowIcon />
        </div>
      </motion.div>
    </div>
    <p
      style={{
        fontFamily: 'var(--font-tiktok)',
        fontSize: '14px',
        fontWeight: 400,
        color: '#666',
        margin: 0
      }}
    >
      Scroll to view more
    </p>
  </motion.div>
);

const MetaInfo = () => (
  <div style={tiktokWebPageStyles.fixedSection}>
    <div style={tiktokWebPageStyles.divider} />
    <div style={tiktokWebPageStyles.metaContainer}>
      <div style={tiktokWebPageStyles.metaColumnLeft}>
        <div style={tiktokWebPageStyles.metaRow}>
          <span style={tiktokWebPageStyles.metaLabel}>Role</span>
          <span style={tiktokWebPageStyles.metaText}>
            Solo Product designer{"\n"}Design Engineer
          </span>
        </div>
        <div style={tiktokWebPageStyles.metaRow}>
          <span style={tiktokWebPageStyles.metaLabel}>Credit</span>
          <span style={tiktokWebPageStyles.metaText}>
            Huqiao Z. /Design Manager{"\n"}Yiming M. Jason L. /PM
          </span>
        </div>
      </div>

      <div style={tiktokWebPageStyles.metaColumnMiddle}>
        <span style={tiktokWebPageStyles.metaLabel}>Responsibilities</span>
        <span style={tiktokWebPageStyles.metaText}>
          Data Analysis{"\n"}Motion/UI/UX{"\n"}Front-end{"\n"}Strategy planning
        </span>
      </div>

      <div style={tiktokWebPageStyles.metaColumnRight}>
        <span style={tiktokWebPageStyles.metaLabel}>Time</span>
        <span style={tiktokWebPageStyles.metaText}>2025 Q2 - Present</span>
      </div>
    </div>
  </div>
);

const LandingSection = () => {
  const [scale, setScale] = React.useState(1);
  const [titleHeight, setTitleHeight] = React.useState(0);
  const titleRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const updateScale = () => {
      const next = (window.innerWidth - 80) / 1840;
      const clamped = Math.min(1, Math.max(0.4, next));
      setScale(Number.isFinite(clamped) ? clamped : 1);
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  React.useEffect(() => {
    if (!titleRef.current) return;
    const baseHeight = titleRef.current.scrollHeight + 32;
    setTitleHeight(Math.ceil(baseHeight * scale));
  }, [scale]);

  return (
    <div style={tiktokWebPageStyles.landingSection}>
      <div style={tiktokWebPageStyles.container}>
        <div style={{ ...tiktokWebPageStyles.titleScaleOuter, height: titleHeight || undefined }}>
          <div ref={titleRef} style={{ ...tiktokWebPageStyles.titleScaleInner, transform: `scale(${scale})` }}>
            <h1 style={tiktokWebPageStyles.title}>
              <span style={tiktokWebPageStyles.titleLine}>
                Driving <span style={{ color: "#000" }}>TikTok.com</span> growth through
              </span>
              <span style={tiktokWebPageStyles.titleLine}>continuous product iteration and</span>
              <span style={tiktokWebPageStyles.titleLine}>
                <span style={{ color: "#000" }}>data-driven insights.</span>
              </span>
            </h1>
          </div>
        </div>
        
        <MetaInfo />
        <FloatingCard />
        <ScrollHint />
      </div>
    </div>
  );
};

const ContentSection = () => {
  // Generate ~1200 words of placeholder text
  const placeholderText = Array(20).fill(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  ).join("\n\n");

  return (
    <div style={tiktokWebPageStyles.contentSection}>
      <p style={{ whiteSpace: "pre-line" }}>{placeholderText}</p>
    </div>
  );
};

const TiktokWebPage = () => {
  return (
    <div style={tiktokWebPageStyles.page} className="tiktokweb-page">
      <RippleBackground />
      <LandingSection />
      <ContentSection />
    </div>
  );
};

export default TiktokWebPage;
