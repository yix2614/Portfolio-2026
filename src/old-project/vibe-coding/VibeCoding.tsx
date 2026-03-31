import * as React from "react";
import { vibeCodingStyles } from "./VibeCoding.styles";
import { useNavigate } from "react-router-dom";

type VibeCodingProps = {
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
};

const VibeCoding = React.forwardRef<HTMLDivElement, VibeCodingProps>((props, ref) => {
  const { style, className, onClick } = props;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/vibe-coding');
    if (onClick) onClick();
  };

  return (
    <div
      className={className}
      ref={ref}
      style={{ ...vibeCodingStyles.root, ...style, cursor: 'pointer' }}
      onClick={handleClick}
    >
      <div style={vibeCodingStyles.mainContainer}>
        <div style={vibeCodingStyles.imageSection}>
            <div style={vibeCodingStyles.imageInner}>
                <img
                  alt="Vibe Coding"
                  style={vibeCodingStyles.mainImage}
                  src="https://res.cloudinary.com/dkjokhb4w/image/upload/v1770597551/1f999a00-56b3-42c7-bbc0-c9bffbe8b08b.png"
                />
            </div>
        </div>

        <div style={vibeCodingStyles.textRow}>
          <h1 style={vibeCodingStyles.title}>Vibe Coding</h1>
          <h4 style={vibeCodingStyles.subtitle}>
            A new way to code / Flow state / Aesthetic
          </h4>
        </div>
      </div>
    </div>
  );
});

export default VibeCoding;
