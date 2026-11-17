import React, { useState, useEffect } from 'react';
import { ShieldCheck, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { dataService } from '../services/dataService';

export default function BrandsPage({ onNavigate, onOpenPartnerModal }) {
  const [allBrands, setAllBrands] = useState(() => dataService.getBrands());

  useEffect(() => {
    const unsub = dataService.subscribe(() => {
      setAllBrands(dataService.getBrands());
    });
    return unsub;
  }, []);

  const ownBrands = allBrands.filter(b => b.type === 'Own Brand');
  const partnerBrands = allBrands.filter(b => b.type !== 'Own Brand');

  return (
    <div className="w-full bg-[#F5F0E6] text-[#101010]">
      
      {/* Editorial Page Header */}
      <section className="border-b border-[#101010] py-14 px-4 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-4xl">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D4AF37] block mb-2">
            BRAND ALLIANCES &amp; PROPRIETARY LABELS
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-black text-[#101010] leading-tight mb-3">
            Our Brands &amp; Authorizations
          </h1>
          <p className="text-xs sm:text-sm text-[#343434] leading-relaxed font-medium">
            Explore our dual portfolio: <strong>MALABAR PRIME Own Signature Brands</strong> manufactured under direct origin control, alongside our authorized distribution network of <strong>30+ Tier-1 FMCG Partner Brands</strong>.
          </p>
        </div>
      </section>

      {/* Section 1: MALABAR PRIME Own Brands */}
      <section id="own-brands" className="py-16 px-4 sm:px-8 lg:px-12 border-b border-[#101010]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#101010]">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D4AF37] block mb-1">
              PROPRIETARY LABELS
            </span>
            <h2 className="font-editorial text-3xl font-bold">
              MALABAR PRIME Own Brands
            </h2>
            <p className="text-xs text-[#343434] mt-1 font-medium">
              Formulated, packed, and quality-guaranteed by our central processing hubs.
            </p>
          </div>
          <button
            onClick={() => onNavigate('products')}
            className="px-4 py-2 bg-[#101010] text-[#F5F0E6] text-xs font-bold uppercase tracking-wider rounded flex items-center gap-1.5 self-start md:self-auto hover:bg-[#343434] transition-colors"
          >
            <span>Browse Products</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
          </button>
        </div>

        {ownBrands.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {ownBrands.map((brand, idx) => (
              <div key={idx} className="p-6 bg-white border border-[#101010] rounded-xl flex flex-col sm:flex-row gap-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-full sm:w-44 h-44 rounded-lg overflow-hidden border border-[#101010]/20 flex-shrink-0">
                  <img src={brand.image} alt={brand.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono font-bold uppercase text-[#D4AF37]">{brand.tag}</span>
                      <span className="text-[10px] font-mono text-[#343434] bg-[#F5F0E6] px-2 py-0.5 rounded border border-[#101010]/20">{brand.skus}</span>
                    </div>
                    <h3 className="font-editorial text-xl font-bold mb-1">{brand.name}</h3>
                    <span className="text-xs font-semibold text-[#101010] block mb-2">{brand.category}</span>
                    <p className="text-xs text-[#343434] leading-relaxed font-medium">{brand.description}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#101010]/15 flex items-center gap-2 text-[11px] font-bold text-[#101010]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>100% Guaranteed Source &amp; Shelf-Life</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-10 bg-white border border-dashed border-[#101010]/30 rounded-xl text-center">
            <p className="text-xs text-[#343434] font-mono">No proprietary brands registered yet. Add brands from the Admin Dashboard.</p>
          </div>
        )}
      </section>

      {/* Section 2: Authorized Partner Brands */}
      <section id="partner-brands" className="py-16 px-4 sm:px-8 lg:px-12 bg-white">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#101010]">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D4AF37] block mb-1">
              AUTHORIZED DISTRIBUTOR AGREEMENTS
            </span>
            <h2 className="font-editorial text-3xl font-bold">
              Authorized FMCG Partner Brands
            </h2>
            <p className="text-xs text-[#343434] mt-1 font-medium">
              Direct factory representations guaranteeing authentic batch codes and warranty.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold bg-[#D4AF37]/30 border border-[#101010] px-4 py-2 rounded self-start md:self-auto">
            <ShieldCheck className="w-4 h-4 text-[#101010]" />
            <span className="font-mono uppercase text-[11px]">100% Genuine Factory Batches</span>
          </div>
        </div>

        {partnerBrands.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-l border-t border-[#101010]">
            {partnerBrands.map((brand, idx) => (
              <div 
                key={idx}
                className="p-5 border-r border-b border-[#101010] bg-[#F5F0E6] hover:bg-white transition-colors flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#343434] block">
                    {brand.type}
                  </span>
                  <h3 className="font-editorial font-bold text-sm text-[#101010] mt-1 group-hover:text-[#b39023] transition-colors leading-tight">
                    {brand.name}
                  </h3>
                </div>
                <div className="mt-4 pt-2 border-t border-[#101010]/15">
                  <span className="inline-block text-[9px] font-mono font-bold text-[#101010] bg-[#D4AF37]/40 px-1.5 py-0.5 rounded border border-[#101010]/20">
                    {brand.tier}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-10 bg-[#F5F0E6] border border-dashed border-[#101010]/30 rounded-xl text-center">
            <p className="text-xs text-[#343434] font-mono">No partner brands registered yet. Add partner brands from the Admin Dashboard.</p>
          </div>
        )}
      </section>

      {/* Call to Action for Manufacturers */}
      <section className="py-14 px-4 sm:px-8 lg:px-12 bg-[#101010] text-[#F5F0E6] text-center border-t border-[#101010]">
        <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white mb-2">
          Are You a Food or FMCG Manufacturer?
        </h3>
        <p className="text-xs sm:text-sm text-[#F5F0E6]/70 max-w-xl mx-auto mb-6 font-medium">
          Expand your retail reach across 1,450+ supermarkets in South India through our dedicated warehouse storage bays and cold-chain reefer delivery fleet.
        </p>
        <button
          onClick={onOpenPartnerModal}
          className="px-6 py-3 bg-[#D4AF37] hover:bg-[#b39023] text-[#101010] text-xs font-black uppercase tracking-wider rounded transition-colors"
        >
          Register Your Brand With Us
        </button>
      </section>

    </div>
  );
}

