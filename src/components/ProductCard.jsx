import React, { useState } from 'react';
import { 
  Eye, 
  Plus, 
  Minus, 
  ShoppingCart, 
  Check, 
  Layers, 
  Clock, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

export default function ProductCard({ 
  product, 
  onQuickView, 
  onAddToRfq, 
  currentRfqQuantity = 0 
}) {
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToRfq(product, qty);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleQtyChange = (delta, e) => {
    e.stopPropagation();
    setQty(prev => Math.max(1, prev + delta));
  };

  return (
    <div 
      onClick={() => onQuickView(product)}
      className="group bg-white border border-[#101010] flex flex-col justify-between cursor-pointer transition-all hover:shadow-luxury relative overflow-hidden"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] bg-[#F5F0E6] overflow-hidden border-b border-[#101010]">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Top Badges (Sticker Style) */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          {product.badge ? (
            <span className="bg-[#D4AF37] text-[#101010] text-[9px] font-mono font-bold px-2 py-0.5 rounded border border-[#101010] shadow-sm flex items-center gap-1 uppercase tracking-wider">
              <Sparkles className="w-2.5 h-2.5" />
              {product.badge}
            </span>
          ) : <span />}

          <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border border-[#101010] shadow-sm uppercase ${
            product.stockStatus === 'In Stock' 
              ? 'bg-white text-[#101010]' 
              : 'bg-[#D4AF37] text-[#101010]'
          }`}>
            {product.stockStatus}
          </span>
        </div>

        {/* Pack Size Pill at Bottom of Image */}
        <div className="absolute bottom-2 left-2.5 bg-[#101010] text-[#F5F0E6] text-[10px] font-mono px-2 py-0.5 rounded flex items-center gap-1">
          <Layers className="w-3 h-3 text-[#D4AF37]" />
          <span>{product.packSize}</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 bg-[#F5F0E6]/50">
        
        {/* Brand & Title */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#343434] uppercase tracking-wider">
            <span>{product.brand}</span>
            <span>SKU: {product.sku}</span>
          </div>

          <h3 className="font-editorial font-bold text-[#101010] text-base sm:text-lg leading-snug group-hover:text-[#b39023] transition-colors line-clamp-2">
            {product.name}
          </h3>

          <p className="text-xs text-[#343434] line-clamp-2 leading-relaxed font-medium">
            {product.description}
          </p>
        </div>

        {/* Wholesale Specs Grid */}
        <div className="grid grid-cols-2 gap-2 text-[10px] font-mono pt-1">
          <div className="bg-white p-2 rounded border border-[#101010]/20">
            <span className="text-[#343434] block uppercase">MIN. ORDER (MOQ)</span>
            <span className="font-bold text-[#101010] line-clamp-1">{product.moq}</span>
          </div>
          <div className="bg-white p-2 rounded border border-[#101010]/20">
            <span className="text-[#343434] block uppercase">SHELF LIFE</span>
            <span className="font-bold text-[#101010] flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#343434]" />
              {product.shelfLife}
            </span>
          </div>
        </div>

        {/* Wholesale Price Slab Tag */}
        <div className="bg-[#D4AF37]/20 border border-[#101010] rounded px-2.5 py-1.5 flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold text-[#101010] uppercase tracking-wider">
            Wholesale Slab
          </span>
          <span className="text-xs font-mono font-black text-[#101010]">
            {product.wholesaleRange}
          </span>
        </div>

        {/* Action Controls */}
        <div className="pt-1 flex items-center gap-2" onClick={e => e.stopPropagation()}>
          {/* Quantity Selector */}
          <div className="flex items-center border border-[#101010] rounded bg-white p-0.5">
            <button
              type="button"
              onClick={(e) => handleQtyChange(-1, e)}
              className="w-6 h-6 flex items-center justify-center text-[#101010] hover:bg-[#F5F0E6] transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-7 text-center font-mono font-bold text-xs text-[#101010]">
              {qty}
            </span>
            <button
              type="button"
              onClick={(e) => handleQtyChange(1, e)}
              className="w-6 h-6 flex items-center justify-center text-[#101010] hover:bg-[#F5F0E6] transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          {/* Add to RFQ Button */}
          <button
            type="button"
            onClick={handleAdd}
            className={`flex-1 py-2 px-3 rounded text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all border border-[#101010] ${
              justAdded
                ? 'bg-[#D4AF37] text-[#101010]'
                : 'bg-[#101010] hover:bg-[#343434] text-[#F5F0E6]'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>+ {qty} {qty > 1 ? 'Cases' : 'Case'}</span>
              </>
            )}
          </button>
        </div>

        {/* Existing in RFQ notification */}
        {currentRfqQuantity > 0 && (
          <div className="text-[10px] text-center font-mono font-bold text-[#101010] bg-[#D4AF37]/30 py-1 rounded border border-[#101010]/30">
            ✓ In Quote Cart: {currentRfqQuantity} {currentRfqQuantity > 1 ? 'cases' : 'case'}
          </div>
        )}

      </div>
    </div>
  );
}
