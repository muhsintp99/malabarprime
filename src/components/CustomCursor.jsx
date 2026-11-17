import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only initialize on devices with hover/fine pointer (ignore touchscreens)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    // Smooth inertia loop for outer ring
    const loop = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    // Detect hover over interactive elements
    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, input, select, textarea, .data-magnetic, .cursor-pointer');
      if (target) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    document.body.addEventListener('mouseenter', onMouseEnter);
    document.body.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.removeEventListener('mouseenter', onMouseEnter);
      document.body.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Precision Center Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full transition-transform duration-75 ease-out ${
          isHovered ? 'bg-[#D4AF37] scale-150' : 'bg-[#101010]'
        } ${isClicking ? 'scale-75' : ''}`}
      />

      {/* Smooth Trailing Magnetic Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border border-[#D4AF37] pointer-events-none transition-all duration-200 ease-out ${
          isHovered
            ? 'w-12 h-12 -ml-6 -mt-6 bg-[#D4AF37]/15 border-[#101010] scale-110 shadow-sm'
            : 'w-8 h-8 -ml-4 -mt-4 opacity-70 bg-transparent'
        } ${isClicking ? 'scale-90 bg-[#D4AF37]/30' : ''}`}
      />
    </div>
  );
}

