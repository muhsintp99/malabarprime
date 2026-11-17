import React, { useState, useEffect } from 'react';
import { ShieldCheck, Award, CheckCircle2, Target, Eye, Sparkles, Building2, Users2, Clock, Globe } from 'lucide-react';
import { COMPANY_INFO, FAQS } from '../data/distributionData';
import { dataService } from '../services/dataService';
import Magnetic from '../components/Magnetic';

export default function AboutPage({ onNavigate, onOpenPartnerModal }) {
  const [assurance, setAssurance] = useState(() => dataService.getAssurance());

  useEffect(() => {
    const unsub = dataService.subscribe(() => {
      setAssurance(dataService.getAssurance());
    });
    return unsub;
  }, []);
  return (
    <div className="w-full bg-[#F5F0E6] text-[#101010]">
      
      {/* Editorial Page Header */}
      <section className="border-b border-[#101010] py-14 sm:py-20 px-4 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-4xl">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D4AF37] block mb-2">
            CORPORATE PROFILE &amp; HERITAGE
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-black text-[#101010] leading-tight mb-4">
            About Malabar Prime Distributions
          </h1>
          <p className="text-sm sm:text-base text-[#343434] leading-relaxed font-medium">
            Established in {COMPANY_INFO.established}, Malabar Prime Distributions stands as South India's authorized master wholesale network connecting top FMCG and consumer food manufacturers directly with 1,450+ verified modern supermarkets, hypermarkets, and commercial kitchens.
          </p>
        </div>
      </section>

      {/* 3 Main Pillars explicitly requested: 1. Our Company, 2. Vision & Mission, 3. Why Choose Us? */}
      <section className="py-16 px-4 sm:px-8 lg:px-12 border-b border-[#101010]">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Pillar 1: Our Company */}
          <div id="company" className="p-8 bg-white border border-[#101010] rounded-xl shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#101010] text-[#D4AF37] flex items-center justify-center mb-6">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D4AF37] block mb-2">
                LEGACY &amp; SCALE
              </span>
              <h2 className="font-editorial text-2xl font-bold mb-3">
                Our Company
              </h2>
              <p className="text-xs sm:text-sm text-[#343434] leading-relaxed font-medium mb-4">
                Headquartered in Kozhikode with 4 active temperature-controlled multi-compartment regional depot warehouses across South India. Operating under strict statutory compliance with valid <strong>FSSAI License {assurance.fssaiNumber || COMPANY_INFO.fssaiNumber}</strong> and <strong>GSTIN {assurance.gstNumber || COMPANY_INFO.gstNumber}</strong>.
              </p>
              <ul className="space-y-2 text-xs font-semibold text-[#101010]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>16+ Years Sourcing Mastery</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>1,450+ Active Supermarket Partners</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>99.4% On-Time Fulfillment Rate</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Pillar 2: Our Vision & Mission */}
          <div id="vision" className="p-8 bg-white border border-[#101010] rounded-xl shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#101010] text-[#D4AF37] flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D4AF37] block mb-2">
                PURPOSE &amp; GOALS
              </span>
              <h2 className="font-editorial text-2xl font-bold mb-3">
                Our Vision &amp; Mission
              </h2>
              <div className="space-y-4 text-xs sm:text-sm text-[#343434] leading-relaxed font-medium">
                <div>
                  <strong className="text-[#101010] block text-xs uppercase font-bold tracking-wider mb-1">
                    🎯 Our Mission
                  </strong>
                  <p>
                    To eliminate multi-middleman margin drain by directly bridging primary food manufacturers with regional supermarkets through transparent wholesale pricing and zero-delay cold chain transit.
                  </p>
                </div>
                <div>
                  <strong className="text-[#101010] block text-xs uppercase font-bold tracking-wider mb-1">
                    🔭 Our Vision
                  </strong>
                  <p>
                    To be South India's most trusted, digitally tracked B2B food distribution infrastructure by 2030, upholding the gold standard of freshness, statutory transparency, and retailer profitability.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pillar 3: Why Choose Us? */}
          <div id="why-choose-us" className="p-8 bg-white border border-[#101010] rounded-xl shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#101010] text-[#D4AF37] flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D4AF37] block mb-2">
                RETAILER ADVANTAGES
              </span>
              <h2 className="font-editorial text-2xl font-bold mb-3">
                Why Choose Us?
              </h2>
              <div className="space-y-3 text-xs text-[#343434] leading-relaxed font-medium">
                <div className="p-3 bg-[#F5F0E6] rounded border border-[#101010]/20">
                  <strong className="text-[#101010] block font-bold mb-0.5">1. Direct Factory Pricing</strong>
                  <span>Zero intermediary markups. Transparent wholesale price tiers with volume rebates up to 12%.</span>
                </div>
                <div className="p-3 bg-[#F5F0E6] rounded border border-[#101010]/20">
                  <strong className="text-[#101010] block font-bold mb-0.5">2. Guaranteed Fresh Batch Codes</strong>
                  <span>Strict FIFO / FEFO inventory protocol ensures maximum remaining shelf life for your store shelves.</span>
                </div>
                <div className="p-3 bg-[#F5F0E6] rounded border border-[#101010]/20">
                  <strong className="text-[#101010] block font-bold mb-0.5">3. 24-48h Store Replenishment</strong>
                  <span>Central telemetry dispatched reefer fleet ensures zero out-of-stock downtime during peak sales seasons.</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Statutory Certifications & Food Safety */}
      <section className="py-16 px-4 sm:px-8 lg:px-12 border-b border-[#101010] bg-white">
        <div className="max-w-3xl mb-12">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D4AF37] block mb-1">
            COMPLIANCE ASSURANCE
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold">
            Certified Statutory Protocols
          </h2>
          <p className="text-xs sm:text-sm text-[#343434] mt-2 font-medium">
            Every master carton entering our warehouse bays is tested for moisture levels, seal integrity, and manufacturing batch declarations.
          </p>
        </div>

        {(assurance.certifications || []).length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(assurance.certifications || []).map((cert, idx) => (
              <div key={idx} className="p-6 bg-[#F5F0E6] border border-[#101010] rounded-xl flex flex-col justify-between">
                <div>
                  <Award className="w-8 h-8 text-[#D4AF37] mb-4" />
                  <h3 className="font-editorial font-bold text-lg mb-1">{cert.title || cert.name}</h3>
                  <span className="text-[10px] font-mono font-bold text-[#D4AF37] block mb-2">{cert.badge || cert.standard}</span>
                  <p className="text-xs text-[#343434] font-medium leading-relaxed">{cert.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#101010]/20 text-[10px] font-mono text-[#343434]">
                  Verified Regulatory Standard
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 bg-[#F5F0E6] border border-dashed border-[#101010]/30 rounded-xl text-center space-y-2">
            <ShieldCheck className="w-10 h-10 text-[#D4AF37] mx-auto" />
            <h3 className="font-editorial font-bold text-lg text-[#101010]">Statutory Compliance Monitored</h3>
            <p className="text-xs font-mono text-[#343434]">
              FSSAI Central License: {assurance.fssaiNumber || '11322001000845'} | GSTIN: {assurance.gstNumber || '32AAECM4912L1ZT'}
            </p>
            <p className="text-xs text-[#343434]">
              Certificates added through the Admin Assurance Desk will appear here.
            </p>
          </div>
        )}
      </section>

      {/* Call to action */}
      <section className="py-16 px-4 sm:px-8 lg:px-12 text-center bg-[#101010] text-[#F5F0E6]">
        <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-white mb-3">
          Ready to Upgrade Your Retail Supply Chain?
        </h2>
        <p className="text-xs sm:text-sm text-[#F5F0E6]/70 max-w-xl mx-auto mb-8 font-medium">
          Connect directly with our regional trade desk to receive wholesale price lists and schedule your trial pallet dispatch.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('products')}
            className="px-6 py-3 bg-[#D4AF37] hover:bg-[#b39023] text-[#101010] text-xs font-black uppercase tracking-wider rounded transition-colors"
          >
            Explore Product Catalog
          </button>
          <button
            onClick={onOpenPartnerModal}
            className="px-6 py-3 bg-white hover:bg-[#F5F0E6] text-[#101010] text-xs font-black uppercase tracking-wider rounded transition-colors"
          >
            Register As a Partner
          </button>
        </div>
      </section>

    </div>
  );
}

