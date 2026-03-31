import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
                src="https://framerusercontent.com/images/yplmdt0RqV17WOqq1Yn70eRbHQQ.png"
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
    return (
        <div style={currentAtBoxStyles.container}>
            <p className={currentAtBoxClasses.headerText} style={currentAtBoxStyles.headerText}>Currently at</p>

            <img 
                src="https://framerusercontent.com/images/tZQxzoPvKctSUy0zYRdJlQuemdQ.png" 
                className={currentAtBoxClasses.topRightIcon}
                style={currentAtBoxStyles.topRightIcon} 
                alt="icon"
            />

            <div style={currentAtBoxStyles.animationContainer}>
                <TikTokAnimation />
            </div>

            <div className={currentAtBoxClasses.bottomTextContainer} style={currentAtBoxStyles.bottomTextContainer}>
                <p className={currentAtBoxClasses.roleText} style={currentAtBoxStyles.roleText}>Sr. Product D.</p>
                <p className={currentAtBoxClasses.companyText} style={currentAtBoxStyles.companyText}>TikTok User Growth</p>
            </div>
        </div>
    );
};

export default CurrentAtBox;
