import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Truck, 
  MapPin, 
  Clock, 
  ThermometerSnowflake,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { LOGISTICS_WORKFLOW } from '../data/distributionData';
import { dataService } from '../services/dataService';
import ScrollReveal from './ScrollReveal';
import Magnetic from './Magnetic';

export default function DistributionNetwork({ onOpenPartnerModal }) {
  const [warehouses, setWarehouses] = useState(() => dataService.getWarehouses());

  useEffect(() => {
    const unsub = dataService.subscribe(() => {
      setWarehouses(dataService.getWarehouses());
    });
    return unsub;
  }, []);
  return (
    <section id="network" className="bg-[#F5F0E6] text-[#101010] border-b border-[#101010] py-20 w-full">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        
        {/* Section Heading */}
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#101010] gap-4">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#343434] block mb-1">
                LOGISTICS INFRASTRUCTURE
              </span>
              <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#101010]">
                Strategic Warehousing &amp; Fleet Logistics
              </h2>
              <p className="text-xs text-[#343434] mt-2 font-medium max-w-xl">
                Over 45,000 sq.ft of climate-controlled storage and a dedicated GPS-tracked fleet guarantee 24 to 48-hour delivery across Kerala, Karnataka, and Tamil Nadu.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto text-xs font-mono font-bold text-[#101010] bg-white border border-[#101010] px-4 py-2 rounded">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] border border-[#101010]"></span>
              <span>{warehouses.length > 0 ? `${warehouses.length} REGIONAL DISTRIBUTION HUBS` : 'WAREHOUSING: NOT AVAILABLE'}</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Warehouse Hubs Grid with Scroll Animations */}
        {warehouses.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {warehouses.map((hub, idx) => (
              <ScrollReveal key={hub.id || idx} delay={idx * 120} direction={idx % 2 === 0 ? "right" : "left"}>
                <div className="bg-white border-2 border-[#101010] p-6 sm:p-7 space-y-4 hover:shadow-luxury transition-shadow h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs text-[#343434] font-mono font-bold uppercase mb-1">
                          <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span className={hub.city ? "" : "italic text-neutral-400"}>{hub.city || 'Not Available'}</span>
                        </div>
                        <h3 className="font-editorial text-xl font-bold text-[#101010]">
                          {hub.name || 'Not Available'}
                        </h3>
                      </div>
                      <span className="font-mono text-xs font-bold text-[#101010] bg-[#D4AF37]/30 border border-[#101010] px-3 py-1 rounded">
                        {hub.capacity || 'Not Available'}
                      </span>
                    </div>

                    {/* Hub Features */}
                    {Array.isArray(hub.features) && hub.features.length > 0 && (
                      <div className="space-y-2 pt-3 font-medium">
                        {hub.features.map((feature, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2 text-xs text-[#343434]">
                            <CheckCircle className="w-3.5 h-3.5 text-[#101010] flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Coverage & Dispatch Time */}
                  <div className="pt-4 border-t border-[#101010]/20 grid grid-cols-2 gap-3 text-xs font-mono mt-4">
                    <div>
                      <span className="text-[#343434] block text-[9px] uppercase font-bold">ROUTE COVERAGE</span>
                      <span className={hub.coverage ? "font-bold text-[#101010]" : "italic text-neutral-400"}>
                        {hub.coverage || 'Not Available'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#343434] block text-[9px] uppercase font-bold">DISPATCH SLA</span>
                      <span className="font-bold text-[#101010] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#D4AF37]" />
                        <span className={hub.dispatchTime ? "" : "italic text-neutral-400"}>
                          {hub.dispatchTime || 'Not Available'}
                        </span>
                      </span>
                    </div>
                  </div>

                </div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="p-10 bg-white border-2 border-dashed border-[#101010]/40 rounded-xl text-center space-y-2 mb-16">
            <Building2 className="w-10 h-10 text-[#D4AF37] mx-auto" />
            <h4 className="font-editorial font-bold text-xl text-[#101010]">No Regional Warehouses Listed</h4>
            <p className="text-xs text-[#343434]">
              Regional dispatch hubs can be configured and managed directly from the Admin Warehousing Desk.
            </p>
          </div>
        )}

        {/* Fulfillment Workflow Bar */}
        <div id="infrastructure" className="pt-12 border-t border-[#101010]">
          <ScrollReveal direction="up">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-mono uppercase tracking-wider text-[#343434] font-bold">
                END-TO-END FULFILLMENT
              </span>
              <h3 className="font-editorial text-3xl font-bold text-[#101010] mt-1">
                How We Deliver to Your Store
              </h3>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-l border-t border-[#101010]">
            {LOGISTICS_WORKFLOW.map((step, idx) => (
              <ScrollReveal key={idx} delay={idx * 120} direction="up">
                <div className="bg-white border-r border-b border-[#101010] p-6 flex flex-col justify-between space-y-4 h-full">
                  <div>
                    <span className="text-3xl font-black text-[#D4AF37] font-mono">
                      {step.step}
                    </span>
                    <h4 className="font-editorial text-lg font-bold text-[#101010] mt-2">
                      {step.title}
                    </h4>
                    <p className="text-xs text-[#343434] mt-2 leading-relaxed font-medium">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Logistics Capabilities Highlight with Magnetic CTA */}
          <ScrollReveal direction="up" delay={200}>
            <div className="mt-12 bg-[#101010] text-[#F5F0E6] border border-[#101010] p-6 sm:p-8 rounded flex flex-col md:flex-row items-center justify-between gap-6 shadow-luxury">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded bg-[#D4AF37] flex items-center justify-center text-[#101010] font-black flex-shrink-0">
                  <ThermometerSnowflake className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-editorial text-xl font-bold text-white">
                    Multi-Temperature Reefer &amp; Cold-Chain Fleet
                  </h4>
                  <p className="text-xs text-[#F5F0E6]/80 mt-1 font-medium">
                    Continuous temperature telemetry logging ensures perishable dairy, unrefined oils, and frozen foods reach your supermarket in prime condition.
                  </p>
                </div>
              </div>

              <Magnetic strength={0.25}>
                <button
                  onClick={onOpenPartnerModal}
                  className="flex-shrink-0 px-6 py-3.5 bg-[#D4AF37] hover:bg-[#b39023] text-[#101010] text-xs font-black uppercase tracking-wider flex items-center gap-2 border border-[#D4AF37] rounded transition-colors"
                >
                  <span>Apply for Distribution Route</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Magnetic>
            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
}
