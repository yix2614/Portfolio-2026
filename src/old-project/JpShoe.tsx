import * as React from "react";
import { jpShoeStyles } from "./JpShoe.styles";

type JpShoeProps = {
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
};

const JpShoe = React.forwardRef<HTMLDivElement, JpShoeProps>((props, ref) => {
  const { style, className, onClick } = props;

  return (
    <div
      className={className}
      ref={ref}
      style={{ ...jpShoeStyles.root, ...style }}
      onClick={onClick}
    >
      <div style={jpShoeStyles.mainContent}>
        {/* Video Section */}
        <div style={jpShoeStyles.videoContainerOuter}>
          <div style={jpShoeStyles.videoContainerInner}>
            <video
              src="https://nike.jp/running/shoeschart/assets/img/kv_pc.mp4?20240214"
              poster="https://framerusercontent.com/assets/DEgXG3I1qf1R3sScVMJ3TQxlQQ.mp4" // Fallback/Poster from code
              autoPlay
              loop
              muted
              playsInline
              style={jpShoeStyles.video}
            />
          </div>

          {/* Corner Shape SVG */}
          <div style={jpShoeStyles.cornerShape}>
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 67 67"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: "block" }}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M66.7916 0V66.7917H0C9.8573 65.6889 17.522 57.3318 17.5323 47.1825V47.1621C17.5323 30.7981 30.7979 17.5325 47.1619 17.5325H47.1755C57.328 17.5256 65.6886 9.85962 66.7916 0Z"
                fill="var(--color-bg-primary, #ffffff)" // Using surface color to match background
              />
            </svg>
          </div>

          {/* Circle Arrow Button */}
          <div style={jpShoeStyles.circleButton}>
            <div style={jpShoeStyles.arrowIcon}>
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: "block" }}
              >
                <path
                  d="M43.4142 22.5858L28.1213 7.29289C27.7308 6.90237 27.0976 6.90237 26.7071 7.29289L25.2929 8.70711C24.9024 9.09763 24.9024 9.7308 25.2929 10.1213L37.1716 22H5C4.44772 22 4 22.4477 4 23V25C4 25.5523 4.44771 26 5 26H37.1716L25.2929 37.8787C24.9024 38.2692 24.9024 38.9024 25.2929 39.2929L26.7071 40.7071C27.0976 41.0976 27.7308 41.0976 28.1213 40.7071L43.4142 25.4142C44.1953 24.6332 44.1953 23.3668 43.4142 22.5858Z"
                  fill="var(--color-bg-icon)"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Text Section */}
        <div style={jpShoeStyles.textRow}>
          <h1 style={jpShoeStyles.title}>JP Nike Shoe Chart</h1>
          <h4 style={jpShoeStyles.subtitle}>UI / UX / Creative / Web</h4>
        </div>
      </div>
    </div>
  );
});

export default JpShoe;
