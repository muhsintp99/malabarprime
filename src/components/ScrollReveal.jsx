import React, { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({ 
  children, 
  delay = 0, 
  direction = 'up', // 'up' | 'down' | 'left' | 'right' | 'scale'
  className = "" 
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const getTransitionStyle = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up': return 'translate-y-12 opacity-0';
        case 'down': return '-translate-y-12 opacity-0';
        case 'left': return 'translate-x-12 opacity-0';
        case 'right': return '-translate-x-12 opacity-0';
        case 'scale': return 'scale-95 opacity-0';
        default: return 'translate-y-12 opacity-0';
      }
    }
    return 'translate-y-0 translate-x-0 scale-100 opacity-100';
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${getTransitionStyle()} ${className}`}
    >
      {children}
    </div>
  );
}

