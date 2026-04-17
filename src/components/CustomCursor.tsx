import React, { useEffect, useState, useRef } from 'react';
import cursorImg from '../../assets/cursor.png';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
}

const COLORS = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"];

const CustomCursor: React.FC<{ isFairyEnabled: boolean }> = ({ isFairyEnabled }) => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  const [particles, setParticles] = useState<Particle[]>([]);
  
  // Refs for animation to avoid re-render loops
  const mousePos = useRef({ x: -100, y: -100 });
  const lastCreatedPos = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number>(null);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      const { clientX, clientY } = e;
      mousePos.current = { x: clientX, y: clientY };
      setPosition({ x: clientX, y: clientY });
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

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseout', () => setIsHovering(false));
    document.addEventListener('mouseleave', () => setIsVisible(false));

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isVisible]);

  // Unified Animation Loop
  useEffect(() => {
    const update = () => {
      let createdNew = false;
      let newParticle: Particle | null = null;

      if (isFairyEnabled && isVisible) {
        const dist = Math.hypot(
          mousePos.current.x - lastCreatedPos.current.x, 
          mousePos.current.y - lastCreatedPos.current.y
        );

        if (dist > 4) {
          newParticle = {
            id: Math.random(),
            x: mousePos.current.x,
            y: mousePos.current.y,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5 + 1,
            life: 1.0,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            size: 10 + Math.random() * 10
          };
          lastCreatedPos.current = { x: mousePos.current.x, y: mousePos.current.y };
          createdNew = true;
        }
      }

      setParticles(prev => {
        // Optimization: If no particles and none created, don't update state to avoid re-render
        if (prev.length === 0 && !createdNew) return prev;

        const updated = prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life - 0.02,
            size: p.size * 0.98
          }))
          .filter(p => p.life > 0);

        if (createdNew && newParticle) {
          return [...updated.slice(-30), newParticle];
        }
        
        // If it was not empty but now it is, and we didn't create new ones, we return a new empty array once
        return updated;
      });

      requestRef.current = requestAnimationFrame(update);
    };

    requestRef.current = requestAnimationFrame(update);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isFairyEnabled, isVisible]);

  if (!isVisible || isTouchDevice) return null;

  return (
    <>
      {/* Custom Cursor Image */}
      <div
        className={`custom-cursor ${isHovering ? 'hover' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: isVisible ? 1 : 0,
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 10001,
          transform: `translate(-5px, -5px) ${isHovering ? 'scale(1.2)' : 'scale(1)'}`,
          transition: 'transform 0.15s ease-out, opacity 0.3s ease',
          willChange: 'left, top, transform'
        }}
      >
        <img 
          src={cursorImg} 
          alt="cursor" 
          style={{ width: '32px', height: 'auto', display: 'block', pointerEvents: 'none' }} 
        />
      </div>

      {/* Fairy Dust Particles */}
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'fixed',
            left: p.x,
            top: p.y,
            pointerEvents: 'none',
            zIndex: 10000,
            color: p.color,
            fontSize: `${p.size}px`,
            opacity: p.life,
            transform: `translate(-50%, -50%) rotate(${p.life * 360}deg)`,
            userSelect: 'none',
            filter: 'drop-shadow(0 0 5px currentColor)',
            willChange: 'transform, opacity'
          }}
        >
          ★
        </div>
      ))}
    </>
  );
};

export default CustomCursor;
