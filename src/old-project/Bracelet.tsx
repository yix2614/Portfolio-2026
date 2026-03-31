import * as React from "react";
import { braceletStyles } from "./Bracelet.styles";

type BraceletProps = {
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
};

const Bracelet = React.forwardRef<HTMLDivElement, BraceletProps>((props, ref) => {
  const { style, className, onClick } = props;

  return (
    <div
      className={className}
      ref={ref}
      style={{ ...braceletStyles.root, ...style }}
      onClick={onClick}
    >
      <div style={braceletStyles.mainContent}>
        {/* Image Section */}
        <div style={braceletStyles.imageContainerOuter}>
          <div style={braceletStyles.imageContainerInner}>
            <img
              src="https://framerusercontent.com/images/cO979P57CmDgOVka7aJmnHZ2U.jpg?width=1920&height=1080"
              srcSet="https://framerusercontent.com/images/cO979P57CmDgOVka7aJmnHZ2U.jpg?scale-down-to=512&width=1920&height=1080 512w, https://framerusercontent.com/images/cO979P57CmDgOVka7aJmnHZ2U.jpg?scale-down-to=1024&width=1920&height=1080 1024w, https://framerusercontent.com/images/cO979P57CmDgOVka7aJmnHZ2U.jpg?width=1920&height=1080 1920w"
              sizes="100vw" // Adjust based on usage if needed, but 100vw is safe default
              alt=""
              style={braceletStyles.image}
            />

            {/* Custom Moon Shape SVG */}
            <div style={braceletStyles.customShape}>
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 592 202"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: "block" }}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.10759 202C80.0633 202 135.178 138.836 173.518 76.7668C202.438 29.949 246.732 0 296.383 0C346.148 0 390.532 30.087 419.447 77.0902C457.563 139.05 512.533 202 585.278 202C587.532 202 589.773 201.944 592 201.833V202H585.278H7.10759ZM0 201.814V202H7.10759C4.72327 202 2.35356 201.937 0 201.814Z"
                  fill="var(--color-bg-primary, #ffffff)" // Using surface color to create cutout effect
                />
              </svg>
            </div>

            {/* Circle Arrow Button */}
            <div style={braceletStyles.circleButton}>
              <div style={braceletStyles.arrowIcon}>
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
        </div>

        {/* Text Section */}
        <div style={braceletStyles.textRow}>
          <h1 style={braceletStyles.title}>Embracelet</h1>
          <h4 style={braceletStyles.subtitle}>UI / UX research / Innovative / 3D</h4>
        </div>
      </div>
    </div>
  );
});

export default Bracelet;
