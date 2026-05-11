import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { clockBoxStyles } from './ClockBox.styles';
import Clock from './Clock';

const CenterDotSVG = () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={clockBoxStyles.centerDot}>
        <path d="M12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6Z" fill="white"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M6 10C8.20914 10 10 8.20914 10 6C10 3.79086 8.20914 2 6 2C3.79086 2 2 3.79086 2 6C2 8.20914 3.79086 10 6 10ZM6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12Z" fill="#FF4800"/>
    </svg>
);

// 旧版 light mode clock（保留原本的简易三指针实现）
const LegacyLightClock: React.FC = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const localTime = time.getTime() - (time.getTimezoneOffset() * 60000);
    const secondDeg = (localTime / 1000) * 6;
    const minuteDeg = (localTime / 1000 / 60) * 6;
    const hourDeg = (localTime / 1000 / 60 / 60) * 30;

    return (
        <>
            {/* 背景 */}
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

            {/* 表盘 */}
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

            {/* 指针 —— 用 translateZ 把它从表盘平面顶起，flip 时就能看到层次 */}
            <div style={{ ...clockBoxStyles.handsContainer, ...clockBoxStyles.handsLifted }}>
                <motion.div
                    style={{ ...clockBoxStyles.hourHandWrapper, x: "-50%", y: "-50%" }}
                    initial={false}
                    animate={{ rotate: hourDeg }}
                    transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                >
                    <div style={clockBoxStyles.hourHand} />
                </motion.div>

                <motion.div
                    style={{ ...clockBoxStyles.minuteHandWrapper, x: "-50%", y: "-50%" }}
                    initial={false}
                    animate={{ rotate: minuteDeg }}
                    transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                >
                    <div style={clockBoxStyles.minuteHand} />
                </motion.div>

                <motion.div
                    style={{ ...clockBoxStyles.secondHandWrapper, x: "-50%", y: "-50%" }}
                    initial={false}
                    animate={{ rotate: secondDeg }}
                    transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                >
                    <div style={clockBoxStyles.secondHand} />
                </motion.div>

                <CenterDotSVG />
            </div>
        </>
    );
};

const getTheme = (): 'light' | 'dark' =>
    document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';

export const ClockBox = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>(getTheme);

    useEffect(() => {
        const onChange = () => setTheme(getTheme());
        window.addEventListener('themeChange', onChange);
        const observer = new MutationObserver(onChange);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme'],
        });
        return () => {
            window.removeEventListener('themeChange', onChange);
            observer.disconnect();
        };
    }, []);

    const isDark = theme === 'dark';

    // 3D 翻转：以 Y 轴为旋转轴，light 在正面（0deg），dark 在背面（180deg）
    return (
        <div style={clockBoxStyles.container}>
            <div style={clockBoxStyles.flipScene}>
                <div
                    style={{
                        ...clockBoxStyles.flipCard,
                        transform: isDark ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    }}
                >
                    {/* 正面：light mode → 旧 clock（指针在 SVG 外层，靠 translateZ 浮起呈现层次） */}
                    <div style={clockBoxStyles.flipFace}>
                        <LegacyLightClock />
                    </div>
                    {/* 背面：dark mode → 新 Clock。仅做 rotateY 翻面，不再额外 translateZ
                        以免透视放大后指针被矩形 face 裁切；层次感由 Clock 内部三层指针保证 */}
                    <div
                        style={{
                            ...clockBoxStyles.flipFace,
                            transform: 'rotateY(180deg)',
                        }}
                    >
                        <Clock size="100%" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClockBox;
