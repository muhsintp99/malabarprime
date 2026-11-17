import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  CheckCircle2, 
  FileCheck
} from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { COMPANY_INFO } from '../data/distributionData';
import { dataService } from '../services/dataService';

export default function BecomePartnerModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [businessName, setBusinessName] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [storeType, setStoreType] = useState('Supermarket');
  const [monthlyVolume, setMonthlyVolume] = useState('₹1 - ₹5 Lakhs / month');
  const [gstin, setGstin] = useState('');
  const [selectedCats, setSelectedCats] = useState(['spices', 'staples', 'oils']);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [partnerRef, setPartnerRef] = useState('');

  const toggleCategory = (catId) => {
    setSelectedCats(prev => 
      prev.includes(catId) 
        ? prev.filter(c => c !== catId) 
        : [...prev, catId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newApp = dataService.addPartnerApplication({
      type: 'retailer',
      businessName,
      contactPerson: contactName,
      phone,
      email,
      city,
      gstin,
      categoryInterest: selectedCats.join(', '),
      estimatedMonthlyVolume: monthlyVolume,
      notes: `Store Type: ${storeType}`
    });
    setPartnerRef(newApp.refCode);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#101010]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="bg-[#F5F0E6] border-2 border-[#101010] max-w-2xl w-full overflow-hidden shadow-2xl relative max-h-[92vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-[#101010] text-[#F5F0E6] border-b border-[#101010] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded bg-[#101010] p-0.5 border border-[#D4AF37] flex items-center justify-center overflow-hidden flex-shrink-0">
              <img src="/images/logo.png" alt="Malabar Prime Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-editorial text-xl font-bold text-white">
                Authorized Retailer Onboarding
              </h3>
              <p className="text-xs text-[#F5F0E6]/80 font-medium">
                Register your store or supermarket for direct wholesale commercial pricing
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded bg-[#343434] hover:bg-[#D4AF37] hover:text-[#101010] text-white flex items-center justify-center transition-colors"
            aria-label="Close form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="overflow-y-auto p-6">
          {isSubmitted ? (
            <div className="bg-white border-2 border-[#101010] rounded p-8 text-center space-y-4 my-4">
              <div className="w-16 h-16 bg-[#D4AF37] text-[#101010] rounded-full flex items-center justify-center mx-auto border border-[#101010]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-editorial text-2xl font-bold text-[#101010]">Application Registered!</h4>
              <p className="text-xs text-[#343434] max-w-md mx-auto">
                Thank you for applying to join the Malabar Prime Distributions retail network. Your partner registration code is:
              </p>
              <div className="inline-block bg-[#F5F0E6] border border-[#101010] px-6 py-2.5 rounded font-mono text-base font-black text-[#101010]">
                {partnerRef}
              </div>
              <div className="p-4 rounded bg-[#F5F0E6] text-xs text-[#343434] text-left border border-[#101010]/20 space-y-1.5 max-w-md mx-auto">
                <span className="font-bold text-[#101010] block mb-1 uppercase text-[10px]">Next steps:</span>
                <p>1. Our Territory Sales Officer (TSO) for <strong>{city}</strong> will contact you at <strong>{phone}</strong> within 24 hours.</p>
                <p>2. We will provide sample batches, official wholesale price catalog, and setup delivery route logistics.</p>
                <p>3. First 3 orders qualify for introductory dealer welcome margins.</p>
              </div>
              <button
                onClick={handleReset}
                className="w-full max-w-md py-3 px-4 bg-[#101010] hover:bg-[#343434] text-[#F5F0E6] text-xs font-bold uppercase tracking-wider rounded border border-[#101010] transition-colors"
              >
                Return to Website
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
              
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[10px] font-bold uppercase text-[#343434] mb-1">
                    Store / Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={e => setBusinessName(e.target.value)}
                    placeholder="e.g. Royal Fresh Hypermarket"
                    className="w-full p-2.5 bg-white border border-[#101010] rounded focus:bg-[#F5F0E6] outline-none text-[#101010]"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] font-bold uppercase text-[#343434] mb-1">
                    Owner / Purchase Head Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={e => setContactName(e.target.value)}
                    placeholder="e.g. Mr. Mohammed Rihan"
                    className="w-full p-2.5 bg-white border border-[#101010] rounded focus:bg-[#F5F0E6] outline-none text-[#101010]"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[10px] font-bold uppercase text-[#343434] mb-1">
                    Mobile Phone (WhatsApp preferred) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+91 98470 12345"
                    className="w-full p-2.5 bg-white border border-[#101010] rounded focus:bg-[#F5F0E6] outline-none text-[#101010] font-mono"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] font-bold uppercase text-[#343434] mb-1">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="purchase@royalfresh.com"
                    className="w-full p-2.5 bg-white border border-[#101010] rounded focus:bg-[#F5F0E6] outline-none text-[#101010]"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[10px] font-bold uppercase text-[#343434] mb-1">
                    City, District &amp; State *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder="e.g. Kozhikode, Kerala"
                    className="w-full p-2.5 bg-white border border-[#101010] rounded focus:bg-[#F5F0E6] outline-none text-[#101010]"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] font-bold uppercase text-[#343434] mb-1">
                    GSTIN (Optional)
                  </label>
                  <input
                    type="text"
                    value={gstin}
                    onChange={e => setGstin(e.target.value)}
                    placeholder="32AAECM4912L1ZT"
                    className="w-full p-2.5 bg-white border border-[#101010] rounded focus:bg-[#F5F0E6] outline-none text-[#101010] font-mono uppercase"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[10px] font-bold uppercase text-[#343434] mb-1">
                    Store / Operation Type *
                  </label>
                  <select
                    value={storeType}
                    onChange={e => setStoreType(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#101010] rounded focus:bg-[#F5F0E6] outline-none text-[#101010]"
                  >
                    <option value="Supermarket / Hypermarket">Supermarket / Hypermarket</option>
                    <option value="Departmental / Grocery Store">Departmental / Grocery Store</option>
                    <option value="Horeca (Hotel / Restaurant / Catering)">Horeca (Hotel / Restaurant / Catering)</option>
                    <option value="Wholesaler / Sub-Stockist">Wholesaler / Sub-Stockist</option>
                    <option value="Institution / Food Manufacturer">Institution / Food Manufacturer</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-[10px] font-bold uppercase text-[#343434] mb-1">
                    Estimated Monthly Order Volume *
                  </label>
                  <select
                    value={monthlyVolume}
                    onChange={e => setMonthlyVolume(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#101010] rounded focus:bg-[#F5F0E6] outline-none text-[#101010]"
                  >
                    <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000 / month</option>
                    <option value="₹1 - ₹3 Lakhs">₹1 - ₹3 Lakhs / month</option>
                    <option value="₹3 - ₹10 Lakhs">₹3 - ₹10 Lakhs / month</option>
                    <option value="₹10 Lakhs+ (High Volume)">₹10 Lakhs+ / month (Tier-1 Partner)</option>
                  </select>
                </div>
              </div>

              {/* Product Lines of Interest */}
              <div>
                <label className="block font-mono text-[10px] font-bold uppercase text-[#343434] mb-1.5">
                  Select Product Lines You Wish to Distribute:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {CATEGORIES.filter(c => c.id !== 'all').map(cat => {
                    const isChecked = selectedCats.includes(cat.id);
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => toggleCategory(cat.id)}
                        className={`p-2 rounded border text-left flex items-center justify-between transition-all ${
                          isChecked 
                            ? 'bg-[#D4AF37] border-[#101010] text-[#101010] font-bold' 
                            : 'bg-white border-[#101010]/30 text-[#343434]'
                        }`}
                      >
                        <span className="text-[11px] truncate">{cat.name}</span>
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-[#101010] flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded bg-[#D4AF37] hover:bg-[#b39023] text-[#101010] font-black text-xs uppercase tracking-wider border border-[#101010] transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Submit Partner Registration</span>
                </button>
              </div>

            </form>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#101010] text-center text-[10px] text-[#343434] font-mono">
          Malabar Prime Distributions • Commercial Wholesale Desk: {COMPANY_INFO.phone}
        </div>
      </div>
    </div>
  );
}
