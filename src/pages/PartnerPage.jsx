import React, { useState } from 'react';
import { Store, Truck, Building2, CheckCircle2, ShieldCheck, ArrowRight, FileText, Send } from 'lucide-react';
import { COMPANY_INFO } from '../data/distributionData';
import { dataService } from '../services/dataService';

export default function PartnerPage({ initialPartnerType = 'retailer' }) {
  const [activePartnerType, setActivePartnerType] = useState(initialPartnerType);

  React.useEffect(() => {
    if (initialPartnerType) {
      setActivePartnerType(initialPartnerType);
    }
  }, [initialPartnerType]);
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    phone: '',
    email: '',
    city: '',
    gstin: '',
    categoryInterest: 'All Categories',
    estimatedMonthlyVolume: '₹1,00,000 - ₹5,00,000',
    notes: ''
  });
  const [submittedRef, setSubmittedRef] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newApp = dataService.addPartnerApplication({
      type: activePartnerType,
      businessName: formData.businessName,
      contactPerson: formData.contactPerson,
      phone: formData.phone,
      email: formData.email,
      city: formData.city,
      gstin: formData.gstin,
      categoryInterest: formData.categoryInterest,
      estimatedMonthlyVolume: formData.estimatedMonthlyVolume,
      notes: formData.notes
    });
    setSubmittedRef(newApp.refCode);
  };

  const handleReset = () => {
    setSubmittedRef(null);
    setFormData({
      businessName: '',
      contactPerson: '',
      phone: '',
      email: '',
      city: '',
      gstin: '',
      categoryInterest: 'All Categories',
      estimatedMonthlyVolume: '₹1,00,000 - ₹5,00,000',
      notes: ''
    });
  };

  return (
    <div className="w-full bg-[#F5F0E6] text-[#101010]">
      
      {/* Editorial Page Header */}
      <section className="border-b border-[#101010] py-14 px-4 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-4xl">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D4AF37] block mb-2">
            B2B COMMERCIAL ONBOARDING
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-black text-[#101010] leading-tight mb-3">
            Partner With Us
          </h1>
          <p className="text-xs sm:text-sm text-[#343434] leading-relaxed font-medium">
            Join South India's premier food distribution ecosystem. Whether you operate a retail supermarket, seek regional distribution rights, or manufacture quality FMCG products, we provide direct agreements and reliable logistics.
          </p>
        </div>
      </section>

      {/* 3 Pillars Selector: Become a Retailer, Become a Distributor, Supplier Registration */}
      <section id="partner-options" className="py-12 px-4 sm:px-8 lg:px-12 border-b border-[#101010]">
        
        {/* Tab Selectors */}
        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
          
          <button
            id="retailer"
            onClick={() => { setActivePartnerType('retailer'); setSubmittedRef(null); }}
            className={`p-5 rounded-xl border text-left transition-all flex items-center gap-4 ${
              activePartnerType === 'retailer'
                ? 'bg-[#101010] text-[#F5F0E6] border-[#101010] shadow-md ring-2 ring-[#D4AF37]'
                : 'bg-white text-[#101010] border-[#101010]/30 hover:border-[#101010]'
            }`}
          >
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
              activePartnerType === 'retailer' ? 'bg-[#D4AF37] text-[#101010]' : 'bg-[#F5F0E6] text-[#101010]'
            }`}>
              <Store className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-[#D4AF37] block">Option 1</span>
              <strong className="block text-base font-bold">Become a Retailer</strong>
              <span className="text-xs opacity-80">Supermarkets &amp; Stores</span>
            </div>
          </button>

          <button
            id="distributor"
            onClick={() => { setActivePartnerType('distributor'); setSubmittedRef(null); }}
            className={`p-5 rounded-xl border text-left transition-all flex items-center gap-4 ${
              activePartnerType === 'distributor'
                ? 'bg-[#101010] text-[#F5F0E6] border-[#101010] shadow-md ring-2 ring-[#D4AF37]'
                : 'bg-white text-[#101010] border-[#101010]/30 hover:border-[#101010]'
            }`}
          >
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
              activePartnerType === 'distributor' ? 'bg-[#D4AF37] text-[#101010]' : 'bg-[#F5F0E6] text-[#101010]'
            }`}>
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-[#D4AF37] block">Option 2</span>
              <strong className="block text-base font-bold">Become a Distributor</strong>
              <span className="text-xs opacity-80">Regional Territory Stockists</span>
            </div>
          </button>

          <button
            id="supplier"
            onClick={() => { setActivePartnerType('supplier'); setSubmittedRef(null); }}
            className={`p-5 rounded-xl border text-left transition-all flex items-center gap-4 ${
              activePartnerType === 'supplier'
                ? 'bg-[#101010] text-[#F5F0E6] border-[#101010] shadow-md ring-2 ring-[#D4AF37]'
                : 'bg-white text-[#101010] border-[#101010]/30 hover:border-[#101010]'
            }`}
          >
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
              activePartnerType === 'supplier' ? 'bg-[#D4AF37] text-[#101010]' : 'bg-[#F5F0E6] text-[#101010]'
            }`}>
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-[#D4AF37] block">Option 3</span>
              <strong className="block text-base font-bold">Supplier Registration</strong>
              <span className="text-xs opacity-80">Manufacturers &amp; Producers</span>
            </div>
          </button>

        </div>

        {/* Dynamic Partner Registration Form */}
        <div className="max-w-3xl mx-auto bg-white border border-[#101010] rounded-xl shadow-lg p-6 sm:p-10">
          
          {submittedRef ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-100 border-2 border-green-600 text-green-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-editorial text-2xl font-bold text-[#101010]">
                Application Received Successfully!
              </h3>
              <p className="text-xs sm:text-sm text-[#343434] max-w-md mx-auto font-medium">
                Your partnership application has been registered with our commercial trade desk under reference code:
              </p>
              <div className="inline-block px-4 py-2 bg-[#F5F0E6] border-2 border-[#101010] rounded font-mono font-black text-base text-[#101010]">
                {submittedRef}
              </div>
              <p className="text-xs text-[#343434] font-medium">
                Our territory account manager will contact you at <strong>{formData.phone}</strong> within 1 business day with customized pricing and credit facility options.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-[#101010] text-[#F5F0E6] text-xs font-bold uppercase rounded hover:bg-[#343434] transition-colors"
                >
                  Submit Another Application
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="border-b border-[#101010]/15 pb-4">
                <h3 className="font-editorial text-2xl font-bold text-[#101010]">
                  {activePartnerType === 'retailer' && 'Retailer / Supermarket Onboarding'}
                  {activePartnerType === 'distributor' && 'Regional Distributor Territory Application'}
                  {activePartnerType === 'supplier' && 'Manufacturer / Producer Registration'}
                </h3>
                <p className="text-xs text-[#343434] mt-1 font-medium">
                  {activePartnerType === 'retailer' && 'Receive direct factory prices, 24-48h store replenishment, and B2B credit terms.'}
                  {activePartnerType === 'distributor' && 'Secure exclusive territory distribution rights and master pallet container rates.'}
                  {activePartnerType === 'supplier' && 'Distribute your FMCG products to 1,450+ verified modern trade supermarkets.'}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#101010] mb-1">
                    Business / Store Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="e.g. Malabar Hypermarket LLC"
                    className="w-full px-3.5 py-2.5 bg-[#F5F0E6] border border-[#101010]/30 rounded text-xs font-medium focus:border-[#101010] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#101010] mb-1">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    placeholder="e.g. Abdul Rahman"
                    className="w-full px-3.5 py-2.5 bg-[#F5F0E6] border border-[#101010]/30 rounded text-xs font-medium focus:border-[#101010] outline-none"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#101010] mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-3.5 py-2.5 bg-[#F5F0E6] border border-[#101010]/30 rounded text-xs font-medium focus:border-[#101010] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#101010] mb-1">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="trade@yourcompany.com"
                    className="w-full px-3.5 py-2.5 bg-[#F5F0E6] border border-[#101010]/30 rounded text-xs font-medium focus:border-[#101010] outline-none"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#101010] mb-1">
                    City / Territory of Operation *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Kozhikode / Ernakulam / Kannur"
                    className="w-full px-3.5 py-2.5 bg-[#F5F0E6] border border-[#101010]/30 rounded text-xs font-medium focus:border-[#101010] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#101010] mb-1">
                    GSTIN / Tax Registration (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.gstin}
                    onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                    placeholder="32AAAAA0000A1Z5"
                    className="w-full px-3.5 py-2.5 bg-[#F5F0E6] border border-[#101010]/30 rounded text-xs font-medium focus:border-[#101010] outline-none uppercase font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#101010] mb-1">
                  Primary Categories of Interest
                </label>
                <select
                  value={formData.categoryInterest}
                  onChange={(e) => setFormData({ ...formData, categoryInterest: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F5F0E6] border border-[#101010]/30 rounded text-xs font-medium focus:border-[#101010] outline-none"
                >
                  <option value="All Categories">All Categories (Full Wholesale Line)</option>
                  <option value="Chocolates & Confectionery">Chocolates &amp; Confectionery</option>
                  <option value="Soft Drinks & Sodas">Soft Drinks &amp; Sodas</option>
                  <option value="Juices & Nectars">Juices &amp; Nectars</option>
                  <option value="Snacks & Chips">Snacks &amp; Crisps</option>
                  <option value="Bottled Water & Spring Water">Bottled Water</option>
                  <option value="Energy Drinks">Energy Drinks</option>
                  <option value="Spices & Seasonings">Spices &amp; Seasonings</option>
                  <option value="Cooking Oils & Ghee">Cooking Oils &amp; Ghee</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#101010] mb-1">
                  Additional Notes / Specific Brand Inquiries
                </label>
                <textarea
                  rows="3"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Share details about your store count, expected monthly volume, or specific SKU requirements..."
                  className="w-full px-3.5 py-2.5 bg-[#F5F0E6] border border-[#101010]/30 rounded text-xs font-medium focus:border-[#101010] outline-none resize-none"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#101010] hover:bg-[#343434] text-[#F5F0E6] text-xs font-black uppercase tracking-wider rounded border border-[#101010] transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-[#D4AF37]" />
                  <span>Submit Commercial Application</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </section>

    </div>
  );
}

