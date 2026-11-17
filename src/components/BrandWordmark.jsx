import React from 'react';
import brandNameImg from '../images/Malabar Prime name.png';

/**
 * BrandWordmark - Replicates the official brand name style:
 * Top: MALABAR with trademark ™ in crisp serif
 * Bottom: PRIME in glowing Royal Gold metallic gradient serif
 * Matches the user's official brand identity asset.
 */
export default function BrandWordmark({ 
  theme = 'light', // 'light' (for ivory bg), 'dark' (for black bg), or 'badge' (dark pill)
  size = 'md',     // 'sm', 'md', 'lg', 'xl'
  showSubtitle = true,
  useExactImage = false,
  className = ''
}) {
  if (useExactImage) {
    const imgHeight = {
      sm: 'h-6 sm:h-7',
      md: 'h-8 sm:h-9',
      lg: 'h-10 sm:h-12',
      xl: 'h-14 sm:h-16'
    }[size] || 'h-8 sm:h-9';

    return (
      <div className={`inline-flex flex-col ${className}`}>
        <div className={`inline-flex items-center ${theme === 'badge' ? 'bg-[#101010] px-2.5 py-1 rounded border border-[#D4AF37]/40 shadow-sm' : ''}`}>
          <img 
            src={brandNameImg} 
            alt="MALABAR PRIME™" 
            className={`${imgHeight} w-auto object-contain`}
          />
        </div>
        {showSubtitle && (
          <span className={`block text-[8px] sm:text-[9px] font-mono uppercase tracking-[0.22em] font-semibold mt-0.5 ${
            theme === 'dark' ? 'text-[#D4AF37]' : 'text-[#343434]'
          }`}>
            Wholesale Distributions
          </span>
        )}
      </div>
    );
  }

  // Pure Vector Typography matching the image typography
  const malabarColor = theme === 'dark' ? 'text-white' : 'text-[#101010]';
  const tmColor = theme === 'dark' ? 'text-[#D4AF37]' : 'text-[#343434]';
  
  const textSizes = {
    sm: {
      malabar: 'text-xs tracking-[0.14em]',
      tm: 'text-[7px]',
      prime: 'text-[11px] tracking-[0.24em]',
      sub: 'text-[7px] tracking-[0.2em]'
    },
    md: {
      malabar: 'text-sm sm:text-base tracking-[0.16em]',
      tm: 'text-[8px]',
      prime: 'text-xs sm:text-sm tracking-[0.28em]',
      sub: 'text-[8px] sm:text-[9px] tracking-[0.24em]'
    },
    lg: {
      malabar: 'text-xl sm:text-2xl tracking-[0.18em]',
      tm: 'text-[10px]',
      prime: 'text-base sm:text-lg tracking-[0.3em]',
      sub: 'text-[10px] tracking-[0.28em]'
    },
    xl: {
      malabar: 'text-3xl sm:text-4xl md:text-5xl tracking-[0.2em]',
      tm: 'text-xs sm:text-sm',
      prime: 'text-2xl sm:text-3xl md:text-4xl tracking-[0.32em]',
      sub: 'text-xs sm:text-sm tracking-[0.3em]'
    }
  }[size] || textSizes.md;

  const content = (
    <div className={`inline-flex flex-col leading-none select-none ${className}`}>
      {/* Top: MALABAR™ */}
      <div className="flex items-start">
        <span className={`font-cinzel font-black uppercase leading-none ${malabarColor} ${textSizes.malabar}`}>
          MALABAR
        </span>
        <sup className={`font-sans font-bold ml-0.5 -top-1 ${tmColor} ${textSizes.tm}`}>
          ™
        </sup>
      </div>

      {/* Bottom: PRIME in glowing Royal Gold metallic gradient */}
      <span className={`font-cinzel font-black uppercase leading-none bg-gradient-to-r from-[#D4AF37] via-[#F3D87E] to-[#B8871B] bg-clip-text text-transparent mt-0.5 ${textSizes.prime}`}>
        PRIME
      </span>

      {/* Subtitle */}
      {showSubtitle && (
        <span className={`font-mono uppercase font-semibold mt-1 ${
          theme === 'dark' ? 'text-[#D4AF37]' : 'text-[#343434]'
        } ${textSizes.sub}`}>
          Wholesale Distributions
        </span>
      )}
    </div>
  );

  if (theme === 'badge') {
    return (
      <div className="bg-[#101010] px-3 py-1.5 rounded-lg border border-[#D4AF37]/50 shadow-sm inline-flex items-center">
        {content}
      </div>
    );
  }

  return content;
}

