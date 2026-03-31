import React from 'react';
import { motion } from 'framer-motion';
import { statisticBoxStyles, statisticBoxClasses } from './StatisticBox.styles';

const WaveAnimation = () => {
  const pathData = "M25 25.5V164C25 180.569 38.431 194 55 194C71.569 194 85 180.569 85 164V55.5C85 38.931 98.431 25.5 115 25.5C131.569 25.5 145 38.931 145 55.5V164C145 180.569 158.431 194 175 194C191.569 194 205 180.569 205 164V55.5C205 38.931 218.431 25.5 235 25.5C251.569 25.5 265 38.931 265 55.5V164C265 180.569 278.431 194 295 194C311.569 194 325 180.569 325 164V55.5C325 38.931 338.431 25.5 355 25.5C371.569 25.5 385 38.931 385 55.5V164C385 180.569 398.431 194 415 194C431.569 194 445 180.569 445 164V55.5C445 38.931 458.431 25.5 475 25.5C491.569 25.5 505 38.931 505 55.5V164C505 180.569 518.431 194 535 194C551.569 194 565 180.569 565 164V55.5C565 38.931 578.431 25.5 595 25.5C611.569 25.5 625 38.931 625 55.5V164C625 180.569 638.431 194 655 194C671.569 194 685 180.569 685 164V55.5C685 38.931 698.431 25.5 715 25.5C731.569 25.5 745 38.931 745 55.5V164C745 180.569 758.431 194 775 194C791.569 194 805 180.569 805 164V55.5C805 38.931 818.431 25.5 835 25.5C851.569 25.5 865 38.931 865 55.5V164C865 180.569 878.431 194 895 194C911.569 194 925 180.569 925 164V55.5";

  return (
    <div style={statisticBoxStyles.waveWrapper}>
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 950 220" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d={pathData}
          stroke="var(--color-border-default, #eee)"
          strokeWidth="50"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {[0].map((i) => (
          <motion.path
            key={i}
            d={pathData}
            stroke="#FF4D00"
            strokeWidth="50"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, pathOffset: 0 }}
            animate={{ pathLength: [0, 1, 1], pathOffset: [0, 0, 1] }}
            transition={{
              duration: 4,
              ease: "linear",
              repeat: Infinity,
              times: [0, 0.5, 1]
            }}
          />
        ))}
      </svg>
    </div>
  );
};

const ChartSVG = () => (
    <svg width="100%" height="100%" viewBox="0 0 933 1753" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <rect y="1753" width="599" height="933" rx="299.5" transform="rotate(-90 0 1753)" fill="#43DFC8"/>
        <rect x=".5" y="1134" width="189" height="501" rx="94.5" transform="rotate(-90 .5 1134)" fill="#005BE4"/>
        <rect x=".5" y="925" width="188" height="501" rx="94" transform="rotate(-90 .5 925)" fill="#005BE4"/>
        <rect x="521.5" y="1134" width="411" height="411" rx="205.5" transform="rotate(-90 521.5 1134)" fill="#005BE4"/>
        <rect x="43" y="257" width="107" height="441" rx="53.5" fill="#FF63E7"/>
        <rect x="172" y="257" width="296" height="442" rx="148" fill="#FF63E7"/>
        <rect x="20" y="230" width="188" height="471" rx="94" transform="rotate(-90 20 230)" fill="#FF63E7"/>
        <rect x="511" width="402" height="699" rx="201" fill="#96E49A"/>
    </svg>
);

const RadarChart = () => {
  const cx = 150;
  const cy = 150;
  const radius = 150;
  const labels = ["Research", "Execution", "Creative", "Product-Thinking", "Innovative"];
  const axisColors = ["#FF65F3", "#A5B700", "#00B245", "#327BE8", "#FFAB69"];
  const data = [0.7, 0.9, 0.88, 0.85, 0.9];
  const numAxes = labels.length;
  const angleStep = (Math.PI * 2) / numAxes;
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];
  const getCoordinates = (value: number, angleOffset: number) => {
    const angle = angleOffset - Math.PI / 2;
    return {
      x: cx + radius * value * Math.cos(angle),
      y: cy + radius * value * Math.sin(angle)
    };
  };
  const dataCoords = data.map((val, i) => getCoordinates(val, i * angleStep));
  const dataPoints = dataCoords.map((coords) => `${coords.x},${coords.y}`).join(" ");
  const axisCoords = Array.from({ length: numAxes }).map((_, i) => getCoordinates(1, i * angleStep));
  const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
  const getTagWidth = (text: string) => Math.max(56, text.length * 6 + 16);

  return (
    <div style={statisticBoxStyles.radarChartContainer}>
      <svg className="radar-svg" width="100%" height="100%" viewBox="0 0 300 300" preserveAspectRatio="xMidYMid meet">
        {gridLevels.map((level, index) => {
          return (
            <circle
              key={`grid-${index}`}
              cx={cx}
              cy={cy}
              r={radius * level}
              fill="none"
              stroke="var(--color-border-strong, #E6E6E6)"
              strokeWidth="1"
              strokeDasharray={index === gridLevels.length - 1 ? "none" : "3,3"}
            />
          );
        })}

        {Array.from({ length: numAxes }).map((_, i) => {
          return (
            <line
              key={`axis-${i}`}
              x1={cx}
              y1={cy}
              x2={axisCoords[i].x}
              y2={axisCoords[i].y}
              stroke={`url(#axis-gradient-${i})`}
              strokeWidth="1.5"
            />
          );
        })}

        <defs>
          <filter id="radar-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
          </filter>
          <clipPath id="radar-clip">
            <polygon points={dataPoints} />
          </clipPath>
          {axisCoords.map((coords, i) => (
            <linearGradient
              key={`axis-gradient-${i}`}
              id={`axis-gradient-${i}`}
              gradientUnits="userSpaceOnUse"
              x1={cx}
              y1={cy}
              x2={coords.x}
              y2={coords.y}
            >
              <stop offset="0%" stopColor={axisColors[i]} stopOpacity="0" />
              <stop offset="100%" stopColor={axisColors[i]} stopOpacity="1" />
            </linearGradient>
          ))}
          {dataCoords.map((point, i) => {
            const next = dataCoords[(i + 1) % numAxes];
            return (
              <linearGradient
                key={`edge-gradient-${i}`}
                id={`edge-gradient-${i}`}
                gradientUnits="userSpaceOnUse"
                x1={point.x}
                y1={point.y}
                x2={next.x}
                y2={next.y}
              >
                <stop offset="0%" stopColor={axisColors[i]} />
                <stop offset="100%" stopColor={axisColors[(i + 1) % numAxes]} />
              </linearGradient>
            );
          })}
        </defs>

        <g clipPath="url(#radar-clip)">
          <g filter="url(#radar-glow)" opacity="0.18">
            {axisCoords.map((coords, i) => (
              <circle
                key={`glow-${i}`}
                cx={coords.x}
                cy={coords.y}
                r="80"
                fill={axisColors[i]}
              />
            ))}
          </g>
        </g>

        {dataCoords.map((point, i) => {
          const next = dataCoords[(i + 1) % numAxes];
          return (
            <motion.line
              key={`edge-${i}`}
              x1={point.x}
              y1={point.y}
              x2={next.x}
              y2={next.y}
              stroke={`url(#edge-gradient-${i})`}
              strokeWidth="1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          );
        })}

        {dataCoords.map((coords, i) => {
          return (
            <motion.circle
              key={`point-${i}`}
              cx={coords.x}
              cy={coords.y}
              r="4"
              fill="var(--color-bg-primary, #fff)"
              stroke={axisColors[i]}
              strokeWidth="1.5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 300 }}
              style={{ transformOrigin: `${coords.x}px ${coords.y}px` }}
            />
          );
        })}

        {labels.map((label, i) => {
          const tagAnchor = getCoordinates(0.92, i * angleStep);
          const tagWidth = getTagWidth(label);
          const tagHeight = 20;
          const isRight = tagAnchor.x >= cx;
          let tagX = isRight ? tagAnchor.x - 4 : tagAnchor.x - tagWidth + 4;
          let tagY = tagAnchor.y - tagHeight / 2;
          const maxX = 300 - tagWidth;
          const maxY = 300 - tagHeight;

          if (i === 0) tagY = 0;
          if (i === 1) tagX = maxX;
          if (i === 3) tagX = 0;
          if (i === 4) tagX = 0;

          tagX = clamp(tagX, 0, maxX);
          tagY = clamp(tagY, 0, maxY);

          const textX = tagX + tagWidth / 2;
          const textY = tagY + tagHeight / 2;
          return (
            <g key={`label-${i}`}>
              <rect
                x={tagX}
                y={tagY}
                width={tagWidth}
                height={tagHeight}
                rx="10"
                fill="var(--color-bg-primary, #fff)"
                stroke="var(--color-border-strong, #E6E6E6)"
                strokeWidth="1"
                opacity="0.9"
              />
              <text
                x={textX}
                y={textY}
                fill="var(--color-text-muted, #999999)"
                fontSize="10"
                fontFamily="TikTok Sans, Inter, sans-serif"
                textAnchor="middle"
                dominantBaseline="middle"
                style={{ lineHeight: "100%" }}
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

const FullStackBox = () => {
    // Define animation transition
    const transition = { duration: 0.4, ease: [0.44, 0, 0.56, 1] as const };
    
    // Define background variants
    const bgVariants = (hoverColor: string) => ({
        initial: { backgroundColor: "var(--color-bg-secondary, rgb(245, 245, 245))" },
        hover: { backgroundColor: hoverColor }
    });

    return (
        <motion.div 
            style={statisticBoxStyles.fullStackBox}
            initial="initial"
            whileHover="hover"
        >
            <div style={statisticBoxStyles.fullStackCirclesContainer}>
                {/* 1. Outermost Circle */}
                <motion.div
                    style={statisticBoxStyles.outerCircle}
                    variants={bgVariants("rgb(255, 0, 195)")}
                    transition={transition}
                >
                    {/* 2. Nested Circle */}
                    <motion.div
                        style={statisticBoxStyles.innerCircle}
                        variants={bgVariants("rgb(20, 58, 247)")}
                        transition={transition}
                    >
                         {/* 3. Nested Circle */}
                        <motion.div
                            style={statisticBoxStyles.innerCircle}
                            variants={bgVariants("rgb(255, 105, 117)")}
                            transition={transition}
                        >
                             {/* 4. Nested Circle */}
                            <motion.div
                                style={statisticBoxStyles.innerCircle}
                                variants={bgVariants("rgb(0, 102, 255)")}
                                transition={transition}
                            >
                                 {/* 5. Nested Circle (Innermost) */}
                                <motion.div
                                    style={statisticBoxStyles.innerCircle}
                                    variants={bgVariants("rgb(19, 58, 247)")}
                                    transition={transition}
                                />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
            <motion.p 
                style={statisticBoxStyles.fullStackText}
                variants={{
                    initial: { opacity: 0 },
                    hover: { opacity: 1 }
                }}
            >
                Full Stack
            </motion.p>
        </motion.div>
    );
};

const ProjectsBox = () => {
    return (
        <motion.div 
            style={statisticBoxStyles.projectsBox}
            initial="initial"
            whileHover="hover"
        >
            <motion.div
                style={statisticBoxStyles.chartContainer}
                variants={{
                    initial: { opacity: 0 },
                    hover: { opacity: 1 }
                }}
                transition={{ duration: 0.4 }}
            >
                <ChartSVG />
            </motion.div>
             <motion.p 
                style={statisticBoxStyles.projectsText}
                variants={{
                    initial: { opacity: 0 },
                    hover: { opacity: 1 }
                }}
            >
                Projects: 20s
            </motion.p>
        </motion.div>
    );
};

export const StatisticBox: React.FC = () => {
  return (
    <div style={statisticBoxStyles.container}>
      <p className={statisticBoxClasses.header} style={statisticBoxStyles.header}>Some Statistic</p>

      <div style={statisticBoxStyles.infoContainer}>
      <div className={statisticBoxClasses.infoGroup} style={statisticBoxStyles.infoGroup}>
          <div style={statisticBoxStyles.separator} />
          <div className={statisticBoxClasses.rowContent} style={statisticBoxStyles.rowContent}>
            <p className={statisticBoxClasses.text8px} style={statisticBoxStyles.rowLabel}>Mileage</p>
            <p className={statisticBoxClasses.text8px} style={statisticBoxStyles.rowValue}>1000k</p>
          </div>

          <div style={statisticBoxStyles.trackContainer}>
            <WaveAnimation />
          </div>
        </div>
        
        <div className={statisticBoxClasses.radarWrapper} style={statisticBoxStyles.radarWrapper}>
            <RadarChart />
        </div>
      </div>
      
      {/* <div style={statisticBoxStyles.bottomContainer}>
         <FullStackBox />
         <ProjectsBox />
      </div> */}
    </div>
  );
};

export default StatisticBox;
