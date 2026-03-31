import * as React from "react";
import { memberStyles } from "./Member.styles";

type MemberProps = {
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
};

const Member = React.forwardRef<HTMLDivElement, MemberProps>((props, ref) => {
  const { style, className, onClick } = props;

  return (
    <div
      className={className}
      ref={ref}
      style={{ ...memberStyles.root, ...style }}
      onClick={onClick}
    >
      <div style={memberStyles.mainContainer}>
        {/* Top Row */}
        <div style={memberStyles.topRow}>
          {/* Left Card */}
          <div style={memberStyles.leftCard}>
            <img
              alt=""
              style={memberStyles.leftCardImage}
              src="https://framerusercontent.com/images/hAiPd96oao7OLdv9ZogmTQ6MQ.jpg?width=811&height=400"
              srcSet="https://framerusercontent.com/images/hAiPd96oao7OLdv9ZogmTQ6MQ.jpg?scale-down-to=512&width=811&height=400 512w,https://framerusercontent.com/images/hAiPd96oao7OLdv9ZogmTQ6MQ.jpg?width=811&height=400 811w"
              sizes="calc(100vw - 9px)"
            />
          </div>
          {/* Right Card */}
          <div style={memberStyles.rightCard}>
            <img
              alt=""
              style={memberStyles.rightCardImage}
              src="https://framerusercontent.com/images/6Zs0jDsH1FolCiR58p4zZazbEE.jpg?width=419&height=419"
              srcSet="https://framerusercontent.com/images/6Zs0jDsH1FolCiR58p4zZazbEE.jpg?scale-down-to=512&width=419&height=419 512w,https://framerusercontent.com/images/6Zs0jDsH1FolCiR58p4zZazbEE.jpg?scale-down-to=1024&width=419&height=419 1024w,https://framerusercontent.com/images/6Zs0jDsH1FolCiR58p4zZazbEE.jpg?width=419&height=419 419w"
              sizes="calc(100vw - 9px)"
            />
          </div>
        </div>

        {/* Bottom Card (Main Image) */}
        <div style={memberStyles.bottomCard}>
          <div style={memberStyles.bottomCardInner}>
            {/* Main Image */}
            <img
              alt=""
              style={memberStyles.mainImage}
              src="https://framerusercontent.com/images/VJD6xjKrDSyzy4QQuaqaVk00M.jpg?width=1886&height=983"
              srcSet="https://framerusercontent.com/images/VJD6xjKrDSyzy4QQuaqaVk00M.jpg?scale-down-to=512&width=1886&height=983 512w,https://framerusercontent.com/images/VJD6xjKrDSyzy4QQuaqaVk00M.jpg?scale-down-to=1024&width=1886&height=983 1024w,https://framerusercontent.com/images/VJD6xjKrDSyzy4QQuaqaVk00M.jpg?width=1886&height=983 1886w"
              sizes="100vw"
            />
          </div>
        </div>

        {/* Text Row */}
        <div style={memberStyles.textRow}>
          <h1 style={memberStyles.title}>Nike Memberdays 2022</h1>
          <h4 style={memberStyles.subtitle}>UI / UX / Creative / Digital Engagement</h4>
        </div>
      </div>
    </div>
  );
});

export default Member;
