import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import googleEnergySvg from '../../public/google-energy.svg?raw';
import { currentAtBoxStyles, currentAtBoxClasses } from './CurrentAtBox.styles';

const TikTokAnimation = () => {
    const [isVariant2, setIsVariant2] = useState(false);

    useEffect(() => {
        let timeoutId: any;

        const runCycle = () => {
            if (!isVariant2) {
                timeoutId = setTimeout(() => {
                    setIsVariant2(true);
                }, 1600);
            } else {
                timeoutId = setTimeout(() => {
                    setIsVariant2(false);
                }, 4000);
            }
        };

        runCycle();

        return () => clearTimeout(timeoutId);
    }, [isVariant2]);

    const gifVariants = {
        variant1: { opacity: 0.4, filter: "blur(0px)", WebkitFilter: "blur(0px)" },
        variant2: { opacity: 0.6, filter: "blur(0px)", WebkitFilter: "blur(0px)" }
    };

    const glassVariants = {
        variant1: { backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" },
        variant2: { backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }
    };

    const textVariants = {
        variant1: { filter: "blur(14px)", WebkitFilter: "blur(14px)" },
        variant2: { filter: "blur(0px)", WebkitFilter: "blur(0px)" }
    };

    const transition = {
        duration: 2,
        ease: [1, 0, 0, 0.78] as [number, number, number, number],
    };

    const currentVariant = isVariant2 ? "variant2" : "variant1";

    return (
        <div style={currentAtBoxStyles.tiktokWrapper}>
            <div style={currentAtBoxStyles.tiktokBg} />

            <motion.img 
                src="https://framerusercontent.com/images/5PJkfNDMBpsvW2XCy0995E3ObA.gif"
                style={currentAtBoxStyles.tiktokGif}
                variants={gifVariants}
                animate={currentVariant}
                transition={transition}
                alt=""
            />

            <motion.div 
                style={currentAtBoxStyles.tiktokGlass}
                variants={glassVariants}
                animate={currentVariant}
                transition={transition}
            />

            <motion.img 
                src="/google-g.png"
                style={currentAtBoxStyles.tiktokText}
                variants={textVariants}
                animate={currentVariant}
                transition={transition}
                alt=""
            />
        </div>
    );
};

export const CurrentAtBox = () => {
    const reduceMotion = useReducedMotion();
    const [logoLoaded, setLogoLoaded] = useState(false);
    const [showLogo, setShowLogo] = useState(false);
    const [auroraStarted, setAuroraStarted] = useState(false);
    const [logoPhase, setLogoPhase] = useState<'play' | 'hidden'>('play');
    const [logoCycle, setLogoCycle] = useState(0);

    useEffect(() => {
        const start = window.setTimeout(() => setAuroraStarted(true), 500);
        const reveal = window.setTimeout(() => setShowLogo(true), 1500);
        return () => { clearTimeout(start); clearTimeout(reveal); };
    }, [logoCycle]);

    useEffect(() => {
        if (!logoLoaded) return;
        const hide = window.setTimeout(() => setLogoPhase('hidden'), 5500);
        const restart = window.setTimeout(() => {
            setAuroraStarted(false);
            setShowLogo(false);
            setLogoLoaded(false);
            setLogoPhase('play');
            setLogoCycle(cycle => cycle + 1);
        }, 6000);
        return () => { clearTimeout(hide); clearTimeout(restart); };
    }, [logoLoaded, logoCycle]);

    return (
        <div style={currentAtBoxStyles.container}>
            <p className={currentAtBoxClasses.headerText} style={currentAtBoxStyles.headerText}>Currently at</p>

            <svg
                viewBox="0 0 512 512"
                fill="currentColor"
                role="img"
                aria-label="Google"
                className={currentAtBoxClasses.topRightIcon}
                style={currentAtBoxStyles.topRightIcon}
            >
                <path d="M473.16,221.48l-2.26-9.59H262.46v88.22H387c-12.93,61.4-72.93,93.72-121.94,93.72-35.66,0-73.25-15-98.13-39.11a140.08,140.08,0,0,1-41.8-98.88c0-37.16,16.7-74.33,41-98.78s61-38.13,97.49-38.13c41.79,0,71.74,22.19,82.94,32.31l62.69-62.36C390.86,72.72,340.34,32,261.6,32h0c-60.75,0-119,23.27-161.58,65.71C58,139.5,36.25,199.93,36.25,256S56.83,369.48,97.55,411.6C141.06,456.52,202.68,480,266.13,480c57.73,0,112.45-22.62,151.45-63.66,38.34-40.4,58.17-96.3,58.17-154.9C475.75,236.77,473.27,222.12,473.16,221.48Z" />
            </svg>

            <motion.div
                key={logoCycle}
                aria-hidden="true"
                style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
                initial={false}
                animate={!auroraStarted
                    ? { opacity: 0.2, y: '14%', filter: 'blur(12px)' }
                    : reduceMotion
                    ? { opacity: 1, y: '0%', filter: 'blur(0px)' }
                    : { opacity: [0.2, 1, 1, 0.2], y: ['14%', '0%', '0%', '14%'], filter: ['blur(12px)', 'blur(0px)', 'blur(0px)', 'blur(12px)'] }}
                transition={reduceMotion
                    ? { duration: 0 }
                    : { duration: 7, times: [0, 0.25, 0.9286, 1], ease: 'easeInOut' }}
            >
            <svg
                aria-hidden="true"
                viewBox="0 0 718 1311"
                preserveAspectRatio="none"
                style={currentAtBoxStyles.energyBackground}
                dangerouslySetInnerHTML={{ __html: googleEnergySvg }}
            />
            </motion.div>

            {showLogo && <motion.img
                key={`logo-${logoCycle}`}
                src={`/google-a-paused.gif?cycle=${logoCycle}`}
                animate={{ opacity: logoPhase === 'hidden' ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                alt="Google"
                onLoad={() => setLogoLoaded(true)}
                style={{ position: 'absolute', top: '50%', left: '50%', width: '50%', height: 'auto', transform: 'translate(-50%, -50%)', zIndex: 1, pointerEvents: 'none' }}
            />}

            {/* Temporarily disabled: GIF, glass animation, and logo.
            <div style={currentAtBoxStyles.animationContainer}>
                <TikTokAnimation />
            </div>
            */}

            <div className={currentAtBoxClasses.bottomTextContainer} style={currentAtBoxStyles.bottomTextContainer}>
                <p className={currentAtBoxClasses.roleText} style={currentAtBoxStyles.roleText}>Sr. UX Designer</p>
                <p className={currentAtBoxClasses.companyText} style={currentAtBoxStyles.companyText}>Google Search AI Mode</p>
            </div>
        </div>
    );
};

export default CurrentAtBox;
