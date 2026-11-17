import React, { useRef, useState } from 'react';

export default function Magnetic({ 
  children, 
  strength = 0.35, 
  className = "",
  disabled = false
}) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (disabled || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPos({ x: middleX * strength, y: middleY * strength });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        transition: pos.x === 0 && pos.y === 0 
          ? 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)' 
          : 'transform 0.1s ease-out'
      }}
      className={`inline-block data-magnetic ${className}`}
    >
      {children}
    </div>
  );
}

