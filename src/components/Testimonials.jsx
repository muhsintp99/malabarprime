import React, { useState, useEffect } from 'react';
import { Star, ShieldCheck, Quote, CheckCircle2, Building2, Store, Award } from 'lucide-react';
import Magnetic from './Magnetic';
import ScrollReveal from './ScrollReveal';
import { dataService } from '../services/dataService';

export default function Testimonials({ onOpenPartnerModal }) {
  const [testimonials, setTestimonials] = useState(() => {
    return dataService.getTestimonials().filter(t => t.status !== 'Hidden');
  });

  useEffect(() => {
    const unsub = dataService.subscribe(() => {
      setTestimonials(dataService.getTestimonials().filter(t => t.status !== 'Hidden'));
    });
    return unsub;
  }, []);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="bg-[#F5F0E6] text-[#101010] py-16 sm:py-20 border-b border-[#101010] w-full">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#101010]">
          <div className="max-w-2xl">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D4AF37] block mb-2">
              VERIFIED RETAIL PARTNER REVIEWS
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-black text-[#101010] leading-tight">
              Trusted by 1,450+ Supermarkets &amp; Modern Trade Stores
            </h2>
            <p className="text-xs sm:text-sm text-[#343434] mt-2 font-medium leading-relaxed">
              Discover how leading hypermarket directors, modern grocery chains, and commercial kitchens scale their profitability with Malabar Prime's direct factory agreements and zero-delay logistics.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white border border-[#101010] px-4 py-2.5 rounded-lg shadow-sm flex items-center gap-3">
              <div className="flex text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                ))}
              </div>
              <div className="border-l border-[#101010]/20 pl-3">
                <span className="block font-mono font-black text-sm text-[#101010] leading-none">4.9 / 5.0</span>
                <span className="text-[9px] font-mono uppercase text-[#343434]">Trade Satisfaction</span>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials 4-Card Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {testimonials.map((item, idx) => (
            <ScrollReveal key={idx} delay={idx * 100} direction="up">
              <div className="bg-white border border-[#101010] rounded-xl p-6 h-full flex flex-col justify-between shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                
                {/* Background decorative quote mark */}
                <div className="absolute -top-3 -right-2 text-[#D4AF37]/10 pointer-events-none select-none">
                  <Quote className="w-20 h-20 rotate-180" />
                </div>

                <div>
                  {/* Rating Stars & Verified Badge */}
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <div className="flex text-[#D4AF37]">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37]" />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase bg-[#D4AF37]/20 text-[#101010] px-2 py-0.5 rounded border border-[#D4AF37]/40">
                      <ShieldCheck className="w-3 h-3 text-[#101010]" />
                      {item.badge}
                    </span>
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-xs text-[#343434] leading-relaxed font-medium mb-6 relative z-10 italic">
                    "{item.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-[#101010]/15 relative z-10">
                  <div className="flex items-center gap-3">
                    <img 
                      src={item.avatar} 
                      alt={item.name} 
                      className="w-11 h-11 rounded-full object-cover border border-[#101010]/30 flex-shrink-0"
                    />
                    <div>
                      <h4 className="font-editorial font-bold text-sm text-[#101010] leading-tight">
                        {item.name}
                      </h4>
                      <span className="block text-[11px] font-medium text-[#343434]">
                        {item.title}
                      </span>
                      <span className="block text-[10px] font-mono font-bold text-[#D4AF37] leading-tight mt-0.5">
                        {item.company}
                      </span>
                    </div>
                  </div>
                  <span className="block text-[9px] font-mono text-[#343434]/70 mt-2">
                    📍 {item.outlets}
                  </span>
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom Trust Banner & Partnership CTA */}
        <div className="p-6 sm:p-8 bg-[#101010] text-[#F5F0E6] rounded-xl border border-[#101010] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-[#D4AF37] text-xs font-mono font-bold uppercase">
              <CheckCircle2 className="w-4 h-4" />
              <span>Direct Factory Supply Agreements</span>
            </div>
            <h3 className="font-editorial text-xl sm:text-2xl font-bold text-white">
              Experience Guaranteed High Margins &amp; Zero Stockout Downtime
            </h3>
            <p className="text-xs text-[#F5F0E6]/70 font-medium">
              Join our network of 1,450+ verified modern supermarkets. Onboarding takes less than 24 hours.
            </p>
          </div>

          <Magnetic strength={0.3}>
            <button
              onClick={onOpenPartnerModal}
              className="px-6 py-3 bg-[#D4AF37] hover:bg-[#b39023] text-[#101010] text-xs font-black uppercase tracking-wider rounded border border-[#D4AF37] transition-colors whitespace-nowrap shadow-sm cursor-pointer"
            >
              Apply As a Partner Store
            </button>
          </Magnetic>
        </div>

      </div>
    </section>
  );
}

