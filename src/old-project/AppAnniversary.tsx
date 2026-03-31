import * as React from "react";
import { appAnniversaryStyles } from "./AppAnniversary.styles";

type AppAnniversaryProps = {
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
};

const AppAnniversary = React.forwardRef<HTMLDivElement, AppAnniversaryProps>((props, ref) => {
  const { style, className, onClick } = props;

  return (
    <div
      className={className}
      ref={ref}
      style={{ ...appAnniversaryStyles.root, ...style }}
      onClick={onClick}
    >
      <div style={appAnniversaryStyles.mainContent}>
        {/* Image Section */}
        <div style={appAnniversaryStyles.imageContainerOuter}>
          <div style={appAnniversaryStyles.imageContainerInner}>
            <img
              alt=""
              style={appAnniversaryStyles.image}
              src="https://framerusercontent.com/images/teghb9gu6GzZdw2uMcxF3gE5MnQ.jpg?width=1084&height=600"
              srcSet="https://framerusercontent.com/images/teghb9gu6GzZdw2uMcxF3gE5MnQ.jpg?scale-down-to=512&width=1084&height=600 512w,https://framerusercontent.com/images/teghb9gu6GzZdw2uMcxF3gE5MnQ.jpg?scale-down-to=1024&width=1084&height=600 1024w,https://framerusercontent.com/images/teghb9gu6GzZdw2uMcxF3gE5MnQ.jpg?width=1084&height=600 1084w"
              sizes="100vw"
            />
          </div>
        </div>

        {/* Text Section */}
        <div style={appAnniversaryStyles.textRow}>
          <h1 style={appAnniversaryStyles.title}>Nike 1st Appiversary</h1>
          <h4 style={appAnniversaryStyles.subtitle}>UI / UX / Creative / Digital Engagment</h4>
        </div>
      </div>
    </div>
  );
});

export default AppAnniversary;
