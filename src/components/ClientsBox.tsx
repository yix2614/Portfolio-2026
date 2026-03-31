import React from 'react';
import { motion } from 'framer-motion';
import { clientsBoxStyles, clientsBoxClasses } from './ClientsBox.styles';

const BackgroundShape = () => (
  <svg width="100%" height="100%" viewBox="0 0 1631 339" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block' }}>
    <path fillRule="evenodd" clipRule="evenodd" d="M20 284C8.9543 284 0 275.046 0 264V83.4917C0 78.1874 2.10714 73.1003 5.85787 69.3496L69.3496 5.85786C73.1003 2.10714 78.1874 0 83.4917 0H289C299.493 0 308 8.50659 308 19V19C308 30.0457 316.954 39 328 39H585C596.046 39 605 30.0457 605 19V19C605 8.50659 613.507 0 624 0H1611C1622.05 0 1631 8.95431 1631 20V319C1631 330.046 1622.05 339 1611 339H160.998C149.952 339 140.998 330.046 140.998 319V304C140.998 292.954 132.044 284 120.998 284H20Z" fill="var(--color-bg-inverse, white)"/>
  </svg>
);

const logos = [
  // Google
  <img key="google" src="https://res.cloudinary.com/dkjokhb4w/image/upload/v1769813289/Googe_h9fkwg.png" alt="Google" style={{ width: 'auto', height: '100px', pointerEvents: 'none' }} />,
  // Nike
  <img key="nike" className="clients-logo-nike" src="https://res.cloudinary.com/dkjokhb4w/image/upload/v1769813289/Nike_tvmbjm.png" alt="Nike" style={{ width: 'auto', height: '100px', pointerEvents: 'none' }} />,
  // Shiseido
  <img key="shiseido" src="https://res.cloudinary.com/dkjokhb4w/image/upload/v1769813289/Shiseido_xgdiqm.png" alt="Shiseido" style={{ width: 'auto', height: '100px', pointerEvents: 'none' }} />,
  // AXA
  <img key="axa" src="https://res.cloudinary.com/dkjokhb4w/image/upload/v1769813288/AXA_eh4eve.png" alt="AXA" style={{ width: 'auto', height: '100px', pointerEvents: 'none' }} />,
];

const LogoTicker = () => {
  return (
    <motion.div
      style={clientsBoxStyles.tickerMotion as any}
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: 15, ease: "linear", repeat: Infinity }}
    >
      {/* Render logos multiple times to ensure smooth loop */}
      {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
        <div key={index} style={clientsBoxStyles.tickerLogo}>
          {logo}
        </div>
      ))}
    </motion.div>
  );
};

export const ClientsBox = () => {
  return (
    <div style={clientsBoxStyles.container}>
      <div className={clientsBoxClasses.header} style={clientsBoxStyles.header}>
         <p style={clientsBoxStyles.headerText}>Clients</p>
      </div>
      
      <div style={clientsBoxStyles.contentContainer}>
        <div style={clientsBoxStyles.backgroundContainer}>
            <BackgroundShape />
        </div>
        
        <div style={clientsBoxStyles.tickerContainer}>
             <LogoTicker />
        </div>
      </div>
    </div>
  );
};

export default ClientsBox;
