import React, { useRef } from 'react';
import { 
  Printer, 
  Download, 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  Calendar,
  X,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import BrandWordmark from '../BrandWordmark';

export default function PdfReportView({ 
  type = 'pricelist', // 'pricelist', 'quotation', 'partners'
  data = {}, 
  onClose 
}) {
  const printAreaRef = useRef(null);

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex flex-col items-center justify-start p-2 sm:p-6 animate-fadeIn">
      
      {/* Top Action Toolbar (Hidden during printing) */}
      <div className="print:hidden w-full max-w-4xl bg-[#181818] border border-[#343434] rounded-xl p-4 mb-4 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-[#D4AF37] text-[#101010] flex items-center justify-center font-bold">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-white font-bold text-sm">
              {type === 'pricelist' && 'Official Wholesale Price List & Catalog PDF'}
              {type === 'quotation' && `B2B Commercial Proforma Invoice & Quotation (${data.rfq?.id || 'Custom RFQ'})`}
              {type === 'partners' && 'Authorized Distribution Partner Registry PDF'}
            </h3>
            <p className="text-xs text-[#F5F0E6]/60 font-mono">
              Ready for high-resolution vector printing or direct "Save as PDF"
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-[#D4AF37] hover:bg-[#b89528] text-[#101010] font-black text-xs uppercase tracking-wider rounded-lg flex items-center gap-2 shadow-lg transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 bg-[#343434] hover:bg-white hover:text-[#101010] text-white rounded-lg transition-colors"
              title="Close PDF Preview"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Printable Sheet Container (A4 Printable Canvas) */}
      <div 
        ref={printAreaRef}
        id="printable-report"
        className="w-full max-w-4xl bg-white text-[#101010] p-8 sm:p-12 rounded-lg shadow-2xl print:shadow-none print:m-0 print:p-8 print:w-full print:max-w-none print:rounded-none relative font-sans text-xs"
      >
        
        {/* Printable Header */}
        <div className="border-b-2 border-[#101010] pb-6 mb-6">
          <div className="flex justify-between items-start gap-4">
            
            {/* Left: Brand Identity */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded bg-[#101010] p-1 border border-[#D4AF37] flex items-center justify-center">
                  <img src="/images/logo.png" alt="Logo" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h1 className="font-editorial text-2xl font-black tracking-tight text-[#101010] leading-none">
                    MALABAR PRIME
                  </h1>
                  <span className="text-[10px] font-mono tracking-widest text-[#85681c] font-bold uppercase block mt-0.5">
                    FOOD DISTRIBUTIONS &bull; WHOLESALE NETWORK
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-[#444] font-medium leading-relaxed max-w-sm">
                Central Master Depot, NH-66 Bypass Road, Kozhikode, Kerala &bull; 673014<br />
                Hotline: +91 98470 12345 &bull; Desk: malabarprime.co@gmail.com
              </p>
            </div>

            {/* Right: Statutory Badges & Document Meta */}
            <div className="text-right space-y-1 font-mono text-[10px]">
              <div className="inline-block px-2.5 py-1 bg-[#F5F0E6] border border-[#101010] rounded font-bold text-[#101010] uppercase mb-1">
                {type === 'pricelist' && 'OFFICIAL PRICE SCHEDULE'}
                {type === 'quotation' && 'COMMERCIAL PROFORMA INVOICE'}
                {type === 'partners' && 'AUTHORIZED PARTNER DIRECTORY'}
              </div>
              <div><strong>Doc Date:</strong> {currentDate}</div>
              <div><strong>FSSAI Lic:</strong> 11322001000845</div>
              <div><strong>GSTIN:</strong> 32AAECM4912L1ZT</div>
              <div><strong>Compliance:</strong> ISO 22000:2018 Certified</div>
            </div>

          </div>
        </div>

        {/* ---------------- TYPE 1: WHOLESALE PRICE LIST ---------------- */}
        {type === 'pricelist' && (
          <div>
            <div className="flex justify-between items-end mb-4">
              <div>
                <h2 className="text-base font-bold uppercase tracking-wider text-[#101010]">
                  Master B2B FMCG &amp; Commodity Price List
                </h2>
                <p className="text-[11px] text-[#666]">
                  Applicable for Tier-1 Supermarkets, Regional Cash-and-Carry, and Institutional Buyers.
                </p>
              </div>
              <div className="text-right font-mono text-[10px] text-[#666]">
                Prices valid for current cycle &bull; MOQ per SKU applies
              </div>
            </div>

            <table className="w-full text-left border-collapse border border-[#101010] text-[11px] mb-6">
              <thead>
                <tr className="bg-[#101010] text-white font-mono uppercase text-[10px]">
                  <th className="p-2 border border-[#343434]">#</th>
                  <th className="p-2 border border-[#343434]">SKU Code</th>
                  <th className="p-2 border border-[#343434]">Item &amp; Brand</th>
                  <th className="p-2 border border-[#343434]">Category</th>
                  <th className="p-2 border border-[#343434]">Pack Size</th>
                  <th className="p-2 border border-[#343434]">MOQ</th>
                  <th className="p-2 border border-[#343434] text-right">Wholesale Slab Rate</th>
                  <th className="p-2 border border-[#343434] text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {(data.products || []).slice(0, 30).map((prod, idx) => (
                  <tr key={prod.id || idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#FAF8F5]'}>
                    <td className="p-2 border border-gray-300 font-mono text-[10px] text-gray-500">{idx + 1}</td>
                    <td className="p-2 border border-gray-300 font-mono font-bold text-[10px] text-[#101010]">{prod.sku}</td>
                    <td className="p-2 border border-gray-300 font-medium">
                      <div className="font-bold text-[#101010]">{prod.name}</div>
                      <div className="text-[10px] text-gray-500">{prod.brand}</div>
                    </td>
                    <td className="p-2 border border-gray-300 capitalize text-gray-700">{prod.category}</td>
                    <td className="p-2 border border-gray-300 font-mono text-[10px]">{prod.packSize}</td>
                    <td className="p-2 border border-gray-300 font-mono text-[10px]">{prod.moq}</td>
                    <td className="p-2 border border-gray-300 font-mono font-bold text-right text-[#101010]">{prod.wholesaleRange}</td>
                    <td className="p-2 border border-gray-300 text-center font-mono text-[9px]">
                      <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                        {prod.stockStatus || 'In Stock'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Terms & Bank Details */}
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-300 text-[10px]">
              <div>
                <strong className="block font-bold uppercase mb-1">Commercial Terms &amp; Logistics:</strong>
                <ul className="list-disc pl-4 space-y-0.5 text-gray-700">
                  <li>Payment: 100% RTGS/NEFT or 15-day pre-authorized institutional credit.</li>
                  <li>Delivery SLA: 24 to 48 hours to retail store loading docks.</li>
                  <li>Cold Chain: Reefer trucks equipped with GPS temperature data loggers.</li>
                  <li>Returns: Zero-spoilage policy for transit-damaged factory seals within 24 hours.</li>
                </ul>
              </div>
              <div className="bg-[#FAF8F5] p-3 border border-gray-300 rounded font-mono">
                <strong className="block font-bold uppercase mb-1 text-[#101010]">RTGS / NEFT Remittance Node:</strong>
                <div>Bank: <strong>HDFC Bank Ltd &bull; Kozhikode Central Branch</strong></div>
                <div>A/C Name: <strong>Malabar Prime Food Distributions</strong></div>
                <div>A/C Number: <strong>50200088991122</strong></div>
                <div>IFSC: <strong>HDFC0001234</strong></div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- TYPE 2: PROFORMA INVOICE / QUOTATION ---------------- */}
        {type === 'quotation' && (
          <div>
            <div className="grid grid-cols-2 gap-6 mb-6 pb-6 border-b border-gray-300">
              <div>
                <span className="text-[10px] font-mono font-bold text-gray-500 uppercase block">Billed To (Buyer):</span>
                <div className="font-bold text-sm text-[#101010]">{data.rfq?.buyerCompany || 'Valued Retail Supermarket'}</div>
                <div className="text-gray-700">{data.rfq?.contactPerson || 'Procurement In-Charge'}</div>
                <div className="text-gray-700">{data.rfq?.location || 'Kerala, India'}</div>
                <div className="font-mono text-[10px] text-gray-600 mt-1">Phone: {data.rfq?.phone || '+91 98470 00000'}</div>
                <div className="font-mono text-[10px] text-gray-600">GSTIN: {data.rfq?.gstin || '32AABCP1234E1Z0'}</div>
              </div>
              <div className="text-right space-y-1 font-mono">
                <div><strong>Proforma No:</strong> {data.rfq?.id ? `PI-${data.rfq.id}` : 'PI-MP-2026-9041'}</div>
                <div><strong>Quotation Date:</strong> {data.rfq?.date || currentDate}</div>
                <div><strong>Validity:</strong> 7 Business Days</div>
                <div><strong>Dispatch Hub:</strong> Kozhikode Central Reefer Fleet</div>
                <div><strong>Payment Term:</strong> Direct Bank Remittance</div>
              </div>
            </div>

            <table className="w-full text-left border-collapse border border-[#101010] text-[11px] mb-6">
              <thead>
                <tr className="bg-[#101010] text-white font-mono uppercase text-[10px]">
                  <th className="p-2 border border-[#343434]">#</th>
                  <th className="p-2 border border-[#343434]">Description of Goods</th>
                  <th className="p-2 border border-[#343434]">Pack Configuration</th>
                  <th className="p-2 border border-[#343434] text-center">Cases</th>
                  <th className="p-2 border border-[#343434] text-right">Wholesale Rate Slab</th>
                  <th className="p-2 border border-[#343434] text-right">Estimated Amount</th>
                </tr>
              </thead>
              <tbody>
                {(data.rfq?.items || [
                  { name: 'Royal Tellicherry Black Pepper Bold', packSize: '24 x 500g Pouches', quantity: 15, slab: '₹410 / pack' },
                  { name: 'Single Origin Dark Chocolate Couverture', packSize: '48 x 100g Bars', quantity: 20, slab: '₹95 / bar' }
                ]).map((item, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#FAF8F5]'}>
                    <td className="p-2 border border-gray-300 font-mono text-[10px] text-gray-500">{idx + 1}</td>
                    <td className="p-2 border border-gray-300 font-bold text-[#101010]">{item.name}</td>
                    <td className="p-2 border border-gray-300 font-mono text-[10px] text-gray-700">{item.packSize || 'Master Carton'}</td>
                    <td className="p-2 border border-gray-300 font-mono font-bold text-center">{item.quantity}</td>
                    <td className="p-2 border border-gray-300 font-mono text-right">{item.slab || 'Market Slab'}</td>
                    <td className="p-2 border border-gray-300 font-mono font-bold text-right">
                      ₹{((item.quantity || 1) * 3850).toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-[#FAF8F5] font-mono text-[11px]">
                  <td colSpan={5} className="p-2 border border-gray-300 text-right font-bold">Subtotal:</td>
                  <td className="p-2 border border-gray-300 text-right font-bold">{data.rfq?.estimatedValue || '₹1,34,750'}</td>
                </tr>
                <tr className="bg-[#FAF8F5] font-mono text-[11px]">
                  <td colSpan={5} className="p-2 border border-gray-300 text-right font-bold">GST (Standard 5% / 12% Slab Blend):</td>
                  <td className="p-2 border border-gray-300 text-right font-bold">₹10,780</td>
                </tr>
                <tr className="bg-[#101010] text-white font-mono text-xs">
                  <td colSpan={5} className="p-2.5 border border-[#343434] text-right font-bold uppercase">Grand Total (Inclusive of Taxes &amp; Free Logistics):</td>
                  <td className="p-2.5 border border-[#343434] text-right font-bold text-[#D4AF37]">
                    {data.rfq?.estimatedValue ? `₹${(parseInt(data.rfq.estimatedValue.replace(/[^0-9]/g, '')) * 1.08).toLocaleString('en-IN')}` : '₹1,45,530'}
                  </td>
                </tr>
              </tfoot>
            </table>

            {/* Special Instructions */}
            {data.rfq?.notes && (
              <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded text-[11px]">
                <strong className="text-amber-900 block font-bold">Order Notes / Instructions:</strong>
                <p className="text-amber-800">{data.rfq.notes}</p>
              </div>
            )}
          </div>
        )}

        {/* ---------------- TYPE 3: PARTNERS DIRECTORY ---------------- */}
        {type === 'partners' && (
          <div>
            <div className="mb-4">
              <h2 className="text-base font-bold uppercase tracking-wider text-[#101010]">
                Authorized B2B Partner &amp; Distribution Registry
              </h2>
              <p className="text-[11px] text-[#666]">
                Official audit list of registered Retail Supermarkets, Territory Distributors, and Certified Suppliers.
              </p>
            </div>

            <table className="w-full text-left border-collapse border border-[#101010] text-[11px] mb-6">
              <thead>
                <tr className="bg-[#101010] text-white font-mono uppercase text-[10px]">
                  <th className="p-2 border border-[#343434]">Ref Code</th>
                  <th className="p-2 border border-[#343434]">Business Entity</th>
                  <th className="p-2 border border-[#343434]">Contact Person &amp; Phone</th>
                  <th className="p-2 border border-[#343434]">Territory / City</th>
                  <th className="p-2 border border-[#343434]">Type</th>
                  <th className="p-2 border border-[#343434]">Monthly Volume</th>
                  <th className="p-2 border border-[#343434] text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {(data.partners || []).map((p, idx) => (
                  <tr key={p.id || idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#FAF8F5]'}>
                    <td className="p-2 border border-gray-300 font-mono font-bold text-[10px] text-[#101010]">{p.refCode}</td>
                    <td className="p-2 border border-gray-300">
                      <div className="font-bold text-[#101010]">{p.businessName}</div>
                      <div className="text-[10px] font-mono text-gray-500">GST: {p.gstin || 'Pending'}</div>
                    </td>
                    <td className="p-2 border border-gray-300">
                      <div>{p.contactPerson}</div>
                      <div className="text-[10px] font-mono text-gray-600">{p.phone}</div>
                    </td>
                    <td className="p-2 border border-gray-300 font-medium">{p.city}</td>
                    <td className="p-2 border border-gray-300 capitalize font-mono text-[10px]">{p.type}</td>
                    <td className="p-2 border border-gray-300 font-mono text-[10px]">{p.estimatedMonthlyVolume}</td>
                    <td className="p-2 border border-gray-300 text-center font-mono text-[9px]">
                      <span className={`px-2 py-0.5 rounded font-bold ${
                        p.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                        p.status === 'Reviewing' ? 'bg-amber-100 text-amber-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Official Digital Stamp & Signatures */}
        <div className="mt-8 pt-6 border-t-2 border-[#101010] flex justify-between items-end text-[10px]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span className="font-bold uppercase tracking-wider text-emerald-900">
                100% Certified Authentic Malabar Prime Dispatch
              </span>
            </div>
            <div className="text-gray-500 font-mono">
              Generated via Malabar Prime Central Trade Node &bull; Electronic Signature
            </div>
          </div>

          <div className="text-center font-mono">
            <div className="w-40 border-b border-gray-400 mb-1 pb-4 text-[#85681c] font-bold italic text-xs">
              M. P. Commercial Desk
            </div>
            <span className="text-gray-600 font-bold uppercase text-[9px] block">
              Authorized Signatory
            </span>
            <span className="text-gray-400 text-[8px]">
              Malabar Prime Distributions Pvt Ltd
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}

