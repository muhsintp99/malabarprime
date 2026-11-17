import React, { useState, useEffect } from 'react';
import { 
  ArrowDown, 
  FileDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { COMPANY_INFO } from '../data/distributionData';
import Magnetic from './Magnetic';
import ScrollReveal from './ScrollReveal';
import brandNameImg from '../images/Malabar Prime name.png';

// Curated high-resolution wholesale commodities for Malabar Prime
const HERO_SLIDES = [
  {
    url: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=1400&q=85",
    alt: "Tellicherry Black Pepper & Spices",
    tag: "WAYANAD HARVEST"
  },
  {
    url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1400&q=85",
    alt: "Cold-Pressed Virgin Coconut Oil",
    tag: "COLD PRESSED"
  },
  {
    url: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1400&q=85",
    alt: "Golden Turmeric, Cardamom & Cloves",
    tag: "GRADE-A SPICES"
  },
  {
    url: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1400&q=85",
    alt: "Aged Jeerakasala Kaima Rice",
    tag: "SIGNATURE STAPLE"
  }
];

export default function Hero({ onOpenCatalogModal, onOpenPartnerModal, onNavigate }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Automatic slide rotation every 3.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section className="bg-[#F5F0E6] text-[#101010] w-full border-b border-[#101010]">
      <div className="w-full">
        
        {/* Main Grid: Left Content (7 cols) + Right Automatic Image Slider (5 cols) */}
        <div className="grid lg:grid-cols-12 min-h-[500px]">
          
          {/* Left Column: Tightly composed, compact vertical spacing */}
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 xl:p-12 relative flex flex-col justify-center space-y-6 sm:space-y-7 overflow-hidden border-b lg:border-b-0 lg:border-r border-[#101010]">
            
            {/* Top Row: Floating Product Sticker Badges */}
            <div className="flex items-start justify-between relative z-10">
              
              {/* Product Sticker 1 */}
              <ScrollReveal direction="down" delay={100}>
                <Magnetic strength={0.25}>
                  <div className="bg-white border border-[#101010] rounded-xl p-2 sm:p-2.5 shadow-sm flex items-center gap-3 max-w-[210px] transform -rotate-1 hover:rotate-0 transition-transform cursor-pointer">
                    <div>
                      <span className="block text-[9px] font-mono font-bold uppercase tracking-wider text-[#343434]">
                        COLD PRESSED
                      </span>
                      <span className="block text-xs font-bold text-[#101010] leading-tight">
                        Virgin Coconut Oil
                      </span>
                      <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#D4AF37] text-[#101010] text-[10px] font-black mt-0.5">
                        +
                      </span>
                    </div>
                    <img 
                      src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=200&q=80" 
                      alt="VCO" 
                      className="w-11 h-11 object-cover rounded-lg border border-[#101010]/20 flex-shrink-0"
                    />
                  </div>
                </Magnetic>
              </ScrollReveal>

              {/* Product Sticker 2 */}
              <ScrollReveal direction="down" delay={200}>
                <Magnetic strength={0.25}>
                  <div className="bg-white border border-[#101010] rounded-xl p-2 sm:p-2.5 shadow-sm hidden sm:flex items-center gap-3 max-w-[210px] transform rotate-2 hover:rotate-0 transition-transform cursor-pointer">
                    <div>
                      <span className="block text-[9px] font-mono font-bold uppercase tracking-wider text-[#343434]">
                        EXTRA BOLD
                      </span>
                      <span className="block text-xs font-bold text-[#101010] leading-tight">
                        Tellicherry Pepper
                      </span>
                      <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#D4AF37] text-[#101010] text-[10px] font-black mt-0.5">
                        +
                      </span>
                    </div>
                    <img 
                      src="https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=200&q=80" 
                      alt="Pepper" 
                      className="w-11 h-11 object-cover rounded-lg border border-[#101010]/20 flex-shrink-0"
                    />
                  </div>
                </Magnetic>
              </ScrollReveal>

            </div>

            {/* Middle: Title and Description with ZERO excess space */}
            <div className="relative z-10 max-w-xl">
              
              {/* Official Brand Name Badge in Trademark Style */}
              <ScrollReveal direction="up" delay={100}>
                <div className="inline-flex items-center gap-2.5 mb-2.5 px-3 py-1 bg-[#101010] rounded border border-[#D4AF37]/50 shadow-sm">
                  <img src={brandNameImg} alt="MALABAR PRIME" className="h-4 sm:h-4.5 w-auto object-contain" />
                  <span className="text-[8px] font-mono font-bold text-[#D4AF37] border-l border-[#343434] pl-2 uppercase">
                    OFFICIAL TRADE
                  </span>
                </div>
              </ScrollReveal>

              {/* Main Headline */}
              <ScrollReveal direction="up" delay={150}>
                <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#101010] leading-[1.05] select-none">
                  ROYAL SPICES <br />
                  <span className="italic font-normal">&amp; PRIME</span> HARVEST
                </h1>
              </ScrollReveal>

              {/* Subtitle - space removed so it sits seamlessly under the title */}
              <ScrollReveal direction="up" delay={200}>
                <p className="text-xs sm:text-sm text-[#343434] mt-1.5 leading-relaxed font-medium">
                  Authorized master wholesale &amp; FMCG distribution partner. Direct factory sourcing connecting 30+ leading consumer food brands with <strong>1,450+ supermarkets, retail chains, and commercial kitchens</strong> across South India.
                </p>
              </ScrollReveal>
            </div>

            {/* Bottom Controls: Magnetic CTAs + Down Arrow */}
            <div className="pt-2 relative z-10 flex flex-wrap items-center justify-between gap-4">
              
              <div className="flex flex-wrap items-center gap-3">
                <Magnetic strength={0.2}>
                  <a
                    href="/products"
                    onClick={(e) => {
                      e.preventDefault();
                      if (onNavigate) onNavigate('products');
                    }}
                    className="px-5 py-3 bg-[#101010] hover:bg-[#343434] text-[#F5F0E6] text-xs font-black uppercase tracking-wider rounded border border-[#101010] shadow-sm transition-all inline-block"
                  >
                    Explore 350+ SKUs
                  </a>
                </Magnetic>

                <Magnetic strength={0.2}>
                  <button
                    onClick={onOpenPartnerModal}
                    className="px-5 py-3 bg-[#D4AF37] hover:bg-[#b39023] text-[#101010] text-xs font-black uppercase tracking-wider rounded border border-[#101010] transition-colors inline-block"
                  >
                    Become a Partner
                  </button>
                </Magnetic>

                <Magnetic strength={0.2}>
                  <button
                    onClick={onOpenCatalogModal}
                    className="px-4 py-3 bg-white hover:bg-[#F5F0E6] text-[#101010] text-xs font-bold uppercase tracking-wider rounded border border-[#101010] transition-colors flex items-center gap-1.5"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                    <span>Price List</span>
                  </button>
                </Magnetic>
              </div>

              {/* Down Arrow Button */}
              <Magnetic strength={0.4}>
                <a
                  href="/products"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) onNavigate('products');
                  }}
                  className="w-11 h-11 bg-[#D4AF37] border-2 border-[#101010] rounded-xl flex items-center justify-center text-[#101010] hover:bg-black hover:text-[#D4AF37] transition-colors shadow-sm"
                  aria-label="Scroll down to products"
                >
                  <ArrowDown className="w-5 h-5" />
                </a>
              </Magnetic>

            </div>

          </div>

          {/* Right Column: AUTOMATIC IMAGE SLIDER (Auto-playing high-res imagery) */}
          <div 
            className="lg:col-span-5 bg-[#101010] relative overflow-hidden flex items-center justify-center min-h-[360px] lg:min-h-[500px] group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Slides container */}
            {HERO_SLIDES.map((slide, idx) => (
              <div 
                key={idx}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  idx === currentSlide 
                    ? 'opacity-100 scale-100 z-10' 
                    : 'opacity-0 scale-105 pointer-events-none z-0'
                }`}
              >
                <img 
                  src={slide.url} 
                  alt={slide.alt} 
                  className="w-full h-full object-cover"
                />
                
                {/* Subtle gradient overlay at bottom for controls visibility */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none"></div>
              </div>
            ))}

            {/* Slide Navigation Arrows (Appear on hover) */}
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex items-center justify-between z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handlePrev}
                className="w-9 h-9 rounded-full bg-[#101010]/80 hover:bg-[#D4AF37] text-white hover:text-[#101010] border border-white/20 flex items-center justify-center transition-colors pointer-events-auto backdrop-blur-sm"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-9 h-9 rounded-full bg-[#101010]/80 hover:bg-[#D4AF37] text-white hover:text-[#101010] border border-white/20 flex items-center justify-center transition-colors pointer-events-auto backdrop-blur-sm"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Slider Bottom Indicators & Status Bar */}
            <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-[#101010]/85 border border-[#D4AF37]/40 px-3 py-1.5 rounded-full backdrop-blur-md">
              {/* Dot Indicators */}
              <div className="flex items-center gap-1.5">
                {HERO_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`transition-all duration-300 rounded-full ${
                      idx === currentSlide 
                        ? 'w-6 h-1.5 bg-[#D4AF37]' 
                        : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/80'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>

              <span className="text-[10px] font-mono font-bold text-[#F5F0E6] pl-2 border-l border-white/20">
                0{currentSlide + 1} / 0{HERO_SLIDES.length}
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
