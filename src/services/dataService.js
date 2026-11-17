import { COMPANY_INFO as INITIAL_COMPANY_INFO } from '../data/distributionData';
import { LEGAL_POLICIES as INITIAL_POLICIES } from '../data/legalData';

// Admin Pre-Configured Credentials
export const ADMIN_CREDENTIALS = {
  email: 'malabarprime.co@gmail.com',
  password: 'password123',
  name: 'Malabar Prime Trade Desk Director',
  role: 'Super Administrator'
};

// Clean Initial States - No Dummy Data (Controlled strictly via db.json & Admin Dashboard)
const INITIAL_PRODUCTS = [];
const INITIAL_CATEGORIES = [];
const INITIAL_ALL_BRANDS = [];
const INITIAL_TESTIMONIALS = [];
const INITIAL_ENQUIRIES = [];
const INITIAL_PARTNER_APPLICATIONS = [];
const INITIAL_CONTACT_MESSAGES = [];
const INITIAL_CERTIFICATIONS = [];

// Helper to load from localStorage with fallback
const loadFromStorage = (key, fallback) => {
  try {
    const item = localStorage.getItem(`mp_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
};

// Helper to save to localStorage
const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(`mp_${key}`, JSON.stringify(value));
  } catch (e) {
    console.error(`Failed to save ${key} to storage`, e);
  }
};

class DataService {
  constructor() {
    this.listeners = new Set();
    if (typeof window !== 'undefined') {
      const isCleaned = localStorage.getItem('mp_v3_clean_synced');
      if (!isCleaned) {
        localStorage.removeItem('mp_products');
        localStorage.removeItem('mp_categories');
        localStorage.removeItem('mp_brands');
        localStorage.removeItem('mp_testimonials');
        localStorage.removeItem('mp_enquiries');
        localStorage.removeItem('mp_partners');
        localStorage.removeItem('mp_contacts');
        localStorage.setItem('mp_v3_clean_synced', 'true');
      }
    }
    this.init();
    if (typeof window !== 'undefined') {
      this.syncWithBackend();
    }
  }

  async syncWithBackend() {
    try {
      const statsRes = await fetch('/api/stats');
      if (!statsRes.ok) return;

      const [pRes, cRes, bRes, eRes, partRes, contRes, tRes, aRes, compRes, polRes] = await Promise.all([
        fetch('/api/products').then(r => r.json()).catch(() => ({})),
        fetch('/api/categories').then(r => r.json()).catch(() => ({})),
        fetch('/api/brands').then(r => r.json()).catch(() => ({})),
        fetch('/api/enquiries').then(r => r.json()).catch(() => ({})),
        fetch('/api/partners').then(r => r.json()).catch(() => ({})),
        fetch('/api/contacts').then(r => r.json()).catch(() => ({})),
        fetch('/api/testimonials').then(r => r.json()).catch(() => ({})),
        fetch('/api/assurance').then(r => r.json()).catch(() => ({})),
        fetch('/api/company/contact').then(r => r.json()).catch(() => ({})),
        fetch('/api/policies').then(r => r.json()).catch(() => ({}))
      ]);

      if (pRes.data && Array.isArray(pRes.data)) { this.products = pRes.data; saveToStorage('products', this.products); }
      if (cRes.data && Array.isArray(cRes.data)) { this.categories = cRes.data; saveToStorage('categories', this.categories); }
      if (bRes.data && Array.isArray(bRes.data)) { this.brands = bRes.data; saveToStorage('brands', this.brands); }
      if (eRes.data && Array.isArray(eRes.data)) { this.enquiries = eRes.data; saveToStorage('enquiries', this.enquiries); }
      if (partRes.data && Array.isArray(partRes.data)) { this.partnerApplications = partRes.data; saveToStorage('partners', this.partnerApplications); }
      if (contRes.data && Array.isArray(contRes.data)) { this.contactMessages = contRes.data; saveToStorage('contacts', this.contactMessages); }
      if (tRes.data && Array.isArray(tRes.data)) { this.testimonials = tRes.data; saveToStorage('testimonials', this.testimonials); }
      if (aRes.data && typeof aRes.data === 'object') { this.assurance = aRes.data; saveToStorage('assurance', this.assurance); }
      if (compRes.data && typeof compRes.data === 'object') { this.companyContact = compRes.data; saveToStorage('company_contact', this.companyContact); }
      if (polRes.data && typeof polRes.data === 'object') { this.policies = polRes.data; saveToStorage('policies', this.policies); }

      this.notify();
    } catch (e) {
      // Backend not yet reachable or in build mode, using storage fallback
    }
  }

  // Safe async API caller
  apiCall(endpoint, method = 'GET', body = null) {
    if (typeof window === 'undefined') return;
    try {
      fetch(endpoint, {
        method,
        headers: body ? { 'Content-Type': 'application/json' } : {},
        body: body ? JSON.stringify(body) : undefined
      }).catch(() => {});
    } catch (e) {}
  }

  init() {
    this.products = loadFromStorage('products', INITIAL_PRODUCTS);
    this.categories = loadFromStorage('categories', INITIAL_CATEGORIES);
    this.brands = loadFromStorage('brands', INITIAL_ALL_BRANDS);
    this.enquiries = loadFromStorage('enquiries', INITIAL_ENQUIRIES);
    this.partnerApplications = loadFromStorage('partners', INITIAL_PARTNER_APPLICATIONS);
    this.contactMessages = loadFromStorage('contacts', INITIAL_CONTACT_MESSAGES);
    this.testimonials = loadFromStorage('testimonials', INITIAL_TESTIMONIALS);
    this.assurance = loadFromStorage('assurance', {
      companyInfo: INITIAL_COMPANY_INFO,
      certifications: INITIAL_CERTIFICATIONS,
      fssaiNumber: INITIAL_COMPANY_INFO.fssaiNumber,
      gstNumber: INITIAL_COMPANY_INFO.gstNumber,
      isoCert: INITIAL_COMPANY_INFO.isoCert,
      coldChainCompliance: 'HACCP & ISO 22000:2018 Certified Cold Chain',
      legalMetrology: '100% Barcoded & MRP Compliant Packaged Goods',
      labTesting: 'Inward Spectrometry & Moisture Level Testing on Every Lot'
    });
    this.companyContact = loadFromStorage('company_contact', {
      contact: 'Central Trade Desk Director',
      whatsapp: '+91 98470 12345',
      call: '+91 98470 12345',
      emergensy: '+91 94470 99999',
      email: 'wholesale@malabarprime.com',
      supportEmail: 'support@malabarprime.com',
      location: 'Kozhikode, Kerala (NH-66 Logistics Hub)',
      adress: 'Central Distribution Hub, NH-66 Logistics Corridor, Ramanattukara, Kozhikode, Kerala 673633',
      workingHours: 'Mon - Sat: 8:00 AM - 9:00 PM (24/7 Cold Chain Telemetry Dispatch)'
    });
    this.policies = loadFromStorage('policies', INITIAL_POLICIES);
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach(fn => fn());
  }

  // --- AUTHENTICATION ---
  isAuthenticated() {
    try {
      const token = localStorage.getItem('mp_admin_session');
      return !!token;
    } catch (e) {
      return false;
    }
  }

  login(email, password) {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    if (cleanEmail === ADMIN_CREDENTIALS.email.toLowerCase() && cleanPass === ADMIN_CREDENTIALS.password) {
      const session = {
        email: ADMIN_CREDENTIALS.email,
        name: ADMIN_CREDENTIALS.name,
        role: ADMIN_CREDENTIALS.role,
        loginAt: new Date().toISOString(),
        token: `MP_SEC_${Date.now()}`
      };
      localStorage.setItem('mp_admin_session', JSON.stringify(session));
      return { success: true, user: session };
    }
    return { success: false, message: 'Invalid email or password. Please use registered administrator credentials.' };
  }

  logout() {
    localStorage.removeItem('mp_admin_session');
    this.notify();
  }

  getCurrentUser() {
    try {
      const session = localStorage.getItem('mp_admin_session');
      return session ? JSON.parse(session) : null;
    } catch (e) {
      return null;
    }
  }

  // --- ENQUIRIES / RFQS ---
  getEnquiries() {
    return [...this.enquiries];
  }

  addEnquiry(enquiryData) {
    const newEnquiry = {
      id: `RFQ-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleString(),
      status: 'New',
      ...enquiryData
    };
    this.enquiries = [newEnquiry, ...this.enquiries];
    saveToStorage('enquiries', this.enquiries);
    this.apiCall('/api/enquiries', 'POST', newEnquiry);
    this.notify();
    return newEnquiry;
  }

  updateEnquiryStatus(id, newStatus) {
    this.enquiries = this.enquiries.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    );
    saveToStorage('enquiries', this.enquiries);
    this.apiCall(`/api/enquiries/${id}`, 'PUT', { status: newStatus });
    this.notify();
  }

  deleteEnquiry(id) {
    this.enquiries = this.enquiries.filter(item => item.id !== id);
    saveToStorage('enquiries', this.enquiries);
    this.apiCall(`/api/enquiries/${id}`, 'DELETE');
    this.notify();
  }

  // --- PARTNER APPLICATIONS ---
  getPartnerApplications() {
    return [...this.partnerApplications];
  }

  addPartnerApplication(appData) {
    const prefix = appData.type === 'retailer' ? 'RET' : appData.type === 'distributor' ? 'DST' : 'SPL';
    const newApp = {
      id: `app-${Date.now()}`,
      refCode: `MP-${prefix}-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleString(),
      status: 'Pending',
      ...appData
    };
    this.partnerApplications = [newApp, ...this.partnerApplications];
    saveToStorage('partners', this.partnerApplications);
    this.apiCall('/api/partners', 'POST', newApp);
    this.notify();
    return newApp;
  }

  updatePartnerStatus(id, newStatus) {
    this.partnerApplications = this.partnerApplications.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    );
    saveToStorage('partners', this.partnerApplications);
    this.apiCall(`/api/partners/${id}`, 'PUT', { status: newStatus });
    this.notify();
  }

  deletePartnerApplication(id) {
    this.partnerApplications = this.partnerApplications.filter(item => item.id !== id);
    saveToStorage('partners', this.partnerApplications);
    this.apiCall(`/api/partners/${id}`, 'DELETE');
    this.notify();
  }

  // --- CONTACT MESSAGES ---
  getContactMessages() {
    return [...this.contactMessages];
  }

  addContactMessage(msgData) {
    const newMsg = {
      id: `msg-${Date.now()}`,
      date: new Date().toLocaleString(),
      status: 'Unread',
      ...msgData
    };
    this.contactMessages = [newMsg, ...this.contactMessages];
    saveToStorage('contacts', this.contactMessages);
    this.apiCall('/api/contacts', 'POST', newMsg);
    this.notify();
    return newMsg;
  }

  updateContactStatus(id, newStatus) {
    this.contactMessages = this.contactMessages.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    );
    saveToStorage('contacts', this.contactMessages);
    this.apiCall(`/api/contacts/${id}`, 'PUT', { status: newStatus });
    this.notify();
  }

  deleteContactMessage(id) {
    this.contactMessages = this.contactMessages.filter(item => item.id !== id);
    saveToStorage('contacts', this.contactMessages);
    this.apiCall(`/api/contacts/${id}`, 'DELETE');
    this.notify();
  }

  // --- ASSURANCE / COMPLIANCE (FSSAI, ISO, GST) ---
  getAssurance() {
    return { ...this.assurance };
  }

  updateAssurance(updates) {
    this.assurance = {
      ...this.assurance,
      ...updates
    };
    saveToStorage('assurance', this.assurance);
    this.apiCall('/api/assurance', 'PUT', this.assurance);
    this.notify();
  }

  addCertification(cert) {
    const newCert = {
      id: `cert-${Date.now()}`,
      ...cert
    };
    this.assurance.certifications = [...this.assurance.certifications, newCert];
    saveToStorage('assurance', this.assurance);
    this.apiCall('/api/assurance/certifications', 'POST', newCert);
    this.notify();
  }

  deleteCertification(index) {
    const cert = this.assurance.certifications[index];
    this.assurance.certifications = this.assurance.certifications.filter((_, idx) => idx !== index);
    saveToStorage('assurance', this.assurance);
    if (cert && cert.id) {
      this.apiCall(`/api/assurance/certifications/${cert.id}`, 'DELETE');
    }
    this.notify();
  }

  // --- COMPANY CONTACT & LOCATION ---
  getCompanyContact() {
    return { ...this.companyContact };
  }

  updateCompanyContact(updates) {
    this.companyContact = {
      ...this.companyContact,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    saveToStorage('company_contact', this.companyContact);
    this.apiCall('/api/company/contact', 'PUT', this.companyContact);
    this.notify();
    return this.companyContact;
  }

  // --- TESTIMONIALS ---
  getTestimonials() {
    return [...this.testimonials];
  }

  addTestimonial(testimonial) {
    const newTestimonial = {
      id: `t-${Date.now()}`,
      status: 'Active',
      rating: 5,
      ...testimonial
    };
    this.testimonials = [newTestimonial, ...this.testimonials];
    saveToStorage('testimonials', this.testimonials);
    this.apiCall('/api/testimonials', 'POST', newTestimonial);
    this.notify();
    return newTestimonial;
  }

  updateTestimonial(id, updates) {
    this.testimonials = this.testimonials.map(item => 
      item.id === id ? { ...item, ...updates } : item
    );
    saveToStorage('testimonials', this.testimonials);
    this.apiCall(`/api/testimonials/${id}`, 'PUT', updates);
    this.notify();
  }

  deleteTestimonial(id) {
    this.testimonials = this.testimonials.filter(item => item.id !== id);
    saveToStorage('testimonials', this.testimonials);
    this.apiCall(`/api/testimonials/${id}`, 'DELETE');
    this.notify();
  }

  // --- CATEGORIES ---
  getCategories() {
    return [...this.categories];
  }

  addCategory(category) {
    const newCat = {
      id: category.id || category.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      icon: category.icon || 'Package',
      ...category
    };
    this.categories = [...this.categories, newCat];
    saveToStorage('categories', this.categories);
    this.apiCall('/api/categories', 'POST', newCat);
    this.notify();
    return newCat;
  }

  updateCategory(id, updates) {
    this.categories = this.categories.map(cat => 
      cat.id === id ? { ...cat, ...updates } : cat
    );
    saveToStorage('categories', this.categories);
    this.apiCall(`/api/categories/${id}`, 'PUT', updates);
    this.notify();
  }

  deleteCategory(id) {
    this.categories = this.categories.filter(cat => cat.id !== id);
    saveToStorage('categories', this.categories);
    this.apiCall(`/api/categories/${id}`, 'DELETE');
    this.notify();
  }

  // --- PRODUCTS ---
  getProducts() {
    return [...this.products];
  }

  addProduct(product) {
    const newProduct = {
      id: product.id || `mp-${Date.now().toString().slice(-6)}`,
      stockStatus: product.stockStatus || 'In Stock',
      shelfLife: product.shelfLife || '12 Months',
      origin: product.origin || 'Kerala, India',
      fssai: this.assurance.fssaiNumber,
      image: product.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
      ...product
    };
    this.products = [newProduct, ...this.products];
    saveToStorage('products', this.products);
    this.apiCall('/api/products', 'POST', newProduct);
    this.notify();
    return newProduct;
  }

  updateProduct(id, updates) {
    this.products = this.products.map(prod => 
      prod.id === id ? { ...prod, ...updates } : prod
    );
    saveToStorage('products', this.products);
    this.apiCall(`/api/products/${id}`, 'PUT', updates);
    this.notify();
  }

  deleteProduct(id) {
    this.products = this.products.filter(prod => prod.id !== id);
    saveToStorage('products', this.products);
    this.apiCall(`/api/products/${id}`, 'DELETE');
    this.notify();
  }

  // --- BRANDS ---
  getBrands() {
    return [...this.brands];
  }

  addBrand(brand) {
    const newBrand = {
      id: `b-${Date.now()}`,
      image: brand.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
      ...brand
    };
    this.brands = [newBrand, ...this.brands];
    saveToStorage('brands', this.brands);
    this.apiCall('/api/brands', 'POST', newBrand);
    this.notify();
    return newBrand;
  }

  updateBrand(id, updates) {
    this.brands = this.brands.map(b => 
      b.id === id ? { ...b, ...updates } : b
    );
    saveToStorage('brands', this.brands);
    this.apiCall(`/api/brands/${id}`, 'PUT', updates);
    this.notify();
  }

  deleteBrand(id) {
    this.brands = this.brands.filter(b => b.id !== id);
    saveToStorage('brands', this.brands);
    this.apiCall(`/api/brands/${id}`, 'DELETE');
    this.notify();
  }

  // --- FILE & IMAGE UPLOAD ---
  async uploadFile(fileOrBase64, filename = 'upload.png') {
    try {
      let payload = {};
      if (typeof fileOrBase64 === 'string') {
        payload = { file: fileOrBase64, filename };
      } else if (fileOrBase64 instanceof File) {
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(fileOrBase64);
        });
        payload = { file: base64, filename: fileOrBase64.name };
      }

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success && data.data?.url) {
        return data.data.url;
      }
      throw new Error(data.message || 'Upload failed');
    } catch (err) {
      console.error('[DataService Upload Error]', err);
      throw err;
    }
  }

  // --- LEGAL & STATUTORY POLICIES MANAGEMENT ---
  getPolicies() {
    return this.policies || INITIAL_POLICIES;
  }

  getPolicy(id) {
    const all = this.getPolicies();
    return all[id] || null;
  }

  updatePolicy(id, updates) {
    if (!this.policies) this.policies = { ...INITIAL_POLICIES };
    const current = this.policies[id] || { id, title: updates.title || id };
    const updated = {
      ...current,
      ...updates,
      id,
      lastUpdated: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };
    this.policies[id] = updated;
    saveToStorage('policies', this.policies);
    this.apiCall(`/api/policies/${encodeURIComponent(id)}`, 'PUT', updated);
    this.notify();
    return updated;
  }

  addPolicy(policyData) {
    if (!this.policies) this.policies = { ...INITIAL_POLICIES };
    const rawId = (policyData.id || policyData.shortTitle || policyData.title || `policy-${Date.now()}`)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    const id = rawId || `policy-${Date.now()}`;
    const newPolicy = {
      id,
      title: policyData.title || 'New Corporate Policy',
      shortTitle: policyData.shortTitle || policyData.title || 'Corporate Policy',
      badge: (policyData.badge || 'STATUTORY POLICY').toUpperCase(),
      effectiveDate: policyData.effectiveDate || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      lastUpdated: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      description: policyData.description || 'Statutory policy governing Malabar Prime commercial operations.',
      sections: Array.isArray(policyData.sections) && policyData.sections.length > 0 ? policyData.sections : [
        {
          number: '01',
          heading: 'Scope & Application',
          content: 'Details and terms of this policy apply to all commercial transactions and operations.'
        }
      ],
      isCustom: true
    };
    this.policies[id] = newPolicy;
    saveToStorage('policies', this.policies);
    this.apiCall('/api/policies', 'POST', newPolicy);
    this.notify();
    return newPolicy;
  }

  deletePolicy(id) {
    if (!this.policies || !this.policies[id]) return;
    delete this.policies[id];
    saveToStorage('policies', this.policies);
    this.apiCall(`/api/policies/${encodeURIComponent(id)}`, 'DELETE');
    this.notify();
  }

  resetPolicies() {
    this.policies = { ...INITIAL_POLICIES };
    saveToStorage('policies', this.policies);
    this.apiCall('/api/policies/reset', 'POST');
    this.notify();
    return this.policies;
  }
}

// Singleton Instance
export const dataService = new DataService();

