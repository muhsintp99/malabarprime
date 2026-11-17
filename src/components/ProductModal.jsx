import React, { useState } from 'react';
import { 
  X, 
  ShoppingCart, 
  Check, 
  Plus, 
  Minus, 
  ShieldCheck, 
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { COMPANY_INFO } from '../data/distributionData';

export default function ProductModal({ product, onClose, onAddToRfq }) {
  if (!product) return null;

  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    onAddToRfq(product, qty);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#101010]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="bg-[#F5F0E6] border-2 border-[#101010] max-w-4xl w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[92vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#101010] text-[#F5F0E6] hover:bg-[#D4AF37] hover:text-[#101010] flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            
            {/* Left: Product Image & Spec Sheet */}
            <div className="space-y-4">
              <div className="aspect-[4/3] rounded bg-white overflow-hidden relative border-2 border-[#101010]">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-[#D4AF37] text-[#101010] text-xs font-mono font-bold px-3 py-1 rounded border border-[#101010] shadow-sm flex items-center gap-1.5 uppercase">
                    <Sparkles className="w-3.5 h-3.5" />
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Master Data Box */}
              <div className="p-4 rounded bg-white border border-[#101010] space-y-2 text-xs">
                <h4 className="font-mono text-[10px] font-bold text-[#101010] uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Statutory Product Data
                </h4>
                <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                  <div>
                    <span className="text-[#343434] block text-[9px] uppercase">SKU IDENTIFIER</span>
                    <span className="text-[#101010] font-bold">{product.sku}</span>
                  </div>
                  <div>
                    <span className="text-[#343434] block text-[9px] uppercase">FSSAI LICENSE</span>
                    <span className="text-[#101010] font-bold">{product.fssai}</span>
                  </div>
                  <div>
                    <span className="text-[#343434] block text-[9px] uppercase">ORIGIN DEPOT</span>
                    <span className="text-[#343434] font-medium">{product.origin}</span>
                  </div>
                  <div>
                    <span className="text-[#343434] block text-[9px] uppercase">NET WT. / CASE</span>
                    <span className="text-[#343434] font-medium">{product.netWeight}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right: Technical Specs & Wholesale Pricing */}
            <div className="space-y-5">
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#D4AF37] text-[#101010] font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-[#101010] uppercase">
                    {product.brand}
                  </span>
                  <span className="text-[#343434] text-xs">•</span>
                  <span className="text-[#101010] font-mono text-xs font-bold uppercase">
                    {product.stockStatus}
                  </span>
                </div>

                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#101010] leading-snug">
                  {product.name}
                </h2>
                
                <p className="text-xs sm:text-sm text-[#343434] mt-2 leading-relaxed font-medium">
                  {product.description}
                </p>
              </div>

              {/* Master Pack & Wholesale Slab Banner */}
              <div className="p-4 rounded bg-white border border-[#101010] space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#343434] font-bold uppercase">Master Case Packaging</span>
                  <span className="font-mono font-bold text-[#101010] bg-[#F5F0E6] px-2 py-0.5 rounded border border-[#101010]/20">
                    {product.packSize}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-[#101010]/15">
                  <span className="text-xs text-[#343434] font-bold uppercase">Baseline Wholesale Slab</span>
                  <span className="font-mono text-sm font-black text-[#101010] bg-[#D4AF37]/30 px-2 py-0.5 rounded">
                    {product.wholesaleRange}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs pt-1">
                  <span className="text-[#343434]">Minimum Order (MOQ):</span>
                  <span className="font-mono text-[#101010] font-bold">{product.moq}</span>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="space-y-2">
                <h4 className="font-mono text-[10px] uppercase font-bold text-[#101010] tracking-wider">
                  Technical &amp; Storage Analysis
                </h4>
                <div className="p-3 rounded bg-white border border-[#101010] divide-y divide-[#101010]/10 text-xs font-mono">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key} className="py-1.5 flex justify-between items-center first:pt-0 last:pb-0">
                      <span className="text-[#343434] capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="font-bold text-[#101010] text-right">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Volume Discount Tiers */}
              <div className="space-y-2">
                <h4 className="font-mono text-[10px] uppercase font-bold text-[#101010] tracking-wider">
                  Wholesale Volume Rebate Tiers
                </h4>
                <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                  {product.tierDiscounts.map((tier, idx) => (
                    <div key={idx} className="p-2 rounded bg-white border border-[#101010]">
                      <span className="block text-[11px] font-bold text-[#101010]">{tier.range}</span>
                      <span className="text-[10px] text-[#343434] font-medium block mt-0.5">{tier.discount}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Controls */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-[#101010] rounded bg-white p-1">
                    <button
                      type="button"
                      onClick={() => setQty(prev => Math.max(1, prev - 1))}
                      className="w-8 h-8 flex items-center justify-center text-[#101010] hover:bg-[#F5F0E6]"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-mono font-bold text-sm text-[#101010]">
                      {qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQty(prev => prev + 1)}
                      className="w-8 h-8 flex items-center justify-center text-[#101010] hover:bg-[#F5F0E6]"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={handleAdd}
                    className={`flex-1 py-3 px-4 rounded text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all border border-[#101010] shadow-sm ${
                      justAdded
                        ? 'bg-[#D4AF37] text-[#101010]'
                        : 'bg-[#101010] hover:bg-[#343434] text-[#F5F0E6]'
                    }`}
                  >
                    {justAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to RFQ Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        <span>Add {qty} {qty > 1 ? 'Master Cartons' : 'Master Carton'} to RFQ</span>
                      </>
                    )}
                  </button>
                </div>

                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hi%20Malabar%20Prime%2C%20I%20need%20sample%20spec%20for%3A%20${encodeURIComponent(product.name)}%20(SKU%3A%20${product.sku})`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded bg-[#D4AF37]/30 hover:bg-[#D4AF37] border border-[#101010] text-[#101010] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-[#101010]" />
                  <span>Request Physical Sample via WhatsApp</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
