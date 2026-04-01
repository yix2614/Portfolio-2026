import React from "react";
import { GeistProvider, Button, Text } from "@geist-ui/core";
import { tiktokWebPageStyles } from "./TiktokWebPage.styles";
import Dock2 from "./Dock2";
import TiktokWebContent from "./TiktokWebContent";

const FloatingCard = ({ hidden }: { hidden: boolean }) => (
  <div
    style={{
      ...tiktokWebPageStyles.cardContainer,
      transform: hidden ? "translateY(120%)" : "translateY(0)",
      opacity: hidden ? 0 : 1,
      transition: "transform 0.35s ease, opacity 0.35s ease",
      pointerEvents: hidden ? "none" : "auto",
    }}
  >
    {/* Image Placeholder */}
    <img 
      style={tiktokWebPageStyles.cardImage} 
      src="https://res.cloudinary.com/dkjokhb4w/image/upload/v1771142525/Control_j7h5zo.jpg"
      alt="Card preview"
    />
    
    {/* Bottom Info */}
    <div style={tiktokWebPageStyles.cardBottom}>
      <div style={tiktokWebPageStyles.cardTextCol}>
        <Text span style={tiktokWebPageStyles.cardTitle}>TikTok.com</Text>
        <Text span style={tiktokWebPageStyles.cardSubtitle}>Short video / Discover / Web</Text>
      </div>
      {/* @ts-ignore: Geist UI types compatibility with newer React */}
      <Button 
        auto 
        icon={
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 3.5C4.2 3.5 1.75 5.25 0.875 7C1.75 8.75 4.2 10.5 7 10.5C9.8 10.5 12.25 8.75 13.125 7C12.25 5.25 9.8 3.5 7 3.5ZM7 9.1C5.845 9.1 4.9 8.155 4.9 7C4.9 5.845 5.845 4.9 7 4.9C8.155 4.9 9.1 5.845 9.1 7C9.1 8.155 8.155 9.1 7 9.1ZM7 5.95C6.4225 5.95 5.95 6.4225 5.95 7C5.95 7.5775 6.4225 8.05 7 8.05C7.5775 8.05 6.4225 7.5775 5.95 7 5.95Z" fill="var(--color-text-primary)"/>
          </svg>
        }
        style={tiktokWebPageStyles.cardButton}
      >
        <Text span style={tiktokWebPageStyles.cardButtonText}>Explore</Text>
      </Button>
    </div>
  </div>
);


const ContentSection = () => {
  return (
    <div style={tiktokWebPageStyles.contentSection}>
      <TiktokWebContent />
    </div>
  );
};

const TiktokWebPage = () => {
  const [isCardHidden, setIsCardHidden] = React.useState(false);

  React.useEffect(() => {
    const updateCardVisibility = () => {
      setIsCardHidden(window.scrollY >= window.innerHeight);
    };

    updateCardVisibility();
    window.addEventListener("scroll", updateCardVisibility, { passive: true });
    window.addEventListener("resize", updateCardVisibility);

    return () => {
      window.removeEventListener("scroll", updateCardVisibility);
      window.removeEventListener("resize", updateCardVisibility);
    };
  }, []);

  return (
    <GeistProvider>
      <div style={tiktokWebPageStyles.page} className="tiktokweb-page">
        <ContentSection />
        <FloatingCard hidden={isCardHidden} />
        <div style={tiktokWebPageStyles.dockWrapper}>
          <Dock2 />
        </div>
      </div>
    </GeistProvider>
  );
};

export default TiktokWebPage;
