import React from 'react';
import Hero from '../components/Hero';
import MarqueeTicker from '../components/MarqueeTicker';
import EditorialShowcase from '../components/EditorialShowcase';
import BrandBar from '../components/BrandBar';
import MostMovingItems from '../components/MostMovingItems';
import DistributionNetwork from '../components/DistributionNetwork';
import AboutAndQuality from '../components/AboutAndQuality';
import Testimonials from '../components/Testimonials';
import { ArrowRight, ShieldCheck, Truck, Store, Award } from 'lucide-react';
import Magnetic from '../components/Magnetic';

export default function HomePage({ 
  onNavigate, 
  onOpenCatalogModal, 
  onOpenPartnerModal,
  onQuickView,
  onAddToRfq,
  rfqItems
}) {
  return (
    <div className="w-full">
      {/* Editorial Hero with Tight Spacing & Auto-Slider */}
      <Hero 
        onOpenCatalogModal={onOpenCatalogModal}
        onOpenPartnerModal={onOpenPartnerModal}
        onNavigate={onNavigate}
      />
      
      {/* Continuous Right-to-Left Running Ribbon */}
      <MarqueeTicker />

      {/* 3-Column Editorial Visual Showcase */}
      <EditorialShowcase 
        onOpenCatalogModal={onOpenCatalogModal}
      />

      {/* Featured Fast-Track Gateway to Pages */}
      <section className="bg-white border-b border-[#101010] py-12 px-4 sm:px-8 lg:px-12">
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Card 1: Wholesale Products */}
          <div 
            onClick={() => onNavigate('products')}
            className="p-6 bg-[#F5F0E6] border border-[#101010] rounded-lg cursor-pointer group hover:bg-[#101010] hover:text-[#F5F0E6] transition-all duration-300 shadow-sm flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D4AF37] block mb-2">
                COMMODITY CATALOG
              </span>
              <h3 className="font-editorial text-2xl font-bold mb-2">
                Explore 350+ Wholesale SKUs
              </h3>
              <p className="text-xs text-[#343434] group-hover:text-[#F5F0E6]/80 leading-relaxed font-medium">
                Browse master packs across Chocolates, Soft Drinks, Juices, Snacks, Natural Water, Energy Drinks, and Spices with transparent wholesale volume pricing slabs.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between font-bold text-xs uppercase tracking-wider text-[#D4AF37]">
              <span>View Product Catalog</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Supply Chain Network */}
          <div 
            onClick={() => onNavigate('distribution')}
            className="p-6 bg-[#F5F0E6] border border-[#101010] rounded-lg cursor-pointer group hover:bg-[#101010] hover:text-[#F5F0E6] transition-all duration-300 shadow-sm flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D4AF37] block mb-2">
                LOGISTICS TELEMETRY
              </span>
              <h3 className="font-editorial text-2xl font-bold mb-2">
                4 Strategic Distribution Hubs
              </h3>
              <p className="text-xs text-[#343434] group-hover:text-[#F5F0E6]/80 leading-relaxed font-medium">
                Temperature-controlled cold-chain reefer transit ensuring 24 to 48-hour continuous replenishment across Kozhikode, Kochi, Kannur & Wayanad depots.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between font-bold text-xs uppercase tracking-wider text-[#D4AF37]">
              <span>Explore Distribution</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Partner Onboarding */}
          <div 
            onClick={() => onNavigate('partner')}
            className="p-6 bg-[#F5F0E6] border border-[#101010] rounded-lg cursor-pointer group hover:bg-[#101010] hover:text-[#F5F0E6] transition-all duration-300 shadow-sm flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D4AF37] block mb-2">
                COMMERCIAL ONBOARDING
              </span>
              <h3 className="font-editorial text-2xl font-bold mb-2">
                Become an Authorized Partner
              </h3>
              <p className="text-xs text-[#343434] group-hover:text-[#F5F0E6]/80 leading-relaxed font-medium">
                Join 1,450+ verified modern trade supermarkets, wholesale stockists, and institutional kitchens receiving direct factory supply agreements.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between font-bold text-xs uppercase tracking-wider text-[#D4AF37]">
              <span>Register Your Store</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </section>

      {/* Authorized Brands */}
      <BrandBar />

      {/* High-Velocity Most Moving Items Slider */}
      <MostMovingItems 
        onQuickView={onQuickView}
        onAddToRfq={onAddToRfq}
        rfqItems={rfqItems}
        onNavigate={onNavigate}
      />

      {/* Verified Retail Partner Testimonials */}
      <Testimonials 
        onOpenPartnerModal={onOpenPartnerModal} 
      />

      {/* Regional Network Strip */}
      <DistributionNetwork 
        onOpenPartnerModal={onOpenPartnerModal}
      />

      {/* Quality Assurance */}
      <AboutAndQuality />
    </div>
  );
}

