import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp
} from 'lucide-react';
import { FAQS } from '../data/distributionData';
import { dataService } from '../services/dataService';

export default function AboutAndQuality() {
  const [openFaq, setOpenFaq] = useState(0);
  const [assurance, setAssurance] = useState(() => dataService.getAssurance());

  useEffect(() => {
    const unsub = dataService.subscribe(() => {
      setAssurance(dataService.getAssurance());
    });
    return unsub;
  }, []);

  const certList = assurance?.certifications || [];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section id="assurance" className="bg-[#F5F0E6] text-[#101010] border-b border-[#101010] py-20 w-full relative">
      <span id="quality" className="absolute -top-24"></span>
      <div className="w-full px-4 sm:px-8 lg:px-12">
        
        {/* Compliance & Quality Section */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-20 pb-16 border-b border-[#101010]">
          
          <div className="lg:col-span-5 space-y-5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#343434] block">
              REGULATORY COMPLIANCE
            </span>
            
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#101010] leading-tight">
              Quality Assurance &amp; Statutory Certification
            </h2>

            <p className="text-sm text-[#343434] leading-relaxed font-medium">
              Every SKU entering our distribution network undergoes strict inward inspection for moisture levels, seal integrity, and manufacturer lot expiration dates.
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <div className="bg-white p-4 border border-[#101010] rounded flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#101010] block font-bold uppercase text-[11px] mb-0.5">Strict FIFO / FEFO Inventory Protocol</strong>
                  <span className="text-[#343434] font-medium">First-Expiry-First-Out rotation ensures your retail shelves receive maximum remaining shelf-life.</span>
                </div>
              </div>

              <div className="bg-white p-4 border border-[#101010] rounded flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#101010] block font-bold uppercase text-[11px] mb-0.5">FSSAI &amp; Legal Metrology Certified</strong>
                  <span className="text-[#343434] font-medium">All consumer retail packs carry regulatory barcode declarations, MRP stickers, and manufacturing batch stamps.</span>
                </div>
              </div>
            </div>

          </div>

          {/* Certifications Cards */}
          <div className="lg:col-span-7">
            {certList.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {certList.map((cert, idx) => (
                  <div 
                    key={cert.id || idx}
                    className="bg-white p-6 border-2 border-[#101010] rounded space-y-3 hover:shadow-luxury transition-shadow"
                  >
                    <div className="w-10 h-10 rounded bg-[#D4AF37]/30 border border-[#101010] text-[#101010] flex items-center justify-center font-bold">
                      <Award className="w-5 h-5" />
                    </div>
                    <h4 className="font-editorial font-bold text-[#101010] text-lg">
                      {cert.title || cert.name}
                    </h4>
                    <p className="text-xs font-mono font-bold text-[#101010] bg-[#F5F0E6] px-2 py-0.5 rounded border border-[#101010]/20 inline-block">
                      {cert.standard || cert.id}
                    </p>
                    <p className="text-xs text-[#343434] leading-relaxed font-medium">
                      {cert.desc}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 border-2 border-[#101010] rounded text-center space-y-2">
                <ShieldCheck className="w-10 h-10 text-[#D4AF37] mx-auto" />
                <h4 className="font-editorial font-bold text-lg text-[#101010]">Statutory Compliance Monitored</h4>
                <p className="text-xs font-mono text-[#343434]">
                  FSSAI: <span className={assurance.fssaiNumber ? "font-bold text-[#101010]" : "italic text-neutral-400"}>{assurance.fssaiNumber || 'Not Available'}</span> | GST: <span className={assurance.gstNumber ? "font-bold text-[#101010]" : "italic text-neutral-400"}>{assurance.gstNumber || 'Not Available'}</span>
                </p>
                <p className="text-xs text-[#343434] pt-2">
                  All active statutory certifications can be audited and managed directly from the Admin Assurance Desk.
                </p>
              </div>
            )}
          </div>

        </div>

        {/* Wholesale Partner FAQs */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-wider text-[#343434] font-bold">
              COMMERCIAL INQUIRIES
            </span>
            <h3 className="font-editorial text-3xl font-bold text-[#101010] mt-1">
              Frequently Asked Questions for Retail Partners
            </h3>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-white border border-[#101010] rounded overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-4 sm:p-5 flex justify-between items-center gap-4 hover:bg-[#F5F0E6]/50 transition-colors"
                >
                  <span className="font-editorial font-bold text-base text-[#101010]">
                    {faq.q}
                  </span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#343434] flex-shrink-0" />
                  )}
                </button>

                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-[#343434] leading-relaxed border-t border-[#101010]/15 pt-3 font-medium bg-[#F5F0E6]/30">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
