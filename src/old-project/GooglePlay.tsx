import * as React from "react";
import { googlePlayStyles } from "./GooglePlay.styles";

type GooglePlayProps = {
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
};

const GooglePlay = React.forwardRef<HTMLDivElement, GooglePlayProps>((props, ref) => {
  const { style, className, onClick } = props;

  return (
    <div
      className={className}
      ref={ref}
      style={{ ...googlePlayStyles.root, ...style }}
      onClick={onClick}
    >
      <div style={googlePlayStyles.mainContent}>
        {/* Image Section */}
        <div style={googlePlayStyles.imageContainerOuter}>
          <div style={googlePlayStyles.imageContainerInner}>
            <img
              alt=""
              style={googlePlayStyles.image}
              src="https://framerusercontent.com/images/Lv5U7wEVPfkNUl43Goxi15SVjI.png?width=2650&height=1550"
              srcSet="https://framerusercontent.com/images/Lv5U7wEVPfkNUl43Goxi15SVjI.png?scale-down-to=512&width=2650&height=1550 512w,https://framerusercontent.com/images/Lv5U7wEVPfkNUl43Goxi15SVjI.png?scale-down-to=1024&width=2650&height=1550 1024w,https://framerusercontent.com/images/Lv5U7wEVPfkNUl43Goxi15SVjI.png?scale-down-to=2048&width=2650&height=1550 2048w,https://framerusercontent.com/images/Lv5U7wEVPfkNUl43Goxi15SVjI.png?width=2650&height=1550 2650w"
              sizes="100vw"
            />
          </div>
        </div>

        {/* Text Section */}
        <div style={googlePlayStyles.textRow}>
          <h1 style={googlePlayStyles.title}>Google Play Gift</h1>
          <h4 style={googlePlayStyles.subtitle}>UI / UX / Creative / Innovative / Web </h4>
        </div>
      </div>
    </div>
  );
});

export default GooglePlay;
