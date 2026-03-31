import { CSSProperties } from "react";

export const linkStyles: CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  padding: '28px 0',
  borderTop: '1px solid rgba(255, 255, 255, 0.5)',
  cursor: 'pointer',
  width: '100%',
  textDecoration: 'none',
  position: 'relative',
  transition: 'opacity 0.2s ease',
};

export const numberStyles: CSSProperties = {
  width: '10%',
  flex: 'none',
  fontFamily: '"Humane Light", sans-serif',
  fontSize: '32px',
  lineHeight: '0.8em',
  color: '#ffffff',
};

export const iconWrapperStyles: CSSProperties = {
  flex: 'none',
  aspectRatio: '1/1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
};

export const nameStyles: CSSProperties = {
  flex: 'none',
  fontFamily: '"Thunder Semi Bold LC", sans-serif',
  fontSize: '80px',
  lineHeight: '0.9em',
  textTransform: 'uppercase',
  color: '#ffffff',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

export const typeContainerStyles: CSSProperties = {
  width: '30%',
  flex: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  fontFamily: '"Helvetica Neue Regular", sans-serif',
  fontSize: '12px',
  lineHeight: '1.2em',
  color: '#ffffff',
};

export const timeStyles: CSSProperties = {
  width: '10%',
  flex: 'none',
  fontFamily: '"Humane Light", sans-serif',
  fontSize: '32px',
  lineHeight: '0.8em',
  color: '#ffffff',
  textAlign: 'left',
};

export const badgeStyles: CSSProperties = {
  position: 'absolute',
  bottom: '10px',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: '#009dff',
  borderRadius: '999px',
  padding: '3px 4px 2px 4px',
  fontFamily: '"Helvetica Neue Regular", sans-serif',
  fontSize: '8px',
  color: '#f5f5f5',
};
