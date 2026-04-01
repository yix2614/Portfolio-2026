import React, { useState, useRef, useEffect } from 'react';
import { Badge } from '@geist-ui/core';

interface ImageComparisonProps {
  beforeImage: string;
  afterImage: string;
  width?: string;
  height?: string;
  className?: string;
}

const ImageComparison: React.FC<ImageComparisonProps> = ({ 
  beforeImage, 
  afterImage, 
  width = '100%', 
  height = 'auto',
  className = ''
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className={className}
      style={{ 
        position: 'relative', 
        width, 
        height, 
        overflow: 'hidden',
        userSelect: 'none',
        borderRadius: '12px', // 添加一点圆角让它看起来更精致
      }}
      onMouseDown={(e) => {
        setIsDragging(true);
        handleMove(e.clientX);
      }}
      onTouchStart={(e) => {
        setIsDragging(true);
        handleMove(e.touches[0].clientX);
      }}
    >
      {/* After Image (Background) */}
      <img 
        src={afterImage} 
        alt="After" 
        style={{ 
          display: 'block',
          width: '100%', 
          height: '100%', 
          objectFit: 'cover',
          pointerEvents: 'none'
        }} 
      />

      {/* Before Image (Foreground, clipped) */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
          overflow: 'hidden',
          pointerEvents: 'none'
        }}
      >
        <img 
          src={beforeImage} 
          alt="Before" 
          style={{ 
            display: 'block',
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0
          }} 
        />
      </div>

      {/* Slider Handle */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${sliderPosition}%`,
          width: '1px',
          backgroundColor: '#EAEAEA',
          transform: 'translateX(-50%)',
          cursor: 'ew-resize',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Handle Knob */}
        <div style={{
          width: '32px',
          height: '32px',
          backgroundColor: 'white',
          borderRadius: '50%',
          border: '1px solid #EAEAEA',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute'
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 8L4 12L8 16" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 8L20 12L16 16" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
      {/* Labels */}
      <div style={{
        position: 'absolute',
        top: '16px',
        left: '16px',
        pointerEvents: 'none',
        opacity: sliderPosition > 15 ? 1 : 0,
        transition: 'opacity 0.2s',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Badge style={{ backgroundColor: '#F3F3F3', color: '#666', border: 'none', fontWeight: 500, margin: 0, padding: '0 8px', height: '24px', display: 'flex', alignItems: 'center', borderRadius: '9999px' }}>Before</Badge>
      </div>
      <div style={{
        position: 'absolute',
        top: '16px',
        right: '16px',
        pointerEvents: 'none',
        opacity: sliderPosition < 85 ? 1 : 0,
        transition: 'opacity 0.2s',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Badge type="secondary" style={{ backgroundColor: '#000', color: '#fff', fontWeight: 500, border: 'none', margin: 0, padding: '0 8px', height: '24px', display: 'flex', alignItems: 'center', borderRadius: '9999px' }}>After</Badge>
      </div>
    </div>
  );
};

export default ImageComparison;
