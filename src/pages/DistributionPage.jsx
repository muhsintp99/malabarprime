import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  Layers, 
  Clock, 
  ThermometerSnowflake, 
  ShieldCheck, 
  Box, 
  Store, 
  ArrowRight,
  CheckCircle2,
  Sparkles,
  BarChart3,
  FileText
} from 'lucide-react';
import Magnetic from '../components/Magnetic';

export default function DistributionPage({ onNavigate, onOpenPartnerModal }) {
  const [activeTab, setActiveTab] = useState('all');

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full bg-[#F5F0E6] text-[#101010]">
      
      {/* 1. Editorial Page Header */}
      <section className="border-b border-[#101010] py-14 sm:py-20 px-4 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-4xl">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D4AF37] block mb-2">
            B2B COLD-CHAIN &amp; REEFER FLEET INFRASTRUCTURE
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-black text-[#101010] leading-tight mb-4">
            Distribution &amp; Supply Chain Logistics
          </h1>
          <p className="text-sm sm:text-base text-[#343434] leading-relaxed font-medium">
            South India's premier authorized master distribution network, directly connecting food manufacturers with 1,450+ verified modern supermarkets, hypermarkets, and institutional kitchens with 24 to 48-hour continuous replenishment.
          </p>
        </div>

        {/* Quick Navigation Anchor Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-8 mt-8 border-t border-[#101010]/15">
          <span className="text-[10px] font-mono uppercase font-bold text-[#343434] mr-2">
            EXPLORE CAPABILITIES:
          </span>
          <button
            onClick={() => scrollToSection('wholesale-supply')}
            className="px-3.5 py-1.5 rounded-full text-xs font-bold font-mono uppercase tracking-wider bg-[#F5F0E6] hover:bg-[#D4AF37] text-[#101010] border border-[#101010] transition-colors flex items-center gap-1.5"
          >
            <Box className="w-3.5 h-3.5 text-[#101010]" />
            <span>1. Wholesale Supply</span>
          </button>
          <button
            onClick={() => scrollToSection('retail-supply')}
            className="px-3.5 py-1.5 rounded-full text-xs font-bold font-mono uppercase tracking-wider bg-[#F5F0E6] hover:bg-[#D4AF37] text-[#101010] border border-[#101010] transition-colors flex items-center gap-1.5"
          >
            <Store className="w-3.5 h-3.5 text-[#101010]" />
            <span>2. Retail Supply</span>
          </button>
          <button
            onClick={() => scrollToSection('distribution-network')}
            className="px-3.5 py-1.5 rounded-full text-xs font-bold font-mono uppercase tracking-wider bg-[#F5F0E6] hover:bg-[#D4AF37] text-[#101010] border border-[#101010] transition-colors flex items-center gap-1.5"
          >
            <MapPin className="w-3.5 h-3.5 text-[#101010]" />
            <span>3. Distribution Network</span>
          </button>
          <button
            onClick={() => scrollToSection('delivery-logistics')}
            className="px-3.5 py-1.5 rounded-full text-xs font-bold font-mono uppercase tracking-wider bg-[#F5F0E6] hover:bg-[#D4AF37] text-[#101010] border border-[#101010] transition-colors flex items-center gap-1.5"
          >
            <Truck className="w-3.5 h-3.5 text-[#101010]" />
            <span>4. Delivery &amp; Logistics</span>
          </button>
        </div>
      </section>

      {/* 2. Key Telemetry Metrics Bar */}
      <section className="bg-[#101010] text-[#F5F0E6] py-10 px-4 sm:px-8 lg:px-12 border-b border-[#101010]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="p-4 border-r border-[#343434] last:border-r-0">
            <span className="block font-mono text-3xl sm:text-4xl font-black text-[#D4AF37]">1,450+</span>
            <span className="text-[11px] font-mono uppercase text-[#F5F0E6]/70 mt-1 block">Supermarkets &amp; Grocers Served</span>
          </div>
          <div className="p-4 border-r border-[#343434] last:border-r-0">
            <span className="block font-mono text-3xl sm:text-4xl font-black text-white">24 - 48 Hrs</span>
            <span className="text-[11px] font-mono uppercase text-[#F5F0E6]/70 mt-1 block">Store Delivery Turnaround SLA</span>
          </div>
          <div className="p-4 border-r border-[#343434] last:border-r-0">
            <span className="block font-mono text-3xl sm:text-4xl font-black text-[#D4AF37]">42</span>
            <span className="text-[11px] font-mono uppercase text-[#F5F0E6]/70 mt-1 block">Dedicated GPS Reefer Vehicles</span>
          </div>
          <div className="p-4">
            <span className="block font-mono text-3xl sm:text-4xl font-black text-white">99.4%</span>
            <span className="text-[11px] font-mono uppercase text-[#F5F0E6]/70 mt-1 block">On-Time Fulfillment Accuracy</span>
          </div>
        </div>
      </section>

      {/* 3. Section 1: Wholesale Supply */}
      <section id="wholesale-supply" className="py-16 sm:py-20 px-4 sm:px-8 lg:px-12 border-b border-[#101010] bg-white">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#101010] text-[#D4AF37] flex items-center justify-center">
                <Box className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D4AF37]">
                PILLAR 01 &bull; WHOLESALE SUPPLY
              </span>
            </div>
            
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-black text-[#101010] leading-tight">
              Master Pallet &amp; Full Carton Dispatch
            </h2>
            
            <p className="text-xs sm:text-sm text-[#343434] leading-relaxed font-medium">
              We provide high-capacity B2B consignment fulfillment designed specifically for regional cash-and-carry wholesalers, bulk institutional buyers, and multi-branch stockists. Every shipment is direct-from-manufacturer with maximum remaining shelf life.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-[#F5F0E6] border border-[#101010] rounded-lg">
                <strong className="block text-xs uppercase font-bold text-[#101010] mb-1">
                  Direct Factory Pricing Slabs
                </strong>
                <p className="text-xs text-[#343434] font-medium leading-relaxed">
                  Eliminate multiple middleman markups. Tiered volume incentive rebates up to 12% on full-pallet and multi-carton purchase orders.
                </p>
              </div>

              <div className="p-4 bg-[#F5F0E6] border border-[#101010] rounded-lg">
                <strong className="block text-xs uppercase font-bold text-[#101010] mb-1">
                  Instant GST Proforma Invoicing
                </strong>
                <p className="text-xs text-[#343434] font-medium leading-relaxed">
                  Fast WhatsApp and digital email quotation desk providing authenticated GST proforma invoices within 15 minutes of RFQ submission.
                </p>
              </div>
            </div>

            <ul className="space-y-2 text-xs font-semibold text-[#101010] pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                <span>Minimum Order Quantity (MOQ): 5 to 20 Master Cartons per category</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                <span>Commercial Credit Terms: 100% advance RTGS/NEFT or pre-approved 15-day credit facility</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                <span>Shrink-wrapped, palletized dispatch with tamper-evident batch stamps</span>
              </li>
            </ul>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              {onNavigate && (
                <button
                  onClick={() => onNavigate('products')}
                  className="px-5 py-2.5 bg-[#101010] hover:bg-[#343434] text-white text-xs font-bold font-mono uppercase tracking-wider rounded border border-[#101010] transition-colors flex items-center gap-2"
                >
                  <span>Explore Wholesale Products</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#F5F0E6] border-2 border-[#101010] p-6 sm:p-8 rounded-2xl shadow-sm space-y-4">
            <span className="text-[10px] font-mono font-bold uppercase text-[#D4AF37] block">
              COMMERCIAL SUPPLY SPECS
            </span>
            <h3 className="font-editorial text-2xl font-bold text-[#101010]">
              Wholesale Order Parameters
            </h3>
            
            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between py-2 border-b border-[#101010]/20">
                <span className="text-[#343434]">Consignment Type:</span>
                <strong className="text-[#101010]">Master Cartons &amp; Pallets</strong>
              </div>
              <div className="flex justify-between py-2 border-b border-[#101010]/20">
                <span className="text-[#343434]">Order Processing SLA:</span>
                <strong className="text-[#101010]">Within 4 Hours of PO</strong>
              </div>
              <div className="flex justify-between py-2 border-b border-[#101010]/20">
                <span className="text-[#343434]">Statutory Billing:</span>
                <strong className="text-[#101010]">GST Invoiced + E-Way Bill</strong>
              </div>
              <div className="flex justify-between py-2 border-b border-[#101010]/20">
                <span className="text-[#343434]">Volume Rebate Slabs:</span>
                <strong className="text-[#101010]">5%, 8%, 12% Tiers</strong>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#343434]">Loading Protocol:</span>
                <strong className="text-[#101010]">Hydraulic Dock Loading</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Section 2: Retail Supply */}
      <section id="retail-supply" className="py-16 sm:py-20 px-4 sm:px-8 lg:px-12 border-b border-[#101010] bg-[#F5F0E6]">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-5 order-2 lg:order-1 bg-white border-2 border-[#101010] p-6 sm:p-8 rounded-2xl shadow-sm space-y-4">
            <span className="text-[10px] font-mono font-bold uppercase text-[#D4AF37] block">
              RETAIL REPLENISHMENT SLA
            </span>
            <h3 className="font-editorial text-2xl font-bold text-[#101010]">
              Store Receiving Standards
            </h3>
            
            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between py-2 border-b border-[#101010]/20">
                <span className="text-[#343434]">Delivery Cadence:</span>
                <strong className="text-[#101010]">Scheduled 24-48 Hours</strong>
              </div>
              <div className="flex justify-between py-2 border-b border-[#101010]/20">
                <span className="text-[#343434]">Inventory Rotation:</span>
                <strong className="text-[#101010]">Strict FIFO &amp; FEFO Certified</strong>
              </div>
              <div className="flex justify-between py-2 border-b border-[#101010]/20">
                <span className="text-[#343434]">Barcode Compliance:</span>
                <strong className="text-[#101010]">EAN-13 / GS1 Retail Standard</strong>
              </div>
              <div className="flex justify-between py-2 border-b border-[#101010]/20">
                <span className="text-[#343434]">Packaging Quality:</span>
                <strong className="text-[#101010]">Retail Shelf-Ready Displays</strong>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#343434]">Weekend Surge Support:</span>
                <strong className="text-[#101010]">Emergency Saturday Top-Ups</strong>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 space-y-5">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#101010] text-[#D4AF37] flex items-center justify-center">
                <Store className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D4AF37]">
                PILLAR 02 &bull; RETAIL SUPPLY
              </span>
            </div>
            
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-black text-[#101010] leading-tight">
              24 to 48-Hour Supermarket Replenishment
            </h2>
            
            <p className="text-xs sm:text-sm text-[#343434] leading-relaxed font-medium">
              Over 1,450+ modern trade supermarkets, standalone grocery chains, and department stores count on our scheduled delivery runs. We ensure store managers never run out of fast-moving chocolates, beverages, cooking oils, and staple items during peak shopping surges.
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <div className="p-4 bg-white border border-[#101010] rounded-lg flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#101010] font-bold uppercase text-[11px] mb-0.5">
                    Maximum Remaining Shelf Life
                  </strong>
                  <span className="text-[#343434] font-medium">
                    Strict First-Expiry-First-Out management guarantees that every delivered unit arrives with over 85% remaining manufacturer validity.
                  </span>
                </div>
              </div>

              <div className="p-4 bg-white border border-[#101010] rounded-lg flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#101010] font-bold uppercase text-[11px] mb-0.5">
                    100% Legal Metrology &amp; MRP Adherence
                  </strong>
                  <span className="text-[#343434] font-medium">
                    Pre-printed price tags, batch numbers, FSSAI numbers, and consumer packaging declarations ready for instant scanning at your checkout POS.
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenPartnerModal}
                className="px-6 py-2.5 bg-[#D4AF37] hover:bg-[#b89528] text-[#101010] text-xs font-bold font-mono uppercase tracking-wider rounded border border-[#101010] transition-colors shadow-sm"
              >
                Apply As a Retail Partner Store
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Section 3: Distribution Network */}
      <section id="distribution-network" className="py-16 sm:py-20 px-4 sm:px-8 lg:px-12 border-b border-[#101010] bg-white">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-8 rounded-lg bg-[#101010] text-[#D4AF37] flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D4AF37]">
              PILLAR 03 &bull; DISTRIBUTION NETWORK
            </span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-black text-[#101010] leading-tight">
            Strategic Logistics Corridors
          </h2>
          <p className="text-xs sm:text-sm text-[#343434] mt-2 font-medium leading-relaxed">
            Directly connected to national highway networks and key industrial logistics corridors across South India, our supply chain ensures uninterrupted multi-district coverage.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#F5F0E6] border border-[#101010] rounded-xl space-y-3">
            <div className="w-10 h-10 rounded bg-[#101010] text-[#D4AF37] flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-editorial font-bold text-xl text-[#101010]">
              NH-66 Coastal Corridor
            </h3>
            <p className="text-xs text-[#343434] leading-relaxed font-medium">
              Connecting Northern Kerala (Kasaragod, Kannur, Kozhikode) with Central Kerala commercial hubs, ensuring high-frequency grocery and beverage transit.
            </p>
            <div className="pt-3 border-t border-[#101010]/15 text-[11px] font-mono font-bold text-[#101010]">
              Cadence: Daily Route Dispatches
            </div>
          </div>

          <div className="p-6 bg-[#F5F0E6] border border-[#101010] rounded-xl space-y-3">
            <div className="w-10 h-10 rounded bg-[#101010] text-[#D4AF37] flex items-center justify-center">
              <ThermometerSnowflake className="w-5 h-5" />
            </div>
            <h3 className="font-editorial font-bold text-xl text-[#101010]">
              Central Modern Trade Corridor
            </h3>
            <p className="text-xs text-[#343434] leading-relaxed font-medium">
              Serving the heavy supermarket clusters of Ernakulam, Thrissur, Kottayam, and Alappuzha with multi-temperature dairy and chocolate reefer runs.
            </p>
            <div className="pt-3 border-t border-[#101010]/15 text-[11px] font-mono font-bold text-[#101010]">
              Cadence: 24-Hour Express Replenishment
            </div>
          </div>

          <div className="p-6 bg-[#F5F0E6] border border-[#101010] rounded-xl space-y-3">
            <div className="w-10 h-10 rounded bg-[#101010] text-[#D4AF37] flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="font-editorial font-bold text-xl text-[#101010]">
              Highland &amp; Interstate Gateway
            </h3>
            <p className="text-xs text-[#343434] leading-relaxed font-medium">
              Direct connection with Wayanad spice plantations, Mysore corridors, and Coimbatore industrial routes for bulk raw commodity consolidation.
            </p>
            <div className="pt-3 border-t border-[#101010]/15 text-[11px] font-mono font-bold text-[#101010]">
              Cadence: 48-Hour Consolidated Transit
            </div>
          </div>
        </div>
      </section>

      {/* 6. Section 4: Delivery & Logistics */}
      <section id="delivery-logistics" className="py-16 sm:py-20 px-4 sm:px-8 lg:px-12 border-b border-[#101010] bg-[#101010] text-[#F5F0E6]">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#D4AF37] text-[#101010] flex items-center justify-center">
                <Truck className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D4AF37]">
                PILLAR 04 &bull; DELIVERY &amp; LOGISTICS
              </span>
            </div>
            
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              Cold-Chain Reefer Fleet &amp; IoT Telemetry
            </h2>
            
            <p className="text-xs sm:text-sm text-[#F5F0E6]/70 leading-relaxed font-medium">
              Our fleet of 42 GPS-monitored refrigerated vehicles is equipped with dual-compartment Carrier and Thermo King units. From chocolate couvertures to chilled nectars and pure oils, temperature integrity is maintained from loading dock to store shelf.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenPartnerModal}
                className="px-6 py-3 bg-[#D4AF37] hover:bg-[#b39023] text-[#101010] text-xs font-black uppercase tracking-wider rounded transition-colors shadow-sm"
              >
                Inquire For Dedicated Route Supply
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 grid sm:grid-cols-2 gap-4">
            <div className="p-5 bg-[#181818] border border-[#343434] rounded-xl space-y-2">
              <ThermometerSnowflake className="w-6 h-6 text-[#D4AF37]" />
              <strong className="block text-white text-sm">Dual-Zone Reefers</strong>
              <p className="text-xs text-[#F5F0E6]/60 leading-relaxed">
                Independent temperature zones: Chilled (+2°C to +8°C) and Ambient (+18°C) compartment isolation.
              </p>
            </div>

            <div className="p-5 bg-[#181818] border border-[#343434] rounded-xl space-y-2">
              <Clock className="w-6 h-6 text-[#D4AF37]" />
              <strong className="block text-white text-sm">Same-Day Dispatch</strong>
              <p className="text-xs text-[#F5F0E6]/60 leading-relaxed">
                Orders logged before 12:00 PM are picked, barcode-checked, and en route by 4:00 PM.
              </p>
            </div>

            <div className="p-5 bg-[#181818] border border-[#343434] rounded-xl space-y-2">
              <Layers className="w-6 h-6 text-[#D4AF37]" />
              <strong className="block text-white text-sm">Hydraulic Tailgates</strong>
              <p className="text-xs text-[#F5F0E6]/60 leading-relaxed">
                Ensures safe, fast, damage-free pallet offloading directly into supermarket receiving bays.
              </p>
            </div>

            <div className="p-5 bg-[#181818] border border-[#343434] rounded-xl space-y-2">
              <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
              <strong className="block text-white text-sm">Zero Spoilage Guarantee</strong>
              <p className="text-xs text-[#F5F0E6]/60 leading-relaxed">
                Any transit damage or broken manufacturer seals are immediately credited and replaced.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 7. Bottom Partnership Call to Action Banner */}
      <section className="py-16 px-4 sm:px-8 lg:px-12 text-center bg-white">
        <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#101010] mb-3">
          Scale Your Retail Operations with Malabar Prime
        </h2>
        <p className="text-xs sm:text-sm text-[#343434] max-w-xl mx-auto mb-8 font-medium">
          Connect directly with our central distribution logistics desk to schedule trial replenishment runs or open a master wholesale trading account.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onOpenPartnerModal}
            className="px-6 py-3 bg-[#D4AF37] hover:bg-[#b39023] text-[#101010] text-xs font-black uppercase tracking-wider rounded transition-colors shadow-sm"
          >
            Apply As a Partner Store
          </button>
          {onNavigate && (
            <button
              onClick={() => onNavigate('products')}
              className="px-6 py-3 bg-[#101010] hover:bg-[#343434] text-white text-xs font-black uppercase tracking-wider rounded transition-colors shadow-sm"
            >
              Explore Wholesale Products
            </button>
          )}
        </div>
      </section>

    </div>
  );
}
