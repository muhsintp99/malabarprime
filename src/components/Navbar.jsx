import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Menu, 
  X, 
  Phone, 
  MessageSquare, 
  Lock
} from 'lucide-react';
import { COMPANY_INFO } from '../data/distributionData';
import { dataService } from '../services/dataService';
import brandNameImg from '../images/Malabar Prime name.png';

// 7 Dedicated Top-Level Pages (Direct page router - No "#" hash, No dropdown lists)
export const NAV_PAGES = [
  { id: 'home', label: 'HOME', path: '/' },
  { id: 'about', label: 'ABOUT US', path: '/about' },
  { id: 'products', label: 'OUR PRODUCTS', path: '/products' },
  { id: 'brands', label: 'OUR BRANDS', path: '/brands' },
  { id: 'distribution', label: 'DISTRIBUTION', path: '/distribution' },
  { id: 'partner', label: 'PARTNER WITH US', path: '/partner' },
  { id: 'contact', label: 'CONTACT US', path: '/contact' }
];

export default function Navbar({ 
  currentPage = 'home',
  onNavigate,
  rfqItemsCount, 
  onOpenRfq, 
  onOpenPartnerModal, 
  onSearchClick
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [contactInfo, setContactInfo] = useState(() => dataService.getCompanyContact());

  useEffect(() => {
    const unsub = dataService.subscribe(() => {
      setContactInfo(dataService.getCompanyContact());
    });
    return unsub;
  }, []);

  const activePhone = contactInfo?.call || COMPANY_INFO.phone;
  const activeWhatsapp = (contactInfo?.whatsapp || COMPANY_INFO.whatsapp || '').replace(/[^0-9]/g, '');

  // Auto-hiding navbar on scroll down, smooth show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show when near top
      if (currentScrollY < 60) {
        setNavVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 120) {
        // Scrolling down -> hide navbar
        if (!mobileMenuOpen) {
          setNavVisible(false);
        }
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up -> show with motion
        setNavVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  const handlePageClick = (pageId) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(pageId);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-[#F5F0E6] border-b border-[#101010] w-full transition-all duration-300 ease-in-out transform ${
      navVisible ? 'translate-y-0 opacity-100 shadow-md' : '-translate-y-full opacity-0 pointer-events-none'
    }`}>
      {/* Top Header Row (Full Bleed Edge-To-Edge) */}
      <div className="w-full">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand Name Graphic */}
          <a 
            href="/"
            onClick={(e) => { e.preventDefault(); handlePageClick('home'); }}
            className="flex items-center gap-3 px-3.5 sm:px-7 h-full border-r border-[#101010] group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded bg-[#101010] p-1 border border-[#D4AF37]/50 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform flex-shrink-0 shadow-sm">
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
                className="h-7 sm:h-8 md:h-9 w-auto object-contain rounded"
              />
              <span className="block text-[8px] font-mono uppercase tracking-[0.24em] text-[#343434] font-semibold mt-0.5">
                Wholesale Distributions
              </span>
            </div>
          </a>

          {/* Middle Search & Direct Sales Line */}
          <div className="hidden md:flex items-center justify-center flex-1 h-full px-6">
            <button 
              onClick={() => {
                handlePageClick('products');
                if (onSearchClick) onSearchClick();
              }}
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#343434] hover:text-[#101010] bg-white/70 border border-[#101010]/30 px-4 py-2 rounded-md hover:border-[#101010] transition-all w-full max-w-md justify-between shadow-sm cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-[#343434]" />
                <span>Search 350+ wholesale SKUs...</span>
              </span>
              <kbd className="font-mono text-[10px] bg-[#F5F0E6] px-1.5 py-0.5 rounded border border-[#101010]/20 text-[#343434]">
                CATALOG
              </kbd>
            </button>
          </div>

          {/* Right Action: Phone Desk, WhatsApp, RFQ Cart & Mobile Hamburger */}
          <div className="flex items-center h-full">
            
            {/* Sales Hotline */}
            <a 
              href={`tel:${activePhone.replace(/\s+/g, '')}`}
              className="hidden lg:flex items-center gap-2 px-5 h-full border-l border-[#101010] text-xs font-bold text-[#101010] hover:bg-[#D4AF37]/10 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#343434]" />
              <span className="font-mono">{activePhone}</span>
            </a>

            {/* WhatsApp Quick Desk */}
            <a
              href={`https://wa.me/${activeWhatsapp}?text=Hello%20Malabar%20Prime%20Distributions%2C%20wholesale%20distribution%20inquiry.`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-4 h-full border-l border-[#101010] text-xs font-bold text-[#101010] hover:bg-[#D4AF37]/20 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#343434]" />
              <span className="hidden xl:inline">WhatsApp Desk</span>
            </a>

            {/* RFQ Cart Trigger */}
            <button
              onClick={onOpenRfq}
              className="flex items-center gap-2.5 px-5 sm:px-8 h-full border-l border-[#101010] bg-[#101010] hover:bg-[#343434] text-[#F5F0E6] text-xs font-bold uppercase tracking-wider transition-colors"
              aria-label="View RFQ Order Quote"
            >
              <span>CART</span>
              <span className="w-5 h-5 rounded-full bg-[#D4AF37] text-[#101010] font-black text-[11px] flex items-center justify-center">
                {rfqItemsCount}
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-3 h-full border-l border-[#101010] text-[#101010] hover:bg-[#D4AF37]/20 flex items-center justify-center"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Solid Royal Gold Horizontal Navigation Bar (Direct Page Router - No Dropdown Lists) */}
      <div className="bg-[#D4AF37] border-y border-[#101010] w-full">
        <nav className="hidden lg:flex items-center justify-between py-1.5 px-4 sm:px-8 text-xs font-black uppercase tracking-wider text-[#101010]">
          
          {/* Direct Page Router Links (No Dropdowns, No Lists) */}
          <div className="flex items-center space-x-1 xl:space-x-1.5">
            {NAV_PAGES.map((page) => {
              const isActive = currentPage === page.id;

              return (
                <a
                  key={page.id}
                  href={page.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageClick(page.id);
                  }}
                  className={`px-3 xl:px-3.5 py-1.5 rounded transition-all text-xs font-black uppercase tracking-wider whitespace-nowrap cursor-pointer inline-flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#101010] text-[#D4AF37] shadow-sm ring-1 ring-[#101010]'
                      : 'text-[#101010] hover:bg-black/15 hover:text-black'
                  }`}
                >
                  <span>{page.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>}
                </a>
              );
            })}
          </div>

          {/* Quick Actions inside Gold Ribbon */}
          <div className="flex items-center gap-2 pl-4">
            <a
              href="/partner"
              onClick={(e) => {
                e.preventDefault();
                handlePageClick('partner');
              }}
              className="px-4 py-1.5 bg-[#101010] text-[#F5F0E6] hover:bg-[#343434] rounded text-[11px] font-bold uppercase tracking-wider transition-colors shadow-sm whitespace-nowrap cursor-pointer inline-block"
            >
              Become a Partner
            </a>

            <a
              href="/admin"
              onClick={(e) => {
                e.preventDefault();
                handlePageClick('admin');
              }}
              className="px-3.5 py-1.5 border border-[#101010] bg-black/10 hover:bg-[#101010] hover:text-[#D4AF37] text-[#101010] rounded text-[11px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
              title="Admin & Commercial Desk Portal"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin</span>
            </a>
          </div>

        </nav>
      </div>

      {/* Mobile Menu Dropdown (Clean Direct Page Links - No Lists) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F5F0E6] border-b border-[#101010] px-4 py-4 space-y-2 max-h-[82vh] overflow-y-auto shadow-xl">
          
          {/* Quick Search in Mobile Menu */}
          <div className="mb-2">
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                handlePageClick('products');
                if (onSearchClick) onSearchClick();
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 bg-white border border-[#101010] rounded text-xs font-semibold text-[#343434]"
            >
              <span className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-[#343434]" />
                <span>Search wholesale catalog...</span>
              </span>
              <kbd className="text-[10px] font-mono bg-[#F5F0E6] px-1.5 py-0.5 rounded border border-[#101010]/20">
                GO
              </kbd>
            </button>
          </div>

          {/* Clean Direct Page Links (No sub-lists) */}
          <nav className="flex flex-col space-y-1 text-xs font-bold uppercase tracking-wider text-[#101010]">
            {NAV_PAGES.map((page) => {
              const isActive = currentPage === page.id;

              return (
                <a
                  key={page.id}
                  href={page.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageClick(page.id);
                  }}
                  className={`w-full text-left py-2.5 px-3 rounded font-black text-sm flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-[#101010] text-[#D4AF37]'
                      : 'hover:bg-[#D4AF37]/20 text-[#101010]'
                  }`}
                >
                  <span>{page.label}</span>
                  {isActive && <span className="text-xs font-mono text-[#D4AF37]">● ACTIVE</span>}
                </a>
              );
            })}
          </nav>

          {/* Quick CTA Actions in Mobile Menu */}
          <div className="pt-3 border-t border-[#101010]/20 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handlePageClick('partner');
              }}
              className="w-full py-2.5 bg-[#101010] text-[#F5F0E6] font-bold text-xs uppercase tracking-wider rounded shadow-sm flex items-center justify-center gap-2"
            >
              <span>Apply to Become a Partner</span>
            </button>
            
            <a
              href="/admin"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                handlePageClick('admin');
              }}
              className="w-full py-2 bg-[#202020] text-[#D4AF37] text-center font-bold text-xs uppercase tracking-wider rounded border border-[#101010] flex items-center justify-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin &amp; Trade Desk Backend</span>
            </a>
          </div>

        </div>
      )}
    </header>
  );
}
