import * as React from "react";
import { tiktokWebStyles } from "./TiktokWeb.styles";
import { useNavigate } from "react-router-dom";

type TiktokWebProps = {
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
};

const TiktokWeb = React.forwardRef<HTMLDivElement, TiktokWebProps>((props, ref) => {
  const { style, className, onClick } = props;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/tiktokweb');
    if (onClick) onClick();
  };

  return (
    <div
      className={className}
      ref={ref}
      style={{ ...tiktokWebStyles.root, ...style, cursor: 'pointer' }}
      onClick={handleClick}
    >
      <div style={tiktokWebStyles.mainContainer}>
        <div style={tiktokWebStyles.imageSection}>
          <div style={tiktokWebStyles.imageInner}>
            <img
              alt="TikTok Web"
              style={tiktokWebStyles.mainImage}
              src="https://res.cloudinary.com/dkjokhb4w/image/upload/v1771142525/Control_j7h5zo.jpg"
            />
          </div>
        </div>

        <div style={tiktokWebStyles.textRow}>
          <h1 style={tiktokWebStyles.title}>TikTok Web</h1>
          <h4 style={tiktokWebStyles.subtitle}>
            Short video / Discover / Web
          </h4>
        </div>
      </div>
    </div>
  );
});

export default TiktokWeb;
