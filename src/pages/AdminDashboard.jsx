import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  ShoppingCart, 
  ShieldCheck, 
  Star, 
  Tags, 
  Package, 
  Award, 
  FileText, 
  LogOut, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ExternalLink, 
  Printer, 
  Download, 
  ArrowRight, 
  Store, 
  Truck, 
  Building2, 
  Eye, 
  Send, 
  Sparkles, 
  ChevronRight, 
  Save, 
  RefreshCw,
  Phone,
  Mail,
  MapPin,
  Check,
  X,
  Upload,
  PhoneCall,
  ShieldAlert,
  Headphones,
  Globe,
  Scale,
  ScrollText,
  Lock,
  RotateCcw,
  FilePlus
} from 'lucide-react';
import { dataService, ADMIN_CREDENTIALS } from '../services/dataService';
import BrandWordmark from '../components/BrandWordmark';
import brandNameImg from '../images/Malabar Prime name.png';
import PdfReportView from '../components/admin/PdfReportView';

export default function AdminDashboard({ onLogout, onNavigatePublic }) {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState('overview'); 
  // 'overview', 'partners', 'contacts', 'enquiries', 'assurance', 'testimonials', 'categories', 'products', 'brands', 'pdf'

  // Reactive state from dataService
  const [products, setProducts] = useState(dataService.getProducts());
  const [categories, setCategories] = useState(dataService.getCategories());
  const [brands, setBrands] = useState(dataService.getBrands());
  const [warehouses, setWarehouses] = useState(() => dataService.getWarehouses());
  const [warehouseSavedToast, setWarehouseSavedToast] = useState(false);
  const [enquiries, setEnquiries] = useState(dataService.getEnquiries());
  const [partners, setPartners] = useState(dataService.getPartnerApplications());
  const [contacts, setContacts] = useState(dataService.getContactMessages());
  const [testimonials, setTestimonials] = useState(dataService.getTestimonials());
  const [assurance, setAssurance] = useState(dataService.getAssurance());

  // Product Modal Dynamic Selection States (supports "Other")
  const [productCategoryChoice, setProductCategoryChoice] = useState('');
  const [productWarehouseChoice, setProductWarehouseChoice] = useState('');
  const [productBrandChoice, setProductBrandChoice] = useState('');

  // Search & Filters
  const [globalSearch, setGlobalSearch] = useState('');
  const [partnerTypeFilter, setPartnerTypeFilter] = useState('all');
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState('all');
  const [productCatFilter, setProductCatFilter] = useState('all');
  const [productStockFilter, setProductStockFilter] = useState('all');
  const [brandTypeFilter, setBrandTypeFilter] = useState('all');

  // Modals & Active Edit Entities
  const [modalType, setModalType] = useState(null); // 'product', 'category', 'brand', 'testimonial', 'cert'
  const [editingItem, setEditingItem] = useState(null);
  const [pdfModalConfig, setPdfModalConfig] = useState(null); // { type: 'pricelist' | 'quotation' | 'partners', data: {} }

  // Assurance Form State
  const [assuranceForm, setAssuranceForm] = useState({
    fssaiNumber: assurance.fssaiNumber || '',
    gstNumber: assurance.gstNumber || '',
    isoCert: assurance.isoCert || '',
    coldChainCompliance: assurance.coldChainCompliance || '',
    legalMetrology: assurance.legalMetrology || '',
    labTesting: assurance.labTesting || ''
  });
  const [assuranceSavedToast, setAssuranceSavedToast] = useState(false);

  // Company Contact & Location Settings State
  const [contactForm, setContactForm] = useState(() => dataService.getCompanyContact());
  const [contactSavedToast, setContactSavedToast] = useState(false);

  // Legal & Statutory Policies State (Terms, Privacy, Refund, Shipping, Compliance, Other)
  const [policies, setPolicies] = useState(() => dataService.getPolicies());
  const [selectedPolicyKey, setSelectedPolicyKey] = useState('terms');
  const [policyForm, setPolicyForm] = useState(() => {
    const all = dataService.getPolicies();
    return all.terms ? { ...all.terms } : null;
  });
  const [policySavedToast, setPolicySavedToast] = useState(false);
  const [newPolicyModalOpen, setNewPolicyModalOpen] = useState(false);
  const [newSectionModalOpen, setNewSectionModalOpen] = useState(false);
  const [newSectionData, setNewSectionData] = useState({ number: '', heading: '', content: '' });

  useEffect(() => {
    if (policies && policies[selectedPolicyKey]) {
      setPolicyForm({ ...policies[selectedPolicyKey] });
    }
  }, [selectedPolicyKey, policies]);

  // Image Upload state for Modals
  const [modalImageUrl, setModalImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    if (editingItem) {
      setModalImageUrl(editingItem.image || editingItem.avatar || '');
    } else {
      setModalImageUrl('');
    }
    setUploadError('');

    if (modalType === 'product') {
      if (editingItem) {
        const catExists = categories.some(c => c.id === editingItem.category);
        setProductCategoryChoice(catExists ? editingItem.category : '__other__');

        const whExists = warehouses.some(w => w.name === editingItem.warehouse);
        setProductWarehouseChoice(editingItem.warehouse ? (whExists ? editingItem.warehouse : '__other__') : '');

        const brandExists = brands.some(b => b.name === editingItem.brand);
        setProductBrandChoice(editingItem.brand ? (brandExists ? editingItem.brand : '__other__') : (brands[0]?.name || 'MALABAR PRIME'));
      } else {
        setProductCategoryChoice(categories[0]?.id || 'chocolates');
        setProductWarehouseChoice(warehouses[0]?.name || '');
        setProductBrandChoice(brands[0]?.name || 'MALABAR PRIME');
      }
    }
  }, [modalType, editingItem, categories, warehouses, brands]);

  const handleFileUpload = async (file) => {
    if (!file) return;
    try {
      setIsUploading(true);
      setUploadError('');
      const uploadedUrl = await dataService.uploadFile(file);
      setModalImageUrl(uploadedUrl);
    } catch (err) {
      setUploadError('Upload failed: ' + (err.message || 'Server error'));
    } finally {
      setIsUploading(false);
    }
  };

  // Subscribe to dataService updates
  useEffect(() => {
    const unsubscribe = dataService.subscribe(() => {
      setProducts(dataService.getProducts());
      setCategories(dataService.getCategories());
      setBrands(dataService.getBrands());
      setWarehouses(dataService.getWarehouses());
      setEnquiries(dataService.getEnquiries());
      setPartners(dataService.getPartnerApplications());
      setContacts(dataService.getContactMessages());
      setTestimonials(dataService.getTestimonials());
      const newAssurance = dataService.getAssurance();
      setAssurance(newAssurance);
      setAssuranceForm({
        fssaiNumber: newAssurance.fssaiNumber,
        gstNumber: newAssurance.gstNumber,
        isoCert: newAssurance.isoCert,
        coldChainCompliance: newAssurance.coldChainCompliance,
        legalMetrology: newAssurance.legalMetrology,
        labTesting: newAssurance.labTesting
      });
      setContactForm(dataService.getCompanyContact());
      setPolicies(dataService.getPolicies());
    });
    return unsubscribe;
  }, []);

  const currentUser = dataService.getCurrentUser() || ADMIN_CREDENTIALS;

  const handleLogout = () => {
    dataService.logout();
    if (onLogout) onLogout();
    else {
      window.history.pushState(null, '', '/login');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  // --- STATS OVERVIEW ---
  const stats = useMemo(() => {
    const pendingPartners = partners.filter(p => p.status === 'Pending').length;
    const unreadContacts = contacts.filter(c => c.status === 'Unread').length;
    const newEnquiries = enquiries.filter(e => e.status === 'New').length;
    return {
      totalEnquiries: enquiries.length,
      newEnquiries,
      totalPartners: partners.length,
      pendingPartners,
      totalContacts: contacts.length,
      unreadContacts,
      totalProducts: products.length,
      totalCategories: categories.length,
      totalBrands: brands.length,
      totalWarehouses: warehouses.length
    };
  }, [enquiries, partners, contacts, products, categories, brands, warehouses]);

  // --- ASSURANCE SAVE ---
  const handleSaveAssurance = (e) => {
    e.preventDefault();
    dataService.updateAssurance(assuranceForm);
    setAssuranceSavedToast(true);
    setTimeout(() => setAssuranceSavedToast(false), 3000);
  };

  // --- PRODUCT CRUD MODAL SUBMIT (Supports "Other" for Category, Brand & Warehouse) ---
  const handleProductSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    // Resolve Category
    let finalCategory = form.category?.value;
    if (finalCategory === '__other__') {
      finalCategory = form.customCategory?.value?.trim() || 'Other';
    }

    // Resolve Brand
    let finalBrand = form.brand?.value;
    if (form.brandSelect && form.brandSelect.value === '__other__') {
      finalBrand = form.customBrand?.value?.trim() || 'Other';
    } else if (form.brandSelect && form.brandSelect.value) {
      finalBrand = form.brandSelect.value;
    }

    // Resolve Warehouse & Origin
    let finalWarehouse = '';
    if (form.warehouseSelect) {
      if (form.warehouseSelect.value === '__other__') {
        finalWarehouse = form.customWarehouse?.value?.trim() || '';
      } else {
        finalWarehouse = form.warehouseSelect.value;
      }
    } else if (form.warehouse) {
      finalWarehouse = form.warehouse.value;
    }

    const rawOrigin = form.origin?.value?.trim() || '';
    const finalOrigin = rawOrigin || finalWarehouse || 'Kerala, India';

    const productPayload = {
      name: form.name.value,
      sku: form.sku.value,
      category: finalCategory,
      brand: finalBrand,
      packSize: form.packSize.value,
      moq: form.moq.value,
      wholesaleRange: form.wholesaleRange.value,
      mrp: form.mrp.value,
      stockStatus: form.stockStatus.value,
      shelfLife: form.shelfLife.value,
      origin: finalOrigin,
      warehouse: finalWarehouse || finalOrigin || 'Not Available',
      image: modalImageUrl || form.image?.value || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
      description: form.description.value,
      isFastMoving: form.isFastMoving ? form.isFastMoving.checked : true,
      badge: form.isFastMoving?.checked ? (editingItem?.badge || 'TOP SELLER') : ''
    };

    if (editingItem && editingItem.id) {
      dataService.updateProduct(editingItem.id, productPayload);
    } else {
      dataService.addProduct(productPayload);
    }
    setModalType(null);
    setEditingItem(null);
  };

  // --- WAREHOUSE CRUD MODAL SUBMIT ---
  const handleWarehouseSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const featuresRaw = form.features?.value || '';
    const featuresList = featuresRaw
      .split(/[\n,]+/)
      .map(s => s.trim())
      .filter(Boolean);

    const warehousePayload = {
      name: form.name.value.trim(),
      city: form.city.value.trim(),
      capacity: form.capacity.value.trim(),
      coverage: form.coverage.value.trim(),
      dispatchTime: form.dispatchTime.value.trim(),
      address: form.address?.value?.trim() || '',
      phone: form.phone?.value?.trim() || '',
      email: form.email?.value?.trim() || '',
      features: featuresList.length > 0 ? featuresList : ['Standard WMS storage', 'Fleet access']
    };

    if (editingItem && editingItem.id) {
      dataService.updateWarehouse(editingItem.id, warehousePayload);
    } else {
      dataService.addWarehouse(warehousePayload);
    }
    setModalType(null);
    setEditingItem(null);
    setWarehouseSavedToast(true);
    setTimeout(() => setWarehouseSavedToast(false), 3000);
  };

  // --- CATEGORY CRUD MODAL SUBMIT ---
  const handleCategorySubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const catPayload = {
      id: form.slug.value.toLowerCase().trim().replace(/[^a-z0-9]/g, '-'),
      name: form.name.value,
      description: form.description.value,
      icon: form.icon.value || 'Package'
    };

    if (editingItem && editingItem.id) {
      dataService.updateCategory(editingItem.id, catPayload);
    } else {
      dataService.addCategory(catPayload);
    }
    setModalType(null);
    setEditingItem(null);
  };

  // --- BRAND CRUD MODAL SUBMIT ---
  const handleBrandSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const brandPayload = {
      name: form.name.value,
      category: form.category.value,
      type: form.type.value,
      tier: form.tier.value,
      skus: form.skus.value,
      tag: form.tag.value,
      image: modalImageUrl || form.image?.value || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
      description: form.description.value
    };

    if (editingItem && editingItem.id) {
      dataService.updateBrand(editingItem.id, brandPayload);
    } else {
      dataService.addBrand(brandPayload);
    }
    setModalType(null);
    setEditingItem(null);
  };

  // --- TESTIMONIAL CRUD MODAL SUBMIT ---
  const handleTestimonialSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const testPayload = {
      name: form.name.value,
      title: form.title.value,
      company: form.company.value,
      outlets: form.outlets.value,
      category: form.category.value,
      badge: form.badge.value,
      avatar: modalImageUrl || form.avatar?.value || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      quote: form.quote.value,
      rating: parseInt(form.rating.value) || 5,
      status: form.status.value || 'Active'
    };

    if (editingItem && editingItem.id) {
      dataService.updateTestimonial(editingItem.id, testPayload);
    } else {
      dataService.addTestimonial(testPayload);
    }
    setModalType(null);
    setEditingItem(null);
  };

  // --- CERTIFICATION CRUD MODAL SUBMIT ---
  const handleCertSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const certPayload = {
      title: form.title.value,
      issuer: form.issuer.value,
      standard: form.standard.value,
      validTill: form.validTill.value,
      desc: form.desc.value
    };
    dataService.addCertification(certPayload);
    setModalType(null);
  };

  // --- COMPANY CONTACT & LOCATION SUBMIT ---
  const handleSaveContact = (e) => {
    e.preventDefault();
    dataService.updateCompanyContact(contactForm);
    setContactSavedToast(true);
    setTimeout(() => setContactSavedToast(false), 3500);
  };

  // --- TERMS & POLICIES SUBMIT & EDIT HANDLERS ---
  const handleSavePolicy = (e) => {
    if (e) e.preventDefault();
    if (!policyForm || !selectedPolicyKey) return;
    dataService.updatePolicy(selectedPolicyKey, policyForm);
    setPolicySavedToast(true);
    setTimeout(() => setPolicySavedToast(false), 3500);
  };

  const handleAddSection = (e) => {
    e.preventDefault();
    if (!newSectionData.heading.trim() || !newSectionData.content.trim()) return;
    const currentSections = policyForm.sections || [];
    const nextNumber = String(currentSections.length + 1).padStart(2, '0');
    const newSec = {
      number: newSectionData.number.trim() || nextNumber,
      heading: newSectionData.heading.trim(),
      content: newSectionData.content.trim()
    };
    const updatedSections = [...currentSections, newSec];
    const updatedForm = { ...policyForm, sections: updatedSections };
    setPolicyForm(updatedForm);
    dataService.updatePolicy(selectedPolicyKey, updatedForm);
    setNewSectionModalOpen(false);
    setNewSectionData({ number: '', heading: '', content: '' });
    setPolicySavedToast(true);
    setTimeout(() => setPolicySavedToast(false), 3500);
  };

  const handleDeleteSection = (idx) => {
    if (!confirm('Remove this clause/section from the policy?')) return;
    const currentSections = [...(policyForm.sections || [])];
    currentSections.splice(idx, 1);
    const updatedForm = { ...policyForm, sections: currentSections };
    setPolicyForm(updatedForm);
    dataService.updatePolicy(selectedPolicyKey, updatedForm);
    setPolicySavedToast(true);
    setTimeout(() => setPolicySavedToast(false), 3500);
  };

  const handleSectionTextChange = (idx, field, value) => {
    const currentSections = [...(policyForm.sections || [])];
    currentSections[idx] = { ...currentSections[idx], [field]: value };
    setPolicyForm({ ...policyForm, sections: currentSections });
  };

  const handleCreateCustomPolicy = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value.trim();
    const shortTitle = form.shortTitle.value.trim() || title;
    const badge = form.badge.value.trim() || 'STATUTORY POLICY';
    const description = form.description.value.trim();
    const firstClauseHeading = form.firstClauseHeading.value.trim() || 'General Scope';
    const firstClauseContent = form.firstClauseContent.value.trim() || 'This policy governs wholesale distribution standards and partner compliance.';

    const newPol = dataService.addPolicy({
      title,
      shortTitle,
      badge,
      description,
      sections: [
        {
          number: '01',
          heading: firstClauseHeading,
          content: firstClauseContent
        }
      ]
    });
    setNewPolicyModalOpen(false);
    setSelectedPolicyKey(newPol.id);
    setPolicySavedToast(true);
    setTimeout(() => setPolicySavedToast(false), 3500);
  };

  const handleDeletePolicy = (key) => {
    if (!confirm(`Are you sure you want to delete policy '${policies[key]?.title || key}'?`)) return;
    dataService.deletePolicy(key);
    setSelectedPolicyKey('terms');
  };

  const handleResetPolicies = () => {
    if (!confirm('Reset all policies to factory default statutory terms? Any custom clauses will be restored.')) return;
    dataService.resetPolicies();
    setSelectedPolicyKey('terms');
    setPolicySavedToast(true);
    setTimeout(() => setPolicySavedToast(false), 3500);
  };

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-[#F5F0E6] flex flex-col antialiased selection:bg-[#D4AF37] selection:text-[#101010]">
      
      {/* ---------------- TOP GLOBAL ADMIN BAR ---------------- */}
      <header className="sticky top-0 z-40 bg-[#141414] border-b border-[#2C2C2C] px-4 sm:px-8 py-2.5 sm:py-3 flex items-center justify-between shadow-lg">
        
        {/* Brand & Portal Identity (Official Logo Emblem & Name Image) */}
        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigatePublic) onNavigatePublic('home');
              else {
                window.history.pushState(null, '', '/');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }
            }}
            className="flex items-center gap-2.5 sm:gap-3.5 group cursor-pointer"
            title="Malabar Prime - Return to Public Storefront"
          >
            {/* Logo Emblem */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-[#101010] p-1 border border-[#D4AF37]/70 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-md group-hover:border-[#D4AF37] transition-all">
              <img 
                src="/images/logo.png" 
                alt="Malabar Prime Logo" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
              />
            </div>

            {/* Official Brand Name Image Graphic */}
            <div className="flex flex-col justify-center">
              <img 
                src={brandNameImg} 
                alt="MALABAR PRIME" 
                className="h-7 sm:h-8 md:h-9 w-auto object-contain rounded brightness-110 drop-shadow-sm group-hover:brightness-125 transition-all" 
              />
              <span className="block text-[8px] font-mono uppercase tracking-[0.24em] text-[#D4AF37] font-semibold mt-0.5">
                Trade Desk Console
              </span>
            </div>
          </a>

          <div className="hidden md:block h-6 w-px bg-[#343434]"></div>
          
          <div className="hidden md:flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D4AF37] px-2.5 py-1 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>LIVE DESK BACKEND</span>
            </span>
          </div>
        </div>

        {/* Right Tools: View Live Site, User Info, Logout */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (onNavigatePublic) onNavigatePublic('home');
              else {
                window.history.pushState(null, '', '/');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }
            }}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#202020] hover:bg-[#2A2A2A] text-xs font-mono text-[#F5F0E6]/80 hover:text-[#D4AF37] transition-colors border border-[#343434]"
            title="Open customer-facing website"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Public Site</span>
            <ExternalLink className="w-3 h-3 text-[#D4AF37]" />
          </button>

          <div className="h-4 w-px bg-[#343434] hidden sm:block"></div>

          {/* Admin Profile Chip */}
          <div className="flex items-center gap-2 pl-2">
            <div className="w-7 h-7 rounded-full bg-[#D4AF37] text-[#101010] flex items-center justify-center font-bold text-xs">
              M
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-xs font-bold text-white leading-none">malabarprime.co@gmail.com</div>
              <div className="text-[10px] font-mono text-[#D4AF37]">Super Administrator</div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-200 border border-red-800/50 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Log out of admin session"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>

      </header>

      {/* ---------------- MAIN ADMIN SHELL ---------------- */}
      <div className="flex-1 flex flex-col md:flex-row min-h-[calc(100vh-64px)]">
        
        {/* SIDEBAR NAVIGATION (Sticky on desktop, horizontal scroll-safe on mobile with custom luxury scroll design) */}
        <aside className="w-full md:w-64 bg-[#141414] border-r border-[#2C2C2C] p-3 md:pb-24 flex md:flex-col justify-start gap-1.5 overflow-x-auto md:overflow-y-auto md:sticky md:top-[64px] md:h-[calc(100vh-64px)] flex-shrink-0 z-30 admin-sidebar-scroll hide-horizontal-scrollbar">
          
          {/* GROUP 1: OPERATIONS */}
          <div className="hidden md:flex items-center justify-between px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] font-bold">
            <span>Operations &amp; Orders</span>
          </div>

          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-shrink-0 md:w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'overview'
                ? 'bg-[#D4AF37] text-[#101010] font-bold shadow-md'
                : 'text-[#F5F0E6]/70 hover:bg-[#202020] hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <LayoutDashboard className="w-4 h-4 flex-shrink-0" />
              <span className="whitespace-nowrap">Overview</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`flex-shrink-0 md:w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'enquiries'
                ? 'bg-[#D4AF37] text-[#101010] font-bold shadow-md'
                : 'text-[#F5F0E6]/70 hover:bg-[#202020] hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ShoppingCart className="w-4 h-4 flex-shrink-0" />
              <span className="whitespace-nowrap">Enquiries (RFQs)</span>
            </div>
            {stats.newEnquiries > 0 && (
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold ml-2 ${
                activeTab === 'enquiries' ? 'bg-[#101010] text-[#D4AF37]' : 'bg-[#D4AF37] text-[#101010]'
              }`}>
                {stats.newEnquiries}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('partners')}
            className={`flex-shrink-0 md:w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'partners'
                ? 'bg-[#D4AF37] text-[#101010] font-bold shadow-md'
                : 'text-[#F5F0E6]/70 hover:bg-[#202020] hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4 flex-shrink-0" />
              <span className="whitespace-nowrap">Partner Onboarding</span>
            </div>
            {stats.pendingPartners > 0 && (
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold ml-2 ${
                activeTab === 'partners' ? 'bg-[#101010] text-[#D4AF37]' : 'bg-[#D4AF37] text-[#101010]'
              }`}>
                {stats.pendingPartners}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('contacts')}
            className={`flex-shrink-0 md:w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'contacts'
                ? 'bg-[#D4AF37] text-[#101010] font-bold shadow-md'
                : 'text-[#F5F0E6]/70 hover:bg-[#202020] hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <MessageSquare className="w-4 h-4 flex-shrink-0" />
              <span className="whitespace-nowrap">Contact Messages</span>
            </div>
            {stats.unreadContacts > 0 && (
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold ml-2 ${
                activeTab === 'contacts' ? 'bg-[#101010] text-[#D4AF37]' : 'bg-[#D4AF37] text-[#101010]'
              }`}>
                {stats.unreadContacts}
              </span>
            )}
          </button>

          {/* GROUP 2: MASTER CATALOG */}
          <div className="hidden md:block my-2 h-px bg-[#262626]"></div>
          <div className="hidden md:flex items-center justify-between px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] font-bold">
            <span>Master Catalog</span>
          </div>

          <button
            onClick={() => setActiveTab('products')}
            className={`flex-shrink-0 md:w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'products'
                ? 'bg-[#D4AF37] text-[#101010] font-bold shadow-md'
                : 'text-[#F5F0E6]/70 hover:bg-[#202020] hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Package className="w-4 h-4 flex-shrink-0" />
              <span className="whitespace-nowrap">Products (SKUs)</span>
            </div>
            <span className="text-[10px] font-mono opacity-60 ml-2">{stats.totalProducts}</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`flex-shrink-0 md:w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'categories'
                ? 'bg-[#D4AF37] text-[#101010] font-bold shadow-md'
                : 'text-[#F5F0E6]/70 hover:bg-[#202020] hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Tags className="w-4 h-4 flex-shrink-0" />
              <span className="whitespace-nowrap">Categories</span>
            </div>
            <span className="text-[10px] font-mono opacity-60 ml-2">{stats.totalCategories}</span>
          </button>

          <button
            onClick={() => setActiveTab('brands')}
            className={`flex-shrink-0 md:w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'brands'
                ? 'bg-[#D4AF37] text-[#101010] font-bold shadow-md'
                : 'text-[#F5F0E6]/70 hover:bg-[#202020] hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Award className="w-4 h-4 flex-shrink-0" />
              <span className="whitespace-nowrap">Brands</span>
            </div>
            <span className="text-[10px] font-mono opacity-60 ml-2">{stats.totalBrands}</span>
          </button>

          <button
            onClick={() => setActiveTab('warehouses')}
            className={`flex-shrink-0 md:w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'warehouses'
                ? 'bg-[#D4AF37] text-[#101010] font-bold shadow-md'
                : 'text-[#F5F0E6]/70 hover:bg-[#202020] hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Building2 className="w-4 h-4 flex-shrink-0" />
              <span className="whitespace-nowrap">Warehouses &amp; Hubs</span>
            </div>
            <span className="text-[10px] font-mono opacity-60 ml-2">{warehouses.length}</span>
          </button>

          {/* GROUP 3: LEGAL & GOVERNANCE */}
          <div className="hidden md:block my-2 h-px bg-[#262626]"></div>
          <div className="hidden md:flex items-center justify-between px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] font-bold">
            <span>Legal &amp; Policies</span>
          </div>

          <button
            onClick={() => setActiveTab('policies')}
            className={`flex-shrink-0 md:w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'policies'
                ? 'bg-[#D4AF37] text-[#101010] font-bold shadow-md'
                : 'text-[#F5F0E6]/70 hover:bg-[#202020] hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Scale className="w-4 h-4 flex-shrink-0" />
              <span className="whitespace-nowrap">Terms &amp; Policies</span>
            </div>
            <span className="text-[9px] font-mono uppercase bg-[#D4AF37]/20 text-[#D4AF37] px-1.5 py-0.5 rounded font-bold ml-2">
              {Object.keys(policies).length} Active
            </span>
          </button>

          <button
            onClick={() => setActiveTab('assurance')}
            className={`flex-shrink-0 md:w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'assurance'
                ? 'bg-[#D4AF37] text-[#101010] font-bold shadow-md'
                : 'text-[#F5F0E6]/70 hover:bg-[#202020] hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span className="whitespace-nowrap">Assurance &amp; FSSAI</span>
            </div>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold border border-emerald-800 ml-2">
              Verified
            </span>
          </button>

          {/* GROUP 4: CORPORATE & EXPORTS */}
          <div className="hidden md:block my-2 h-px bg-[#262626]"></div>
          <div className="hidden md:flex items-center justify-between px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] font-bold">
            <span>Corporate Desk</span>
          </div>

          <button
            onClick={() => setActiveTab('company-contact')}
            className={`flex-shrink-0 md:w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'company-contact'
                ? 'bg-[#D4AF37] text-[#101010] font-bold shadow-md'
                : 'text-[#F5F0E6]/70 hover:bg-[#202020] hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <PhoneCall className="w-4 h-4 flex-shrink-0" />
              <span className="whitespace-nowrap">Contact &amp; Location</span>
            </div>
            <span className="text-[9px] font-mono uppercase bg-[#D4AF37]/20 text-[#D4AF37] px-1.5 py-0.5 rounded font-bold ml-2">
              8 Fields
            </span>
          </button>

          <button
            onClick={() => setActiveTab('testimonials')}
            className={`flex-shrink-0 md:w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'testimonials'
                ? 'bg-[#D4AF37] text-[#101010] font-bold shadow-md'
                : 'text-[#F5F0E6]/70 hover:bg-[#202020] hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Star className="w-4 h-4 flex-shrink-0" />
              <span className="whitespace-nowrap">Testimonials</span>
            </div>
            <span className="text-[10px] font-mono opacity-60 ml-2">{testimonials.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('pdf')}
            className={`flex-shrink-0 md:w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'pdf'
                ? 'bg-[#D4AF37] text-[#101010] font-bold shadow-md'
                : 'text-[#F5F0E6]/70 hover:bg-[#202020] hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 flex-shrink-0" />
              <span className="whitespace-nowrap">PDF Exports</span>
            </div>
            <span className="text-[9px] font-mono uppercase bg-[#D4AF37]/20 text-[#D4AF37] px-1.5 py-0.5 rounded font-bold ml-2">PDF</span>
          </button>

        </aside>

        {/* CONTENT VIEW AREA */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto min-w-0 max-w-7xl mx-auto w-full admin-scroll">
          
          {/* ---------------- 1. OVERVIEW TAB ---------------- */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Header Title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2C2C2C]">
                <div>
                  <h1 className="font-editorial text-2xl sm:text-3xl font-black text-white">
                    Operations Dashboard
                  </h1>
                  <p className="text-xs text-[#F5F0E6]/60 font-medium">
                    Centralized trade telemetry, partner registrations, wholesale quotation funnel, and statutory compliance status.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPdfModalConfig({ type: 'pricelist', data: { products } })}
                    className="px-3.5 py-2 bg-[#D4AF37] hover:bg-[#b89528] text-[#101010] text-xs font-bold font-mono rounded-lg flex items-center gap-1.5 shadow transition-colors"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Price List (PDF)</span>
                  </button>
                  <button
                    onClick={() => { setEditingItem(null); setModalType('product'); }}
                    className="px-3.5 py-2 bg-[#202020] hover:bg-[#2c2c2c] text-white text-xs font-bold font-mono rounded-lg border border-[#343434] flex items-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-4 h-4 text-[#D4AF37]" />
                    <span>Add New SKU</span>
                  </button>
                </div>
              </div>

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="p-5 rounded-xl bg-[#141414] border border-[#2C2C2C] shadow">
                  <div className="flex items-center justify-between text-[#F5F0E6]/60 mb-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider">Wholesale Enquiries</span>
                    <ShoppingCart className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <div className="text-3xl font-black text-white font-mono">{stats.totalEnquiries}</div>
                  <div className="text-[10px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>{stats.newEnquiries} New Quotations Pending</span>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-[#141414] border border-[#2C2C2C] shadow">
                  <div className="flex items-center justify-between text-[#F5F0E6]/60 mb-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider">Partner Onboarding</span>
                    <Users className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <div className="text-3xl font-black text-white font-mono">{stats.totalPartners}</div>
                  <div className="text-[10px] font-mono text-amber-400 mt-1 flex items-center gap-1">
                    <span>{stats.pendingPartners} Applications Awaiting Review</span>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-[#141414] border border-[#2C2C2C] shadow">
                  <div className="flex items-center justify-between text-[#F5F0E6]/60 mb-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider">Active SKUs</span>
                    <Package className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <div className="text-3xl font-black text-white font-mono">{stats.totalProducts}</div>
                  <div className="text-[10px] font-mono text-[#F5F0E6]/50 mt-1">
                    Across {stats.totalCategories} Categories &bull; {stats.totalBrands} Brands
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-[#141414] border border-[#2C2C2C] shadow">
                  <div className="flex items-center justify-between text-[#F5F0E6]/60 mb-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider">Statutory Health</span>
                    <ShieldCheck className={`w-4 h-4 ${assurance.fssaiNumber || assurance.gstNumber ? 'text-emerald-400' : 'text-neutral-500'}`} />
                  </div>
                  <div className="text-lg font-bold text-white font-mono">
                    {assurance.fssaiNumber || assurance.gstNumber ? 'FSSAI & GST Active' : 'Licenses: Not Available'}
                  </div>
                  <div className={`text-[10px] font-mono mt-1 ${assurance.fssaiNumber ? 'text-emerald-400' : 'text-neutral-500 italic'}`}>
                    Lic: {assurance.fssaiNumber || 'Not Available'}
                  </div>
                </div>

              </div>

              {/* Two Column Section: Recent RFQs & Recent Partners */}
              <div className="grid lg:grid-cols-2 gap-6">
                
                {/* Recent RFQs */}
                <div className="bg-[#141414] border border-[#2C2C2C] rounded-xl p-5 shadow">
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#262626]">
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4 text-[#D4AF37]" />
                      <h3 className="font-bold text-sm text-white">Recent Trade RFQs</h3>
                    </div>
                    <button
                      onClick={() => setActiveTab('enquiries')}
                      className="text-xs font-mono text-[#D4AF37] hover:underline flex items-center gap-1"
                    >
                      <span>View All ({enquiries.length})</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {enquiries.slice(0, 3).map((rfq) => (
                      <div key={rfq.id} className="p-3.5 bg-[#1C1C1C] border border-[#2C2C2C] rounded-lg flex items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-[10px] font-bold text-[#D4AF37]">{rfq.id}</span>
                            <span className={`text-[9px] font-mono px-2 py-0.5 rounded uppercase font-bold ${
                              rfq.status === 'New' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                              rfq.status === 'Quoted' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                              'bg-gray-800 text-gray-300'
                            }`}>
                              {rfq.status}
                            </span>
                          </div>
                          <div className="font-bold text-xs text-white">{rfq.buyerCompany}</div>
                          <div className="text-[11px] text-[#F5F0E6]/60">{rfq.items?.length || 1} SKUs &bull; {rfq.totalCases || 25} Master Cartons</div>
                        </div>

                        <button
                          onClick={() => setPdfModalConfig({ type: 'quotation', data: { rfq } })}
                          className="px-2.5 py-1.5 bg-[#262626] hover:bg-[#D4AF37] hover:text-[#101010] text-[#F5F0E6] text-[10px] font-mono font-bold rounded flex items-center gap-1 transition-colors"
                          title="Generate Proforma PDF"
                        >
                          <Printer className="w-3 h-3" />
                          <span>PDF</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Partner Applications */}
                <div className="bg-[#141414] border border-[#2C2C2C] rounded-xl p-5 shadow">
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#262626]">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#D4AF37]" />
                      <h3 className="font-bold text-sm text-white">Recent Partner Onboarding</h3>
                    </div>
                    <button
                      onClick={() => setActiveTab('partners')}
                      className="text-xs font-mono text-[#D4AF37] hover:underline flex items-center gap-1"
                    >
                      <span>View All ({partners.length})</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {partners.slice(0, 3).map((p) => (
                      <div key={p.id} className="p-3.5 bg-[#1C1C1C] border border-[#2C2C2C] rounded-lg flex items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-[10px] font-bold text-[#D4AF37]">{p.refCode}</span>
                            <span className={`text-[9px] font-mono px-2 py-0.5 rounded capitalize font-bold ${
                              p.status === 'Approved' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                              p.status === 'Pending' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                              'bg-gray-800 text-gray-300'
                            }`}>
                              {p.status}
                            </span>
                          </div>
                          <div className="font-bold text-xs text-white">{p.businessName}</div>
                          <div className="text-[11px] text-[#F5F0E6]/60 capitalize">{p.type} &bull; {p.city}</div>
                        </div>

                        <button
                          onClick={() => setActiveTab('partners')}
                          className="px-2.5 py-1.5 bg-[#262626] hover:bg-[#343434] text-[#F5F0E6] text-[10px] font-mono font-bold rounded flex items-center gap-1 transition-colors"
                        >
                          <span>Review</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ---------------- 2. PARTNER APPLICATIONS TAB ---------------- */}
          {activeTab === 'partners' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2C2C2C]">
                <div>
                  <h1 className="font-editorial text-2xl sm:text-3xl font-black text-white">
                    Partner Applications &amp; Dealership Registry
                  </h1>
                  <p className="text-xs text-[#F5F0E6]/60 font-medium">
                    Review and verify applications from retail supermarkets, territory distributors, and manufacturers.
                  </p>
                </div>

                <button
                  onClick={() => setPdfModalConfig({ type: 'partners', data: { partners } })}
                  className="px-3.5 py-2 bg-[#D4AF37] hover:bg-[#b89528] text-[#101010] text-xs font-bold font-mono rounded-lg flex items-center gap-1.5 shadow transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Export Partner Registry (PDF)</span>
                </button>
              </div>

              {/* Filters & Search */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1 bg-[#141414] p-1 rounded-lg border border-[#2C2C2C]">
                  {['all', 'retailer', 'distributor', 'supplier'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setPartnerTypeFilter(type)}
                      className={`px-3 py-1.5 rounded-md text-xs font-mono capitalize transition-colors ${
                        partnerTypeFilter === type
                          ? 'bg-[#D4AF37] text-[#101010] font-bold'
                          : 'text-[#F5F0E6]/70 hover:text-white'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                <div className="relative flex-1 min-w-[200px]">
                  <Search className="w-3.5 h-3.5 text-[#F5F0E6]/40 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={globalSearch}
                    onChange={(e) => setGlobalSearch(e.target.value)}
                    placeholder="Search by business name, city, ref code..."
                    className="w-full pl-9 pr-3 py-2 bg-[#141414] border border-[#2C2C2C] rounded-lg text-xs font-mono text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Partners Table */}
              <div className="bg-[#141414] border border-[#2C2C2C] rounded-xl overflow-hidden shadow">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-[#1C1C1C] border-b border-[#2C2C2C] font-mono text-[10px] uppercase text-[#F5F0E6]/60">
                        <th className="p-3.5">Ref Code</th>
                        <th className="p-3.5">Business Name &amp; GST</th>
                        <th className="p-3.5">Contact Person</th>
                        <th className="p-3.5">City / Territory</th>
                        <th className="p-3.5">Partner Type</th>
                        <th className="p-3.5">Volume Slab</th>
                        <th className="p-3.5 text-center">Status</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#262626]">
                      {partners
                        .filter(p => partnerTypeFilter === 'all' || p.type === partnerTypeFilter)
                        .filter(p => !globalSearch || (
                          p.businessName?.toLowerCase().includes(globalSearch.toLowerCase()) ||
                          p.city?.toLowerCase().includes(globalSearch.toLowerCase()) ||
                          p.refCode?.toLowerCase().includes(globalSearch.toLowerCase())
                        ))
                        .map((p) => (
                          <tr key={p.id} className="hover:bg-[#1A1A1A] transition-colors">
                            <td className="p-3.5 font-mono text-[11px] font-bold text-[#D4AF37] whitespace-nowrap">
                              {p.refCode}
                            </td>
                            <td className="p-3.5">
                              <div className="font-bold text-white">{p.businessName}</div>
                              <div className="text-[10px] font-mono text-[#F5F0E6]/50">GSTIN: {p.gstin || 'N/A'}</div>
                            </td>
                            <td className="p-3.5">
                              <div>{p.contactPerson}</div>
                              <div className="text-[10px] font-mono text-[#F5F0E6]/50">{p.phone}</div>
                            </td>
                            <td className="p-3.5 font-medium">{p.city}</td>
                            <td className="p-3.5">
                              <span className="px-2 py-0.5 rounded font-mono text-[10px] uppercase bg-[#262626] border border-[#343434] text-[#F5F0E6]">
                                {p.type}
                              </span>
                            </td>
                            <td className="p-3.5 font-mono text-[11px] text-[#F5F0E6]/70">
                              {p.estimatedMonthlyVolume}
                            </td>
                            <td className="p-3.5 text-center">
                              <select
                                value={p.status}
                                onChange={(e) => dataService.updatePartnerStatus(p.id, e.target.value)}
                                className={`px-2 py-1 rounded text-[10px] font-mono font-bold uppercase border focus:outline-none cursor-pointer ${
                                  p.status === 'Approved' ? 'bg-emerald-950 text-emerald-400 border-emerald-800' :
                                  p.status === 'Reviewing' ? 'bg-amber-950 text-amber-400 border-amber-800' :
                                  p.status === 'Declined' ? 'bg-red-950 text-red-400 border-red-800' :
                                  'bg-blue-950 text-blue-400 border-blue-800'
                                }`}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Reviewing">Reviewing</option>
                                <option value="Approved">Approved</option>
                                <option value="Declined">Declined</option>
                              </select>
                            </td>
                            <td className="p-3.5 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1.5">
                                {p.phone && (
                                  <a
                                    href={`https://wa.me/${p.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(p.businessName)}%2C%20regarding%20your%20Malabar%20Prime%20partner%20application%20(${p.refCode}).`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 bg-[#202020] hover:bg-emerald-700 text-emerald-400 hover:text-white rounded transition-colors"
                                    title="Contact via WhatsApp"
                                  >
                                    <MessageSquare className="w-3.5 h-3.5" />
                                  </a>
                                )}
                                <button
                                  onClick={() => {
                                    if (confirm(`Delete application for ${p.businessName}?`)) {
                                      dataService.deletePartnerApplication(p.id);
                                    }
                                  }}
                                  className="p-1.5 bg-[#202020] hover:bg-red-900 text-red-400 hover:text-white rounded transition-colors"
                                  title="Delete record"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ---------------- 3. CONTACT MESSAGES TAB ---------------- */}
          {activeTab === 'contacts' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2C2C2C]">
                <div>
                  <h1 className="font-editorial text-2xl sm:text-3xl font-black text-white">
                    Contact Us Inquiries
                  </h1>
                  <p className="text-xs text-[#F5F0E6]/60 font-medium">
                    Messages received through the central trade desk contact form.
                  </p>
                </div>
              </div>

              <div className="grid gap-4">
                {contacts.map((msg) => (
                  <div key={msg.id} className="p-5 bg-[#141414] border border-[#2C2C2C] rounded-xl shadow space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#262626] pb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-sm text-white">{msg.name}</span>
                          <span className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                            msg.status === 'Unread' ? 'bg-amber-950 text-amber-400 border border-amber-800' : 'bg-gray-800 text-gray-300'
                          }`}>
                            {msg.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#F5F0E6]/60 font-mono">
                          <span>Phone: {msg.phone}</span>
                          <span>&bull;</span>
                          <span>Email: {msg.email}</span>
                          <span>&bull;</span>
                          <span>{msg.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={msg.status}
                          onChange={(e) => dataService.updateContactStatus(msg.id, e.target.value)}
                          className="px-2.5 py-1 bg-[#202020] border border-[#343434] rounded text-xs font-mono text-white focus:outline-none"
                        >
                          <option value="Unread">Mark as Unread</option>
                          <option value="Replied">Mark as Replied</option>
                        </select>

                        {msg.email && (
                          <a
                            href={`mailto:${msg.email}?subject=RE: ${encodeURIComponent(msg.subject || 'Malabar Prime Wholesale Inquiry')}`}
                            className="px-2.5 py-1 bg-[#D4AF37] hover:bg-[#b89528] text-[#101010] text-xs font-mono font-bold rounded flex items-center gap-1 transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Reply</span>
                          </a>
                        )}

                        <button
                          onClick={() => {
                            if (confirm('Delete this message?')) {
                              dataService.deleteContactMessage(msg.id);
                            }
                          }}
                          className="p-1.5 bg-[#202020] hover:bg-red-900 text-red-400 hover:text-white rounded transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="font-mono text-xs font-bold text-[#D4AF37] mb-1">
                        Subject: {msg.subject}
                      </div>
                      <p className="text-xs text-[#F5F0E6]/80 leading-relaxed font-sans bg-[#1C1C1C] p-3 rounded-lg border border-[#2C2C2C]">
                        {msg.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ---------------- 4. ENQUIRIES & RFQS TAB ---------------- */}
          {activeTab === 'enquiries' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2C2C2C]">
                <div>
                  <h1 className="font-editorial text-2xl sm:text-3xl font-black text-white">
                    Wholesale Enquiries &amp; Quotation Requests (RFQs)
                  </h1>
                  <p className="text-xs text-[#F5F0E6]/60 font-medium">
                    Commercial inquiries generated from the wholesale inquiry cart with itemized packs and slabs.
                  </p>
                </div>

                <button
                  onClick={() => setPdfModalConfig({ type: 'quotation', data: { rfq: enquiries[0] || {} } })}
                  className="px-3.5 py-2 bg-[#D4AF37] hover:bg-[#b89528] text-[#101010] text-xs font-bold font-mono rounded-lg flex items-center gap-1.5 shadow transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Generate Proforma PDF</span>
                </button>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex items-center gap-1 bg-[#141414] p-1 rounded-lg border border-[#2C2C2C] max-w-md">
                {['all', 'New', 'Quoted', 'Dispatched', 'Closed'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setEnquiryStatusFilter(status)}
                    className={`px-3 py-1.5 rounded-md text-xs font-mono capitalize transition-colors ${
                      enquiryStatusFilter === status
                        ? 'bg-[#D4AF37] text-[#101010] font-bold'
                        : 'text-[#F5F0E6]/70 hover:text-white'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              {/* Enquiries Grid */}
              <div className="space-y-4">
                {enquiries
                  .filter(e => enquiryStatusFilter === 'all' || e.status === enquiryStatusFilter)
                  .map((rfq) => (
                    <div key={rfq.id} className="p-5 bg-[#141414] border border-[#2C2C2C] rounded-xl shadow space-y-4">
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#262626] pb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-sm font-black text-[#D4AF37]">{rfq.id}</span>
                            <span className="text-[10px] font-mono text-[#F5F0E6]/50">&bull; {rfq.date}</span>
                          </div>
                          <div className="font-bold text-base text-white">{rfq.buyerCompany}</div>
                          <div className="text-xs text-[#F5F0E6]/60 font-mono">
                            Contact: {rfq.contactPerson} &bull; {rfq.phone} &bull; {rfq.location}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <select
                            value={rfq.status}
                            onChange={(e) => dataService.updateEnquiryStatus(rfq.id, e.target.value)}
                            className={`px-2.5 py-1 rounded text-xs font-mono font-bold uppercase border focus:outline-none cursor-pointer ${
                              rfq.status === 'New' ? 'bg-emerald-950 text-emerald-400 border-emerald-800' :
                              rfq.status === 'Quoted' ? 'bg-amber-950 text-amber-400 border-amber-800' :
                              rfq.status === 'Dispatched' ? 'bg-blue-950 text-blue-400 border-blue-800' :
                              'bg-gray-800 text-gray-300 border-gray-700'
                            }`}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Quoted">Quoted</option>
                            <option value="Dispatched">Dispatched</option>
                            <option value="Closed">Closed</option>
                          </select>

                          <button
                            onClick={() => setPdfModalConfig({ type: 'quotation', data: { rfq } })}
                            className="px-3 py-1 bg-[#D4AF37] hover:bg-[#b89528] text-[#101010] text-xs font-mono font-bold rounded flex items-center gap-1 transition-colors"
                          >
                            <Printer className="w-3.5 h-3.5" />
                            <span>Print PDF Invoice</span>
                          </button>

                          <button
                            onClick={() => {
                              if (confirm(`Delete enquiry ${rfq.id}?`)) {
                                dataService.deleteEnquiry(rfq.id);
                              }
                            }}
                            className="p-1.5 bg-[#202020] hover:bg-red-900 text-red-400 hover:text-white rounded transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Items Table */}
                      <div className="bg-[#1A1A1A] rounded-lg border border-[#262626] overflow-x-auto">
                        <table className="w-full text-left text-xs font-sans">
                          <thead>
                            <tr className="bg-[#202020] font-mono text-[10px] text-[#F5F0E6]/60 border-b border-[#2C2C2C]">
                              <th className="p-2.5">Item Description</th>
                              <th className="p-2.5">Pack Configuration</th>
                              <th className="p-2.5 text-center">Cases</th>
                              <th className="p-2.5 text-right">Wholesale Slab</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#262626]">
                            {(rfq.items || []).map((item, idx) => (
                              <tr key={idx}>
                                <td className="p-2.5 font-medium text-white">{item.name}</td>
                                <td className="p-2.5 font-mono text-[11px] text-[#F5F0E6]/60">{item.packSize}</td>
                                <td className="p-2.5 font-mono font-bold text-center text-[#D4AF37]">{item.quantity}</td>
                                <td className="p-2.5 font-mono text-right text-[#F5F0E6]/80">{item.slab}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {rfq.notes && (
                        <div className="text-xs text-[#F5F0E6]/70 font-mono bg-[#181818] p-3 rounded border border-[#2C2C2C]">
                          <strong className="text-[#D4AF37]">Notes:</strong> {rfq.notes}
                        </div>
                      )}

                    </div>
                  ))}
              </div>

            </div>
          )}

          {/* ---------------- 5. ASSURANCE & STATUTORY COMPLIANCE TAB ---------------- */}
          {activeTab === 'assurance' && (
            <div className="space-y-8 animate-fadeIn">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2C2C2C]">
                <div>
                  <h1 className="font-editorial text-2xl sm:text-3xl font-black text-white">
                    Assurance, Statutory &amp; Compliance Management
                  </h1>
                  <p className="text-xs text-[#F5F0E6]/60 font-medium">
                    Configure official FSSAI Central License, GSTIN node, ISO 22000:2018 certification, and quality assurance protocols.
                  </p>
                </div>

                <button
                  onClick={() => { setModalType('cert'); }}
                  className="px-3.5 py-2 bg-[#D4AF37] hover:bg-[#b89528] text-[#101010] text-xs font-bold font-mono rounded-lg flex items-center gap-1.5 shadow transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Quality Certification</span>
                </button>
              </div>

              {assuranceSavedToast && (
                <div className="p-3.5 bg-emerald-950 border border-emerald-500 rounded-xl flex items-center gap-2 text-emerald-200 text-xs font-mono animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Statutory parameters updated successfully across live website &amp; PDF templates!</span>
                </div>
              )}

              {/* Form to Edit Statutory Registrations */}
              <form onSubmit={handleSaveAssurance} className="bg-[#141414] border border-[#2C2C2C] rounded-xl p-6 shadow space-y-6">
                <h3 className="font-editorial text-lg font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
                  <span>Primary Statutory Credentials</span>
                </h3>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-[#D4AF37] mb-1.5">
                      FSSAI Central License No.
                    </label>
                    <input
                      type="text"
                      value={assuranceForm.fssaiNumber || ''}
                      onChange={(e) => setAssuranceForm({ ...assuranceForm, fssaiNumber: e.target.value })}
                      placeholder="e.g. 14-digit FSSAI number (Leave empty if not available)"
                      className="w-full px-3.5 py-2.5 bg-[#1C1C1C] border border-[#343434] focus:border-[#D4AF37] rounded-lg text-white font-mono text-xs focus:outline-none"
                    />
                    <span className="text-[10px] text-[#F5F0E6]/40 font-mono mt-1 block">Printed on all food invoices and product labels</span>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-[#D4AF37] mb-1.5">
                      GSTIN (Goods &amp; Services Tax)
                    </label>
                    <input
                      type="text"
                      value={assuranceForm.gstNumber || ''}
                      onChange={(e) => setAssuranceForm({ ...assuranceForm, gstNumber: e.target.value })}
                      placeholder="e.g. 15-digit GSTIN (Leave empty if not available)"
                      className="w-full px-3.5 py-2.5 bg-[#1C1C1C] border border-[#343434] focus:border-[#D4AF37] rounded-lg text-white font-mono text-xs focus:outline-none"
                    />
                    <span className="text-[10px] text-[#F5F0E6]/40 font-mono mt-1 block">State Registration Jurisdiction</span>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-[#D4AF37] mb-1.5">
                      ISO Food Safety Standard
                    </label>
                    <input
                      type="text"
                      value={assuranceForm.isoCert || ''}
                      onChange={(e) => setAssuranceForm({ ...assuranceForm, isoCert: e.target.value })}
                      placeholder="e.g. ISO 22000:2018 (Leave empty if not available)"
                      className="w-full px-3.5 py-2.5 bg-[#1C1C1C] border border-[#343434] focus:border-[#D4AF37] rounded-lg text-white font-mono text-xs focus:outline-none"
                    />
                    <span className="text-[10px] text-[#F5F0E6]/40 font-mono mt-1 block">Global Food Safety Management Accreditation</span>
                  </div>

                  <div className="md:col-span-2 lg:col-span-3">
                    <label className="block text-xs font-mono font-bold uppercase text-[#D4AF37] mb-1.5">
                      Cold-Chain Compliance Specification
                    </label>
                    <input
                      type="text"
                      value={assuranceForm.coldChainCompliance}
                      onChange={(e) => setAssuranceForm({ ...assuranceForm, coldChainCompliance: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#1C1C1C] border border-[#343434] focus:border-[#D4AF37] rounded-lg text-white text-xs focus:outline-none font-sans"
                    />
                  </div>

                  <div className="md:col-span-2 lg:col-span-3">
                    <label className="block text-xs font-mono font-bold uppercase text-[#D4AF37] mb-1.5">
                      Legal Metrology &amp; Barcode Compliance Protocol
                    </label>
                    <input
                      type="text"
                      value={assuranceForm.legalMetrology}
                      onChange={(e) => setAssuranceForm({ ...assuranceForm, legalMetrology: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#1C1C1C] border border-[#343434] focus:border-[#D4AF37] rounded-lg text-white text-xs focus:outline-none font-sans"
                    />
                  </div>

                </div>

                <div className="flex justify-end pt-4 border-t border-[#262626]">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#b89528] text-[#101010] font-black text-xs uppercase tracking-wider rounded-lg flex items-center gap-2 shadow"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Statutory Settings</span>
                  </button>
                </div>
              </form>

              {/* Active Certifications Roster */}
              <div className="bg-[#141414] border border-[#2C2C2C] rounded-xl p-6 shadow space-y-4">
                <h3 className="font-editorial text-lg font-bold text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#D4AF37]" />
                  <span>Quality Certifications &amp; Accreditations</span>
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  {(assurance.certifications || []).map((cert, idx) => (
                    <div key={idx} className="p-4 bg-[#1C1C1C] border border-[#2C2C2C] rounded-lg flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-sm text-white">{cert.title}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                            {cert.standard || 'Certified'}
                          </span>
                        </div>
                        <div className="text-xs text-[#F5F0E6]/70 leading-relaxed font-sans">{cert.desc}</div>
                        <div className="text-[10px] font-mono text-[#D4AF37] mt-2">
                          Issuer: {cert.issuer} &bull; Valid: {cert.validTill || 'Permanent'}
                        </div>
                      </div>

                      <button
                        onClick={() => dataService.deleteCertification(idx)}
                        className="p-1.5 bg-[#262626] hover:bg-red-900 text-red-400 hover:text-white rounded transition-colors"
                        title="Delete certification"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ---------------- 6. TESTIMONIALS TAB ---------------- */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2C2C2C]">
                <div>
                  <h1 className="font-editorial text-2xl sm:text-3xl font-black text-white">
                    Verified B2B Client Testimonials
                  </h1>
                  <p className="text-xs text-[#F5F0E6]/60 font-medium">
                    Manage quotes, retailer reviews, and partnership endorsements displayed on the public Home page.
                  </p>
                </div>

                <button
                  onClick={() => { setEditingItem(null); setModalType('testimonial'); }}
                  className="px-3.5 py-2 bg-[#D4AF37] hover:bg-[#b89528] text-[#101010] text-xs font-bold font-mono rounded-lg flex items-center gap-1.5 shadow transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Testimonial</span>
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {testimonials.map((t) => (
                  <div key={t.id} className="p-5 bg-[#141414] border border-[#2C2C2C] rounded-xl shadow space-y-3 relative flex flex-col justify-between">
                    
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#D4AF37]" />
                          <div>
                            <div className="font-bold text-sm text-white">{t.name}</div>
                            <div className="text-xs text-[#D4AF37]">{t.title}</div>
                            <div className="text-[11px] text-[#F5F0E6]/60 font-medium">{t.company}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-[#D4AF37]">
                          {[...Array(t.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37]" />
                          ))}
                        </div>
                      </div>

                      <blockquote className="text-xs text-[#F5F0E6]/80 italic leading-relaxed bg-[#1C1C1C] p-3 rounded-lg border border-[#262626] mb-3">
                        "{t.quote}"
                      </blockquote>

                      <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-[#F5F0E6]/50">
                        <span className="px-2 py-0.5 rounded bg-[#262626]">{t.outlets}</span>
                        <span className="px-2 py-0.5 rounded bg-[#262626]">{t.category}</span>
                        {t.badge && <span className="px-2 py-0.5 rounded bg-[#D4AF37]/20 text-[#D4AF37] font-bold">{t.badge}</span>}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[#262626]">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold ${
                        t.status === 'Active' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-gray-800 text-gray-300'
                      }`}>
                        {t.status || 'Active'}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => { setEditingItem(t); setModalType('testimonial'); }}
                          className="p-1.5 bg-[#202020] hover:bg-[#343434] text-white rounded transition-colors"
                          title="Edit review"
                        >
                          <Edit className="w-3.5 h-3.5 text-[#D4AF37]" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete testimonial from ${t.name}?`)) {
                              dataService.deleteTestimonial(t.id);
                            }
                          }}
                          className="p-1.5 bg-[#202020] hover:bg-red-900 text-red-400 hover:text-white rounded transition-colors"
                          title="Delete review"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ---------------- 7. CATEGORIES TAB ---------------- */}
          {activeTab === 'categories' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2C2C2C]">
                <div>
                  <h1 className="font-editorial text-2xl sm:text-3xl font-black text-white">
                    FMCG &amp; Commodity Categories
                  </h1>
                  <p className="text-xs text-[#F5F0E6]/60 font-medium">
                    Configure high-velocity distribution lines: Chocolates, Soft Drinks, Juices, Snacks, Bottled Water, Energy Drinks, and Spices.
                  </p>
                </div>

                <button
                  onClick={() => { setEditingItem(null); setModalType('category'); }}
                  className="px-3.5 py-2 bg-[#D4AF37] hover:bg-[#b89528] text-[#101010] text-xs font-bold font-mono rounded-lg flex items-center gap-1.5 shadow transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Category</span>
                </button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((cat) => {
                  const skuCount = products.filter(p => p.category === cat.id).length;
                  return (
                    <div key={cat.id} className="p-5 bg-[#141414] border border-[#2C2C2C] rounded-xl shadow space-y-3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="w-8 h-8 rounded bg-[#202020] border border-[#343434] flex items-center justify-center text-[#D4AF37] font-bold">
                            <Tags className="w-4 h-4" />
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#262626] text-[#F5F0E6]/70">
                            {skuCount} SKUs
                          </span>
                        </div>
                        <h3 className="font-bold text-base text-white">{cat.name}</h3>
                        <p className="text-xs text-[#F5F0E6]/60 mt-1 line-clamp-2 leading-relaxed">
                          {cat.description || 'Master food distribution segment.'}
                        </p>
                        <div className="text-[10px] font-mono text-[#D4AF37] mt-2">
                          Slug: #{cat.id}
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#262626]">
                        <button
                          onClick={() => { setEditingItem(cat); setModalType('category'); }}
                          className="p-1.5 bg-[#202020] hover:bg-[#343434] text-white rounded transition-colors"
                          title="Edit Category"
                        >
                          <Edit className="w-3.5 h-3.5 text-[#D4AF37]" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete category ${cat.name}?`)) {
                              dataService.deleteCategory(cat.id);
                            }
                          }}
                          className="p-1.5 bg-[#202020] hover:bg-red-900 text-red-400 hover:text-white rounded transition-colors"
                          title="Delete Category"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* ---------------- 8. PRODUCTS TAB ---------------- */}
          {activeTab === 'products' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2C2C2C]">
                <div>
                  <h1 className="font-editorial text-2xl sm:text-3xl font-black text-white">
                    Wholesale Products &amp; Master Packs Catalog
                  </h1>
                  <p className="text-xs text-[#F5F0E6]/60 font-medium">
                    Manage 350+ wholesale SKUs, pack configurations, minimum order quantities (MOQ), and volume pricing slabs.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPdfModalConfig({ type: 'pricelist', data: { products } })}
                    className="px-3.5 py-2 bg-[#D4AF37] hover:bg-[#b89528] text-[#101010] text-xs font-bold font-mono rounded-lg flex items-center gap-1.5 shadow transition-colors"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Price List</span>
                  </button>
                  <button
                    onClick={() => { setEditingItem(null); setModalType('product'); }}
                    className="px-3.5 py-2 bg-[#202020] hover:bg-[#2c2c2c] text-white text-xs font-bold font-mono rounded-lg border border-[#343434] flex items-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-4 h-4 text-[#D4AF37]" />
                    <span>Add SKU</span>
                  </button>
                </div>
              </div>

              {/* Product Filters & Search */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative flex-1 min-w-[220px]">
                  <Search className="w-3.5 h-3.5 text-[#F5F0E6]/40 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={globalSearch}
                    onChange={(e) => setGlobalSearch(e.target.value)}
                    placeholder="Search by product name, SKU code, brand..."
                    className="w-full pl-9 pr-3 py-2 bg-[#141414] border border-[#2C2C2C] rounded-lg text-xs font-mono text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <select
                  value={productCatFilter}
                  onChange={(e) => setProductCatFilter(e.target.value)}
                  className="px-3 py-2 bg-[#141414] border border-[#2C2C2C] rounded-lg text-xs font-mono text-white focus:outline-none"
                >
                  <option value="all">All Categories ({products.length})</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>

                <select
                  value={productStockFilter}
                  onChange={(e) => setProductStockFilter(e.target.value)}
                  className="px-3 py-2 bg-[#141414] border border-[#2C2C2C] rounded-lg text-xs font-mono text-white focus:outline-none"
                >
                  <option value="all">All Stock Status</option>
                  <option value="In Stock">In Stock</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Pre-Order">Pre-Order</option>
                </select>
              </div>

              {/* Products Table */}
              <div className="bg-[#141414] border border-[#2C2C2C] rounded-xl overflow-hidden shadow">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-[#1C1C1C] border-b border-[#2C2C2C] font-mono text-[10px] uppercase text-[#F5F0E6]/60">
                        <th className="p-3.5">SKU &amp; Image</th>
                        <th className="p-3.5">Product Title &amp; Brand</th>
                        <th className="p-3.5">Category</th>
                        <th className="p-3.5">Pack Size</th>
                        <th className="p-3.5">MOQ</th>
                        <th className="p-3.5 text-right">Wholesale Slab Rate</th>
                        <th className="p-3.5 text-center">Status</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#262626]">
                      {products
                        .filter(p => productCatFilter === 'all' || p.category === productCatFilter)
                        .filter(p => productStockFilter === 'all' || p.stockStatus === productStockFilter)
                        .filter(p => !globalSearch || (
                          p.name?.toLowerCase().includes(globalSearch.toLowerCase()) ||
                          p.sku?.toLowerCase().includes(globalSearch.toLowerCase()) ||
                          p.brand?.toLowerCase().includes(globalSearch.toLowerCase())
                        ))
                        .map((prod) => (
                          <tr key={prod.id} className="hover:bg-[#1A1A1A] transition-colors">
                            <td className="p-3.5">
                              <div className="flex items-center gap-2.5">
                                <img src={prod.image} alt={prod.name} className="w-10 h-10 rounded object-cover border border-[#343434] flex-shrink-0" />
                                <span className="font-mono text-[11px] font-bold text-[#D4AF37]">{prod.sku}</span>
                              </div>
                            </td>
                            <td className="p-3.5">
                              <div className="font-bold text-white max-w-xs">{prod.name}</div>
                              <div className="text-[10px] font-mono text-[#F5F0E6]/50 flex items-center flex-wrap gap-2 mt-0.5">
                                <span>{prod.brand}</span>
                                {prod.warehouse && prod.warehouse !== 'Not Available' && (
                                  <span className="text-[#D4AF37] flex items-center gap-1 font-semibold">
                                    <Building2 className="w-2.5 h-2.5" />
                                    <span>{prod.warehouse}</span>
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="p-3.5 capitalize font-mono text-[11px] text-[#F5F0E6]/70">
                              {prod.category}
                            </td>
                            <td className="p-3.5 font-mono text-[11px]">{prod.packSize}</td>
                            <td className="p-3.5 font-mono text-[11px] text-amber-400">{prod.moq}</td>
                            <td className="p-3.5 font-mono font-bold text-right text-white">
                              {prod.wholesaleRange}
                            </td>
                            <td className="p-3.5 text-center">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                                prod.stockStatus === 'In Stock' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                                prod.stockStatus === 'Low Stock' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                                'bg-gray-800 text-gray-300'
                              }`}>
                                {prod.stockStatus}
                              </span>
                            </td>
                            <td className="p-3.5 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => { setEditingItem(prod); setModalType('product'); }}
                                  className="p-1.5 bg-[#202020] hover:bg-[#343434] text-white rounded transition-colors"
                                  title="Edit product SKU"
                                >
                                  <Edit className="w-3.5 h-3.5 text-[#D4AF37]" />
                                </button>
                                <button
                                  onClick={() => {
                                    if (confirm(`Delete SKU ${prod.sku} (${prod.name})?`)) {
                                      dataService.deleteProduct(prod.id);
                                    }
                                  }}
                                  className="p-1.5 bg-[#202020] hover:bg-red-900 text-red-400 hover:text-white rounded transition-colors"
                                  title="Delete product SKU"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ---------------- 9. BRANDS TAB ---------------- */}
          {activeTab === 'brands' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2C2C2C]">
                <div>
                  <h1 className="font-editorial text-2xl sm:text-3xl font-black text-white">
                    Brands &amp; Authorizations
                  </h1>
                  <p className="text-xs text-[#F5F0E6]/60 font-medium">
                    Configure MALABAR PRIME Own Signature Brands alongside Authorized Tier-1 FMCG Partner Brands.
                  </p>
                </div>

                <button
                  onClick={() => { setEditingItem(null); setModalType('brand'); }}
                  className="px-3.5 py-2 bg-[#D4AF37] hover:bg-[#b89528] text-[#101010] text-xs font-bold font-mono rounded-lg flex items-center gap-1.5 shadow transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Brand</span>
                </button>
              </div>

              {/* Brand Type Filters */}
              <div className="flex items-center gap-1 bg-[#141414] p-1 rounded-lg border border-[#2C2C2C] max-w-sm">
                {['all', 'Own Brand', 'Partner Brand'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setBrandTypeFilter(type)}
                    className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
                      brandTypeFilter === type
                        ? 'bg-[#D4AF37] text-[#101010] font-bold'
                        : 'text-[#F5F0E6]/70 hover:text-white'
                    }`}
                  >
                    {type === 'all' ? 'All Brands' : type}
                  </button>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {brands
                  .filter(b => brandTypeFilter === 'all' || b.type === brandTypeFilter)
                  .map((b) => (
                    <div key={b.id} className="bg-[#141414] border border-[#2C2C2C] rounded-xl overflow-hidden shadow flex flex-col justify-between">
                      <div className="h-40 relative overflow-hidden bg-black">
                        <img src={b.image} alt={b.name} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                        <div className="absolute top-3 left-3 flex gap-2">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                            b.type === 'Own Brand' ? 'bg-[#D4AF37] text-[#101010]' : 'bg-white text-[#101010]'
                          }`}>
                            {b.type}
                          </span>
                          {b.tag && (
                            <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-black/70 text-[#D4AF37] border border-[#D4AF37]/50">
                              {b.tag}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="p-5 space-y-2 flex-1">
                        <h3 className="font-bold text-base text-white">{b.name}</h3>
                        <div className="text-xs text-[#D4AF37] font-medium">{b.category}</div>
                        <p className="text-xs text-[#F5F0E6]/60 leading-relaxed font-sans line-clamp-2">
                          {b.description}
                        </p>
                        <div className="text-[10px] font-mono text-[#F5F0E6]/50 pt-1">
                          Tier: {b.tier} &bull; {b.skus}
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 p-3 bg-[#181818] border-t border-[#262626]">
                        <button
                          onClick={() => { setEditingItem(b); setModalType('brand'); }}
                          className="p-1.5 bg-[#202020] hover:bg-[#343434] text-white rounded transition-colors"
                          title="Edit brand"
                        >
                          <Edit className="w-3.5 h-3.5 text-[#D4AF37]" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete brand ${b.name}?`)) {
                              dataService.deleteBrand(b.id);
                            }
                          }}
                          className="p-1.5 bg-[#202020] hover:bg-red-900 text-red-400 hover:text-white rounded transition-colors"
                          title="Delete brand"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

            </div>
          )}

          {/* ---------------- 9B. WAREHOUSING & REGIONAL HUBS TAB ---------------- */}
          {activeTab === 'warehouses' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Header Title & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2C2C2C]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/30">
                      Supply Chain Infrastructure
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>Live Site Synchronized</span>
                    </span>
                  </div>
                  <h1 className="font-editorial text-2xl sm:text-3xl font-black text-white">
                    Warehousing &amp; Logistics Hubs
                  </h1>
                  <p className="text-xs text-[#F5F0E6]/60 font-medium">
                    Configure regional fulfillment centers, cold-chain depots, distribution coverage zones, and turnaround SLAs.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { setEditingItem(null); setModalType('warehouse'); }}
                    className="px-3.5 py-2 bg-[#D4AF37] hover:bg-[#b89528] text-[#101010] text-xs font-bold font-mono rounded-lg flex items-center gap-1.5 shadow transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Warehouse Hub</span>
                  </button>
                </div>
              </div>

              {/* Toast if saved */}
              {warehouseSavedToast && (
                <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-lg text-emerald-300 text-xs font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Warehouse Hub saved and synchronized across live public portals!</span>
                </div>
              )}

              {/* KPI Strip */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-[#141414] border border-[#2C2C2C]">
                  <div className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider mb-1">Active Hubs</div>
                  <div className="text-2xl font-black text-white font-mono">{warehouses.length}</div>
                  <div className="text-[10px] text-zinc-400 mt-1">Regional depots</div>
                </div>

                <div className="p-4 rounded-xl bg-[#141414] border border-[#2C2C2C]">
                  <div className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider mb-1">Total Capacity</div>
                  <div className="text-2xl font-black text-white font-mono">
                    {warehouses.length > 0 ? `${warehouses.reduce((acc, w) => {
                      const num = parseInt(w.capacity?.replace(/[^0-9]/g, '')) || 0;
                      return acc + num;
                    }, 0).toLocaleString()} Sq. Ft.` : 'Not Available'}
                  </div>
                  <div className="text-[10px] text-zinc-400 mt-1">Combined storage area</div>
                </div>

                <div className="p-4 rounded-xl bg-[#141414] border border-[#2C2C2C]">
                  <div className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider mb-1">Delivery SLA</div>
                  <div className="text-2xl font-black text-white font-mono">24 - 48 Hrs</div>
                  <div className="text-[10px] text-emerald-400 mt-1">High-velocity dispatch</div>
                </div>

                <div className="p-4 rounded-xl bg-[#141414] border border-[#2C2C2C]">
                  <div className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider mb-1">Assigned SKUs</div>
                  <div className="text-2xl font-black text-white font-mono">
                    {products.filter(p => p.warehouse && p.warehouse !== 'Not Available').length} / {products.length}
                  </div>
                  <div className="text-[10px] text-zinc-400 mt-1">Routed to regional hubs</div>
                </div>
              </div>

              {/* Warehouse Cards Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {warehouses.map((hub) => (
                  <div 
                    key={hub.id} 
                    className="p-5 bg-[#141414] border border-[#2C2C2C] hover:border-[#D4AF37]/50 rounded-xl shadow space-y-4 flex flex-col justify-between transition-colors"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <span className="w-10 h-10 rounded-lg bg-[#202020] border border-[#343434] flex items-center justify-center text-[#D4AF37] font-bold flex-shrink-0">
                            <Building2 className="w-5 h-5" />
                          </span>
                          <div>
                            <div className="flex items-center gap-1.5 text-[11px] text-[#D4AF37] font-mono font-semibold">
                              <MapPin className="w-3.5 h-3.5" />
                              <span className={hub.city ? "" : "italic text-zinc-500"}>{hub.city || 'Not Available'}</span>
                            </div>
                            <h3 className="font-bold text-base text-white mt-0.5 leading-snug">
                              {hub.name || 'Not Available'}
                            </h3>
                          </div>
                        </div>

                        <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 flex-shrink-0">
                          {hub.capacity || 'Not Available'}
                        </span>
                      </div>

                      {/* Coverage & SLA strip */}
                      <div className="p-3 bg-[#1C1C1C] rounded-lg border border-[#262626] grid grid-cols-2 gap-3 text-xs font-mono">
                        <div>
                          <span className="text-zinc-500 block text-[9px] uppercase font-bold">Route Coverage</span>
                          <span className={hub.coverage ? "text-[#F5F0E6] font-bold" : "italic text-zinc-500"}>
                            {hub.coverage || 'Not Available'}
                          </span>
                        </div>
                        <div>
                          <span className="text-zinc-500 block text-[9px] uppercase font-bold">Dispatch SLA</span>
                          <span className="text-[#F5F0E6] font-bold flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#D4AF37]" />
                            <span className={hub.dispatchTime ? "" : "italic text-zinc-500"}>
                              {hub.dispatchTime || 'Not Available'}
                            </span>
                          </span>
                        </div>
                      </div>

                      {/* Contact & Address if present */}
                      {(hub.address || hub.phone || hub.email) && (
                        <div className="text-[11px] text-zinc-400 font-mono space-y-1 pt-1">
                          {hub.address && (
                            <div className="flex items-start gap-1.5">
                              <MapPin className="w-3 h-3 text-zinc-500 mt-0.5 flex-shrink-0" />
                              <span>{hub.address}</span>
                            </div>
                          )}
                          {hub.phone && (
                            <div className="flex items-center gap-1.5">
                              <Phone className="w-3 h-3 text-zinc-500 flex-shrink-0" />
                              <span>{hub.phone}</span>
                            </div>
                          )}
                          {hub.email && (
                            <div className="flex items-center gap-1.5">
                              <Mail className="w-3 h-3 text-zinc-500 flex-shrink-0" />
                              <span>{hub.email}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Features */}
                      {Array.isArray(hub.features) && hub.features.length > 0 && (
                        <div className="space-y-1.5 pt-2 border-t border-[#262626]">
                          <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-500 block">Hub Capabilities</span>
                          {hub.features.map((feature, fIdx) => (
                            <div key={fIdx} className="flex items-center gap-2 text-xs text-zinc-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-[#262626] mt-4">
                      <span className="text-[10px] font-mono text-zinc-500">ID: {hub.id}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => { setEditingItem(hub); setModalType('warehouse'); }}
                          className="px-2.5 py-1.5 bg-[#202020] hover:bg-[#343434] text-white text-xs font-mono font-medium rounded flex items-center gap-1.5 transition-colors cursor-pointer"
                          title="Edit Warehouse Hub"
                        >
                          <Edit className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete warehouse hub "${hub.name}"? This will also remove it from the live public network.`)) {
                              dataService.deleteWarehouse(hub.id);
                            }
                          }}
                          className="p-1.5 bg-[#202020] hover:bg-red-900/60 text-red-400 hover:text-white rounded transition-colors cursor-pointer"
                          title="Delete Warehouse Hub"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {warehouses.length === 0 && (
                  <div className="col-span-full p-12 bg-[#141414] border-2 border-dashed border-[#2C2C2C] rounded-2xl text-center space-y-3">
                    <Building2 className="w-12 h-12 text-[#D4AF37]/50 mx-auto" />
                    <h3 className="font-editorial text-xl font-bold text-white">No Warehouse Hubs Added Yet</h3>
                    <p className="text-xs text-zinc-400 max-w-md mx-auto">
                      Click below to add your regional logistics hubs, cold stores, and cross-docking facilities.
                    </p>
                    <button
                      onClick={() => { setEditingItem(null); setModalType('warehouse'); }}
                      className="mt-2 px-4 py-2 bg-[#D4AF37] hover:bg-[#b89528] text-[#101010] font-bold text-xs font-mono rounded-lg inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add First Warehouse Hub</span>
                    </button>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* ---------------- 10. PDF EXPORTS TAB ---------------- */}
          {activeTab === 'pdf' && (
            <div className="space-y-8 animate-fadeIn">
              
              <div className="pb-6 border-b border-[#2C2C2C]">
                <h1 className="font-editorial text-2xl sm:text-3xl font-black text-white">
                  PDF Documents &amp; Printable Reports Desk
                </h1>
                <p className="text-xs text-[#F5F0E6]/60 font-medium">
                  One-click generation of formal B2B price lists, commercial proforma quotations, and verified distributor rosters.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                
                {/* PDF 1: Price List */}
                <div className="p-6 bg-[#141414] border-2 border-[#2C2C2C] hover:border-[#D4AF37] rounded-xl shadow space-y-4 transition-all">
                  <div className="w-12 h-12 rounded-lg bg-[#D4AF37] text-[#101010] flex items-center justify-center font-bold">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white">Wholesale Price List (PDF)</h3>
                    <p className="text-xs text-[#F5F0E6]/60 mt-1 leading-relaxed">
                      Complete catalog of active SKUs with wholesale slab rates, MOQs, pack sizes, FSSAI registration, and bank details.
                    </p>
                  </div>
                  <button
                    onClick={() => setPdfModalConfig({ type: 'pricelist', data: { products } })}
                    className="w-full py-2.5 bg-[#D4AF37] hover:bg-[#b89528] text-[#101010] text-xs font-mono font-bold uppercase rounded-lg flex items-center justify-center gap-2 transition-colors shadow"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Open &amp; Print Price List</span>
                  </button>
                </div>

                {/* PDF 2: Proforma Quotation */}
                <div className="p-6 bg-[#141414] border-2 border-[#2C2C2C] hover:border-[#D4AF37] rounded-xl shadow space-y-4 transition-all">
                  <div className="w-12 h-12 rounded-lg bg-[#D4AF37] text-[#101010] flex items-center justify-center font-bold">
                    <ShoppingCart className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white">Proforma Invoice / RFQ (PDF)</h3>
                    <p className="text-xs text-[#F5F0E6]/60 mt-1 leading-relaxed">
                      Generate official proforma invoices for supermarkets and wholesalers with GST breakdown, terms, and reefer fleet allocation.
                    </p>
                  </div>
                  <button
                    onClick={() => setPdfModalConfig({ type: 'quotation', data: { rfq: enquiries[0] || {} } })}
                    className="w-full py-2.5 bg-[#D4AF37] hover:bg-[#b89528] text-[#101010] text-xs font-mono font-bold uppercase rounded-lg flex items-center justify-center gap-2 transition-colors shadow"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Open Proforma Invoice</span>
                  </button>
                </div>

                {/* PDF 3: Partners Directory */}
                <div className="p-6 bg-[#141414] border-2 border-[#2C2C2C] hover:border-[#D4AF37] rounded-xl shadow space-y-4 transition-all">
                  <div className="w-12 h-12 rounded-lg bg-[#D4AF37] text-[#101010] flex items-center justify-center font-bold">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white">Partner Registry Audit (PDF)</h3>
                    <p className="text-xs text-[#F5F0E6]/60 mt-1 leading-relaxed">
                      Printable directory of all verified retailers, authorized territory distributors, and certified manufacturer partners.
                    </p>
                  </div>
                  <button
                    onClick={() => setPdfModalConfig({ type: 'partners', data: { partners } })}
                    className="w-full py-2.5 bg-[#D4AF37] hover:bg-[#b89528] text-[#101010] text-xs font-mono font-bold uppercase rounded-lg flex items-center justify-center gap-2 transition-colors shadow"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Export Partner Registry</span>
                  </button>
                </div>

              </div>

            </div>
          )}

          {/* ---------------- 11. COMPANY CONTACT & LOCATION TAB ---------------- */}
          {activeTab === 'company-contact' && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2C2C2C]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40">
                      Site-Wide Corporate Profile
                    </span>
                    <span className="text-[10px] font-mono text-[#F5F0E6]/50">
                      Syncs with Header, Footer, Contact Page &amp; Invoices
                    </span>
                  </div>
                  <h1 className="font-editorial text-2xl sm:text-3xl font-black text-white">
                    Official Contact &amp; Hub Location Settings
                  </h1>
                  <p className="text-xs text-[#F5F0E6]/60 font-medium">
                    Configure your official B2B trade lines, instant WhatsApp order desk, 24/7 cold-chain emergency hotline, emails, and physical distribution hub.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (onNavigatePublic) onNavigatePublic('contact');
                      else {
                        window.history.pushState(null, '', '/contact');
                        window.dispatchEvent(new PopStateEvent('popstate'));
                      }
                    }}
                    className="px-3.5 py-2 bg-[#202020] hover:bg-[#2c2c2c] text-[#F5F0E6] text-xs font-mono font-bold rounded-lg border border-[#343434] flex items-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>View Public Contact Page</span>
                  </button>
                </div>
              </div>

              {/* Toast Notification */}
              {contactSavedToast && (
                <div className="p-4 bg-emerald-950/80 border border-emerald-500 rounded-xl flex items-center justify-between text-emerald-200 text-xs font-mono shadow-xl animate-fadeIn">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <div>
                      <div className="font-bold text-white">Contact &amp; Location Settings Saved!</div>
                      <div className="text-[11px] text-emerald-300/80">Changes have been synced to the database and are now active across all public pages.</div>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider bg-emerald-900 text-emerald-200 px-2.5 py-1 rounded border border-emerald-700">
                    Active &amp; Live
                  </span>
                </div>
              )}

              {/* Form & Live Simulation Split */}
              <div className="grid lg:grid-cols-12 gap-8 items-start">
                
                {/* Left: Edit Form (7 Columns) */}
                <form onSubmit={handleSaveContact} className="lg:col-span-7 bg-[#141414] border border-[#2C2C2C] rounded-xl p-6 shadow-xl space-y-6">
                  
                  {/* Section 1: Voice & Messaging Endpoints */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-[#262626] pb-2">
                      <PhoneCall className="w-4 h-4 text-[#D4AF37]" />
                      <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                        1. Phone, WhatsApp &amp; Emergency Lines
                      </h3>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* 1. Contact Person / Dept */}
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-mono font-bold uppercase text-[#D4AF37] mb-1.5">
                          Contact Name / Trade Desk Department *
                        </label>
                        <input
                          type="text"
                          required
                          value={contactForm.contact || ''}
                          onChange={(e) => setContactForm({ ...contactForm, contact: e.target.value })}
                          placeholder="e.g. Malabar Prime Commercial Desk"
                          className="w-full px-3.5 py-2.5 bg-[#1C1C1C] border border-[#343434] focus:border-[#D4AF37] rounded-lg text-white font-mono text-xs focus:outline-none transition-colors"
                        />
                        <span className="text-[10px] text-[#F5F0E6]/40 font-mono mt-1 block">Displayed as the primary corporate point of contact</span>
                      </div>

                      {/* 2. WhatsApp Number */}
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-[#D4AF37] mb-1.5">
                          WhatsApp Business Number *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={contactForm.whatsapp || ''}
                            onChange={(e) => setContactForm({ ...contactForm, whatsapp: e.target.value })}
                            placeholder="+91 XXXXX XXXXX"
                            className="w-full pl-3.5 pr-8 py-2.5 bg-[#1C1C1C] border border-[#343434] focus:border-[#D4AF37] rounded-lg text-white font-mono text-xs focus:outline-none transition-colors"
                          />
                          <MessageSquare className="w-3.5 h-3.5 text-emerald-400 absolute right-3 top-3" />
                        </div>
                        <span className="text-[10px] text-[#F5F0E6]/40 font-mono mt-1 block">Quick RFQ &amp; Instant Catalog share line</span>
                      </div>

                      {/* 3. Primary Calling Line */}
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-[#D4AF37] mb-1.5">
                          Voice Hotline / Call Line *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={contactForm.call || ''}
                            onChange={(e) => setContactForm({ ...contactForm, call: e.target.value })}
                            placeholder="+91 XXXXX XXXXX"
                            className="w-full pl-3.5 pr-8 py-2.5 bg-[#1C1C1C] border border-[#343434] focus:border-[#D4AF37] rounded-lg text-white font-mono text-xs focus:outline-none transition-colors"
                          />
                          <Phone className="w-3.5 h-3.5 text-[#D4AF37] absolute right-3 top-3" />
                        </div>
                        <span className="text-[10px] text-[#F5F0E6]/40 font-mono mt-1 block">General sales &amp; wholesale inquiry switchboard</span>
                      </div>

                      {/* 4. Emergency Line */}
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-mono font-bold uppercase text-red-400 mb-1.5 flex items-center gap-1.5">
                          <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                          <span>24/7 Emergency Line (Logistics &amp; Reefer Excursion) *</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={contactForm.emergensy || ''}
                          onChange={(e) => setContactForm({ ...contactForm, emergensy: e.target.value })}
                          placeholder="+91 XXXXX XXXXX"
                          className="w-full px-3.5 py-2.5 bg-[#1F1414] border border-red-900/60 focus:border-red-500 rounded-lg text-white font-mono text-xs focus:outline-none transition-colors"
                        />
                        <span className="text-[10px] text-red-400/70 font-mono mt-1 block">Critical 24/7 channel for transit cold-chain alarms, road delivery issues, and urgent trade alerts</span>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Email Channels */}
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center gap-2 border-b border-[#262626] pb-2">
                      <Mail className="w-4 h-4 text-[#D4AF37]" />
                      <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                        2. Electronic Mail Channels
                      </h3>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* 5. Primary Email */}
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-[#D4AF37] mb-1.5">
                          Primary Orders &amp; Commercial Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={contactForm.email || ''}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          placeholder="orders@yourdomain.com"
                          className="w-full px-3.5 py-2.5 bg-[#1C1C1C] border border-[#343434] focus:border-[#D4AF37] rounded-lg text-white font-mono text-xs focus:outline-none transition-colors"
                        />
                        <span className="text-[10px] text-[#F5F0E6]/40 font-mono mt-1 block">Destination for official purchase orders &amp; RFQs</span>
                      </div>

                      {/* 6. Support Email */}
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-[#D4AF37] mb-1.5">
                          Support &amp; Claims Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={contactForm.supportEmail || ''}
                          onChange={(e) => setContactForm({ ...contactForm, supportEmail: e.target.value })}
                          placeholder="support@yourdomain.com"
                          className="w-full px-3.5 py-2.5 bg-[#1C1C1C] border border-[#343434] focus:border-[#D4AF37] rounded-lg text-white font-mono text-xs focus:outline-none transition-colors"
                        />
                        <span className="text-[10px] text-[#F5F0E6]/40 font-mono mt-1 block">Dedicated to SLA claims, credit notes, and partner support</span>
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Physical Facilities & Geographic Corridor */}
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center gap-2 border-b border-[#262626] pb-2">
                      <MapPin className="w-4 h-4 text-[#D4AF37]" />
                      <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                        3. Hub Location &amp; Warehouse Address
                      </h3>
                    </div>

                    <div className="space-y-4">
                      {/* 7. Location (Region/Corridor) */}
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-[#D4AF37] mb-1.5">
                          Hub Location / Distribution Corridor *
                        </label>
                        <input
                          type="text"
                          required
                          value={contactForm.location || ''}
                          onChange={(e) => setContactForm({ ...contactForm, location: e.target.value })}
                          placeholder="e.g. Kozhikode - Malappuram Supply Corridor, Kerala, India"
                          className="w-full px-3.5 py-2.5 bg-[#1C1C1C] border border-[#343434] focus:border-[#D4AF37] rounded-lg text-white font-sans text-xs focus:outline-none transition-colors"
                        />
                        <span className="text-[10px] text-[#F5F0E6]/40 font-mono mt-1 block">Regional operating perimeter shown on banners and maps</span>
                      </div>

                      {/* 8. Full Physical Address */}
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-[#D4AF37] mb-1.5">
                          Central Warehouse &amp; Registered Address *
                        </label>
                        <textarea
                          rows={3}
                          required
                          value={contactForm.adress || ''}
                          onChange={(e) => setContactForm({ ...contactForm, adress: e.target.value })}
                          placeholder="e.g. Master Logistics Depot, National Highway Bypass, Kerala - 673014"
                          className="w-full px-3.5 py-2.5 bg-[#1C1C1C] border border-[#343434] focus:border-[#D4AF37] rounded-lg text-white font-sans text-xs focus:outline-none transition-colors leading-relaxed"
                        />
                        <span className="text-[10px] text-[#F5F0E6]/40 font-mono mt-1 block">Full physical address for billing, dispatch receipts &amp; statutory audit</span>
                      </div>

                      {/* Working Hours */}
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-[#D4AF37] mb-1.5">
                          Warehouse Operating &amp; Dispatch Hours
                        </label>
                        <input
                          type="text"
                          value={contactForm.workingHours || ''}
                          onChange={(e) => setContactForm({ ...contactForm, workingHours: e.target.value })}
                          placeholder="Mon - Sat: 8:00 AM - 8:00 PM IST | 24/7 Cold Chain Dispatch"
                          className="w-full px-3.5 py-2.5 bg-[#1C1C1C] border border-[#343434] focus:border-[#D4AF37] rounded-lg text-white font-mono text-xs focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Bar */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#262626]">
                    <button
                      type="button"
                      onClick={() => {
                        const emptyDefaults = {
                          contact: "",
                          whatsapp: "",
                          call: "",
                          emergensy: "",
                          email: "",
                          supportEmail: "",
                          location: "",
                          adress: "",
                          workingHours: ""
                        };
                        setContactForm(emptyDefaults);
                      }}
                      className="px-3.5 py-2 bg-[#202020] hover:bg-[#2C2C2C] text-[#F5F0E6]/70 hover:text-white rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reset Form</span>
                    </button>

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-2.5 bg-[#D4AF37] hover:bg-[#b89528] text-[#101010] font-black text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 shadow-lg transition-all"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save &amp; Publish Contact Info</span>
                    </button>
                  </div>

                </form>

                {/* Right: Live Public Simulation Card (5 Columns) */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Live Simulation Card */}
                  <div className="bg-[#141414] border-2 border-[#D4AF37]/50 rounded-xl p-6 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-[#D4AF37] text-[#101010] font-mono text-[9px] font-bold uppercase px-3 py-1 rounded-bl-lg">
                      Live Customer Preview
                    </div>

                    <div className="space-y-5">
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] mb-1">
                          Enterprise Profile
                        </div>
                        <h3 className="font-bold text-lg text-white">
                          {contactForm.contact || <span className="text-neutral-400 italic font-mono text-xs">Not Available</span>}
                        </h3>
                        <p className="text-xs text-[#F5F0E6]/60 mt-0.5">
                          {contactForm.location || <span className="text-neutral-400 italic font-mono text-xs">Not Available</span>}
                        </p>
                      </div>

                      {/* Emergency Hotline Highlight */}
                      <div className="p-3.5 rounded-lg bg-red-950/40 border border-red-800/60 flex items-start gap-3">
                        <ShieldAlert className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-[10px] font-mono uppercase tracking-widest text-red-300 font-bold">
                            24/7 Logistics &amp; Emergency Line
                          </div>
                          <div className="text-sm font-mono font-bold text-white mt-0.5">
                            {contactForm.emergensy || <span className="text-red-300/60 italic font-mono text-xs">Not Available</span>}
                          </div>
                          <div className="text-[10px] text-red-200/70 font-sans mt-0.5">
                            Instant escalation for temperature excursion &amp; highway dispatch.
                          </div>
                        </div>
                      </div>

                      {/* Communications Matrix */}
                      <div className="space-y-2.5 text-xs font-mono">
                        
                        <div className="p-3 bg-[#1A1A1A] rounded-lg border border-[#2C2C2C] flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <Phone className="w-4 h-4 text-[#D4AF37]" />
                            <div>
                              <div className="text-[10px] text-[#F5F0E6]/50">Voice Calling Line</div>
                              <div className="text-white font-bold">{contactForm.call || <span className="text-neutral-400 italic text-xs font-normal">Not Available</span>}</div>
                            </div>
                          </div>
                          {contactForm.call ? (
                            <a
                              href={`tel:${contactForm.call.replace(/\s+/g, '')}`}
                              className="px-2.5 py-1 bg-[#242424] hover:bg-[#D4AF37] hover:text-[#101010] text-[#D4AF37] text-[10px] rounded font-bold uppercase transition-colors"
                            >
                              Call
                            </a>
                          ) : (
                            <span className="px-2.5 py-1 bg-[#242424]/40 text-neutral-500 text-[10px] rounded font-mono uppercase cursor-not-allowed">
                              Disabled
                            </span>
                          )}
                        </div>

                        <div className="p-3 bg-[#1A1A1A] rounded-lg border border-[#2C2C2C] flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <MessageSquare className="w-4 h-4 text-emerald-400" />
                            <div>
                              <div className="text-[10px] text-[#F5F0E6]/50">WhatsApp Order Desk</div>
                              <div className="text-white font-bold">{contactForm.whatsapp || <span className="text-neutral-400 italic text-xs font-normal">Not Available</span>}</div>
                            </div>
                          </div>
                          {contactForm.whatsapp ? (
                            <a
                              href={`https://wa.me/${contactForm.whatsapp.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1 bg-emerald-950 text-emerald-300 hover:bg-emerald-600 hover:text-white text-[10px] rounded font-bold uppercase transition-colors border border-emerald-800"
                            >
                              Chat
                            </a>
                          ) : (
                            <span className="px-2.5 py-1 bg-[#242424]/40 text-neutral-500 text-[10px] rounded font-mono uppercase cursor-not-allowed border border-neutral-800">
                              Disabled
                            </span>
                          )}
                        </div>

                        <div className="p-3 bg-[#1A1A1A] rounded-lg border border-[#2C2C2C] flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <Mail className="w-4 h-4 text-[#D4AF37]" />
                            <div className="max-w-[200px] truncate">
                              <div className="text-[10px] text-[#F5F0E6]/50">Commercial Orders Email</div>
                              <div className="text-white font-bold truncate">{contactForm.email || <span className="text-neutral-400 italic text-xs font-normal">Not Available</span>}</div>
                            </div>
                          </div>
                          {contactForm.email ? (
                            <a
                              href={`mailto:${contactForm.email}`}
                              className="px-2.5 py-1 bg-[#242424] hover:bg-[#D4AF37] hover:text-[#101010] text-[#D4AF37] text-[10px] rounded font-bold uppercase transition-colors"
                            >
                              Email
                            </a>
                          ) : (
                            <span className="px-2.5 py-1 bg-[#242424]/40 text-neutral-500 text-[10px] rounded font-mono uppercase cursor-not-allowed">
                              Disabled
                            </span>
                          )}
                        </div>

                        <div className="p-3 bg-[#1A1A1A] rounded-lg border border-[#2C2C2C] flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <Headphones className="w-4 h-4 text-[#D4AF37]" />
                            <div className="max-w-[200px] truncate">
                              <div className="text-[10px] text-[#F5F0E6]/50">Support &amp; Claims Email</div>
                              <div className="text-white font-bold truncate">{contactForm.supportEmail || <span className="text-neutral-400 italic text-xs font-normal">Not Available</span>}</div>
                            </div>
                          </div>
                          {contactForm.supportEmail ? (
                            <a
                              href={`mailto:${contactForm.supportEmail}`}
                              className="px-2.5 py-1 bg-[#242424] hover:bg-[#D4AF37] hover:text-[#101010] text-[#D4AF37] text-[10px] rounded font-bold uppercase transition-colors"
                            >
                              Claims
                            </a>
                          ) : (
                            <span className="px-2.5 py-1 bg-[#242424]/40 text-neutral-500 text-[10px] rounded font-mono uppercase cursor-not-allowed">
                              Disabled
                            </span>
                          )}
                        </div>

                      </div>

                      {/* Physical Address Preview */}
                      <div className="p-3.5 bg-[#1A1A1A] rounded-lg border border-[#2C2C2C] space-y-1">
                        <div className="flex items-center gap-2 text-[#D4AF37] text-[10px] font-mono uppercase tracking-wider font-bold">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>Warehouse &amp; Invoicing Address</span>
                        </div>
                        <p className="text-xs text-[#F5F0E6]/80 font-sans leading-relaxed">
                          {contactForm.adress || <span className="text-neutral-400 italic font-mono text-xs">Not Available</span>}
                        </p>
                        <div className="text-[10px] font-mono text-[#F5F0E6]/40 pt-1 border-t border-[#262626]">
                          Hours: {contactForm.workingHours || 'Not Available'}
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Quick Verification & SLA Box */}
                  <div className="bg-[#141414] border border-[#2C2C2C] rounded-xl p-5 space-y-3">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
                      <Globe className="w-4 h-4 text-[#D4AF37]" />
                      <span>Direct Propagation Scope</span>
                    </h4>
                    <ul className="text-xs text-[#F5F0E6]/60 space-y-2 font-sans">
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span><strong>Public Contact Page:</strong> Synchronizes cards, contact methods, and emergency alert banner.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span><strong>Header &amp; Navbar:</strong> Direct click-to-call hotline and WhatsApp fast-track inquiry.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span><strong>Footer:</strong> Master corporate registry, address block, and emergency contact badge.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span><strong>Printable PDF Quotations:</strong> Official billing entity address and contact telephone.</span>
                      </li>
                    </ul>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* ---------------- 12. TERMS, POLICIES & COMPLIANCE TAB ---------------- */}
          {activeTab === 'policies' && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2C2C2C]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40">
                      Statutory Governance &amp; Agreements
                    </span>
                    <span className="text-[10px] font-mono text-[#F5F0E6]/50">
                      Syncs with /terms, /privacy, /refund, /shipping, /compliance &amp; Legal Modals
                    </span>
                  </div>
                  <h1 className="font-editorial text-2xl sm:text-3xl font-black text-white">
                    Terms, Policies &amp; Agreements Desk
                  </h1>
                  <p className="text-xs text-[#F5F0E6]/60 font-medium">
                    Manage commercial terms, customer trade privacy, 48-hr refund SLAs, cold-chain transport guidelines, and author custom corporate agreements.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setNewPolicyModalOpen(true)}
                    className="px-3.5 py-2 bg-[#D4AF37] hover:bg-[#b89528] text-[#101010] text-xs font-mono font-bold rounded-lg flex items-center gap-1.5 shadow transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ New Policy ("Other")</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResetPolicies}
                    className="px-3 py-2 bg-[#202020] hover:bg-[#2c2c2c] text-[#F5F0E6]/80 hover:text-white text-xs font-mono rounded-lg border border-[#343434] flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Reset to factory statutory defaults"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Reset Defaults</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const path = selectedPolicyKey === 'terms' ? '/terms' : (selectedPolicyKey === 'privacy' ? '/privacy' : (selectedPolicyKey === 'refund' ? '/refund' : (selectedPolicyKey === 'shipping' ? '/shipping' : (selectedPolicyKey === 'compliance' ? '/compliance' : '/legal'))));
                      if (onNavigatePublic) onNavigatePublic(selectedPolicyKey);
                      else {
                        window.history.pushState(null, '', path);
                        window.dispatchEvent(new PopStateEvent('popstate'));
                      }
                    }}
                    className="px-3 py-2 bg-[#202020] hover:bg-[#2c2c2c] text-[#F5F0E6] text-xs font-mono rounded-lg border border-[#343434] flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="View active policy on public website"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>View Public Page</span>
                  </button>
                </div>
              </div>

              {/* Toast Notification */}
              {policySavedToast && (
                <div className="p-4 bg-emerald-950/80 border border-emerald-500 rounded-xl flex items-center justify-between text-emerald-200 text-xs font-mono shadow-xl animate-fadeIn">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <div>
                      <div className="font-bold text-white">Policy Saved &amp; Propagated!</div>
                      <div className="text-[11px] text-emerald-300/80">
                        Changes to "{policyForm?.title || selectedPolicyKey}" have been synchronized to database storage and are now live across all legal endpoints.
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider bg-emerald-900 text-emerald-200 px-2.5 py-1 rounded border border-emerald-700">
                    Live Published
                  </span>
                </div>
              )}

              {/* Policy Selector Ribbon */}
              <div className="bg-[#141414] border border-[#2C2C2C] rounded-xl p-3 shadow-lg">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#F5F0E6]/50 mb-2 px-1 flex items-center justify-between">
                  <span>Select Active Policy Document:</span>
                  <span>{Object.keys(policies).length} Documents Active</span>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
                  {Object.keys(policies).map((key) => {
                    const pol = policies[key];
                    const isActive = selectedPolicyKey === key;
                    const isCustom = pol.isCustom || !['terms', 'privacy', 'refund', 'shipping', 'compliance'].includes(key);

                    return (
                      <div key={key} className="flex items-center gap-1 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => setSelectedPolicyKey(key)}
                          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all border ${
                            isActive
                              ? 'bg-[#D4AF37] text-[#101010] font-bold border-[#D4AF37] shadow-md'
                              : 'bg-[#1C1C1C] text-[#F5F0E6]/80 border-[#2C2C2C] hover:border-[#D4AF37]/50 hover:text-white'
                          }`}
                        >
                          <Scale className="w-3.5 h-3.5 flex-shrink-0" />
                          <span className="whitespace-nowrap">{pol.shortTitle || pol.title}</span>
                          <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full ${
                            isActive ? 'bg-[#101010] text-[#D4AF37]' : 'bg-[#2A2A2A] text-[#F5F0E6]/60'
                          }`}>
                            {pol.sections?.length || 0}
                          </span>
                          {isCustom && (
                            <span className="text-[8px] font-mono uppercase px-1 rounded bg-amber-500/20 text-amber-300">
                              Custom
                            </span>
                          )}
                        </button>

                        {isCustom && (
                          <button
                            type="button"
                            onClick={() => handleDeletePolicy(key)}
                            className="p-1.5 bg-[#1C1C1C] hover:bg-red-900/60 text-[#F5F0E6]/40 hover:text-red-300 rounded border border-[#2C2C2C] transition-colors"
                            title="Delete custom policy"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Main Policy Editor & Preview Split */}
              {policyForm && (
                <div className="grid lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Editor Form (7 Cols) */}
                  <form onSubmit={handleSavePolicy} className="lg:col-span-7 space-y-6">
                    
                    {/* Card 1: Document Metadata */}
                    <div className="bg-[#141414] border border-[#2C2C2C] rounded-xl p-6 shadow-xl space-y-4">
                      <div className="flex items-center justify-between border-b border-[#262626] pb-3">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#D4AF37]" />
                          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                            Document Metadata &amp; Headers
                          </h3>
                        </div>
                        <span className="text-[10px] font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/30">
                          ID: {policyForm.id}
                        </span>
                      </div>

                      <div className="space-y-4 text-xs font-mono">
                        <div>
                          <label className="block text-xs font-mono font-bold uppercase text-[#D4AF37] mb-1.5">
                            Full Document Title *
                          </label>
                          <input
                            type="text"
                            required
                            value={policyForm.title || ''}
                            onChange={(e) => setPolicyForm({ ...policyForm, title: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-[#1C1C1C] border border-[#343434] focus:border-[#D4AF37] rounded-lg text-white font-sans text-xs focus:outline-none transition-colors"
                            placeholder="e.g. Commercial Terms & Wholesale Supply Conditions"
                          />
                        </div>

                        <div className="grid sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-mono font-bold uppercase text-[#D4AF37] mb-1.5">
                              Short Title (Tabs / Nav) *
                            </label>
                            <input
                              type="text"
                              required
                              value={policyForm.shortTitle || ''}
                              onChange={(e) => setPolicyForm({ ...policyForm, shortTitle: e.target.value })}
                              className="w-full px-3.5 py-2.5 bg-[#1C1C1C] border border-[#343434] focus:border-[#D4AF37] rounded-lg text-white font-mono text-xs focus:outline-none transition-colors"
                              placeholder="e.g. Terms & Conditions"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono font-bold uppercase text-[#D4AF37] mb-1.5">
                              Classification Badge *
                            </label>
                            <input
                              type="text"
                              required
                              value={policyForm.badge || ''}
                              onChange={(e) => setPolicyForm({ ...policyForm, badge: e.target.value })}
                              className="w-full px-3.5 py-2.5 bg-[#1C1C1C] border border-[#343434] focus:border-[#D4AF37] rounded-lg text-white font-mono text-xs focus:outline-none transition-colors"
                              placeholder="e.g. B2B COMMERCIAL CONTRACT"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono font-bold uppercase text-[#D4AF37] mb-1.5">
                              Effective Date *
                            </label>
                            <input
                              type="text"
                              required
                              value={policyForm.effectiveDate || ''}
                              onChange={(e) => setPolicyForm({ ...policyForm, effectiveDate: e.target.value })}
                              className="w-full px-3.5 py-2.5 bg-[#1C1C1C] border border-[#343434] focus:border-[#D4AF37] rounded-lg text-white font-mono text-xs focus:outline-none transition-colors"
                              placeholder="e.g. November 1, 2024"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-mono font-bold uppercase text-[#D4AF37] mb-1.5">
                            Executive Summary &amp; Scope *
                          </label>
                          <textarea
                            rows={3}
                            required
                            value={policyForm.description || ''}
                            onChange={(e) => setPolicyForm({ ...policyForm, description: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-[#1C1C1C] border border-[#343434] focus:border-[#D4AF37] rounded-lg text-white font-sans text-xs focus:outline-none transition-colors leading-relaxed"
                            placeholder="Briefly state the commercial and legal applicability of this policy document..."
                          />
                        </div>
                      </div>
                    </div>

                    {/* Card 2: Clauses & Sections Manager */}
                    <div className="bg-[#141414] border border-[#2C2C2C] rounded-xl p-6 shadow-xl space-y-5">
                      <div className="flex items-center justify-between border-b border-[#262626] pb-3">
                        <div className="flex items-center gap-2">
                          <ScrollText className="w-4 h-4 text-[#D4AF37]" />
                          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                            Clauses &amp; Articles ({policyForm.sections?.length || 0})
                          </h3>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const nextNum = String((policyForm.sections?.length || 0) + 1).padStart(2, '0');
                            setNewSectionData({ number: nextNum, heading: '', content: '' });
                            setNewSectionModalOpen(true);
                          }}
                          className="px-3 py-1.5 bg-[#202020] hover:bg-[#2C2C2C] text-[#D4AF37] text-xs font-mono font-bold rounded-lg border border-[#343434] flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>+ Add Clause</span>
                        </button>
                      </div>

                      <div className="space-y-4">
                        {(policyForm.sections || []).map((sec, idx) => (
                          <div 
                            key={idx}
                            className="p-4 bg-[#181818] border border-[#2C2C2C] rounded-xl space-y-3 relative group hover:border-[#D4AF37]/50 transition-colors"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-2.5 flex-1">
                                <span className="w-7 h-7 rounded bg-[#D4AF37]/10 text-[#D4AF37] font-mono text-xs font-bold flex items-center justify-center flex-shrink-0 border border-[#D4AF37]/30">
                                  {sec.number || String(idx + 1).padStart(2, '0')}
                                </span>
                                <input
                                  type="text"
                                  value={sec.heading || ''}
                                  onChange={(e) => handleSectionTextChange(idx, 'heading', e.target.value)}
                                  placeholder="Clause Heading / Article Title"
                                  className="w-full px-2.5 py-1.5 bg-[#121212] border border-[#303030] rounded text-white font-editorial text-sm font-bold focus:outline-none focus:border-[#D4AF37]"
                                />
                              </div>

                              <button
                                type="button"
                                onClick={() => handleDeleteSection(idx)}
                                className="p-1.5 text-[#F5F0E6]/40 hover:text-red-400 hover:bg-red-950/40 rounded transition-colors"
                                title="Delete this clause"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div>
                              <textarea
                                rows={4}
                                value={sec.content || ''}
                                onChange={(e) => handleSectionTextChange(idx, 'content', e.target.value)}
                                placeholder="Legal stipulations, operational protocols, and commercial obligations..."
                                className="w-full px-3 py-2 bg-[#121212] border border-[#303030] rounded text-white font-sans text-xs focus:outline-none focus:border-[#D4AF37] leading-relaxed"
                              />
                            </div>
                          </div>
                        ))}

                        {(!policyForm.sections || policyForm.sections.length === 0) && (
                          <div className="p-8 text-center border-2 border-dashed border-[#2C2C2C] rounded-xl text-xs font-mono text-[#F5F0E6]/50">
                            No clauses defined yet. Click "+ Add Clause" above to insert the first article.
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Save Bar */}
                    <div className="flex items-center justify-between gap-4 p-4 bg-[#141414] border border-[#2C2C2C] rounded-xl shadow-lg">
                      <div className="text-[11px] font-mono text-[#F5F0E6]/50">
                        Last Revised: <strong className="text-white">{policyForm.lastUpdated || 'Today'}</strong>
                      </div>

                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#D4AF37] hover:bg-[#b89528] text-[#101010] font-black text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 shadow-lg transition-all"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save &amp; Publish "{policyForm.shortTitle || 'Policy'}"</span>
                      </button>
                    </div>

                  </form>

                  {/* Right Column: Live Simulation Card (5 Cols) */}
                  <div className="lg:col-span-5 space-y-6">
                    
                    <div className="bg-[#141414] border-2 border-[#D4AF37]/50 rounded-xl p-6 shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-[#D4AF37] text-[#101010] font-mono text-[9px] font-bold uppercase px-3 py-1 rounded-bl-lg">
                        Customer Live View
                      </div>

                      <div className="space-y-4">
                        <div>
                          <span className="text-[9px] font-mono uppercase tracking-widest text-[#D4AF37] font-bold block mb-1">
                            {policyForm.badge || 'LEGAL PROTOCOL'}
                          </span>
                          <h3 className="font-editorial text-xl font-bold text-white leading-tight">
                            {policyForm.title}
                          </h3>
                          <p className="text-xs text-[#F5F0E6]/70 mt-2 font-sans leading-relaxed">
                            {policyForm.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 text-[10px] font-mono text-[#F5F0E6]/50 border-y border-[#262626] py-2">
                          <div>Effective: <strong>{policyForm.effectiveDate}</strong></div>
                          <span>•</span>
                          <div>Articles: <strong>{policyForm.sections?.length || 0}</strong></div>
                        </div>

                        {/* Clauses Preview List */}
                        <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1 scrollbar-thin">
                          {(policyForm.sections || []).map((sec, idx) => (
                            <div key={idx} className="p-3 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A] space-y-1">
                              <div className="flex items-center gap-2 text-xs font-bold text-white">
                                <span className="font-mono text-[#D4AF37] text-[11px]">{sec.number || String(idx + 1).padStart(2, '0')}.</span>
                                <span>{sec.heading}</span>
                              </div>
                              <p className="text-[11px] text-[#F5F0E6]/70 font-sans leading-relaxed line-clamp-3">
                                {sec.content}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() => {
                              const path = selectedPolicyKey === 'terms' ? '/terms' : (selectedPolicyKey === 'privacy' ? '/privacy' : (selectedPolicyKey === 'refund' ? '/refund' : (selectedPolicyKey === 'shipping' ? '/shipping' : (selectedPolicyKey === 'compliance' ? '/compliance' : '/legal'))));
                              if (onNavigatePublic) onNavigatePublic(selectedPolicyKey);
                              else {
                                window.history.pushState(null, '', path);
                                window.dispatchEvent(new PopStateEvent('popstate'));
                              }
                            }}
                            className="w-full py-2 bg-[#202020] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#101010] text-xs font-mono font-bold uppercase rounded-lg border border-[#343434] flex items-center justify-center gap-2 transition-all cursor-pointer"
                          >
                            <span>Open in Fullscreen Customer View</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                        </div>

                      </div>
                    </div>

                    {/* Quick Propagation Card */}
                    <div className="bg-[#141414] border border-[#2C2C2C] rounded-xl p-5 space-y-3">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
                        <Globe className="w-4 h-4 text-[#D4AF37]" />
                        <span>Instant Website Coverage</span>
                      </h4>
                      <ul className="text-xs text-[#F5F0E6]/60 space-y-2 font-sans">
                        <li className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span><strong>Direct Clean URLs:</strong> Instantly accessible at <code>/{selectedPolicyKey}</code> and <code>/legal</code>.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span><strong>Quick Legal Modal:</strong> Readily available in popup modals when store partners review terms.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span><strong>Footer Directory:</strong> Listed in the statutory compliance column of every public page.</span>
                        </li>
                      </ul>
                    </div>

                  </div>

                </div>
              )}

            </div>
          )}

        </main>

      </div>

      {/* ---------------- MODALS (ADD / EDIT) ---------------- */}

      {/* 1. PRODUCT MODAL */}
      {modalType === 'product' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-[#141414] border-2 border-[#D4AF37]/50 rounded-2xl max-w-2xl w-full p-6 text-white max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#262626] pb-4 mb-4">
              <h3 className="font-editorial text-xl font-bold text-white">
                {editingItem ? 'Edit Product SKU' : 'Add New Product SKU'}
              </h3>
              <button onClick={() => setModalType(null)} className="text-[#F5F0E6]/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProductSubmit} className="space-y-4 text-xs font-mono">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[#D4AF37] block mb-1">SKU Code *</label>
                  <input name="sku" required defaultValue={editingItem?.sku || `MP-${Math.floor(1000 + Math.random() * 9000)}`} className="w-full p-2.5 bg-[#1C1C1C] border border-[#343434] rounded text-white" />
                </div>
                <div>
                  <label className="text-[#D4AF37] block mb-1">Category *</label>
                  <select name="category" defaultValue={editingItem?.category || 'chocolates'} className="w-full p-2.5 bg-[#1C1C1C] border border-[#343434] rounded text-white">
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[#D4AF37] block mb-1">Product Title *</label>
                <input name="name" required defaultValue={editingItem?.name || ''} placeholder="e.g. Malabar Prime Artisan Dark Chocolate Bars" className="w-full p-2.5 bg-[#1C1C1C] border border-[#343434] rounded text-white font-sans" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[#D4AF37] block mb-1">Brand Name *</label>
                  <input name="brand" required defaultValue={editingItem?.brand || 'MALABAR PRIME'} className="w-full p-2.5 bg-[#1C1C1C] border border-[#343434] rounded text-white" />
                </div>
                <div>
                  <label className="text-[#D4AF37] block mb-1">Pack Size / Master Carton *</label>
                  <input name="packSize" required defaultValue={editingItem?.packSize || '24 x 250g Master Pack'} className="w-full p-2.5 bg-[#1C1C1C] border border-[#343434] rounded text-white" />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[#D4AF37] block mb-1">Wholesale Slab Rate *</label>
                  <input name="wholesaleRange" required defaultValue={editingItem?.wholesaleRange || '₹85 - ₹98 / unit'} className="w-full p-2.5 bg-[#1C1C1C] border border-[#343434] rounded text-white" />
                </div>
                <div>
                  <label className="text-[#D4AF37] block mb-1">Minimum Order (MOQ) *</label>
                  <input name="moq" required defaultValue={editingItem?.moq || '5 Master Cartons'} className="w-full p-2.5 bg-[#1C1C1C] border border-[#343434] rounded text-white" />
                </div>
                <div>
                  <label className="text-[#D4AF37] block mb-1">MRP Benchmark</label>
                  <input name="mrp" defaultValue={editingItem?.mrp || '₹140'} className="w-full p-2.5 bg-[#1C1C1C] border border-[#343434] rounded text-white" />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[#D4AF37] block mb-1">Stock Status</label>
                  <select name="stockStatus" defaultValue={editingItem?.stockStatus || 'In Stock'} className="w-full p-2.5 bg-[#1C1C1C] border border-[#343434] rounded text-white">
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Pre-Order">Pre-Order</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
                <div>
                  <label className="text-[#D4AF37] block mb-1">Shelf Life</label>
                  <input name="shelfLife" defaultValue={editingItem?.shelfLife || '12 Months'} className="w-full p-2.5 bg-[#1C1C1C] border border-[#343434] rounded text-white" />
                </div>
                <div>
                  <label className="text-[#D4AF37] block mb-1">Origin / Estate</label>
                  <input name="origin" defaultValue={editingItem?.origin || 'Kerala, India'} className="w-full p-2.5 bg-[#1C1C1C] border border-[#343434] rounded text-white" />
                </div>
              </div>

              {/* Product Image & Upload Field */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[#D4AF37] block">Product Image / Media</label>
                  {isUploading && (
                    <span className="text-xs text-[#D4AF37] animate-pulse flex items-center gap-1">
                      <RefreshCw className="w-3 h-3 animate-spin" /> Uploading to server...
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {modalImageUrl ? (
                    <img src={modalImageUrl} alt="Preview" className="w-14 h-14 rounded-lg object-cover border border-[#D4AF37]/50 flex-shrink-0 bg-black/50" />
                  ) : (
                    <div className="w-14 h-14 rounded-lg border border-dashed border-[#343434] bg-[#1a1a1a] flex items-center justify-center text-zinc-500 text-xs flex-shrink-0">
                      No Image
                    </div>
                  )}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <input 
                        name="image" 
                        value={modalImageUrl} 
                        onChange={(e) => setModalImageUrl(e.target.value)} 
                        placeholder="https://... or click Upload Image" 
                        className="flex-1 p-2 bg-[#1C1C1C] border border-[#343434] rounded text-white text-xs font-mono" 
                      />
                      <label className="cursor-pointer px-3 py-2 bg-[#202020] hover:bg-[#2c2c2c] border border-[#D4AF37]/60 text-[#D4AF37] rounded text-xs font-bold flex items-center gap-1.5 transition-colors flex-shrink-0">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleFileUpload(e.target.files[0]);
                            }
                          }} 
                        />
                      </label>
                    </div>
                    <p className="text-[10px] text-zinc-400">Direct upload to backend storage (/public/uploads/) or provide CDN URL</p>
                    {uploadError && <p className="text-[10px] text-red-400">{uploadError}</p>}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[#D4AF37] block mb-1">Commercial Description</label>
                <textarea name="description" rows={3} defaultValue={editingItem?.description || ''} className="w-full p-2.5 bg-[#1C1C1C] border border-[#343434] rounded text-white font-sans" />
              </div>

              {/* Fast-Moving / Most Moving Toggle */}
              <div className="flex items-center gap-2.5 p-3 bg-[#1C1C1C] border border-[#343434] rounded">
                <input 
                  type="checkbox" 
                  name="isFastMoving" 
                  id="isFastMoving" 
                  defaultChecked={editingItem ? editingItem.isFastMoving !== false : true} 
                  className="rounded border-[#343434] bg-[#141414] text-[#D4AF37] focus:ring-0 w-4 h-4 cursor-pointer"
                />
                <label htmlFor="isFastMoving" className="text-xs text-white cursor-pointer select-none">
                  <span className="text-[#D4AF37] font-bold">Featured in "Most Moving Items" Slider</span>
                  <span className="text-[11px] text-zinc-400 block">Showcases this SKU on the Homepage auto-slider with a Top Seller badge</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-[#262626]">
                <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 bg-[#202020] text-white rounded">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-[#D4AF37] text-[#101010] font-bold rounded">
                  {editingItem ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. CATEGORY MODAL */}
      {modalType === 'category' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
          <div className="bg-[#141414] border-2 border-[#D4AF37]/50 rounded-2xl max-w-md w-full p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#262626] pb-4 mb-4">
              <h3 className="font-editorial text-lg font-bold text-white">
                {editingItem ? 'Edit Category' : 'Add New Category'}
              </h3>
              <button onClick={() => setModalType(null)} className="text-[#F5F0E6]/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCategorySubmit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="text-[#D4AF37] block mb-1">Category Name *</label>
                <input name="name" required defaultValue={editingItem?.name || ''} placeholder="e.g. Energy Drinks" className="w-full p-2.5 bg-[#1C1C1C] border border-[#343434] rounded text-white" />
              </div>

              <div>
                <label className="text-[#D4AF37] block mb-1">URL Identifier (Slug) *</label>
                <input name="slug" required defaultValue={editingItem?.id || ''} placeholder="e.g. energy-drinks" className="w-full p-2.5 bg-[#1C1C1C] border border-[#343434] rounded text-white" />
              </div>

              <div>
                <label className="text-[#D4AF37] block mb-1">Description</label>
                <textarea name="description" rows={3} defaultValue={editingItem?.description || ''} className="w-full p-2.5 bg-[#1C1C1C] border border-[#343434] rounded text-white font-sans" />
              </div>

              <input type="hidden" name="icon" value={editingItem?.icon || 'Package'} />

              <div className="flex justify-end gap-2 pt-4 border-t border-[#262626]">
                <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 bg-[#202020] text-white rounded">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-[#D4AF37] text-[#101010] font-bold rounded">
                  {editingItem ? 'Save Changes' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. BRAND MODAL */}
      {modalType === 'brand' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
          <div className="bg-[#141414] border-2 border-[#D4AF37]/50 rounded-2xl max-w-lg w-full p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#262626] pb-4 mb-4">
              <h3 className="font-editorial text-lg font-bold text-white">
                {editingItem ? 'Edit Brand' : 'Add Brand'}
              </h3>
              <button onClick={() => setModalType(null)} className="text-[#F5F0E6]/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBrandSubmit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="text-[#D4AF37] block mb-1">Brand Name *</label>
                <input name="name" required defaultValue={editingItem?.name || ''} placeholder="e.g. Malabar Prime Beverages" className="w-full p-2.5 bg-[#1C1C1C] border border-[#343434] rounded text-white" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[#D4AF37] block mb-1">Type *</label>
                  <select name="type" defaultValue={editingItem?.type || 'Own Brand'} className="w-full p-2.5 bg-[#1C1C1C] border border-[#343434] rounded text-white">
                    <option value="Own Brand">Own Brand</option>
                    <option value="Partner Brand">Partner Brand</option>
                  </select>
                </div>
                <div>
                  <label className="text-[#D4AF37] block mb-1">Category / Segment *</label>
                  <input name="category" required defaultValue={editingItem?.category || 'Beverages'} className="w-full p-2.5 bg-[#1C1C1C] border border-[#343434] rounded text-white" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[#D4AF37] block mb-1">Tier / Authorization</label>
                  <input name="tier" defaultValue={editingItem?.tier || 'Exclusive Master Distributor'} className="w-full p-2.5 bg-[#1C1C1C] border border-[#343434] rounded text-white" />
                </div>
                <div>
                  <label className="text-[#D4AF37] block mb-1">SKUs Count / Tag</label>
                  <input name="skus" defaultValue={editingItem?.skus || '25+ SKUs'} className="w-full p-2.5 bg-[#1C1C1C] border border-[#343434] rounded text-white" />
                </div>
              </div>

              <div>
                <label className="text-[#D4AF37] block mb-1">Badge Tag</label>
                <input name="tag" defaultValue={editingItem?.tag || 'AUTHORIZED'} placeholder="FLAGSHIP BRAND" className="w-full p-2.5 bg-[#1C1C1C] border border-[#343434] rounded text-white" />
              </div>

              {/* Brand Cover Image & Upload Field */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[#D4AF37] block">Brand Cover Image / Logo</label>
                  {isUploading && (
                    <span className="text-xs text-[#D4AF37] animate-pulse flex items-center gap-1">
                      <RefreshCw className="w-3 h-3 animate-spin" /> Uploading to server...
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {modalImageUrl ? (
                    <img src={modalImageUrl} alt="Preview" className="w-14 h-14 rounded-lg object-cover border border-[#D4AF37]/50 flex-shrink-0 bg-black/50" />
                  ) : (
                    <div className="w-14 h-14 rounded-lg border border-dashed border-[#343434] bg-[#1a1a1a] flex items-center justify-center text-zinc-500 text-xs flex-shrink-0">
                      No Image
                    </div>
                  )}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <input 
                        name="image" 
                        value={modalImageUrl} 
                        onChange={(e) => setModalImageUrl(e.target.value)} 
                        placeholder="https://... or click Upload Image" 
                        className="flex-1 p-2 bg-[#1C1C1C] border border-[#343434] rounded text-white text-xs font-mono" 
                      />
                      <label className="cursor-pointer px-3 py-2 bg-[#202020] hover:bg-[#2c2c2c] border border-[#D4AF37]/60 text-[#D4AF37] rounded text-xs font-bold flex items-center gap-1.5 transition-colors flex-shrink-0">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleFileUpload(e.target.files[0]);
                            }
                          }} 
                        />
                      </label>
                    </div>
                    <p className="text-[10px] text-zinc-400">Direct upload to backend storage (/public/uploads/) or provide CDN URL</p>
                    {uploadError && <p className="text-[10px] text-red-400">{uploadError}</p>}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[#D4AF37] block mb-1">Description</label>
                <textarea name="description" rows={3} defaultValue={editingItem?.description || ''} className="w-full p-2.5 bg-[#1C1C1C] border border-[#343434] rounded text-white font-sans" />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-[#262626]">
                <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 bg-[#202020] text-white rounded">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-[#D4AF37] text-[#101010] font-bold rounded">
                  {editingItem ? 'Save Changes' : 'Create Brand'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. TESTIMONIAL MODAL */}
      {modalType === 'testimonial' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
          <div className="bg-[#141414] border-2 border-[#D4AF37]/50 rounded-2xl max-w-lg w-full p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#262626] pb-4 mb-4">
              <h3 className="font-editorial text-lg font-bold text-white">
                {editingItem ? 'Edit Testimonial' : 'Add Client Review'}
              </h3>
              <button onClick={() => setModalType(null)} className="text-[#F5F0E6]/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleTestimonialSubmit} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[#D4AF37] block mb-1">Reviewer Name *</label>
                  <input name="name" required defaultValue={editingItem?.name || ''} className="w-full p-2.5 bg-[#1C1C1C] border border-[#343434] rounded text-white" />
                </div>
                <div>
                  <label className="text-[#D4AF37] block mb-1">Designation / Title *</label>
                  <input name="title" required defaultValue={editingItem?.title || 'Procurement Head'} className="w-full p-2.5 bg-[#1C1C1C] border border-[#343434] rounded text-white" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[#D4AF37] block mb-1">Company / Supermarket *</label>
                  <input name="company" required defaultValue={editingItem?.company || ''} className="w-full p-2.5 bg-[#1C1C1C] border border-[#343434] rounded text-white" />
                </div>
                <div>
                  <label className="text-[#D4AF37] block mb-1">Outlets / Scale</label>
                  <input name="outlets" defaultValue={editingItem?.outlets || '6 Outlets in Kerala'} className="w-full p-2.5 bg-[#1C1C1C] border border-[#343434] rounded text-white" />
                </div>
              </div>

              <div>
                <label className="text-[#D4AF37] block mb-1">Quote *</label>
                <textarea name="quote" required rows={3} defaultValue={editingItem?.quote || ''} className="w-full p-2.5 bg-[#1C1C1C] border border-[#343434] rounded text-white font-sans" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-[#D4AF37] block mb-1">Rating (1-5)</label>
                  <input name="rating" type="number" min="1" max="5" defaultValue={editingItem?.rating || 5} className="w-full p-2.5 bg-[#1C1C1C] border border-[#343434] rounded text-white" />
                </div>
                <div>
                  <label className="text-[#D4AF37] block mb-1">Category</label>
                  <input name="category" defaultValue={editingItem?.category || 'Chocolates & Beverages'} className="w-full p-2.5 bg-[#1C1C1C] border border-[#343434] rounded text-white" />
                </div>
                <div>
                  <label className="text-[#D4AF37] block mb-1">Status</label>
                  <select name="status" defaultValue={editingItem?.status || 'Active'} className="w-full p-2.5 bg-[#1C1C1C] border border-[#343434] rounded text-white">
                    <option value="Active">Active</option>
                    <option value="Hidden">Hidden</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[#D4AF37] block mb-1">Badge Tag</label>
                  <input name="badge" defaultValue={editingItem?.badge || 'Partner Since 2020'} className="w-full p-2.5 bg-[#1C1C1C] border border-[#343434] rounded text-white" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[#D4AF37] block">Avatar Image</label>
                    {isUploading && (
                      <span className="text-xs text-[#D4AF37] animate-pulse flex items-center gap-1">
                        <RefreshCw className="w-3 h-3 animate-spin" /> Uploading...
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {modalImageUrl ? (
                      <img src={modalImageUrl} alt="Avatar" className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]/50 flex-shrink-0 bg-black/50" />
                    ) : (
                      <div className="w-10 h-10 rounded-full border border-dashed border-[#343434] bg-[#1a1a1a] flex items-center justify-center text-zinc-500 text-[10px] flex-shrink-0">
                        None
                      </div>
                    )}
                    <input 
                      name="avatar" 
                      value={modalImageUrl} 
                      onChange={(e) => setModalImageUrl(e.target.value)} 
                      placeholder="https://... or upload" 
                      className="flex-1 p-2 bg-[#1C1C1C] border border-[#343434] rounded text-white text-xs font-mono" 
                    />
                    <label className="cursor-pointer px-2.5 py-2 bg-[#202020] hover:bg-[#2c2c2c] border border-[#D4AF37]/60 text-[#D4AF37] rounded text-xs font-bold flex items-center gap-1 transition-colors flex-shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleFileUpload(e.target.files[0]);
                          }
                        }} 
                      />
                    </label>
                  </div>
                  {uploadError && <p className="text-[10px] text-red-400 mt-1">{uploadError}</p>}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-[#262626]">
                <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 bg-[#202020] text-white rounded">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-[#D4AF37] text-[#101010] font-bold rounded">
                  {editingItem ? 'Save Changes' : 'Create Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. QUALITY CERTIFICATION MODAL */}
      {modalType === 'cert' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
          <div className="bg-[#141414] border-2 border-[#D4AF37]/50 rounded-2xl max-w-md w-full p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#262626] pb-4 mb-4">
              <h3 className="font-editorial text-lg font-bold text-white">
                Add Quality Certification
              </h3>
              <button onClick={() => setModalType(null)} className="text-[#F5F0E6]/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCertSubmit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="text-[#D4AF37] block mb-1">Certification Title *</label>
                <input name="title" required placeholder="e.g. HACCP Cold Chain Standard" className="w-full p-2.5 bg-[#1C1C1C] border border-[#343434] rounded text-white" />
              </div>

              <div>
                <label className="text-[#D4AF37] block mb-1">Issuing Authority / Agency *</label>
                <input name="issuer" required placeholder="e.g. Bureau Veritas / FSSAI" className="w-full p-2.5 bg-[#1C1C1C] border border-[#343434] rounded text-white" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[#D4AF37] block mb-1">Standard Code</label>
                  <input name="standard" placeholder="e.g. ISO 22000" className="w-full p-2.5 bg-[#1C1C1C] border border-[#343434] rounded text-white" />
                </div>
                <div>
                  <label className="text-[#D4AF37] block mb-1">Valid Till</label>
                  <input name="validTill" placeholder="e.g. Dec 2028" className="w-full p-2.5 bg-[#1C1C1C] border border-[#343434] rounded text-white" />
                </div>
              </div>

              <div>
                <label className="text-[#D4AF37] block mb-1">Scope &amp; Description</label>
                <textarea name="desc" rows={3} placeholder="Describes compliance protocol..." className="w-full p-2.5 bg-[#1C1C1C] border border-[#343434] rounded text-white font-sans" />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-[#262626]">
                <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 bg-[#202020] text-white rounded">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-[#D4AF37] text-[#101010] font-bold rounded">
                  Add Certification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- NEW CUSTOM POLICY MODAL ("OTHER") ---------------- */}
      {newPolicyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
          <div className="bg-[#141414] border-2 border-[#D4AF37]/50 rounded-2xl max-w-xl w-full p-6 text-white max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#262626] pb-4 mb-4">
              <div className="flex items-center gap-2.5">
                <Scale className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="font-editorial text-xl font-bold text-white">
                  Add Custom Policy / Agreement ("Other")
                </h3>
              </div>
              <button onClick={() => setNewPolicyModalOpen(false)} className="text-[#F5F0E6]/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomPolicy} className="space-y-4 text-xs font-mono">
              <div>
                <label className="text-[#D4AF37] block mb-1">Document Title *</label>
                <input name="title" required placeholder="e.g. Authorized Vendor &amp; Supplier Code of Conduct" className="w-full p-2.5 bg-[#1C1C1C] border border-[#343434] rounded text-white font-sans text-xs focus:outline-none focus:border-[#D4AF37]" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[#D4AF37] block mb-1">Short Title (Nav Label) *</label>
                  <input name="shortTitle" required placeholder="e.g. Supplier Code" className="w-full p-2.5 bg-[#1C1C1C] border border-[#343434] rounded text-white text-xs focus:outline-none focus:border-[#D4AF37]" />
                </div>
                <div>
                  <label className="text-[#D4AF37] block mb-1">Classification Badge</label>
                  <input name="badge" defaultValue="STATUTORY POLICY" placeholder="e.g. COMPLIANCE STANDARD" className="w-full p-2.5 bg-[#1C1C1C] border border-[#343434] rounded text-white text-xs focus:outline-none focus:border-[#D4AF37]" />
                </div>
              </div>

              <div>
                <label className="text-[#D4AF37] block mb-1">Executive Summary / Description *</label>
                <textarea name="description" rows={3} required placeholder="Operational scope and applicability of this agreement..." className="w-full p-2.5 bg-[#1C1C1C] border border-[#343434] rounded text-white font-sans text-xs focus:outline-none focus:border-[#D4AF37] leading-relaxed" />
              </div>

              <div className="p-3.5 bg-[#181818] border border-[#2C2C2C] rounded-lg space-y-2">
                <div className="text-[11px] font-bold text-[#D4AF37]">First Article / Initial Clause</div>
                <input name="firstClauseHeading" defaultValue="Scope &amp; Commercial Standards" placeholder="Clause Heading" className="w-full p-2 bg-[#121212] border border-[#303030] rounded text-white text-xs font-sans" />
                <textarea name="firstClauseContent" rows={3} defaultValue="All participating retail partners and suppliers agree to uphold certified commercial standards, statutory compliance, and trade ethics." className="w-full p-2 bg-[#121212] border border-[#303030] rounded text-white font-sans text-xs leading-relaxed" />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-[#262626]">
                <button type="button" onClick={() => setNewPolicyModalOpen(false)} className="px-4 py-2 bg-[#202020] hover:bg-[#2C2C2C] text-white rounded cursor-pointer transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-[#D4AF37] hover:bg-[#b89528] text-[#101010] font-bold rounded cursor-pointer transition-colors shadow">
                  Create Policy Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- NEW CLAUSE / SECTION MODAL ---------------- */}
      {newSectionModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
          <div className="bg-[#141414] border-2 border-[#D4AF37]/50 rounded-2xl max-w-xl w-full p-6 text-white max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#262626] pb-4 mb-4">
              <div className="flex items-center gap-2.5">
                <ScrollText className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="font-editorial text-xl font-bold text-white">
                  Add Clause to "{policyForm?.shortTitle || 'Policy'}"
                </h3>
              </div>
              <button onClick={() => setNewSectionModalOpen(false)} className="text-[#F5F0E6]/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSection} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-4 gap-3">
                <div>
                  <label className="text-[#D4AF37] block mb-1">Clause #</label>
                  <input
                    type="text"
                    value={newSectionData.number}
                    onChange={(e) => setNewSectionData({ ...newSectionData, number: e.target.value })}
                    placeholder="01"
                    className="w-full p-2.5 bg-[#1C1C1C] border border-[#343434] rounded text-white font-mono text-center font-bold text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div className="col-span-3">
                  <label className="text-[#D4AF37] block mb-1">Clause Heading / Title *</label>
                  <input
                    type="text"
                    required
                    value={newSectionData.heading}
                    onChange={(e) => setNewSectionData({ ...newSectionData, heading: e.target.value })}
                    placeholder="e.g. Product Recalls &amp; Food Safety Action Plan"
                    className="w-full p-2.5 bg-[#1C1C1C] border border-[#343434] rounded text-white font-sans text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[#D4AF37] block mb-1">Clause Content &amp; Stipulations *</label>
                <textarea
                  rows={5}
                  required
                  value={newSectionData.content}
                  onChange={(e) => setNewSectionData({ ...newSectionData, content: e.target.value })}
                  placeholder="Detail the complete terms, obligations, timelines, and operational requirements..."
                  className="w-full p-2.5 bg-[#1C1C1C] border border-[#343434] rounded text-white font-sans text-xs focus:outline-none focus:border-[#D4AF37] leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-[#262626]">
                <button type="button" onClick={() => setNewSectionModalOpen(false)} className="px-4 py-2 bg-[#202020] hover:bg-[#2C2C2C] text-white rounded cursor-pointer transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-[#D4AF37] hover:bg-[#b89528] text-[#101010] font-bold rounded cursor-pointer transition-colors shadow">
                  Append Clause
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- PDF EXPORT & PRINT PREVIEW MODAL ---------------- */}
      {pdfModalConfig && (
        <PdfReportView
          type={pdfModalConfig.type}
          data={pdfModalConfig.data}
          onClose={() => setPdfModalConfig(null)}
        />
      )}

    </div>
  );
}

