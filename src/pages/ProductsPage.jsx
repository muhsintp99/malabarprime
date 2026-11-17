import React from 'react';
import ProductCatalog from '../components/ProductCatalog';
import { PackageCheck, ShieldCheck, Download, Truck } from 'lucide-react';

export default function ProductsPage({ 
  onQuickView, 
  onAddToRfq, 
  rfqItems, 
  activeCategory, 
  onSelectCategory,
  onOpenCatalogModal 
}) {
  return (
    <div className="w-full bg-[#F5F0E6] text-[#101010]">
      
      {/* Editorial Page Header */}
      <section className="border-b border-[#101010] py-12 px-4 sm:px-8 lg:px-12 bg-white">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D4AF37] block mb-2">
              AUTHORIZED COMMODITY DIRECTORY
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl font-black text-[#101010] leading-tight mb-2">
              Our Products &amp; Master Packs
            </h1>
            <p className="text-xs sm:text-sm text-[#343434] leading-relaxed font-medium">
              Direct factory procurement across Chocolates, Soft Drinks, Juices, Snacks, Bottled Water, Energy Drinks, and Signature Spices. All products ship in master cartons with pallet configurations and tier volume discounts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCatalogModal}
              className="px-5 py-3 bg-[#101010] hover:bg-[#343434] text-[#F5F0E6] text-xs font-black uppercase tracking-wider rounded border border-[#101010] flex items-center gap-2 transition-colors shadow-sm"
            >
              <Download className="w-4 h-4 text-[#D4AF37]" />
              <span>Download Price List (PDF)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Interactive Product Showcase */}
      <ProductCatalog 
        onQuickView={onQuickView}
        onAddToRfq={onAddToRfq}
        rfqItems={rfqItems}
        activeCategory={activeCategory}
        onSelectCategory={onSelectCategory}
      />

      {/* Wholesale Buyer Guarantees */}
      <section className="bg-white border-t border-[#101010] py-10 px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 border border-[#101010]/20 rounded-lg bg-[#F5F0E6]">
            <span className="block font-mono font-bold text-xs uppercase text-[#101010] mb-1">
              Minimum Order
            </span>
            <span className="text-[11px] text-[#343434] font-medium">
              3 to 10 Master Cartons per SKU
            </span>
          </div>
          <div className="p-4 border border-[#101010]/20 rounded-lg bg-[#F5F0E6]">
            <span className="block font-mono font-bold text-xs uppercase text-[#101010] mb-1">
              Dispatch Window
            </span>
            <span className="text-[11px] text-[#343434] font-medium">
              Same-day pick &amp; pack from nearest hub
            </span>
          </div>
          <div className="p-4 border border-[#101010]/20 rounded-lg bg-[#F5F0E6]">
            <span className="block font-mono font-bold text-xs uppercase text-[#101010] mb-1">
              Quality Protocol
            </span>
            <span className="text-[11px] text-[#343434] font-medium">
              FIFO / FEFO with 100% genuine batch codes
            </span>
          </div>
          <div className="p-4 border border-[#101010]/20 rounded-lg bg-[#F5F0E6]">
            <span className="block font-mono font-bold text-xs uppercase text-[#101010] mb-1">
              Payment Terms
            </span>
            <span className="text-[11px] text-[#343434] font-medium">
              Commercial credit line for verified stores
            </span>
          </div>
        </div>
      </section>

    </div>
  );
}

