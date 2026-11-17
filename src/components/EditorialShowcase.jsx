import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import Magnetic from './Magnetic';

export default function EditorialShowcase({ onOpenCatalogModal }) {
  const highlights = [
    {
      title: "Wayanad Highland Spices",
      sub: "Garbled Extra Bold Tellicherry Pepper & Green Cardamom",
      category: "ORIGIN SOURCING",
      image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
      tag: "5.5% Piperine"
    },
    {
      title: "Cold-Pressed Pure Oils",
      sub: "Centrifuge Extracted Virgin Coconut Oil & Vedic Ghee",
      category: "PURITY GUARANTEE",
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
      tag: "100% Unrefined"
    },
    {
      title: "Aged Royal Biryani Rice",
      sub: "18-Month Naturally Cured Jeerakasala Kaima Grain",
      category: "SIGNATURE STAPLE",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      tag: "Non-Sticky Dum"
    }
  ];

  return (
    <section className="bg-[#F5F0E6] text-[#101010] w-full border-b border-[#101010]">
      {/* Edge-to-edge full width without side padding */}
      <div className="w-full">
        
        {/* Editorial 3-Column Visual Grid with Scroll Animations */}
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#101010]">
          {highlights.map((item, idx) => (
            <ScrollReveal key={idx} delay={idx * 150} direction="up" className="h-full">
              <div className="group relative overflow-hidden flex flex-col justify-between bg-white h-full">
                
                {/* Photo */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#F5F0E6]">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Floating Tag */}
                  <div className="absolute top-3 left-3 bg-[#D4AF37] text-[#101010] text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded border border-[#101010]">
                    {item.tag}
                  </div>

                  <div className="absolute bottom-3 right-3">
                    <Magnetic strength={0.3}>
                      <div className="w-9 h-9 rounded-full bg-[#101010] text-[#F5F0E6] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </Magnetic>
                  </div>
                </div>

                {/* Text Info */}
                <div className="p-6 sm:p-8 bg-[#F5F0E6] border-t border-[#101010] flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#343434] block mb-1">
                      {item.category}
                    </span>
                    <h3 className="font-editorial text-2xl font-bold text-[#101010] leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#343434] mt-2 font-medium">
                      {item.sub}
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-3 border-t border-[#101010]/20 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#101010]">
                    <span>Wholesale Specification</span>
                    <span className="text-[#D4AF37] font-black text-sm">→</span>
                  </div>
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
