import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { clockBoxStyles } from './ClockBox.styles';

const ClockFaceSVG = () => (
    <svg width="100%" height="100%" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
         {/* Simple circle representation or custom design if needed. 
             The original Framer code used a complex SVG for the clock face in `framer-tw0bpd`, 
             but here we are recreating the "Clock" component logic (hands). 
             Wait, looking at `framer-vu0hms` (Component2), it has a background SVG `framer-19anris` 
             and `framer-tw0bpd` (Clock) inside.
             Let's start with the Clock component itself (hands).
         */}
    </svg>
);

const CenterDotSVG = () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={clockBoxStyles.centerDot}>
        <path d="M12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6Z" fill="white"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M6 10C8.20914 10 10 8.20914 10 6C10 3.79086 8.20914 2 6 2C3.79086 2 2 3.79086 2 6C2 8.20914 3.79086 10 6 10ZM6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12Z" fill="#FF4800"/>
    </svg>
);

export const ClockBox = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000); // Update every second is usually enough for UI, though framer used continuous

        return () => clearInterval(timer);
    }, []);

    // Calculate angles using continuous time to avoid 360->0 jump
    const localTime = time.getTime() - (time.getTimezoneOffset() * 60000);
    const secondDeg = (localTime / 1000) * 6;
    const minuteDeg = (localTime / 1000 / 60) * 6;
    const hourDeg = (localTime / 1000 / 60 / 60) * 30;

    // However, `setInterval` at 1000ms won't give smooth millisecond updates.
    // If we want smooth second hand, we need `requestAnimationFrame`.
    // Let's stick to a simpler implementation first using standard spring/linear animation or just state updates.
    // The original code used `repeat: Infinity` variants.
    
    // Let's use the exact Framer variants logic for smooth infinite loop if possible, 
    // BUT converting to pure React/Framer-Motion without "unframer" helpers.
    // Actually, simpler is better: Just animate to the current angle. 
    // To handle the 359->0 jump smoothly, we usually calculate total degrees since start or use `rotate` directly.
    
    // Refined approach: Use `animate` prop with current degree.
    
    return (
        <div style={clockBoxStyles.container}>
            <div style={clockBoxStyles.clockContainer}>
                {/* Background SVG (Frame 15) */}
                <svg width="100%" height="100%" viewBox="0 0 1101 1101" fill="none" xmlns="http://www.w3.org/2000/svg" style={clockBoxStyles.backgroundImage}>
                    <g clipPath="url(#bg-clip)">
                        <rect width="1101" height="1101" rx="550.5" fill="#025BDF"/>
                        <path fill="#E4E3E2" d="M-82 551h633v619H-82z"/>
                        <path fill="#09F" d="M551 0h633v1124H551z"/>
                        <circle cx="550.5" cy="550.5" r="265.5" fill="#F08CD0"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M551 816V285c146.402.27 265 119.035 265 265.5S697.402 815.73 551 816Z" fill="#FF8502"/>
                    </g>
                    <defs>
                        <clipPath id="bg-clip">
                            <rect width="1101" height="1101" rx="550.5" fill="#fff"/>
                        </clipPath>
                    </defs>
                </svg>
            

                {/* Clock Face SVG (Clock) - Inner details */}
                 <svg width="100%" height="100%" viewBox="0 0 922 922" fill="none" xmlns="http://www.w3.org/2000/svg" style={clockBoxStyles.clockFace}>
                    <g clipPath="url(#face-clip)">
                        <rect width="922" height="922" rx="461" fill="#59CAFF"/>
                        <circle cx="461" cy="461" r="380" fill="#0144AA"/>
                        <path fill="#59CAFF" d="M461 0h517v461H461z"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="m242.169 242 438.344 438.344-.909.908c-121.117 120.136-316.69 119.832-437.431-.909C121.128 559.298 121.127 363.046 242.169 242Z" fill="#E44DD0"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M460.999 460.984V202.002h1.075C601.451 202.57 714.872 313.151 720 451.408v9.576H460.999Z" fill="#FF411F"/>
                    </g>
                    <defs>
                        <clipPath id="face-clip">
                            <rect width="922" height="922" rx="461" fill="#fff"/>
                        </clipPath>
                    </defs>
                </svg>

                {/* Hands */}
                <div style={clockBoxStyles.handsContainer}>
                    {/* Hour Hand */}
                    <motion.div 
                        style={{ ...clockBoxStyles.hourHandWrapper, x: "-50%", y: "-50%" }}
                        initial={false}
                        animate={{ rotate: hourDeg }}
                        transition={{ type: "spring", bounce: 0, duration: 0.4 }} // or linear for smooth
                    >
                         <div style={clockBoxStyles.hourHand} />
                    </motion.div>

                    {/* Minute Hand */}
                    <motion.div 
                        style={{ ...clockBoxStyles.minuteHandWrapper, x: "-50%", y: "-50%" }}
                        initial={false}
                        animate={{ rotate: minuteDeg }}
                        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                    >
                        <div style={clockBoxStyles.minuteHand} />
                    </motion.div>

                    {/* Second Hand */}
                    <motion.div 
                        style={{ ...clockBoxStyles.secondHandWrapper, x: "-50%", y: "-50%" }}
                        initial={false}
                        animate={{ rotate: secondDeg }}
                        transition={{ type: "spring", bounce: 0, duration: 0.4 }} // To make it tick or smooth?
                        // If we want smooth, we need continuous updates. 
                        // If we want tick, we use the state update.
                    >
                        <div style={clockBoxStyles.secondHand} />
                    </motion.div>

                    <CenterDotSVG />
                </div>
            </div>
        </div>
    );
};

export default ClockBox;
