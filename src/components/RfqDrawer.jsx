import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  MessageSquare, 
  Mail, 
  ShoppingCart, 
  CheckCircle2, 
  Send
} from 'lucide-react';
import { COMPANY_INFO } from '../data/distributionData';
import { dataService } from '../services/dataService';

export default function RfqDrawer({ 
  isOpen, 
  onClose, 
  rfqItems, 
  onUpdateQty, 
  onRemoveItem, 
  onClearRfq 
}) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('whatsapp');
  const [buyerCompany, setBuyerCompany] = useState('');
  const [buyerLocation, setBuyerLocation] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [buyerGst, setBuyerGst] = useState('');
  const [buyerNotes, setBuyerNotes] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState(false);
  const [refId, setRefId] = useState('');

  const totalCases = rfqItems.reduce((acc, item) => acc + item.quantity, 0);

  const generateWhatsAppUrl = () => {
    let msg = `*OFFICIAL B2B WHOLESALE INQUIRY*\n`;
    msg += `-----------------------------------------\n`;
    msg += `*To:* ${COMPANY_INFO.name}\n`;
    if (buyerCompany.trim()) msg += `*Buyer / Store:* ${buyerCompany.trim()}\n`;
    if (buyerLocation.trim()) msg += `*Delivery Location:* ${buyerLocation.trim()}\n`;
    if (buyerPhone.trim()) msg += `*Contact:* ${buyerPhone.trim()}\n`;
    if (buyerGst.trim()) msg += `*GSTIN:* ${buyerGst.trim()}\n`;
    msg += `-----------------------------------------\n`;
    msg += `*Requested SKUs & Quantities:*\n`;
    
    rfqItems.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.product.name}*\n`;
      msg += `   • SKU: ${item.product.sku}\n`;
      msg += `   • Quantity: *${item.quantity} Master Cartons* (${item.product.packSize})\n`;
      msg += `   • Wholesale Slab: ${item.product.wholesaleRange}\n\n`;
    });

    msg += `-----------------------------------------\n`;
    msg += `*Total Order Volume:* ${totalCases} Master Cartons\n`;
    if (buyerNotes.trim()) msg += `*Special Instructions:* ${buyerNotes.trim()}\n`;
    msg += `\nPlease reply with commercial proforma invoice, GST breakdown, and dispatch slot.`;

    return `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(msg)}`;
  };

  const recordEnquiry = () => {
    return dataService.addEnquiry({
      buyerCompany: buyerCompany || 'Direct Wholesale Buyer',
      contactPerson: buyerCompany || 'Store Manager',
      phone: buyerPhone || 'N/A',
      location: buyerLocation || 'South India Depot',
      gstin: buyerGst || 'N/A',
      notes: buyerNotes || 'Order submitted via Wholesale Cart',
      totalCases: totalCases,
      items: rfqItems.map(item => ({
        name: item.product.name,
        quantity: item.quantity,
        packSize: item.product.packSize,
        slab: item.product.wholesaleRange
      }))
    });
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const newEnquiry = recordEnquiry();
    setRefId(newEnquiry.id);
    setSubmittedEmail(true);
  };

  const handleResetSubmit = () => {
    setSubmittedEmail(false);
    onClearRfq();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#101010]/80 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div 
        className="w-full max-w-xl bg-[#F5F0E6] border-l-2 border-[#101010] h-full shadow-2xl flex flex-col justify-between overflow-hidden relative"
        onClick={e => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#101010] bg-[#101010] text-[#F5F0E6] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#D4AF37] flex items-center justify-center text-[#101010] font-black">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-editorial text-lg font-bold text-white">Wholesale Inquiry Cart</h3>
                <span className="bg-[#D4AF37] text-[#101010] text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase">
                  B2B RFQ
                </span>
              </div>
              <p className="text-xs text-[#F5F0E6]/70 font-mono">
                {totalCases} Master Cartons • {rfqItems.length} SKUs selected
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="w-8 h-8 rounded bg-[#343434] hover:bg-[#D4AF37] hover:text-[#101010] text-white flex items-center justify-center transition-colors"
            aria-label="Close RFQ Cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          
          {submittedEmail ? (
            <div className="bg-white border-2 border-[#101010] rounded p-8 text-center space-y-4 my-8">
              <div className="w-16 h-16 bg-[#D4AF37] text-[#101010] rounded-full flex items-center justify-center mx-auto border border-[#101010]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-editorial text-2xl font-bold text-[#101010]">Inquiry Dispatched!</h3>
              <p className="text-xs text-[#343434] max-w-sm mx-auto">
                Your purchase inquiry has been recorded under system ID:
              </p>
              <div className="inline-block bg-[#F5F0E6] border border-[#101010] px-5 py-2.5 rounded font-mono text-base font-black text-[#101010]">
                {refId}
              </div>
              <p className="text-xs text-[#343434]">
                Our commercial desk for <strong>{buyerLocation || 'your territory'}</strong> will generate an official tax invoice quotation within 2 business hours.
              </p>
              <button
                onClick={handleResetSubmit}
                className="w-full py-3 px-4 bg-[#101010] hover:bg-[#343434] text-[#F5F0E6] text-xs font-bold uppercase tracking-wider rounded border border-[#101010] transition-colors"
              >
                Return to Product Catalog
              </button>
            </div>
          ) : rfqItems.length === 0 ? (
            <div className="text-center py-20 space-y-4 bg-white border border-[#101010] p-8 rounded">
              <div className="w-14 h-14 bg-[#F5F0E6] text-[#343434] rounded-full flex items-center justify-center mx-auto border border-[#101010]">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <h4 className="font-editorial text-xl font-bold text-[#101010]">RFQ Cart is Empty</h4>
              <p className="text-xs text-[#343434] max-w-xs mx-auto font-medium">
                Browse our product catalog and click "+ Add Case" to prepare a wholesale quote for your supermarket.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#b39023] text-[#101010] rounded border border-[#101010] text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Browse Wholesale SKUs
              </button>
            </div>
          ) : (
            <>
              {/* Product List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-[#343434]">
                  <span>SELECTED ITEMS ({rfqItems.length})</span>
                  <button
                    onClick={onClearRfq}
                    className="text-red-600 hover:text-red-800 text-xs font-mono flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear All</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {rfqItems.map(({ product, quantity }) => (
                    <div 
                      key={product.id} 
                      className="bg-white p-3.5 rounded border border-[#101010] flex items-center gap-3"
                    >
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-14 h-14 object-cover rounded border border-[#101010] flex-shrink-0"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between text-[10px] font-mono">
                          <span className="text-[#101010] font-bold uppercase">{product.brand}</span>
                          <span className="text-[#343434]">{product.sku}</span>
                        </div>
                        <h4 className="font-editorial text-sm font-bold text-[#101010] truncate">
                          {product.name}
                        </h4>
                        <p className="text-[11px] text-[#343434] font-mono truncate">
                          {product.packSize}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <div className="flex items-center border border-[#101010] rounded bg-[#F5F0E6] p-0.5">
                          <button
                            onClick={() => onUpdateQty(product.id, quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center text-[#101010] hover:bg-white"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center font-mono font-bold text-xs text-[#101010]">
                            {quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQty(product.id, quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center text-[#101010] hover:bg-white"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(product.id)}
                          className="text-[#343434] hover:text-red-600 p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              </div>

              {/* Inquiry Submission Mode & Form */}
              <div className="bg-white rounded border border-[#101010] p-4 space-y-4">
                
                {/* Method Switcher */}
                <div className="flex bg-[#F5F0E6] p-1 border border-[#101010] text-xs font-bold uppercase tracking-wider">
                  <button
                    type="button"
                    onClick={() => setActiveTab('whatsapp')}
                    className={`flex-1 py-2 rounded flex items-center justify-center gap-1.5 transition-all ${
                      activeTab === 'whatsapp'
                        ? 'bg-[#D4AF37] text-[#101010] border border-[#101010]'
                        : 'text-[#343434] hover:text-[#101010]'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp RFQ</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('email')}
                    className={`flex-1 py-2 rounded flex items-center justify-center gap-1.5 transition-all ${
                      activeTab === 'email'
                        ? 'bg-[#101010] text-[#F5F0E6]'
                        : 'text-[#343434] hover:text-[#101010]'
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email Proforma Quote</span>
                  </button>
                </div>

                {/* Form Inputs */}
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[10px] font-mono uppercase font-bold text-[#343434] mb-1">
                        Company / Store Name *
                      </label>
                      <input 
                        type="text"
                        required
                        value={buyerCompany}
                        onChange={e => setBuyerCompany(e.target.value)}
                        placeholder="e.g. Royal Fresh Hypermarket"
                        className="w-full text-xs p-2.5 bg-[#F5F0E6] border border-[#101010] rounded focus:bg-white outline-none text-[#101010] font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase font-bold text-[#343434] mb-1">
                        Delivery City / Depot *
                      </label>
                      <input 
                        type="text"
                        required
                        value={buyerLocation}
                        onChange={e => setBuyerLocation(e.target.value)}
                        placeholder="e.g. Kozhikode / Ernakulam"
                        className="w-full text-xs p-2.5 bg-[#F5F0E6] border border-[#101010] rounded focus:bg-white outline-none text-[#101010] font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[10px] font-mono uppercase font-bold text-[#343434] mb-1">
                        Contact Phone / WhatsApp *
                      </label>
                      <input 
                        type="tel"
                        required
                        value={buyerPhone}
                        onChange={e => setBuyerPhone(e.target.value)}
                        placeholder="+91 98470 12345"
                        className="w-full text-xs p-2.5 bg-[#F5F0E6] border border-[#101010] rounded focus:bg-white outline-none text-[#101010] font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase font-bold text-[#343434] mb-1">
                        GSTIN (Optional)
                      </label>
                      <input 
                        type="text"
                        value={buyerGst}
                        onChange={e => setBuyerGst(e.target.value)}
                        placeholder="32AAECM4912L1ZT"
                        className="w-full text-xs p-2.5 bg-[#F5F0E6] border border-[#101010] rounded focus:bg-white outline-none text-[#101010] font-mono uppercase"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase font-bold text-[#343434] mb-1">
                      Delivery Timing &amp; Dispatch Notes
                    </label>
                    <textarea 
                      rows={2}
                      value={buyerNotes}
                      onChange={e => setBuyerNotes(e.target.value)}
                      placeholder="e.g. Requesting delivery schedule for Thursday loading..."
                      className="w-full text-xs p-2.5 bg-[#F5F0E6] border border-[#101010] rounded focus:bg-white outline-none text-[#101010] resize-none"
                    />
                  </div>
                </div>

              </div>
            </>
          )}

        </div>

        {/* Footer Actions */}
        {rfqItems.length > 0 && !submittedEmail && (
          <div className="p-5 border-t border-[#101010] bg-white space-y-3">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-[#101010]">
              <span className="uppercase text-[#343434]">Consolidated Volume:</span>
              <span className="font-mono font-black text-sm text-[#101010] bg-[#D4AF37]/30 px-2 py-0.5 rounded">
                {totalCases} Master Cartons
              </span>
            </div>

            {activeTab === 'whatsapp' ? (
              <a
                href={generateWhatsAppUrl()}
                onClick={() => recordEnquiry()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded bg-[#D4AF37] hover:bg-[#b39023] text-[#101010] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-[#101010] shadow-sm transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send RFQ Directly via WhatsApp</span>
              </a>
            ) : (
              <form onSubmit={handleEmailSubmit}>
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded bg-[#101010] hover:bg-[#343434] text-[#F5F0E6] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all border border-[#101010]"
                >
                  <Send className="w-4 h-4 text-[#D4AF37]" />
                  <span>Submit Proforma Quote Request</span>
                </button>
              </form>
            )}

            <p className="text-[10px] text-center text-[#343434] font-mono">
              Direct dispatch from Malabar Prime Central Hub • Official GST invoice included
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
