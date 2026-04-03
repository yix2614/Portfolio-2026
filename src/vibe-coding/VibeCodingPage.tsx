import React, { useRef, useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, useVideoTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useControls, Leva } from 'leva';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import Dock2 from '../tiktokweb/Dock2';
import { applyTheme, getInitialTheme } from '../utils/theme';

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 37.1716L22 5C22 4.44772 22.4477 4 23 4H25C25.5523 4 26 4.44771 26 5L26 37.1716L37.8787 25.2929C38.2692 24.9024 38.9024 24.9024 39.2929 25.2929L40.7071 26.7071C41.0976 27.0976 41.0976 27.7308 40.7071 28.1213L25.4142 43.4142C25.0391 43.7893 24.5304 44 24 44C23.4696 44 22.9609 43.7893 22.5858 43.4142L7.29289 28.1213C6.90237 27.7308 6.90237 27.0976 7.29289 26.7071L8.70711 25.2929C9.09763 24.9024 9.7308 24.9024 10.1213 25.2929L22 37.1716Z" fill="currentColor"/>
  </svg>
);

// ... (AsciiEffect and AsciiScene remain unchanged, I will skip replacing them if possible or just include them if I replace the whole file, but SearchReplace is better)

// Let's use SearchReplace to insert imports and define slides


const AsciiEffect = ({ videoUrl }: { videoUrl: string }) => {
  const videoTexture = useVideoTexture(videoUrl);
  const meshRef = useRef<THREE.Mesh>(null);
  
  // ASCII character set from dark to light
  const chars = " .:-=+*#%@";
  
  useEffect(() => {
    if (videoTexture) {
      videoTexture.minFilter = THREE.LinearFilter;
      videoTexture.magFilter = THREE.LinearFilter;
    }
  }, [videoTexture]);

  useFrame(() => {
    if (meshRef.current && meshRef.current.material) {
      // Custom shader logic would go here, but for simplicity in R3F 
      // we might want to use a post-processing effect or a custom shader material.
      // However, creating a true ASCII effect requires a custom shader.
      // Let's implement a simple custom shader material for ASCII.
    }
  });

  const AsciiShaderMaterial = {
    uniforms: {
      uTexture: { value: videoTexture },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uChars: { value: new THREE.DataTexture(createCharTexture(chars), chars.length, 1, THREE.RedFormat) },
      uCharCount: { value: chars.length },
      uCellSize: { value: 10.0 } // Size of each ASCII cell
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D uTexture;
      uniform vec2 uResolution;
      uniform float uCellSize;
      varying vec2 vUv;

      float getGray(vec4 color) {
        return dot(color.rgb, vec3(0.299, 0.587, 0.114));
      }

      void main() {
        vec2 pixelSize = vec2(uCellSize) / uResolution;
        vec2 cellUv = floor(vUv / pixelSize) * pixelSize;
        
        vec4 color = texture2D(uTexture, cellUv);
        float gray = getGray(color);
        
        // This is a simplified ASCII effect. 
        // A true ASCII effect would map the gray value to a character texture.
        // For now, let's just pixelate and make it monochromatic to simulate the vibe.
        
        gl_FragColor = vec4(vec3(gray), 1.0);
      }
    `
  };

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[16, 9]} /> {/* Adjust aspect ratio as needed */}
      <shaderMaterial 
        args={[AsciiShaderMaterial]} 
        uniforms-uTexture-value={videoTexture}
        uniforms-uResolution-value={new THREE.Vector2(window.innerWidth, window.innerHeight)}
      />
    </mesh>
  );
};

// Helper to create character texture map (concept)
function createCharTexture(chars: string) {
    // This would generate a texture atlas for characters
    // For now returning dummy data
    return new Uint8Array(chars.length); 
}


// Since writing a full ASCII shader from scratch is complex, 
// let's use a more direct approach: HTML overlay or a simpler canvas manipulation
// Or better yet, use the `three/examples/jsm/effects/AsciiEffect` which is standard.

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { AsciiEffect as ThreeAsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';

const AsciiScene = ({ videoUrl, isHeroMode, aspectRatio, onAspectRatio }: { videoUrl: string, isHeroMode?: boolean, aspectRatio?: number, onAspectRatio?: (ratio: number) => void }) => {
    const mountRef = useRef<HTMLDivElement>(null);
    const effectRef = useRef<ThreeAsciiEffect | null>(null);
    const onAspectRatioRef = useRef<typeof onAspectRatio>(undefined);

    useEffect(() => {
        onAspectRatioRef.current = onAspectRatio;
    }, [onAspectRatio]);

    // Default settings
    const settings = {
        // Significantly more spaces to maximize black negative space
        characters: '             .:-+=*#%@', 
        invert: true,
        color: 'white',
        bgColor: 'black',
        contrast: 300,
        brightness: 112,
        fontSize: 0.25 
    };
    
    useEffect(() => {
        if (!mountRef.current) return;

        // Setup Scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0, 0, 0);

        // Use container size instead of window size
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;

        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 600;

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
        
        // ASCII Effect
        const effect = new ThreeAsciiEffect(renderer, settings.characters, { 
            invert: settings.invert, 
            resolution: settings.fontSize 
        });
        effect.setSize(width, height);
        effect.domElement.style.color = settings.color;
        effect.domElement.style.backgroundColor = settings.bgColor;
        effect.domElement.style.filter = `contrast(${settings.contrast}%) brightness(${settings.brightness}%)`;
        
        // Scale fix for edges
        effect.domElement.style.position = 'absolute';
        effect.domElement.style.top = '50%';
        effect.domElement.style.left = '50%';
        effect.domElement.style.transform = 'translate3d(-50%, -50%, 0) scale(1.1)'; 
        effect.domElement.style.transformOrigin = 'center center';
        effect.domElement.style.willChange = 'transform';
        // Disable pointer events on the canvas to allow parent cursor styles to prevail
        // and to let clicks pass through to the CardWrapper
        effect.domElement.style.pointerEvents = 'none';
        
        mountRef.current.appendChild(effect.domElement);
        effectRef.current = effect;

        // Video Setup
        const video = document.createElement('video');
        video.src = videoUrl;
        video.crossOrigin = 'anonymous'; // AsciiScene STRICTLY NEEDS this to read pixels into Canvas
        video.muted = true;
        video.loop = false; 
        video.playbackRate = 1.0;
        video.playsInline = true; 
        video.preload = 'auto'; 
        
        // Ping-Pong Loop Logic
        let isReversing = false;
        let lastTime = 0;

        video.play().catch(() => {});

        const updateVideoLoop = (time: number) => {
            if (!video.paused && !isReversing) {
                if (video.currentTime >= video.duration - 0.1) {
                    isReversing = true;
                    video.pause();
                }
            } else if (isReversing) {
                const delta = (time - lastTime) / 1000;
                if (delta >= 0.033) { 
                    video.currentTime = Math.max(0, video.currentTime - 0.04);
                    lastTime = time;
                    if (video.currentTime <= 0.1) {
                        isReversing = false;
                        video.play();
                    }
                }
            }
        };

        const texture = new THREE.VideoTexture(video);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;

        const geometry = new THREE.PlaneGeometry(1600, 900); 
        // Revert to BasicMaterial for best performance
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const plane = new THREE.Mesh(geometry, material);
        plane.matrixAutoUpdate = true;
        scene.add(plane);
        
        // Removed internal lightweight interaction to rely on CardWrapper for 3D tilt
        
        // Calculate plane size
        let videoAspect = 16 / 9;
        const updatePlaneSize = () => {
            if (!mountRef.current) return;
            const width = mountRef.current.clientWidth;
            const height = mountRef.current.clientHeight;

            const vFOV = THREE.MathUtils.degToRad(camera.fov);
            const viewHeight = 2 * Math.tan(vFOV / 2) * camera.position.z;
            const viewWidth = viewHeight * camera.aspect;
            
            const screenAspect = viewWidth / viewHeight;
            
            let planeWidth, planeHeight;
            
            if (screenAspect > videoAspect) {
                planeWidth = viewWidth;
                planeHeight = viewWidth / videoAspect;
            } else {
                planeHeight = viewHeight;
                planeWidth = viewHeight * videoAspect;
            }
            
            plane.scale.set(planeWidth / 1600 * 1.1, planeHeight / 900 * 1.1, 1);
        };
        updatePlaneSize();
        const handleMetadata = () => {
            if (video.videoWidth && video.videoHeight) {
                videoAspect = video.videoWidth / video.videoHeight;
                if (onAspectRatioRef.current) {
                    onAspectRatioRef.current(videoAspect);
                }
                updatePlaneSize();
            }
        };
        video.addEventListener('loadedmetadata', handleMetadata);

        // Main Animation Loop
        let animationId: number;
        const animate = (time: number) => {
            animationId = requestAnimationFrame(animate);
            updateVideoLoop(time);
            effect.render(scene, camera);
        };
        requestAnimationFrame(animate);

        // Handle Resize with ResizeObserver
        const handleResize = () => {
            if (!mountRef.current) return;
            const width = mountRef.current.clientWidth;
            const height = mountRef.current.clientHeight;
            
            // Avoid zero-size updates
            if (width === 0 || height === 0) return;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
            effect.setSize(width, height);
            updatePlaneSize();
        };

        const resizeObserver = new ResizeObserver(() => {
            // Debounce or requestAnimationFrame can be added if needed, 
            // but for smooth morphing, direct update is often better or sync with frame.
            // Let's use requestAnimationFrame to prevent layout thrashing
            requestAnimationFrame(handleResize);
        });

        if (mountRef.current) {
            resizeObserver.observe(mountRef.current);
        }

        // Also listen to window resize as fallback/supplement
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationId);
            resizeObserver.disconnect(); // Stop observing
            window.removeEventListener('resize', handleResize);
            // window.removeEventListener('mousemove', onMouseMove); // Removed
            if (mountRef.current) {
                // Check if child exists before removing
                if (mountRef.current.contains(effect.domElement)) {
                    mountRef.current.removeChild(effect.domElement);
                }
            }
            // Cleanup
            geometry.dispose();
            material.dispose();
            texture.dispose();
            video.pause();
            video.src = "";
            video.load(); 
            renderer.dispose();
            video.removeEventListener('loadedmetadata', handleMetadata);
        };
    }, [videoUrl]);

    return (
        <div 
            ref={mountRef} 
            style={{ 
                width: '100%', 
                height: '100%', 
                aspectRatio: isHeroMode ? 'auto' : (aspectRatio ? `${aspectRatio}` : '16/9'), 
                cursor: 'inherit' 
            }} 
        />
    );
};


import { vibeCodingPageStyles } from './VibeCodingPage.styles';

const slides = [
  {
    id: 0,
    title: 'Vibe Coding',
    subtitle: 'Visual Experiment',
    videoUrl: 'https://f004.backblazeb2.com/file/xiangyi-assets/jimeng_gidwco.mp4',
    date: 'Feb 9, 2026',
    version: 'Concept V0.9',
    type: 'ascii'
  },
  {
    id: 1,
    title: 'TikTok.com',
    subtitle: 'Long Video UI',
    videoUrl: 'https://f004.backblazeb2.com/file/xiangyi-assets/long_1_vbip9e.mp4',
    date: 'Feb 1, 2026',
    version: 'Concept V1.0',
    type: 'video'
  },
  {
    id: 2,
    title: 'TikTok.com',
    subtitle: 'On-boarding Experience',
    videoUrl: 'https://f004.backblazeb2.com/file/xiangyi-assets/20260208-230441_rcqqd1.mp4',
    date: 'Jan 16, 2026',
    version: 'Concept V1.0',
    type: 'video'
  },
  {
    id: 4,
    title: 'TT Incentive Component',
    subtitle: 'Visual Experiment',
    videoUrl: 'https://f004.backblazeb2.com/file/xiangyi-assets/drop.mp4',
    date: 'Apr 2, 2026',
    version: 'Concept V1.0',
    type: 'video',
    cursorTag: 'Coming soon'
  },
  {
    id: 3,
    title: 'UG hiring',
    subtitle: 'Hiring Journey',
    videoUrl: 'https://f004.backblazeb2.com/file/xiangyi-assets/20251216-170912_qafqms.mp4',
    date: 'Feb 9, 2026',
    version: 'Concept V1.0',
    type: 'video'
  }
];

const VibeCodingPage = () => {
  const [isHeroMode, setIsHeroMode] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHeroTransitioning, setIsHeroTransitioning] = useState(false);
  const [aspectRatios, setAspectRatios] = useState<Record<string, number>>({});
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const wheelLockRef = useRef(0);
  const transitionTypeRef = useRef<null | 'hero' | 'slide'>(null);
  const pendingHeroRef = useRef(false);
  useEffect(() => {
    applyTheme(getInitialTheme());
    if (!document.getElementById('instrument-font')) {
      const link = document.createElement('link');
      link.id = 'instrument-font';
      link.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
  }, []);
  useEffect(() => {
    const handleThemeChange = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    window.addEventListener('themeChange', handleThemeChange);
    return () => window.removeEventListener('themeChange', handleThemeChange);
  }, []);
  useEffect(() => {
    const assets = slides.map((slide) => slide.videoUrl);
    const total = assets.length;
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
    assets.forEach((url) => {
      const video = document.createElement('video');
      // video.crossOrigin = 'anonymous'; // Removed: causing strict CORS failures on normal videos
      video.preload = 'metadata';
      video.muted = true;
      video.playsInline = true; // Add this, iOS needs this
      
      let isDone = false;

      const onLoaded = () => {
        if (isDone) return;
        isDone = true;
        video.removeEventListener('loadedmetadata', onLoaded);
        video.removeEventListener('error', onError);
        handleDone();
      };
      
      const onError = () => {
        if (isDone) return;
        isDone = true;
        video.removeEventListener('loadedmetadata', onLoaded);
        video.removeEventListener('error', onError);
        console.warn('Video failed to load metadata:', url);
        handleDone(); // Proceed even if it errors to not block the whole page
      };
      
      // Sometimes loadedmetadata never fires if the browser caches it weirdly or refuses to load
      // Add a fallback timeout to force the loading screen to finish
      setTimeout(() => {
          if (!isDone) {
            isDone = true;
            video.removeEventListener('loadedmetadata', onLoaded);
            video.removeEventListener('error', onError);
            handleDone();
          }
      }, 5000); // 5 seconds max wait per video

      video.addEventListener('loadedmetadata', onLoaded);
      video.addEventListener('error', onError);
      video.src = url;
      video.load();
    });
  }, []);
  const handleAspectRatio = useCallback((videoUrl: string, ratio: number) => {
    setAspectRatios((prev) => (prev[videoUrl] === ratio ? prev : { ...prev, [videoUrl]: ratio }));
  }, []);
  const beginTransition = (type: 'hero' | 'slide') => {
    if (transitionTypeRef.current) return;
    transitionTypeRef.current = type;
    if (type === 'hero') {
      setIsHeroTransitioning(true);
    }
  };
  const endTransition = (type: 'hero' | 'slide') => {
    if (transitionTypeRef.current !== type) return;
    transitionTypeRef.current = null;
    if (type === 'hero') {
      setIsHeroTransitioning(false);
    }
  };
  const canNavigate = () => {
    if (transitionTypeRef.current) return false;
    const now = Date.now();
    if (now - wheelLockRef.current < 600) return false;
    wheelLockRef.current = now;
    return true;
  };

  const handleNext = () => {
    pendingHeroRef.current = false;
    if (isHeroMode) {
      beginTransition('hero');
      setIsHeroMode(false);
      return;
    }
    if (currentIndex < slides.length - 1) {
      beginTransition('slide');
      setCurrentIndex((prev) => Math.min(prev + 1, slides.length - 1));
    }
  };

  const handlePrev = () => {
    if (currentIndex === 0) {
      if (!isHeroMode) {
        pendingHeroRef.current = false;
        beginTransition('hero');
        setIsHeroMode(true);
      }
      return;
    }
    if (currentIndex > 0) {
      pendingHeroRef.current = false;
      beginTransition('slide');
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const handleDragEnd = (event: any, info: any) => {
    const threshold = 50;
    if (!canNavigate()) {
      if (info.offset.y > threshold && !isHeroMode && currentIndex === 0) {
        pendingHeroRef.current = true;
      }
      return;
    }
    if (info.offset.y < -threshold) {
      handleNext();
    } else if (info.offset.y > threshold) {
      handlePrev();
    }
  };

  const handleWheel = (event: React.WheelEvent) => {
    if (Math.abs(event.deltaY) < 20) return;
    if (!canNavigate()) {
      if (event.deltaY < 0 && !isHeroMode && currentIndex === 0) {
        pendingHeroRef.current = true;
      }
      return;
    }
    // event.preventDefault(); // Removed to avoid interfering with other interactions if needed, but 'overflow: hidden' on container handles it.
    
    if (event.deltaY > 0) {
      handleNext();
    } else {
      handlePrev();
    }
  };

  const handlePaginationClick = (index: number) => {
    if (transitionTypeRef.current) return;
    if (!isHeroMode && index === currentIndex) return;
    pendingHeroRef.current = false;
    beginTransition(isHeroMode ? 'hero' : 'slide');
    setIsHeroMode(false);
    setCurrentIndex(index);
  };

  const handleSlideExitComplete = () => {
    endTransition('slide');
    if (pendingHeroRef.current && !isHeroMode && currentIndex === 0 && !transitionTypeRef.current) {
      pendingHeroRef.current = false;
      beginTransition('hero');
      setIsHeroMode(true);
    }
  };

  const currentSlide = slides[currentIndex];
  const currentAspectRatio = aspectRatios[currentSlide.videoUrl];
  const shouldAnimateCard = !isHeroTransitioning && currentIndex >= 1;
  const cardWidth = currentAspectRatio && currentAspectRatio > 0
    ? `min(64vw, calc(60vh * ${currentAspectRatio.toFixed(6)}))`
    : '64vw';
  const cardHeight = currentAspectRatio && currentAspectRatio > 0
    ? `min(60vh, calc(64vw / ${currentAspectRatio.toFixed(6)}))`
    : 'min(36vw, 60vh)';

  // Visual variants for the main container
  const containerVariants = {
    hero: {
      width: '100%',
      height: '85vh', 
      // minHeight: '85vh', // Removed minHeight hack
      maxHeight: '85vh', // Ensure continuity with card state animation 
      // Center point at 42.5vh (half of 85vh) puts the top edge at 0
      top: '42.5vh', 
      left: '50%',
      borderRadius: '12px',
    },
    card: {
      width: cardWidth, 
      height: cardHeight,
      // minHeight: '20vh', // Removed minHeight hack
      top: '50vh',
      left: '50%',
      borderRadius: '12px',
    }
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
    <div
      style={{
        ...vibeCodingPageStyles.container,
        backgroundColor: isDark ? '#1A1A1A' : 'var(--color-bg-page)',
        overflow: 'hidden'
      }}
      className="vibe-coding-page"
      onWheel={handleWheel}
    >
      
      {/* Background Text Layer (VIBE CODING) - Visible in Hero Mode */}
      <AnimatePresence>
        {isHeroMode && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '15vh',
                zIndex: 10,
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <div
                style={{
                  ...vibeCodingPageStyles.textOverlay,
                  color: isDark ? '#FFFFFF' : 'var(--color-text-primary)',
                  display: 'flex',
                  alignItems: 'stretch',
                  gap: '16px'
                }}
                className="vibe-text-overlay"
              >
                <div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>VIBE /CODING!</div>
                {/* <div
                  style={{
                    fontSize: '24px',
                    fontFamily: 'serif',
                    fontStyle: 'italic',
                    fontWeight: 400,
                    opacity: 0.25,
                    letterSpacing: 'normal',
                    lineHeight: 1.2,
                    whiteSpace: 'nowrap',
                    marginTop: '20px'
                  }}
                >
                  Yi's concpet/motion gallary
                </div> */}
              </div>
            </motion.div>
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
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4 }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#F05C00',
                  color: 'var(--color-text-primary)',
                  borderRadius: '999px',
                  width: '22px',
                  height: '22px',
                  boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                  overflow: 'hidden',
                  position: 'relative'
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
                  fontFamily: '"Helvetica Neue", "Helvetica Neue Regular", sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  color: 'var(--color-text-primary)',
                  margin: 0
                }}
              >
                Scroll to view more
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Top Nav Layer - Visible in Card Mode */}
      <AnimatePresence>
        {!isHeroMode && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            style={{
                position: 'absolute',
                top: '20px',
                left: 0,
                width: '100%',
                zIndex: 10,
                padding: '0 20px',
                boxSizing: 'border-box'
            }}
          >
             <div style={vibeCodingPageStyles.topNav}>
              <div style={vibeCodingPageStyles.topNavTitle}>
                <div style={{ width: '100%' }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide.id + '_title'} // Use ID to force animation even if title is identical
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        style={{ width: '100%', color: isDark ? '#FFFFFF' : 'var(--color-text-primary)' }}
                    >
                        <div>{currentSlide.title}</div>
                    </motion.div>
                  </AnimatePresence>
                  
                  <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide.id + '_subtitle'} // Use ID to force animation even if subtitle is identical
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        style={{ ...vibeCodingPageStyles.topNavSubtitle, width: '100%' }}
                    >
                        {currentSlide.subtitle}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
              
              <div style={vibeCodingPageStyles.topNavInfo}>
                <div style={{ flex: 1, textAlign: 'right', overflow: 'hidden' }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide.id + '_date'} // Use ID to force animation even if date string is identical
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {currentSlide.date}
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div style={{ flex: 1, textAlign: 'right', overflow: 'hidden' }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide.id + '_version'} // Use ID to force animation even if version string is identical
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {currentSlide.version}
                        </motion.div>
                    </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Visual Layer (Morphing Container) */}
      <div style={{ 
          width: '100%', 
          height: '100%', 
          // Removed flex layout logic as we are using absolute positioning
          position: 'relative',
          zIndex: 5,
          // overflow: 'hidden' // Removed to prevent clipping of shadows in Card mode
      }}>
        <motion.div
            // layout prop removed to rely on explicit values for smooth animation
            variants={containerVariants}
            initial="hero"
            animate={isHeroMode ? 'hero' : 'card'}
            transition={{ 
                type: "spring", 
                stiffness: 120, // Slightly stiffer for snap
                damping: 20,    // Balanced damping
                mass: 1,        // Standard mass
                restDelta: 0.001 // Ensure it settles precisely
            }}
            onAnimationComplete={() => endTransition('hero')}
            style={{
                overflow: isHeroMode ? 'hidden' : 'visible', // Dynamic overflow: hidden for Hero crop, visible for Card shadow
                position: 'absolute', // Absolute positioning is key
                boxShadow: 'none', // Removed shadow
                // When in card mode, we want to allow dragging on this element
                cursor: !isHeroMode ? 'grab' : 'default',
                backgroundColor: 'transparent',
                transform: 'translate(-50%, -50%)'
            }}
            // Drag Logic only active in Card Mode
            drag={!isHeroMode ? "y" : false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            dragSnapToOrigin
            onDragEnd={handleDragEnd}
        >
            <AnimatePresence mode="wait" initial={false} onExitComplete={handleSlideExitComplete}>
                <motion.div
                    key={currentIndex}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <motion.div
                        initial={
                            shouldAnimateCard
                                ? { opacity: 0, scale: 1.22, y: 36 }
                                : { opacity: 1 }
                        }
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={
                            shouldAnimateCard
                                ? { opacity: 0, scale: 0.88, y: -12 }
                                : { opacity: 1 }
                        }
                        transition={
                            shouldAnimateCard
                                ? { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
                                : { duration: 0 }
                        }
                        style={{ width: '100%', height: '100%' }}
                    >
                        {currentSlide.type === 'ascii' ? (
                            <CardWrapper isHeroMode={isHeroMode}>
                                <AsciiScene
                                    videoUrl={currentSlide.videoUrl}
                                    isHeroMode={isHeroMode}
                                    aspectRatio={currentAspectRatio}
                                    onAspectRatio={(ratio) => handleAspectRatio(currentSlide.videoUrl, ratio)}
                                />
                            </CardWrapper>
                        ) : (
                            <Card3D
                                videoSrc={currentSlide.videoUrl}
                                onAspectRatio={(ratio) => handleAspectRatio(currentSlide.videoUrl, ratio)}
                                cursorTag={currentSlide.cursorTag}
                            />
                        )}
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </motion.div>
      </div>

      {/* Bottom Pagination - Visible in Card Mode */}
      <AnimatePresence>
        {!isHeroMode && (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.35, delay: 0.1 }}
                style={{
                    position: 'absolute',
                    bottom: '120px',
                    left: 0,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    pointerEvents: 'none', // Allow clicks to pass through empty areas
                    zIndex: 10
                }}
            >
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', pointerEvents: 'auto' }}>
                    {slides.map((slide, i) => (
                        <div 
                            key={i}
                            onClick={() => handlePaginationClick(i)}
                            style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                backgroundColor: i === currentIndex
                                    ? (isDark ? '#FFFFFF' : '#000000')
                                    : (isDark ? '#555555' : '#d1d1d1'),
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                transform: i === currentIndex ? 'scale(1.2)' : 'scale(1)',
                            }} 
                        />
                    ))}
                </div>
            </motion.div>
        )}
      </AnimatePresence>

    </div>
    )}
    {!isLoading && (
      <div style={vibeCodingPageStyles.dockWrapper}>
        <Dock2 hiddenLabels={["Tab"]} />
      </div>
    )}
    </>
  );
};

// Shared Wrapper to provide 3D hover effects
const CardWrapper = ({ children, isHeroMode, cursorTag }: { children: React.ReactNode, isHeroMode: boolean, cursorTag?: string }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotate, setRotate] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    
    // Use MotionValue for high-performance cursor tracking without re-renders
    // Initialize off-screen to prevent flash at (0,0)
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    useEffect(() => {
        // Disable 3D logic in Hero mode to save performance and avoid weird tilts
        if (isHeroMode) {
            setRotate({ x: 0, y: 0 });
            return;
        }

        let ticking = false; // Throttling lock

        const handleGlobalMouseMove = (e: MouseEvent) => {
            // Update MotionValues directly
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);

            if (!ticking) {
                requestAnimationFrame(() => {
                    if (cardRef.current) {
                        const rotateY = ((e.clientX / window.innerWidth) - 0.5) * 8; 
                        const rotateX = -((e.clientY / window.innerHeight) - 0.5) * 8;
                        setRotate({ x: rotateX, y: rotateY });
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('mousemove', handleGlobalMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleGlobalMouseMove);
        };
    }, [isHeroMode, cursorX, cursorY]);

    return (
        <>
            {!isHeroMode && createPortal(
                <motion.div 
                    style={{
                        ...vibeCodingPageStyles.cursorCircle,
                        // Bind motion values directly to style props
                        x: cursorX, 
                        y: cursorY,
                        // Override left/top to 0 and handle centering via translate in CSS or here
                        // The original style likely has transform: translate(-50%, -50%)
                        left: 0,
                        top: 0,
                        opacity: isHovering ? 1 : 0,
                        scale: isHovering ? 1 : 0.5,
                        pointerEvents: 'none'
                    }}
                >
                    {cursorTag ?? 'OPEN'}
                </motion.div>,
                document.body
            )}

            <div
                style={{
                    ...vibeCodingPageStyles.cardContainer,
                    // Remove fixed width/height constraints from container style if they exist, 
                    // let parent control size.
                    width: '100%',
                    height: isHeroMode ? '100%' : 'auto', // Fix: Force 100% height in Hero mode to prevent collapse
                    perspective: '1000px',
                    pointerEvents: isHeroMode ? 'none' : 'auto', // Pass through clicks in Hero mode if needed, or block
                    cursor: !isHeroMode ? 'none' : 'default', // Explicitly hide cursor in Card mode
                }}
                onMouseEnter={() => !isHeroMode && setIsHovering(true)}
                onMouseLeave={() => !isHeroMode && setIsHovering(false)}
                onClick={() => !isHeroMode && window.open('https://long-video-bkc1.vercel.app/', '_blank')}
            >
                <div 
                    ref={cardRef}
                    style={{
                        width: '100%',
                        height: isHeroMode ? '100%' : 'auto', // In Hero mode fill height, in Card mode adapt
                        position: 'relative',
                        borderRadius: '12px',
                        // Apply rotation only in Card mode
                        transform: isHeroMode ? 'none' : `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                        transition: 'transform 0.1s ease-out, box-shadow 0.3s ease',
                        // Apply shadow only in Card mode
                        boxShadow: isHeroMode ? 'none' : '0 20px 40px rgba(0,0,0,0.1)',
                        overflow: 'hidden', // Clip content (like ASCII) inside the rounded corners
                        transformStyle: 'preserve-3d', 
                        background: 'transparent',
                        cursor: isHeroMode ? 'default' : 'none', // Ensure inner container also hides cursor
                    }}
                >
                    {children}
                    
                    {/* Glossy Overlay - Only for Card Mode if desired, or keep it subtle */}
                    {!isHeroMode && (
                         <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 40%, rgba(0,0,0,0.1) 100%)',
                            pointerEvents: 'none',
                            borderRadius: '12px',
                            zIndex: 10
                        }} />
                    )}
                </div>
            </div>
        </>
    );
};

// 3D Card Component for Mouse Tracking
const Card3D = ({ videoSrc, onAspectRatio, cursorTag }: { videoSrc: string, onAspectRatio?: (ratio: number) => void, cursorTag?: string }) => {
    // Reuse the wrapper for consistent behavior
    return (
        <CardWrapper isHeroMode={false} cursorTag={cursorTag}>
             <video
                key={videoSrc}
                src={videoSrc}
                autoPlay
                loop
                muted
                playsInline
                // Removed crossOrigin="anonymous" to allow standard video loading to succeed.
                // If a specific external URL strictly requires it, handle it on a case-by-case basis.
                onLoadedMetadata={(event) => {
                    const video = event.currentTarget;
                    if (video.videoWidth && video.videoHeight && onAspectRatio) {
                        onAspectRatio(video.videoWidth / video.videoHeight);
                    }
                }}
                style={{ 
                    width: '100%', 
                    height: '100%', // Fill the wrapper
                    objectFit: 'contain', 
                    borderRadius: '12px',
                    pointerEvents: 'none' 
                }} 
            />
        </CardWrapper>
    );
};

export default VibeCodingPage;
