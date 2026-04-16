import React, { useEffect, useState } from 'react';
import cursorImg from '../../assets/cursor.png';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if device is touch-capable
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('.interactive') ||
        target.classList.contains('interactive')
      ) {
        setIsHovering(true);
      }
    };

    const onMouseOut = () => {
      setIsHovering(false);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseout', onMouseOut);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible || isTouchDevice) return null;

  return (
    <div
      className={`custom-cursor ${isHovering ? 'hover' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        opacity: isVisible ? 1 : 0,
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: `translate(0, 0) ${isHovering ? 'scale(1.2)' : 'scale(1)'}`,
        transition: 'transform 0.2s ease, opacity 0.3s ease',
      }}
    >
      <img 
        src={cursorImg} 
        alt="cursor" 
        style={{ 
          width: '24px', 
          height: 'auto',
          display: 'block'
        }} 
      />
    </div>
  );
};

export default CustomCursor;
