import { CSSProperties } from "react";

export const vibeCodingPageStyles = {
  container: {
    width: '100vw',
    height: '100vh',
    backgroundColor: 'var(--color-bg-page)',
    overflow: 'hidden', // Prevent scrolling
    position: 'relative',
    boxSizing: 'border-box',
    padding: '8px', // 8px padding
  } as CSSProperties,

  textOverlay: {
    position: 'relative', 
    width: 'fit-content',
    height: '100%',
    flex: 1, 
    display: 'flex',
    justifyContent: 'flex-start', // Left align
    alignItems: 'center',
    zIndex: 999,
    color: 'var(--color-text-primary)',
    fontFamily: '"Doto", sans-serif', 
    fontSize: '12vh', 
    fontWeight: 900, 
    lineHeight: '1', 
    whiteSpace: 'nowrap', 
    pointerEvents: 'none',
    opacity: 1,
    letterSpacing: '-0.05em', 
    textAlign: 'left', // Text align left
    paddingLeft: '0.5vw', // Optional padding from left edge
  } as CSSProperties,

  cardContainer: {
    width: '86vw', 
    height: 'auto', 
    backgroundColor: 'transparent', 
    borderRadius: '12px', 
    boxShadow: 'none', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 2,
    cursor: 'none', // Hide default cursor
  } as CSSProperties,

  cursorCircle: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: 'fit-content',
    minHeight: '32px',
    padding: '0 14px',
    backgroundColor: 'white',
    borderRadius: '999px',
    pointerEvents: 'none',
    zIndex: 9999,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    mixBlendMode: 'difference',
    transform: 'translate(-50%, -50%)',
    transition: 'transform 0.1s ease-out, opacity 0.2s ease',
    color: 'var(--color-text-primary)',
    fontFamily: 'Helvetica, sans-serif',
    fontWeight: '400',
    fontSize: '14px',
    textTransform: 'none',
    whiteSpace: 'nowrap'
  } as CSSProperties,

  // Text elements styles based on the image
  headlineLeft: {
    position: 'absolute',
    left: '5%',
    top: '50%',
    transform: 'translateY(-50%)',
    fontFamily: 'Helvetica, Arial, sans-serif',
    fontWeight: 900,
    fontSize: '6vw',
    lineHeight: '0.9',
    color: 'var(--color-text-primary)',
    textAlign: 'right',
    zIndex: 1,
  } as CSSProperties,

  headlineRight: {
    position: 'absolute',
    right: '5%',
    top: '50%',
    transform: 'translateY(-50%)',
    fontFamily: 'Helvetica, Arial, sans-serif',
    fontWeight: 900,
    fontSize: '6vw',
    lineHeight: '0.9',
    color: 'var(--color-text-primary)',
    textAlign: 'left',
    zIndex: 1,
  } as CSSProperties,

  topNav: {
    width: '100%', 
    display: 'flex',
    alignItems: 'flex-start',
    padding: '12px',
    boxSizing: 'border-box',
    position: 'relative',
    zIndex: 10,
    gap: '40px', // Added gap to handle spacing between title and info sections
  } as CSSProperties,

  topNavTitle: {
    // flex: 1, // Removed flex: 1 to respect explicit width
    width: '64%', 
    height: 'auto',
    fontFamily: 'Helvetica, Arial, sans-serif',
    fontWeight: 400, 
    fontSize: '40px', 
    textTransform: 'none', // Allow data to control case
    letterSpacing: '-2px',
    lineHeight: 1.2, 
    wordWrap: 'break-word', 
    marginTop: '-4px', 
    marginLeft: '-2px', 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '0px', 
    color: 'var(--color-text-primary)',
  } as CSSProperties,

  topNavSubtitle: {
    fontFamily: '"Instrument Serif", serif', 
    fontWeight: 400, 
    fontSize: '40px', 
    textTransform: 'none', // Allow data to control case
    letterSpacing: '-2px', 
    lineHeight: 0.9, 
    fontStyle: 'italic', 
    color: 'var(--color-text-muted)', 
  } as CSSProperties,

  topNavInfo: {
    width: '36%', // Added width to fill the remaining space
    display: 'flex',
    // gap: '40px', // Removed gap to allow children to control spacing
    justifyContent: 'space-between', // Distribute children evenly
    alignItems: 'flex-start',
    flexShrink: 0,
    // paddingLeft: '40px', // Removed padding to maximize width usage
    fontFamily: 'Helvetica, Arial, sans-serif', 
    fontSize: '12px',
    fontWeight: 400, 
    color: 'var(--color-text-muted)', // Even lighter gray
  } as CSSProperties,

  // topNavRight removed

  topNavRightItem: {
    // flex: 1, // Remove flex: 1 to let space-between work naturally, or keep it but change alignment
    textAlign: 'right', // Keep text align right if desired, or remove
  } as CSSProperties,

  bottomPagination: {
    // position: 'absolute', // Removed absolute
    // bottom: '40px',
    // left: '50%',
    // transform: 'translateX(-50%)',
    display: 'flex',
    gap: '12px',
    zIndex: 20, // Ensure it's above the card
    marginBottom: '20px', 
    position: 'relative', // Ensure z-index works
  } as CSSProperties,
  dockWrapper: {
    position: 'fixed',
    left: '50%',
    bottom: '8px',
    transform: 'translateX(-50%)',
    zIndex: 9999
  } as CSSProperties,
};
