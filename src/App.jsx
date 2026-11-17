import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import RfqDrawer from './components/RfqDrawer';
import BecomePartnerModal from './components/BecomePartnerModal';
import DownloadCatalogModal from './components/DownloadCatalogModal';
import CustomCursor from './components/CustomCursor';

// Dedicated Page Views (No dropdowns - true multi-page routing)
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import BrandsPage from './pages/BrandsPage';
import DistributionPage from './pages/DistributionPage';
import PartnerPage from './pages/PartnerPage';
import ContactPage from './pages/ContactPage';
import LegalPage from './pages/LegalPage';

// Admin Portal & Backend
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import { dataService } from './services/dataService';

export default function App() {
  // Page Routing State with Clean HTML5 URLs (No "#" hash)
  const parseRouteFromUrl = () => {
    let raw = (window.location.pathname || '').replace(/^\/+/, '').trim();
    if (!raw || raw === 'index.html') {
      const hash = (window.location.hash || '').replace(/^#\/?/, '').trim();
      if (hash) raw = hash;
    }
    const parts = raw.split('/').filter(Boolean);
    const cleanPage = (parts[0] || 'home').toLowerCase();
    const subRoute = parts[1] || null;
    const validPages = [
      'home', 'about', 'products', 'brands', 'distribution', 'partner', 'contact', 
      'admin', 'login', 'terms', 'privacy', 'refund', 'shipping', 'compliance', 'legal'
    ];
    const page = validPages.includes(cleanPage) ? cleanPage : 'home';
    return { page, subRoute };
  };

  const initialRoute = parseRouteFromUrl();
  const [currentPage, setCurrentPage] = useState(initialRoute.page);
  const [partnerType, setPartnerType] = useState('retailer');

  const [rfqItems, setRfqItems] = useState(() => {
    try {
      const saved = localStorage.getItem('mp_rfq_items');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isRfqOpen, setIsRfqOpen] = useState(false);
  const [isPartnerOpen, setIsPartnerOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(initialRoute.page === 'products' && initialRoute.subRoute ? initialRoute.subRoute : 'all');

  // Sync URL on Browser Back / Forward (popstate) and direct link loading
  useEffect(() => {
    const handleLocationChange = () => {
      const { page, subRoute } = parseRouteFromUrl();
      setCurrentPage(page);
      if (page === 'products' && subRoute) {
        setActiveCategory(subRoute);
      } else if (page === 'partner' && subRoute) {
        setPartnerType(subRoute);
      } else if (subRoute) {
        setTimeout(() => {
          const el = document.getElementById(subRoute);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    };

    // Remove any lingering hash from address bar on mount
    if (window.location.hash) {
      const { page, subRoute } = parseRouteFromUrl();
      const cleanPath = page === 'home'
        ? (subRoute ? `/${subRoute}` : '/')
        : (subRoute ? `/${page}/${subRoute}` : `/${page}`);
      window.history.replaceState({ page, subRoute }, '', cleanPath);
    }

    // On initial mount, scroll to subRoute if present
    const { page, subRoute } = parseRouteFromUrl();
    if (page === 'products' && subRoute) {
      setActiveCategory(subRoute);
    } else if (page === 'partner' && subRoute) {
      setPartnerType(subRoute);
    } else if (subRoute) {
      setTimeout(() => {
        const el = document.getElementById(subRoute);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Persist RFQ Cart
  useEffect(() => {
    try {
      localStorage.setItem('mp_rfq_items', JSON.stringify(rfqItems));
    } catch (e) {
      console.error(e);
    }
  }, [rfqItems]);

  const handleNavigate = (pageOrPath, subParam = null) => {
    let page = pageOrPath;
    let sub = subParam;

    if (typeof pageOrPath === 'string') {
      const cleaned = pageOrPath.replace(/^#\/?/, '').replace(/^\/+/, '');
      if (cleaned.includes('/')) {
        const parts = cleaned.split('/').filter(Boolean);
        page = parts[0] || 'home';
        sub = subParam || parts[1] || null;
      } else {
        page = cleaned || 'home';
      }
    }

    const validPages = [
      'home', 'about', 'products', 'brands', 'distribution', 'partner', 'contact', 
      'admin', 'login', 'terms', 'privacy', 'refund', 'shipping', 'compliance', 'legal'
    ];
    const finalPage = validPages.includes(page) ? page : 'home';

    setCurrentPage(finalPage);

    // Build clean URL without "#"
    const targetUrl = finalPage === 'home'
      ? (sub ? `/${sub}` : '/')
      : (sub ? `/${finalPage}/${sub}` : `/${finalPage}`);

    if (window.location.pathname !== targetUrl || window.location.hash) {
      window.history.pushState({ page: finalPage, sub }, '', targetUrl);
    }

    if (finalPage === 'products' && sub) {
      setActiveCategory(sub);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (finalPage === 'partner' && sub) {
      setPartnerType(sub);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sub) {
      setTimeout(() => {
        const el = document.getElementById(sub);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 120);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAddToRfq = (product, quantity = 1) => {
    setRfqItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateQty = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setRfqItems(prev => 
      prev.map(item => 
        item.product.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setRfqItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearRfq = () => {
    setRfqItems([]);
  };

  const totalRfqCount = rfqItems.reduce((acc, item) => acc + item.quantity, 0);

  // Dedicated Admin Authentication Route
  if (currentPage === 'login') {
    return (
      <AdminLoginPage 
        onLoginSuccess={() => handleNavigate('admin')}
        onNavigatePublic={(p) => handleNavigate(p || 'home')}
      />
    );
  }

  // Dedicated Admin Dashboard Route
  if (currentPage === 'admin') {
    if (!dataService.isAuthenticated()) {
      return (
        <AdminLoginPage 
          onLoginSuccess={() => handleNavigate('admin')}
          onNavigatePublic={(p) => handleNavigate(p || 'home')}
        />
      );
    }
    return (
      <AdminDashboard 
        onLogout={() => handleNavigate('login')}
        onNavigatePublic={(p) => handleNavigate(p || 'home')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F0E6] text-[#101010] flex flex-col antialiased selection:bg-[#D4AF37] selection:text-[#101010]">
      {/* Luxury Mouse Follow Dot & Trailing Magnetic Ring */}
      <CustomCursor />

      {/* Editorial Luxury Navigation (Direct Page Links - No Dropdowns) */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        rfqItemsCount={totalRfqCount}
        onOpenRfq={() => setIsRfqOpen(true)}
        onOpenPartnerModal={() => setIsPartnerOpen(true)}
        onOpenCatalogModal={() => setIsCatalogOpen(true)}
      />

      {/* Main Experience (with top padding for fixed smart auto-hiding navbar) */}
      <main className="flex-1 pt-[104px] sm:pt-[124px]">
        {currentPage === 'home' && (
          <HomePage 
            onNavigate={handleNavigate}
            onOpenCatalogModal={() => setIsCatalogOpen(true)}
            onOpenPartnerModal={() => setIsPartnerOpen(true)}
            onQuickView={(p) => setSelectedProduct(p)}
            onAddToRfq={handleAddToRfq}
            rfqItems={rfqItems}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage 
            onNavigate={handleNavigate}
            onOpenPartnerModal={() => setIsPartnerOpen(true)}
          />
        )}

        {currentPage === 'products' && (
          <ProductsPage 
            onQuickView={(p) => setSelectedProduct(p)}
            onAddToRfq={handleAddToRfq}
            rfqItems={rfqItems}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            onOpenCatalogModal={() => setIsCatalogOpen(true)}
          />
        )}

        {currentPage === 'brands' && (
          <BrandsPage 
            onNavigate={handleNavigate}
            onOpenPartnerModal={() => setIsPartnerOpen(true)}
          />
        )}

        {currentPage === 'distribution' && (
          <DistributionPage 
            onNavigate={handleNavigate}
            onOpenPartnerModal={() => setIsPartnerOpen(true)}
          />
        )}

        {currentPage === 'partner' && (
          <PartnerPage initialPartnerType={partnerType} />
        )}

        {currentPage === 'contact' && (
          <ContactPage />
        )}

        {['terms', 'privacy', 'refund', 'shipping', 'compliance', 'legal'].includes(currentPage) && (
          <LegalPage 
            initialPolicy={currentPage === 'legal' ? 'terms' : currentPage} 
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Modern Footer */}
      <Footer 
        onNavigate={handleNavigate}
        onOpenPartnerModal={() => setIsPartnerOpen(true)}
        onOpenCatalogModal={() => setIsCatalogOpen(true)}
      />

      {/* Modals & Drawers */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToRfq={handleAddToRfq}
      />

      <RfqDrawer
        isOpen={isRfqOpen}
        onClose={() => setIsRfqOpen(false)}
        rfqItems={rfqItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearRfq={handleClearRfq}
      />

      <BecomePartnerModal
        isOpen={isPartnerOpen}
        onClose={() => setIsPartnerOpen(false)}
      />

      <DownloadCatalogModal
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
      />
    </div>
  );
}
