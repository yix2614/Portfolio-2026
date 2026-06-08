import React from "react";
import { GeistProvider, Button, Text } from "@geist-ui/core";
import { useGlimm } from "glimm/react";
import { tiktokWebPageStyles } from "./TiktokWebPage.styles";
import Dock2 from "./Dock2";
import TiktokWebContent from "./TiktokWebContent";

const FloatingCard = ({ hidden }: { hidden: boolean }) => {
  const [mounted, setMounted] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    // Small delay to ensure the CSS transition triggers after initial render
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (mounted && videoRef.current) {
      videoRef.current.play().catch(e => console.log("Auto-play prevented", e));
    }
  }, [mounted]);

  const handleClick = () => {
    window.open('https://www.tiktok.com', '_blank');
  };

  return (
    <>
      <style>{`
        @media (max-width: 840px) {
          .floating-card {
            display: none !important;
          }
        }
        @media (max-width: 480px) {
          .content-section-container {
            padding-top: 20px !important;
            padding-bottom: 20px !important;
          }
        }
      `}</style>
      <div
        className="floating-card"
        style={{
          ...tiktokWebPageStyles.cardContainer,
          // Start completely hidden/down before mount, then respect the `hidden` prop
          transform: (!mounted || hidden) ? "translateY(120%)" : "translateY(0)",
          opacity: (!mounted || hidden) ? 0 : 1,
          transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          pointerEvents: (!mounted || hidden) ? "none" : "auto",
          cursor: 'pointer',
        }}
        onClick={handleClick}
      >
      {/* Video Placeholder */}
      <video 
        ref={videoRef}
        style={tiktokWebPageStyles.cardImage} 
        src="https://f004.backblazeb2.com/file/xiangyi-assets/Lark20260401-174156.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      
      {/* Bottom Info */}
      <div style={tiktokWebPageStyles.cardBottom}>
        <div style={tiktokWebPageStyles.cardTextCol}>
          <Text span style={tiktokWebPageStyles.cardTitle}>TikTok.com</Text>
          <Text span style={tiktokWebPageStyles.cardSubtitle}>Short video / Discover / Web</Text>
        </div>
        {/* @ts-ignore: Geist UI types compatibility with newer React */}
        <Button 
          auto 
          icon={
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 3.5C4.2 3.5 1.75 5.25 0.875 7C1.75 8.75 4.2 10.5 7 10.5C9.8 10.5 12.25 8.75 13.125 7C12.25 5.25 9.8 3.5 7 3.5ZM7 9.1C5.845 9.1 4.9 8.155 4.9 7C4.9 5.845 5.845 4.9 7 4.9C8.155 4.9 9.1 5.845 9.1 7C9.1 8.155 8.155 9.1 7 9.1ZM7 5.95C6.4225 5.95 5.95 6.4225 5.95 7C5.95 7.5775 6.4225 8.05 7 8.05C7.5775 8.05 6.4225 7.5775 5.95 7 5.95Z" fill="var(--color-text-primary)"/>
            </svg>
          }
          style={tiktokWebPageStyles.cardButton}
          onClick={(e) => {
            e.stopPropagation(); // 阻止冒泡，虽然外层已经处理了跳转
            window.open('https://www.tiktok.com', '_blank');
          }}
        >
          <Text span style={tiktokWebPageStyles.cardButtonText}>Explore</Text>
        </Button>
      </div>
    </div>
    </>
  );
};

const ContentSection = () => {
  return (
    <div style={tiktokWebPageStyles.contentSection} className="content-section-container">
      <TiktokWebContent />
    </div>
  );
};

const TiktokWebPage = () => {
  const [isCardHidden, setIsCardHidden] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [loadingProgress, setLoadingProgress] = React.useState(0);
  const { sweep } = useGlimm();
  const introSweepStartedRef = React.useRef(false);

  const finishLoading = React.useCallback(() => {
    if (introSweepStartedRef.current) return;
    introSweepStartedRef.current = true;

    sweep(() => {
      setIsLoading(false);
      window.scrollTo(0, 0);
    }, {
      direction: "ltr",
      sweepMs: 820,
      outroMs: 240,
      midpoint: 0.38,
    });
  }, [sweep]);

  const criticalAssets = React.useMemo(() => [
    "https://f004.backblazeb2.com/file/xiangyi-assets/Before.jpg",
    "https://f004.backblazeb2.com/file/xiangyi-assets/After.jpg",
  ], []);

  const tiktokAssets = React.useMemo(() => [
    "https://f004.backblazeb2.com/file/xiangyi-assets/grid.png",
    "https://f004.backblazeb2.com/file/xiangyi-assets/content.jpeg",
    "https://f004.backblazeb2.com/file/xiangyi-assets/Anatomy+of+a+grid.jpeg",
    "https://f004.backblazeb2.com/file/xiangyi-assets/PM.jpg",
    "https://f004.backblazeb2.com/file/xiangyi-assets/Design.jpg",
    "https://f004.backblazeb2.com/file/xiangyi-assets/Enginner.jpg",
    "https://f004.backblazeb2.com/file/xiangyi-assets/web+bug.jpg"
  ], []);

  React.useEffect(() => {
    const total = criticalAssets.length + tiktokAssets.length;
    if (total === 0) {
      setLoadingProgress(100);
      finishLoading();
      return;
    }

    let loaded = 0;
    const handleDone = () => {
      loaded += 1;
      const nextProgress = Math.round((loaded / total) * 100);
      setLoadingProgress(nextProgress);
      if (loaded >= total) {
        setTimeout(finishLoading, 120);
      }
    };

    criticalAssets.forEach((url) => {
      let settled = false;
      const img = new Image();
      const done = () => {
        if (settled) return;
        settled = true;
        handleDone();
      };
      img.onload = done;
      img.src = url;
    });

    tiktokAssets.forEach((url) => {
      let settled = false;
      const img = new Image();
      const done = () => {
        if (settled) return;
        settled = true;
        handleDone();
      };
      const timeoutId = window.setTimeout(done, 3000);
      img.onload = () => {
        window.clearTimeout(timeoutId);
        done();
      };
      img.onerror = () => {
        window.clearTimeout(timeoutId);
        done();
      };
      img.src = url;
    });
  }, [criticalAssets, finishLoading, tiktokAssets]);

  React.useEffect(() => {
    const updateCardVisibility = () => {
      setIsCardHidden(window.scrollY >= 1500);
    };

    updateCardVisibility();
    window.addEventListener("scroll", updateCardVisibility, { passive: true });
    window.addEventListener("resize", updateCardVisibility);

    return () => {
      window.removeEventListener("scroll", updateCardVisibility);
      window.removeEventListener("resize", updateCardVisibility);
    };
  }, []);

  return (
    <GeistProvider>
      {isLoading && (
        <div style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "var(--color-bg-page)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 99999
        }}>
          <div style={{
            width: "360px",
            height: "6px",
            backgroundColor: "var(--color-bg-secondary)",
            borderRadius: "999px",
            overflow: "hidden"
          }}>
            <div style={{
              height: "100%",
              width: `${loadingProgress}%`,
              backgroundColor: "var(--color-text-primary)",
              transition: "width 0.08s linear"
            }} />
          </div>
        </div>
      )}
      {!isLoading && (
        <div style={tiktokWebPageStyles.page} className="tiktokweb-page">
          <ContentSection />
          <FloatingCard hidden={isCardHidden} />
          <div style={tiktokWebPageStyles.dockWrapper}>
            <Dock2 />
          </div>
        </div>
      )}
    </GeistProvider>
  );
};

export default TiktokWebPage;
