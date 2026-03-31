import * as React from "react";
import { googleIOStyles } from "./GoogleIO.styles";

interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
}

const GoogleIO = React.forwardRef<HTMLDivElement, ComponentProps>((props, ref) => {
  const { style, className, onClick } = props;

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...googleIOStyles.root, ...style }}
      onClick={onClick}
    >
      <div
        style={googleIOStyles.mainContent}
      >
        {/* Top Row */}
        <div
            style={googleIOStyles.topRow}
        >
          {/* Left Video Card */}
          <div
              style={googleIOStyles.videoCard}
          >
            <div style={googleIOStyles.videoInner}>
                 <video
                    src="https://framerusercontent.com/assets/2ZKTFDKSTSvubmSKx4hIuIZX6vA.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={googleIOStyles.videoElement}
                 />
            </div>
          </div>

          {/* Right Image Card */}
          <div
              style={googleIOStyles.imageCard}
          >
            <img
                src="https://framerusercontent.com/images/hzfZAAhPG8wwnZfVkvLiHulYZ80.webp"
                alt="Google IO Visual"
                style={googleIOStyles.topImage}
            />
          </div>
        </div>

        {/* Bottom Card */}
        <div
          style={googleIOStyles.bottomCard}
        >
             {/* Inner Background & Content */}
            <div
                style={googleIOStyles.bottomCardInner}
            >
                {/* Award Badge (Hidden initially) */}
                <div
                    style={googleIOStyles.awardBadge}
                >
                     <img
                        src="https://framerusercontent.com/images/7noAoo6P7MRtarQDoGmrTFNn6xk.png"
                        alt="Award Text"
                        style={{ height: "100%", width: "auto" }}
                    />
                     <img
                        src="https://framerusercontent.com/images/ySVki4DonO2thVg6f81AE83hXps.png"
                        alt="Award Icon"
                        style={{ height: "100%", width: "auto" }}
                    />
                </div>

                {/* Main Background Image */}
                <img
                    src="https://framerusercontent.com/images/fiuRKFGrm73XMdTVfZynjhQNhM.jpg"
                    alt="Google IO Background"
                    style={googleIOStyles.mainImage}
                />

                {/* Big Moon Icon */}
                <div style={googleIOStyles.moonIconContainer}>
                    <svg width="100%" height="100%" viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
                        <path fillRule="evenodd" clipRule="evenodd" d="M66.7916 0V66.7917H0C9.8573 65.6889 17.522 57.3318 17.5323 47.1825V47.1621C17.5323 30.7981 30.7979 17.5325 47.1619 17.5325H47.1755C57.328 17.5256 65.6886 9.85962 66.7916 0Z" fill="var(--color-bg-primary, white)"/>
                    </svg>
                </div>

                {/* Small Moon Icon with Circle */}
                <div
                    style={googleIOStyles.moonIconSmallContainer}
                >
                     <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M43.4142 22.5858L28.1213 7.29289C27.7308 6.90237 27.0976 6.90237 26.7071 7.29289L25.2929 8.70711C24.9024 9.09763 24.9024 9.7308 25.2929 10.1213L37.1716 22H5C4.44772 22 4 22.4477 4 23V25C4 25.5523 4.44771 26 5 26H37.1716L25.2929 37.8787C24.9024 38.2692 24.9024 38.9024 25.2929 39.2929L26.7071 40.7071C27.0976 41.0976 27.7308 41.0976 28.1213 40.7071L43.4142 25.4142C44.1953 24.6332 44.1953 23.3668 43.4142 22.5858Z" fill="var(--color-bg-icon)"/>
                    </svg>
                </div>
            </div>

            {/* Text Row (Overlaying Image but inside Bottom Card) */}
        </div>

        <div
            style={googleIOStyles.textRow}
        >
            <h1 style={googleIOStyles.title}>Google i/o 2022-2023</h1>
            <h4 style={googleIOStyles.subtitle}>UI / UX / Creative / Innovative / 3D</h4>
        </div>
      </div>
    </div>
  );
});

export default GoogleIO;
