import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, MessageSquare, Clock, Building2, Send, CheckCircle2, AlertTriangle, Headphones, ShieldAlert } from 'lucide-react';
import { COMPANY_INFO } from '../data/distributionData';
import { dataService } from '../services/dataService';

export default function ContactPage() {
  const [contactInfo, setContactInfo] = useState(() => dataService.getCompanyContact());

  useEffect(() => {
    const unsub = dataService.subscribe(() => {
      setContactInfo(dataService.getCompanyContact());
    });
    return unsub;
  }, []);

  const [inquiryData, setInquiryData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Wholesale Price List Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dataService.addContactMessage({
      name: inquiryData.name,
      phone: inquiryData.phone,
      email: inquiryData.email,
      subject: inquiryData.subject,
      message: inquiryData.message
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setInquiryData({
        name: '',
        phone: '',
        email: '',
        subject: 'Wholesale Price List Inquiry',
        message: ''
      });
    }, 5000);
  };

  const cleanWaNumber = (contactInfo?.whatsapp || '').replace(/[^0-9]/g, '');

  return (
    <div className="w-full bg-[#F5F0E6] text-[#101010]">
      
      {/* Editorial Page Header */}
      <section className="border-b border-[#101010] py-14 px-4 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-4xl">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D4AF37] block mb-2">
            TRADE DESK &amp; REGIONAL DIRECTORY
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-black text-[#101010] leading-tight mb-3">
            Contact Us
          </h1>
          <p className="text-xs sm:text-sm text-[#343434] leading-relaxed font-medium">
            Reach our central trade desk for instant commercial inquiries, dispatch status, proforma invoices, and dealership allocations.
          </p>
        </div>
      </section>

      {/* Main Contact Grid: Quick Desk Cards + Inquiry Form */}
      <section className="py-16 px-4 sm:px-8 lg:px-12 border-b border-[#101010]">
        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* Left: Contact Info & Hub Locations */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Cards */}
            <div className="p-6 bg-white border border-[#101010] rounded-xl shadow-sm space-y-4">
              <div className="border-b border-[#101010]/15 pb-2 flex items-center justify-between">
                <h3 className="font-editorial text-xl font-bold">
                  Central Trade Desk
                </h3>
                <span className="text-[10px] font-mono uppercase bg-[#101010] text-[#D4AF37] px-2 py-0.5 rounded font-bold">
                  {contactInfo?.contact || 'Not Available'}
                </span>
              </div>
              
              {/* Call Hotline */}
              <div className="flex items-start gap-3 text-xs">
                <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#101010] font-bold">Calling Line / Sales Hotline:</strong>
                  {contactInfo?.call ? (
                    <a href={`tel:${contactInfo.call.replace(/\s+/g, '')}`} className="font-mono text-[#343434] hover:text-[#101010] font-bold text-sm">
                      {contactInfo.call}
                    </a>
                  ) : (
                    <span className="font-mono text-neutral-400 italic text-xs">Not Available</span>
                  )}
                </div>
              </div>

              {/* WhatsApp Desk */}
              <div className="flex items-start gap-3 text-xs">
                <MessageSquare className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#101010] font-bold">WhatsApp Trade Desk (24/7):</strong>
                  {contactInfo?.whatsapp && cleanWaNumber ? (
                    <a 
                      href={`https://wa.me/${cleanWaNumber}?text=Hello%20Malabar%20Prime%20Distributions%2C%20wholesale%20distribution%20inquiry.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[#343434] hover:text-[#101010] font-bold"
                    >
                      {contactInfo.whatsapp}
                    </a>
                  ) : (
                    <span className="font-mono text-neutral-400 italic text-xs">Not Available</span>
                  )}
                </div>
              </div>

              {/* Emergency Hotline */}
              <div className="flex items-start gap-3 text-xs p-3 bg-red-50/60 border border-red-200/80 rounded-lg">
                <ShieldAlert className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-red-900 font-bold">24/7 Emergency Stockout Hotline:</strong>
                  {contactInfo?.emergensy ? (
                    <a href={`tel:${contactInfo.emergensy.replace(/\s+/g, '')}`} className="font-mono text-red-700 font-bold hover:underline">
                      {contactInfo.emergensy}
                    </a>
                  ) : (
                    <span className="font-mono text-neutral-400 italic text-xs">Not Available</span>
                  )}
                </div>
              </div>

              {/* Wholesale Email */}
              <div className="flex items-start gap-3 text-xs">
                <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#101010] font-bold">Wholesale &amp; Purchase Orders (PO):</strong>
                  {contactInfo?.email ? (
                    <a href={`mailto:${contactInfo.email}`} className="font-mono text-[#343434] hover:text-[#101010] font-semibold">
                      {contactInfo.email}
                    </a>
                  ) : (
                    <span className="font-mono text-neutral-400 italic text-xs">Not Available</span>
                  )}
                </div>
              </div>

              {/* Support Email */}
              <div className="flex items-start gap-3 text-xs">
                <Headphones className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#101010] font-bold">Support &amp; Damage Claims Desk:</strong>
                  {contactInfo?.supportEmail ? (
                    <a href={`mailto:${contactInfo.supportEmail}`} className="font-mono text-[#343434] hover:text-[#101010] font-semibold">
                      {contactInfo.supportEmail}
                    </a>
                  ) : (
                    <span className="font-mono text-neutral-400 italic text-xs">Not Available</span>
                  )}
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3 text-xs">
                <Clock className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#101010] font-bold">Dispatch &amp; Warehouse Hours:</strong>
                  <span className={contactInfo?.workingHours ? "text-[#343434] font-medium" : "font-mono text-neutral-400 italic text-xs"}>
                    {contactInfo?.workingHours || "Not Available"}
                  </span>
                </div>
              </div>

              {/* Location Hub */}
              <div className="flex items-start gap-3 text-xs">
                <Building2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#101010] font-bold">Corridor &amp; Regional Hub:</strong>
                  <span className={contactInfo?.location ? "text-[#343434] font-medium" : "font-mono text-neutral-400 italic text-xs"}>
                    {contactInfo?.location || "Not Available"}
                  </span>
                </div>
              </div>

              {/* Physical Address */}
              <div className="flex items-start gap-3 text-xs">
                <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#101010] font-bold">Central Distribution Depot Address:</strong>
                  <span className={contactInfo?.adress ? "text-[#343434] font-medium" : "font-mono text-neutral-400 italic text-xs"}>
                    {contactInfo?.adress || "Not Available"}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Direct Trade Inquiry Form */}
          <div className="lg:col-span-7 bg-white border border-[#101010] rounded-xl shadow-lg p-6 sm:p-10">
            <h3 className="font-editorial text-2xl font-bold text-[#101010] mb-1">
              Send a Trade Inquiry
            </h3>
            <p className="text-xs text-[#343434] mb-6 font-medium">
              Fill in your details below and our regional account manager will respond with wholesale catalog proforma within 2 hours.
            </p>

            {submitted ? (
              <div className="p-6 bg-[#F5F0E6] border border-green-600 rounded-lg text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-green-700 mx-auto" />
                <h4 className="font-bold text-sm text-[#101010]">Thank you! Your message has been dispatched.</h4>
                <p className="text-xs text-[#343434]">Our sales desk will call you shortly at {inquiryData.phone}.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-[#101010] mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={inquiryData.name}
                      onChange={(e) => setInquiryData({ ...inquiryData, name: e.target.value })}
                      placeholder="e.g. Mohammed Farooq"
                      className="w-full px-3.5 py-2.5 bg-[#F5F0E6] border border-[#101010]/30 rounded text-xs font-medium focus:border-[#101010] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-[#101010] mb-1">
                      Phone / Mobile *
                    </label>
                    <input
                      type="tel"
                      required
                      value={inquiryData.phone}
                      onChange={(e) => setInquiryData({ ...inquiryData, phone: e.target.value })}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-3.5 py-2.5 bg-[#F5F0E6] border border-[#101010]/30 rounded text-xs font-medium focus:border-[#101010] outline-none"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-[#101010] mb-1">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={inquiryData.email}
                      onChange={(e) => setInquiryData({ ...inquiryData, email: e.target.value })}
                      placeholder="trade@yourdomain.com"
                      className="w-full px-3.5 py-2.5 bg-[#F5F0E6] border border-[#101010]/30 rounded text-xs font-medium focus:border-[#101010] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-[#101010] mb-1">
                      Inquiry Subject
                    </label>
                    <select
                      value={inquiryData.subject}
                      onChange={(e) => setInquiryData({ ...inquiryData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F5F0E6] border border-[#101010]/30 rounded text-xs font-medium focus:border-[#101010] outline-none"
                    >
                      <option value="Wholesale Price List Inquiry">Wholesale Price List Inquiry</option>
                      <option value="Supermarket Daily Supply Contract">Supermarket Daily Supply Contract</option>
                      <option value="Bulk Pallet Container Pricing">Bulk Pallet Container Pricing</option>
                      <option value="Dealership & Territory Rights">Dealership &amp; Territory Rights</option>
                      <option value="Other Commercial Query">Other Commercial Query</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#101010] mb-1">
                    Your Message / SKU Requirements *
                  </label>
                  <textarea
                    required
                    rows="4"
                    value={inquiryData.message}
                    onChange={(e) => setInquiryData({ ...inquiryData, message: e.target.value })}
                    placeholder="List the products or quantities you need delivered to your store..."
                    className="w-full px-3.5 py-2.5 bg-[#F5F0E6] border border-[#101010]/30 rounded text-xs font-medium focus:border-[#101010] outline-none resize-none"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#101010] hover:bg-[#343434] text-[#F5F0E6] text-xs font-black uppercase tracking-wider rounded border border-[#101010] transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-[#D4AF37]" />
                    <span>Send Message to Trade Desk</span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}

