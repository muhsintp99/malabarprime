import React, { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';
import { dataService } from '../services/dataService';

export default function BrandBar() {
  const [brands, setBrands] = useState(() => dataService.getBrands());

  useEffect(() => {
    const unsub = dataService.subscribe(() => {
      setBrands(dataService.getBrands());
    });
    return unsub;
  }, []);

  if (!brands || brands.length === 0) {
    return null;
  }

  return (
    <section id="brands" className="bg-[#F5F0E6] text-[#101010] border-b border-[#101010] w-full">
      <div className="w-full px-4 sm:px-8 lg:px-12 py-12">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-[#101010] pb-6">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#343434] block mb-1">
              AUTHORIZED MANUFACTURERS
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#101010]">
              Exclusive &amp; Authorized FMCG Brands
            </h2>
            <p className="text-xs text-[#343434] mt-1 font-medium">
              Direct factory partnerships guaranteeing authentic batch codes, maximum shelf-life, and warranty.
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-xs font-bold text-[#101010] bg-[#D4AF37]/30 border border-[#101010] px-4 py-2 rounded self-start md:self-auto">
            <ShieldCheck className="w-4 h-4 text-[#101010]" />
            <span className="font-mono uppercase text-[11px]">100% Genuine Factory Supply</span>
          </div>
        </div>

        {/* Brand Grid Edge to Edge */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-l border-t border-[#101010]">
          {brands.map((brand, idx) => (
            <div 
              key={brand.id || idx}
              className="p-4 sm:p-5 border-r border-b border-[#101010] bg-white hover:bg-[#F5F0E6] transition-colors flex flex-col justify-between group"
            >
              <div>
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#343434] block">
                  {brand.type || 'Brand'}
                </span>
                <h3 className="font-editorial font-bold text-sm text-[#101010] mt-1 group-hover:text-[#b39023] transition-colors leading-tight">
                  {brand.name}
                </h3>
              </div>
              <div className="mt-4 pt-2 border-t border-[#101010]/15">
                <span className="inline-block text-[9px] font-mono font-bold text-[#101010] bg-[#D4AF37]/40 px-1.5 py-0.5 rounded border border-[#101010]/20">
                  {brand.tier || 'Authorized'}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
