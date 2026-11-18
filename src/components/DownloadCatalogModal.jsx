import React from 'react';
import { 
  X, 
  Printer, 
  FileDown
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { COMPANY_INFO } from '../data/distributionData';
import { dataService } from '../services/dataService';

export default function DownloadCatalogModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const contactInfo = dataService.getCompanyContact();
  const assurance = dataService.getAssurance();
  const addressText = contactInfo?.adress || contactInfo?.location || 'Not Available';
  const phoneText = contactInfo?.call || contactInfo?.contact || 'Not Available';
  const emailText = contactInfo?.email || 'Not Available';
  const waText = contactInfo?.whatsapp || 'Not Available';
  const fssaiText = assurance?.fssaiNumber || 'Not Available';
  const gstinText = assurance?.gstNumber || 'Not Available';
  const isoText = assurance?.isoCert || 'Not Available';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#101010]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white border-2 border-[#101010] max-w-4xl w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[92vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Control Bar (Hidden when printing) */}
        <div className="p-4 bg-[#101010] text-[#F5F0E6] border-b border-[#101010] flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <FileDown className="w-5 h-5 text-[#D4AF37]" />
            <span className="text-sm font-editorial font-bold text-white">
              Official B2B Wholesale Price Schedule &amp; SKU Guide
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 bg-[#D4AF37] hover:bg-[#b39023] text-[#101010] text-xs font-black uppercase tracking-wider rounded border border-[#D4AF37] flex items-center gap-1.5 transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded bg-[#343434] hover:bg-[#D4AF37] hover:text-[#101010] text-white flex items-center justify-center"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document View */}
        <div id="printable-catalog" className="overflow-y-auto p-6 sm:p-8 bg-white text-[#101010]">
          
          {/* Document Letterhead */}
          <div className="border-b-2 border-[#101010] pb-5 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div className="flex items-start gap-4">
              <img 
                src="/images/logo.png" 
                alt="Malabar Prime Logo" 
                className="w-14 h-14 rounded object-cover border border-[#101010] flex-shrink-0" 
              />
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col leading-none">
                    <span className="text-xl sm:text-2xl font-black tracking-[0.14em] text-[#101010] font-cinzel">
                      MALABAR<sup className="text-[10px] font-sans font-bold ml-0.5 text-[#343434]">™</sup>
                    </span>
                    <span className="text-sm sm:text-base font-black tracking-[0.24em] bg-gradient-to-r from-[#D4AF37] via-[#F3D87E] to-[#B8871B] bg-clip-text text-transparent font-cinzel mt-0.5">
                      PRIME
                    </span>
                  </div>
                  <span className="text-[10px] font-bold bg-[#D4AF37] text-[#101010] px-2 py-0.5 rounded font-mono border border-[#101010]">
                    COMMERCIAL SCHEDULE
                  </span>
                </div>
                <p className="text-xs text-[#343434] font-medium mt-1">
                  {addressText}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#343434] font-mono mt-1">
                  <span>FSSAI: {fssaiText}</span>
                  <span>•</span>
                  <span>GSTIN: {gstinText}</span>
                  <span>•</span>
                  <span>{isoText}</span>
                </div>
              </div>
            </div>

            <div className="text-right text-xs text-[#343434]">
              <p className="font-bold text-[#101010]">Direct Sales Desk: {phoneText}</p>
              <p className="text-[#343434]">{emailText}</p>
              <p className="text-[11px] text-[#101010] font-bold mt-1 font-mono">
                Effective Season: 2026 Q4
              </p>
            </div>
          </div>

          {/* Catalog Notice */}
          <div className="bg-[#F5F0E6] border border-[#101010] p-3 mb-6 text-xs text-[#343434] flex items-center justify-between">
            <span>
              <strong>Terms of Wholesale Supply:</strong> Baseline wholesale rates ex-central hub. Volume discount slabs (4.5% - 10%) automatically apply on consolidated pallet orders.
            </span>
          </div>

          {/* SKU Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#101010] text-[#F5F0E6] border border-[#101010] text-[10px] uppercase font-mono tracking-wider">
                  <th className="p-2.5">SKU Code</th>
                  <th className="p-2.5">Product Description</th>
                  <th className="p-2.5">Brand</th>
                  <th className="p-2.5">Packaging Size</th>
                  <th className="p-2.5">MOQ</th>
                  <th className="p-2.5">Shelf Life</th>
                  <th className="p-2.5 text-right">Wholesale Slab</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#101010]/20 border border-[#101010]">
                {PRODUCTS.map((prod, idx) => (
                  <tr key={prod.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F5F0E6]/50'}>
                    <td className="p-2.5 font-mono font-bold text-[#101010]">{prod.sku}</td>
                    <td className="p-2.5 font-semibold text-[#101010]">
                      {prod.name}
                      <span className="block text-[10px] text-[#343434] font-normal">{prod.origin}</span>
                    </td>
                    <td className="p-2.5 text-[#343434]">{prod.brand}</td>
                    <td className="p-2.5 text-[#343434]">{prod.packSize}</td>
                    <td className="p-2.5 text-[#343434]">{prod.moq}</td>
                    <td className="p-2.5 text-[#343434]">{prod.shelfLife}</td>
                    <td className="p-2.5 text-right font-mono font-bold text-[#101010] bg-[#D4AF37]/20 whitespace-nowrap">
                      {prod.wholesaleRange}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Ordering Guidelines */}
          <div className="mt-8 pt-6 border-t-2 border-[#101010] grid sm:grid-cols-3 gap-4 text-xs text-[#343434]">
            <div>
              <h5 className="font-bold text-[#101010] uppercase text-[11px] mb-1">Route Dispatch</h5>
              <p className="text-[11px] text-[#343434] leading-relaxed">
                24-48 hours fulfillment across central zones. Temperature controlled reefers used for dairy and sensitive oil consignments.
              </p>
            </div>
            <div>
              <h5 className="font-bold text-[#101010] uppercase text-[11px] mb-1">Credit Facilities</h5>
              <p className="text-[11px] text-[#343434] leading-relaxed">
                Advance/NEFT for initial 3 orders. 14 to 30 days institutional partner credit available on credit verification.
              </p>
            </div>
            <div>
              <h5 className="font-bold text-[#101010] uppercase text-[11px] mb-1">Order Desk</h5>
              <p className="text-[11px] text-[#343434] leading-relaxed">
                Send POs to {emailText !== 'Not Available' ? emailText : 'Trade Desk'} or via WhatsApp Business line at {waText}.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
