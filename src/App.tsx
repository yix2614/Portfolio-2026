import { motion } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import { useState, useEffect, useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BioProfile from './components/BioProfile'

// Add Google Font Doto
const link = document.createElement('link');
link.href = "https://fonts.googleapis.com/css2?family=Doto:wght@100..900&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link);

import GlobeBox from './components/GlobeBox';

import NameBox from './components/NameBox';
import ClientsBox from './components/ClientsBox';
import ModeSwitch from './components/ModeSwitch';
import Dock from './components/Dock';
import StatisticBox from './components/StatisticBox';
import CurrentAtBox from './components/CurrentAtBox';
import ClockBox from './components/ClockBox';
import SocialBox from './components/SocialBox';
import ProjectOverlay from './components/ProjectOverlay';
import ProjectGrid from './components/ProjectGrid';
import { applyTheme, getInitialTheme } from './utils/theme';


import { appStyles, appInlineStyles } from './App.styles';


export default function App() {
  const [randomDelays, setRandomDelays] = useState<number[]>([]);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const lenisRef = useRef<Lenis | null>(null);
  const getTabFromPath = (pathname: string) =>
    pathname === "/project" ? "project" : "dashboard";
  const [activeTab, setActiveTab] = useState<"dashboard" | "project">(() =>
    getTabFromPath(location.pathname)
  );

  useEffect(() => {
    const nextTab = getTabFromPath(location.pathname);
    setActiveTab(nextTab);
  }, [location.pathname]);

  useEffect(() => {
    if (activeTab !== "dashboard") {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      return;
    }

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
    let rafId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [activeTab]);

  useEffect(() => {
    // Generate a list of delays from 0 to 7 * 0.1s (e.g. 0s, 0.1s, 0.2s ... 0.7s)
    // Then shuffle them to get random order but distinct timing
    const delays = Array.from({ length: 8 }, (_, i) => i * 0.1);
    
    // Fisher-Yates shuffle
    for (let i = delays.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [delays[i], delays[j]] = [delays[j], delays[i]];
    }
    
    setRandomDelays(delays);
  }, []);

  const dashboardAssets = useMemo(() => [
    'https://framerusercontent.com/images/06WZmP1XWROpiKFsq42ccuj9Uc.jpeg',
    'https://framerusercontent.com/images/5PJkfNDMBpsvW2XCy0995E3ObA.gif',
    'https://framerusercontent.com/images/yplmdt0RqV17WOqq1Yn70eRbHQQ.png',
    'https://framerusercontent.com/images/tZQxzoPvKctSUy0zYRdJlQuemdQ.png',
    'https://res.cloudinary.com/dkjokhb4w/image/upload/v1769813289/Googe_h9fkwg.png',
    'https://res.cloudinary.com/dkjokhb4w/image/upload/v1769813289/Nike_tvmbjm.png',
    'https://res.cloudinary.com/dkjokhb4w/image/upload/v1769813289/Shiseido_xgdiqm.png',
    'https://res.cloudinary.com/dkjokhb4w/image/upload/v1769813288/AXA_eh4eve.png',
    'https://framerusercontent.com/images/nVfg0wCczUhY25El2mKQ089ml4.png?scale-down-to=512'
  ], []);

  useEffect(() => {
    const total = dashboardAssets.length;
    if (total === 0) {
      setLoadingProgress(100);
      setIsLoading(false);
      return;
    }

    let loaded = 0;
    const handleDone = () => {
      loaded += 1;
      const nextProgress = Math.round((loaded / total) * 100);
      setLoadingProgress(nextProgress);
      if (loaded >= total) {
        setTimeout(() => setIsLoading(false), 120);
      }
    };

    dashboardAssets.forEach((url) => {
      const img = new Image();
      img.onload = handleDone;
      img.onerror = handleDone;
      img.src = url;
    });
  }, [dashboardAssets]);


  // Performance optimization: Memoize the fadeIn transition so we don't recreate it on every render
  const fadeInProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    // Use the random delays generated in useEffect
    transition: { duration: 0.5, delay: 0.2 } // Fallback delay, will be overridden by custom components if needed
  };

  return (
    <>
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
    <>
    {activeTab === "dashboard" && (
    <div className={appStyles.pageWrapper} style={appInlineStyles.pageWrapper}>
      <main className={appStyles.mainContainer}>
       {/* < WholeFramerComponent.Responsive/> */}
        <section className={appStyles.leftColumn}>
        <div className={appStyles.bioGlobeRow}>
          <div className={appStyles.bioWrapper} style={appInlineStyles.bioWrapper}>
            <motion.div className={appStyles.bioInner} {...fadeInProps} transition={{ duration: 0.5, delay: randomDelays[0] || 0.1 }}>
                <BioProfile />
            </motion.div>
          </div>
          <motion.div {...fadeInProps} transition={{ duration: 0.5, delay: randomDelays[1] || 0.2 }} style={{ display: 'flex', flex: '1 1 0%' }}>
            <GlobeBox className={appStyles.globeWrapper} style={{ ...appInlineStyles.globeWrapper, flex: '1 1 100%' }} />
          </motion.div>
        </div>
       
        <div className={appStyles.nameRow}>
          <motion.div className={appStyles.nameInner} {...fadeInProps} transition={{ duration: 0.5, delay: randomDelays[2] || 0.3 }}>
            <NameBox />
          </motion.div>
        </div>
      </section>
      
      <section className={appStyles.rightColumn}>
        {/* Top Row Items Container */}
        <div className={appStyles.topRow}>
          <motion.div className={appStyles.socialWrapper} {...fadeInProps} transition={{ duration: 0.5, delay: randomDelays[3] || 0.4 }}>
              <SocialBox/>
          </motion.div>
          <motion.div className={appStyles.statisticWrapper} {...fadeInProps} transition={{ duration: 0.5, delay: randomDelays[4] || 0.5 }}>
              <StatisticBox />
          </motion.div>
          <motion.div className={appStyles.currentSwitchWrapper} {...fadeInProps} transition={{ duration: 0.5, delay: randomDelays[5] || 0.6 }}>
              <div className={appStyles.currentAtBoxWrapper}>
                <CurrentAtBox/>
              </div>
            
              <p className={appStyles.modeSwitchLabel} style={appInlineStyles.modeSwitchLabel}>
                Mode switch
              </p>
              <div className={appStyles.modeSwitchBox} style={appInlineStyles.modeSwitchBox}>
                <ModeSwitch/>
              </div>
          </motion.div>
        </div>

        {/* Bottom Row Items */}
        <div className={appStyles.bottomRow}>
          <motion.div className={appStyles.clockWrapper} style={appInlineStyles.clockWrapper} {...fadeInProps} transition={{ duration: 0.5, delay: randomDelays[6] || 0.7 }}>
              <ClockBox/>
          </motion.div>
          <motion.div className={appStyles.clientsWrapper} style={appInlineStyles.clientsWrapper} {...fadeInProps} transition={{ duration: 0.5, delay: randomDelays[7] || 0.8 }}>
              <div className={appStyles.clientsInner}>
                <ClientsBox />
              </div>
          </motion.div>
        </div>
      </section>
      </main>
    </div>
    )}
    
    {activeTab === "project" && (
    <motion.div
      {...fadeInProps}
      transition={{ duration: 0.5, delay: randomDelays[0] || 0.1 }}
      style={{ backgroundColor: "var(--color-bg-page)", minHeight: "100vh" }}
    >
      <ProjectGrid style={appInlineStyles.horizontalScroll} />
    </motion.div>
    )}

    <div style={appInlineStyles.dockContainer}>
      <Dock
        onProjectClick={() => setIsOverlayOpen(true)}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          navigate(tab === "project" ? "/project" : "/");
        }}
      />
    </div>
   
    <ProjectOverlay isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)} />
    </>
    )}
    </>
  );
};
