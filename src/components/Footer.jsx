import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  ShieldCheck, 
  ArrowUp,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Clock,
  Layers,
  ThermometerSnowflake,
  ShieldAlert,
  Headphones
} from 'lucide-react';
import { COMPANY_INFO } from '../data/distributionData';
import { dataService } from '../services/dataService';
import BrandWordmark from './BrandWordmark';
import brandNameImg from '../images/Malabar Prime name.png';

export default function Footer({ onOpenPartnerModal, onOpenCatalogModal, onNavigate }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [contactInfo, setContactInfo] = useState(() => dataService.getCompanyContact());

  useEffect(() => {
    const unsub = dataService.subscribe(() => {
      setContactInfo(dataService.getCompanyContact());
    });
    return unsub;
  }, []);

  const activePhone = contactInfo?.call || COMPANY_INFO.phone;
  const activeWhatsapp = (contactInfo?.whatsapp || COMPANY_INFO.whatsapp || '').replace(/[^0-9]/g, '');
  const activeEmail = contactInfo?.email || COMPANY_INFO.salesEmail;
  const activeAddress = contactInfo?.adress || COMPANY_INFO.address;
  const activeEmergency = contactInfo?.emergensy || '+91 9747 888 231';
  const activeSupportEmail = contactInfo?.supportEmail || 'support@malabarprime.com';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setTimeout(() => setNewsletterSubscribed(false), 4000);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#101010] text-[#F5F0E6] pt-16 pb-8 border-t-2 border-[#101010] relative w-full overflow-hidden select-none">
      
      {/* Top Banner inside Footer: Live Status & Weekly Price Alert Subscription */}
      <div className="w-full px-4 sm:px-8 lg:px-12 pb-12 border-b border-[#343434]">
        <div className="grid lg:grid-cols-12 gap-8 items-center justify-between">
          
          <div className="lg:col-span-7 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#343434] text-[#D4AF37] text-[10px] font-mono font-bold uppercase tracking-widest border border-[#D4AF37]/30">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
              <span>Central Dispatch Active • South India Hub Network</span>
            </div>
            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Subscribe to Weekly Commodity &amp; Harvest Price Bulletins
            </h3>
            <p className="text-xs text-[#F5F0E6]/70 max-w-xl font-medium">
              Receive official wholesale price adjustments, seasonal harvest forecasts, and arriving container notifications directly in your trade desk inbox.
            </p>
          </div>

          <div className="lg:col-span-5">
            {newsletterSubscribed ? (
              <div className="p-3.5 bg-[#D4AF37] text-[#101010] rounded border border-[#101010] text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#101010]" />
                <span>Trade Desk Subscribed! Weekly price bulletin activated.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  placeholder="Enter store purchase email..."
                  className="flex-1 px-4 py-3 bg-[#1e1e1e] border border-[#343434] text-xs text-white placeholder-[#F5F0E6]/40 rounded outline-none focus:border-[#D4AF37] font-medium"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-[#D4AF37] hover:bg-[#b39023] text-[#101010] font-black text-xs uppercase tracking-wider rounded border border-[#D4AF37] transition-all flex items-center gap-1.5 flex-shrink-0"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
            <p className="text-[10px] text-[#F5F0E6]/40 font-mono mt-1.5">
              Verified B2B trade contacts only. Zero spam • Unsubscribe anytime.
            </p>
          </div>

        </div>
      </div>

      {/* Main 4-Column Editorial Grid */}
      <div className="w-full px-4 sm:px-8 lg:px-12 py-14 border-b border-[#343434]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-lg bg-[#101010] p-1 border border-[#D4AF37]/50 flex items-center justify-center overflow-hidden shadow-sm flex-shrink-0">
                <img 
                  src="/images/logo.png" 
                  alt="Malabar Prime Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <img 
                  src={brandNameImg} 
                  alt="MALABAR PRIME" 
                  className="h-9 sm:h-10 w-auto object-contain rounded"
                />
                <span className="block text-[9px] font-mono uppercase tracking-[0.22em] text-[#D4AF37] font-semibold mt-0.5">
                  COMMERCIAL WHOLESALE NETWORK
                </span>
              </div>
            </div>

            <p className="text-xs text-[#F5F0E6]/70 leading-relaxed font-medium max-w-sm">
              South India's authorized FMCG and food distribution enterprise connecting top consumer manufacturers directly with 1,450+ retail supermarkets and institutional kitchens.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-mono">
              <span className="bg-[#1e1e1e] border border-[#343434] px-2.5 py-1 rounded text-[#D4AF37]">
                EST. {COMPANY_INFO.established}
              </span>
              <span className="bg-[#1e1e1e] border border-[#343434] px-2.5 py-1 rounded text-[#F5F0E6]/80">
                1,450+ OUTLETS
              </span>
              <span className="bg-[#1e1e1e] border border-[#343434] px-2.5 py-1 rounded text-[#F5F0E6]/80">
                32+ REEFER FLEET
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
              PAGES &amp; SECTIONS
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F5F0E6]/80 font-bold uppercase tracking-wider">
              <li>
                <button 
                  onClick={() => onNavigate ? onNavigate('home') : window.scrollTo({ top: 0, behavior: 'smooth' })} 
                  className="hover:text-[#D4AF37] transition-colors block text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate && onNavigate('about')} 
                  className="hover:text-[#D4AF37] transition-colors block text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate && onNavigate('products')} 
                  className="hover:text-[#D4AF37] transition-colors block text-left"
                >
                  Our Products
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate && onNavigate('brands')} 
                  className="hover:text-[#D4AF37] transition-colors block text-left"
                >
                  Our Brands
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate && onNavigate('distribution')} 
                  className="hover:text-[#D4AF37] transition-colors block text-left"
                >
                  Distribution
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate && onNavigate('partner')} 
                  className="hover:text-[#D4AF37] transition-colors block text-left"
                >
                  Partner With Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate && onNavigate('contact')} 
                  className="hover:text-[#D4AF37] transition-colors block text-left"
                >
                  Contact Us
                </button>
              </li>
              <li className="pt-2 border-t border-[#343434]">
                <button 
                  onClick={() => onNavigate && onNavigate('admin')} 
                  className="text-[#D4AF37] hover:text-white transition-colors block text-left font-mono text-[11px] flex items-center gap-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal, Policy & Refund ("refult") Compliance */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
              TERMS &amp; POLICIES
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F5F0E6]/80 font-semibold">
              <li>
                <button 
                  onClick={() => onNavigate && onNavigate('terms')} 
                  className="hover:text-[#D4AF37] transition-colors block text-left flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                  <span>Terms &amp; Conditions</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate && onNavigate('privacy')} 
                  className="hover:text-[#D4AF37] transition-colors block text-left flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                  <span>Privacy Policy</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate && onNavigate('refund')} 
                  className="hover:text-[#D4AF37] transition-colors block text-left flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                  <span>Refund &amp; Return SLA</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate && onNavigate('shipping')} 
                  className="hover:text-[#D4AF37] transition-colors block text-left flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                  <span>Shipping &amp; Logistics</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate && onNavigate('compliance')} 
                  className="hover:text-[#D4AF37] transition-colors block text-left flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                  <span>Statutory Compliance</span>
                </button>
              </li>
              <li className="pt-2 border-t border-[#343434]">
                <button 
                  onClick={() => onNavigate && onNavigate('legal')} 
                  className="text-[#D4AF37] hover:text-white transition-colors block text-left font-mono text-[10px] uppercase font-bold"
                >
                  View All Policies &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Direct Trade Support */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
              TRADE DESK
            </h4>
            
            <div className="space-y-2.5 text-xs font-medium">
              <a 
                href={`tel:${activePhone.replace(/\s+/g, '')}`} 
                className="flex items-center gap-2.5 text-[#F5F0E6] hover:text-[#D4AF37] transition-colors group"
              >
                <div className="w-7 h-7 rounded bg-[#1e1e1e] border border-[#343434] group-hover:border-[#D4AF37] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                </div>
                <div>
                  <span className="block text-[9px] font-mono text-[#F5F0E6]/50 uppercase">Order Hotline</span>
                  <span className="font-mono font-bold">{activePhone}</span>
                </div>
              </a>

              <a 
                href={`mailto:${activeEmail}`} 
                className="flex items-center gap-2.5 text-[#F5F0E6] hover:text-[#D4AF37] transition-colors group"
              >
                <div className="w-7 h-7 rounded bg-[#1e1e1e] border border-[#343434] group-hover:border-[#D4AF37] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                </div>
                <div>
                  <span className="block text-[9px] font-mono text-[#F5F0E6]/50 uppercase">Purchase Orders (PO)</span>
                  <span className="font-mono font-bold">{activeEmail}</span>
                </div>
              </a>

              <a 
                href={`tel:${activeEmergency.replace(/\s+/g, '')}`} 
                className="flex items-center gap-2.5 text-red-200 hover:text-white transition-colors group"
              >
                <div className="w-7 h-7 rounded bg-red-950/60 border border-red-800/80 group-hover:border-red-500 flex items-center justify-center flex-shrink-0">
                  <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                </div>
                <div>
                  <span className="block text-[9px] font-mono text-red-400 uppercase font-bold">24/7 Reefer Line</span>
                  <span className="font-mono font-bold text-white">{activeEmergency}</span>
                </div>
              </a>

              <div className="flex items-start gap-2.5 text-[#F5F0E6]/70 pt-1">
                <div className="w-7 h-7 rounded bg-[#1e1e1e] border border-[#343434] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                </div>
                <div>
                  <span className="block text-[9px] font-mono text-[#F5F0E6]/50 uppercase">Central Mega Hub</span>
                  <span className="text-[11px] leading-relaxed block">{activeAddress}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Instant B2B WhatsApp & Actions */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
              INSTANT CONNECT
            </h4>

            <a
              href={`https://wa.me/${activeWhatsapp}?text=Hello%20Malabar%20Prime%2C%20wholesale%20distribution%20inquiry.`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 bg-[#1e1e1e] hover:bg-[#D4AF37] hover:text-[#101010] border border-[#343434] hover:border-[#D4AF37] rounded flex items-center gap-3 group text-xs transition-colors"
            >
              <div className="w-9 h-9 rounded bg-[#D4AF37] group-hover:bg-[#101010] flex items-center justify-center text-[#101010] group-hover:text-[#D4AF37] font-bold flex-shrink-0 transition-colors">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold block uppercase text-[11px]">WhatsApp Sales Desk</span>
                <span className="text-[10px] opacity-75 font-mono">Real-time quotes &amp; samples</span>
              </div>
            </a>

            <div className="flex gap-2 pt-1">
              <button
                onClick={onOpenPartnerModal}
                className="flex-1 py-2 px-3 bg-[#343434] hover:bg-[#444444] text-[#F5F0E6] text-[10px] font-mono font-bold uppercase rounded border border-[#343434] transition-colors text-center"
              >
                Become a Partner
              </button>
              <button
                onClick={onOpenCatalogModal}
                className="flex-1 py-2 px-3 bg-transparent hover:bg-white/10 text-[#D4AF37] text-[10px] font-mono font-bold uppercase rounded border border-[#D4AF37]/50 transition-colors text-center"
              >
                Price List (PDF)
              </button>
            </div>

            {/* Certifications Monospace Strip */}
            <div className="p-3 bg-black/50 border border-[#343434] rounded text-[10px] font-mono text-[#F5F0E6]/70 space-y-1">
              <div className="flex items-center gap-1.5 text-white font-bold mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="uppercase tracking-wider">Statutory Licenses</span>
              </div>
              <p>FSSAI: <span className="text-[#D4AF37]">{COMPANY_INFO.fssaiNumber}</span></p>
              <p>GSTIN: <span className="text-white">{COMPANY_INFO.gstNumber}</span></p>
              <p>{COMPANY_INFO.isoCert}</p>
            </div>
          </div>

        </div>
      </div>

      {/* Giant Editorial Watermark Branding (Matching Official MALABAR PRIME™ Name Style) */}
      <div className="w-full px-4 sm:px-8 lg:px-12 pt-10 pb-4 overflow-hidden border-b border-[#343434] text-center">
        <h2 className="font-cinzel text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-wider text-[#1c1c1c] hover:text-[#D4AF37]/30 transition-colors leading-none select-none flex items-center justify-center gap-4 sm:gap-8 flex-wrap">
          <span className="relative">
            MALABAR
            <sup className="text-xl sm:text-2xl font-sans text-[#D4AF37]/40 ml-1">™</sup>
          </span>
          <span className="bg-gradient-to-r from-[#D4AF37]/30 via-[#F3D87E]/40 to-[#B8871B]/30 bg-clip-text text-transparent">
            PRIME
          </span>
        </h2>
      </div>

      {/* Bottom Bar: Legal, Region & Back To Top */}
      <div className="w-full px-4 sm:px-8 lg:px-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-[#F5F0E6]/50 font-medium">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-[#D4AF37] font-mono font-bold uppercase">
            🌐 INDIA • REGIONAL SOUTH TRADE
          </span>
          <span>•</span>
          <p>© {new Date().getFullYear()} Malabar Prime Distributions. All rights reserved.</p>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded bg-[#1e1e1e] hover:bg-[#D4AF37] text-[#F5F0E6] hover:text-[#101010] border border-[#343434] transition-all font-mono font-bold text-[10px] uppercase tracking-wider group"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#D4AF37] group-hover:text-[#101010] transition-colors" />
          </button>
        </div>
      </div>

    </footer>
  );
}
