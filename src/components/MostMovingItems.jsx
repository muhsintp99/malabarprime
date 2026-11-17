import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  TrendingUp, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Sparkles, 
  Flame, 
  Package,
  PackageSearch,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { dataService } from '../services/dataService';
import ProductCard from './ProductCard';
import ScrollReveal from './ScrollReveal';
import Magnetic from './Magnetic';

export default function MostMovingItems({ 
  onQuickView, 
  onAddToRfq, 
  rfqItems = [],
  onNavigate
}) {
  const [products, setProducts] = useState(() => dataService.getProducts());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(4);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Subscribe to real-time updates from dataService
  useEffect(() => {
    const unsub = dataService.subscribe(() => {
      setProducts(dataService.getProducts());
    });
    return unsub;
  }, []);

  // Responsive Items Per View
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerView(1); // Mobile
      } else if (width < 1024) {
        setItemsPerView(2); // Tablet
      } else if (width < 1280) {
        setItemsPerView(3); // Small Desktop
      } else {
        setItemsPerView(4); // Large Desktop
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  // Filter or prioritize fast moving items if flagged, or use all active products
  const displayProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    
    // Prioritize products explicitly marked as fast moving or top seller
    const fastMoving = products.filter(p => p.isFastMoving !== false);
    return fastMoving.length > 0 ? fastMoving : products;
  }, [products]);

  const maxIndex = Math.max(0, displayProducts.length - itemsPerView);

  // Adjust currentIndex if displayProducts length or itemsPerView changes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(Math.max(0, maxIndex));
    }
  }, [maxIndex, currentIndex]);

  // Automatic slide rotation every 3.8 seconds (pauses on hover)
  useEffect(() => {
    if (isHovered || displayProducts.length <= itemsPerView) return;

    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    }, 3800);

    return () => clearInterval(timer);
  }, [isHovered, maxIndex, displayProducts.length, itemsPerView]);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  // Touch Swipe Handlers for Mobile & Tablet
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      handleNext(); // Swiped left -> next
    } else if (diff < -50) {
      handlePrev(); // Swiped right -> prev
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <section 
      id="most-moving" 
      className="bg-[#F5F0E6] text-[#101010] border-b border-[#101010] py-16 sm:py-20 w-full overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span id="most-moving-items" className="absolute -top-24"></span>
      <div className="w-full px-4 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-[#101010] gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-[#101010] bg-[#D4AF37] px-2.5 py-0.5 rounded border border-[#101010]">
                  <TrendingUp className="w-3.5 h-3.5 text-[#101010]" />
                  HIGH VELOCITY WHOLESALE SKUS
                </span>
                <span className="text-[10px] font-mono text-[#343434] uppercase font-bold hidden sm:inline">
                  • 24-48H STORE REPLENISHMENT
                </span>
              </div>
              
              <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#101010] leading-tight">
                Most Moving Items
              </h2>
              
              <p className="text-xs sm:text-sm text-[#343434] mt-1.5 font-medium max-w-2xl leading-relaxed">
                Direct factory-sourced top performers exhibiting rapid shelf turnaround across 1,450+ modern trade supermarkets and cash-and-carry partner depots.
              </p>
            </div>

            {/* Slider Navigation & Catalog Button */}
            <div className="flex items-center gap-3 self-start md:self-auto">
              {displayProducts.length > itemsPerView && (
                <div className="flex items-center gap-1.5 bg-white border border-[#101010] p-1 rounded shadow-sm">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous slide"
                    className="p-2 hover:bg-[#F5F0E6] text-[#101010] rounded transition-colors active:scale-95"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-[10px] font-mono font-bold px-2 text-[#343434] select-none">
                    {currentIndex + 1} / {maxIndex + 1}
                  </span>
                  <button
                    onClick={handleNext}
                    aria-label="Next slide"
                    className="p-2 hover:bg-[#F5F0E6] text-[#101010] rounded transition-colors active:scale-95"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {onNavigate && (
                <button
                  onClick={() => onNavigate('products')}
                  className="px-4 py-2.5 bg-[#101010] hover:bg-[#343434] text-[#F5F0E6] text-xs font-bold uppercase tracking-wider rounded border border-[#101010] transition-colors flex items-center gap-1.5 shadow-sm whitespace-nowrap"
                >
                  <span>Full Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </button>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* ---------------- SLIDER CONTENT / EMPTY STATE ---------------- */}
        {displayProducts.length > 0 ? (
          <div className="relative">
            
            {/* Slider Carousel Window */}
            <div 
              className="overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`
                }}
              >
                {displayProducts.map((product, idx) => {
                  const rfqItem = rfqItems.find(item => item.product.id === product.id);
                  return (
                    <div 
                      key={product.id || idx}
                      className="px-2.5 flex-shrink-0"
                      style={{ width: `${100 / itemsPerView}%` }}
                    >
                      <div className="h-full relative">
                        <ProductCard
                          product={product}
                          onQuickView={onQuickView}
                          onAddToRfq={onAddToRfq}
                          currentRfqQuantity={rfqItem ? rfqItem.quantity : 0}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Slider Progress Indicator Dots */}
            {maxIndex > 0 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentIndex === idx 
                        ? 'w-8 bg-[#D4AF37] border border-[#101010]' 
                        : 'w-2 bg-[#101010]/20 hover:bg-[#101010]/50'
                    }`}
                  />
                ))}
              </div>
            )}

          </div>
        ) : (
          /* "Not Found" Section when no products are available */
          <div className="bg-white border-2 border-[#101010] p-10 sm:p-14 text-center max-w-lg mx-auto rounded-xl shadow-sm space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#F5F0E6] border border-[#101010]/20 flex items-center justify-center mx-auto text-[#101010]">
              <PackageSearch className="w-8 h-8 text-[#D4AF37]" />
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D4AF37] block">
                STATUS: NOT FOUND
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#101010]">
                No Most Moving Items Found
              </h3>
              <p className="text-xs sm:text-sm text-[#343434] max-w-md mx-auto leading-relaxed font-medium">
                There are currently no fast-moving wholesale items listed in this section. Please check back shortly or browse our complete wholesale inventory.
              </p>
            </div>

            {onNavigate && (
              <div className="pt-2 flex justify-center">
                <button
                  onClick={() => onNavigate('products')}
                  className="px-6 py-2.5 bg-[#101010] hover:bg-[#343434] text-white text-xs font-bold font-mono uppercase tracking-wider rounded border border-[#101010] transition-colors shadow-sm flex items-center gap-2"
                >
                  <span>Explore Full Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
