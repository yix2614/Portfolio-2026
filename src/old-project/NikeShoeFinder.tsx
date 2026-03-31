import * as React from "react";
import { motion } from "framer-motion";
import { nikeShoeFinderStyles } from "./NikeShoeFinder.styles";

interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
}

const NikeShoeFinder = React.forwardRef<HTMLDivElement, ComponentProps>((props, ref) => {
  const { style, className, onClick } = props;

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...nikeShoeFinderStyles.root, ...style }}
      onClick={onClick}
    >
      <motion.div
        layoutId="1e5jkh8"
        style={nikeShoeFinderStyles.mainContainer}
      >
        {/* Top Row */}
        <div style={nikeShoeFinderStyles.topRow}>
          {/* Large Image Section */}
          <div style={nikeShoeFinderStyles.largeImageContainer}>
            {/* Background Image */}
            <img
              src="https://framerusercontent.com/images/AXA76YA69QRRLmKnd6rvcowGInU.jpg?width=1255&height=540"
              alt=""
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: 0,
                borderRadius: "40px",
              }}
            />
            
            {/* Inner Image Overlay */}
            <div style={{ ...nikeShoeFinderStyles.imageWrapper, zIndex: 1 }}>
               <img
                src="https://framerusercontent.com/images/lUdHbaDFpXcgFal6joznHgJUUL4.webp?width=960&height=540"
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "40px",
                }}
              />
            </div>
          </div>

          {/* Small Image Section (GIF) */}
          <div style={nikeShoeFinderStyles.smallImageContainer}>
             <img
              src="https://framerusercontent.com/images/fl9PSYYb3jlS57MjYMduInwgu4c.gif?width=600&height=387"
              alt=""
              style={nikeShoeFinderStyles.gifImage}
            />
          </div>
        </div>

        {/* Middle Row (Shoe & Award) */}
        <div style={nikeShoeFinderStyles.middleRow}>
          <div style={nikeShoeFinderStyles.awardContainer}>
             {/* Award Badge */}
            <motion.div
              layoutId="gCWjzOUiT"
              style={nikeShoeFinderStyles.awardBadge}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }} // Assuming it should appear, original had 0 but maybe controlled by variant
            >
              <img
                 src="https://framerusercontent.com/images/7noAoo6P7MRtarQDoGmrTFNn6xk.png?width=1153&height=591"
                 alt="Award Text"
                 style={{ width: "62%", height: "auto", objectFit: "contain" }}
              />
               <img
                 src="https://framerusercontent.com/images/ySVki4DonO2thVg6f81AE83hXps.png?width=225&height=225"
                 alt="Award Icon"
                 style={{ width: "31%", height: "auto", objectFit: "contain" }}
              />
            </motion.div>

            {/* Main Shoe Image */}
            <motion.img
              layoutId="wPYM1ooz5"
              src="https://framerusercontent.com/images/lDye76u4Fni6dREFHtmL9qiQI.jpg?width=1478&height=695"
              alt="Nike Shoe"
              style={nikeShoeFinderStyles.mainShoeImage}
            />
            
             {/* Icon 1 (Moon Big) */}
            <div style={nikeShoeFinderStyles.iconContainer1}>
               <svg width="100%" height="100%" viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
                  <path fillRule="evenodd" clipRule="evenodd" d="M66.7916 0V66.7917H0C9.8573 65.6889 17.522 57.3318 17.5323 47.1825V47.1621C17.5323 30.7981 30.7979 17.5325 47.1619 17.5325H47.1755C57.328 17.5256 65.6886 9.85962 66.7916 0Z" fill="var(--color-bg-primary, white)"/>
               </svg>
            </div>

             {/* Icon 2 (Moon Small with Arrow) */}
             <div style={nikeShoeFinderStyles.iconContainer2}>
               <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M43.4142 22.5858L28.1213 7.29289C27.7308 6.90237 27.0976 6.90237 26.7071 7.29289L25.2929 8.70711C24.9024 9.09763 24.9024 9.7308 25.2929 10.1213L37.1716 22H5C4.44772 22 4 22.4477 4 23V25C4 25.5523 4.44771 26 5 26H37.1716L25.2929 37.8787C24.9024 38.2692 24.9024 38.9024 25.2929 39.2929L26.7071 40.7071C27.0976 41.0976 27.7308 41.0976 28.1213 40.7071L43.4142 25.4142C44.1953 24.6332 44.1953 23.3668 43.4142 22.5858Z" fill="var(--color-bg-icon)"/>
               </svg>
             </div>
          </div>
        </div>

        {/* Text Row */}
        <div style={nikeShoeFinderStyles.textRow}>
           <h1 style={nikeShoeFinderStyles.title}>Nike Running Shoe Finder</h1>
           <h4 style={nikeShoeFinderStyles.subtitle}>UI / UX / Creative / Innovative / 3D</h4>
        </div>

      </motion.div>
    </div>
  );
});

export default NikeShoeFinder;
