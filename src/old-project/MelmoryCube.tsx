import * as React from "react";
import { melmoryCubeStyles } from "./MelmoryCube.styles";

type MelmoryCubeProps = {
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
};

const MelmoryCube = React.forwardRef<HTMLDivElement, MelmoryCubeProps>((props, ref) => {
  const { style, className, onClick } = props;

  return (
    <div
      className={className}
      ref={ref}
      style={{ ...melmoryCubeStyles.root, ...style }}
      onClick={onClick}
    >
      <div style={melmoryCubeStyles.mainContainer}>
        <div style={melmoryCubeStyles.imageSection}>
          <div style={melmoryCubeStyles.imageInner}>
            {/* Main Background Image */}
            <img
              alt=""
              style={melmoryCubeStyles.mainImage}
              sizes="100vw"
              src="https://framerusercontent.com/images/VmYrz8XJBPnJEnT2ds7snf9k83M.jpg?width=3840&height=2160"
              srcSet="https://framerusercontent.com/images/VmYrz8XJBPnJEnT2ds7snf9k83M.jpg?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/VmYrz8XJBPnJEnT2ds7snf9k83M.jpg?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/VmYrz8XJBPnJEnT2ds7snf9k83M.jpg?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/VmYrz8XJBPnJEnT2ds7snf9k83M.jpg?width=3840&height=2160 3840w"
            />

            {/* Moon Icon */}
            <div style={melmoryCubeStyles.iconContainer1}>
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
                  fill="var(--color-icon-inverse, black)"
                />
              </svg>
            </div>

            {/* CTA Icon */}
            <div style={melmoryCubeStyles.iconContainer2}>
              <svg
                width="28"
                height="28"
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

        <div style={melmoryCubeStyles.textRow}>
          <h1 style={melmoryCubeStyles.title}>Mel:mory Cube</h1>
          <h4 style={melmoryCubeStyles.subtitle}>
            Capstone project / UI / UX research / TUI / Product design
          </h4>
        </div>
      </div>
    </div>
  );
});

export default MelmoryCube;
