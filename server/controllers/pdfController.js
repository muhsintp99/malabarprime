import { getDb } from '../models/db.js';

export const pdfController = {
  getPriceList: async (req, res) => {
    const db = getDb();
    const report = {
      title: 'Malabar Prime Wholesale Master Price Schedule',
      date: new Date().toLocaleDateString('en-IN'),
      fssaiNumber: db.assurance?.fssaiNumber,
      gstNumber: db.assurance?.gstNumber,
      isoCert: db.assurance?.isoCert,
      products: db.products || [],
      terms: [
        'Payment: 100% advance RTGS / NEFT or pre-authorized 15-day credit facility.',
        'Store Delivery SLA: 24 to 48 hours from regional reefer hub.',
        'Cold Chain Integrity: GPS-monitored refrigerated transport loggers.',
        'Returns: 24-hour notification for packaging seal damages.'
      ]
    };
    return res.json(200, { success: true, data: report });
  },

  getQuotation: async (req, res, params, query) => {
    const db = getDb();
    if (params?.id) {
      const enquiry = (db.enquiries || []).find(e => e.id === params.id);
      if (!enquiry) {
        return res.json(404, { success: false, message: `Enquiry ${params.id} not found` });
      }
      const quotation = {
        proformaNo: `PI-${enquiry.id}`,
        date: enquiry.date || new Date().toISOString().split('T')[0],
        buyer: {
          company: enquiry.buyerCompany || enquiry.businessName,
          contact: enquiry.contactPerson,
          phone: enquiry.phone,
          location: enquiry.location || enquiry.city,
          gstin: enquiry.gstin || 'B2B Wholesale'
        },
        items: enquiry.items || [],
        totalCases: enquiry.totalCases || 1,
        estimatedValue: enquiry.estimatedValue || 'Custom Quote',
        notes: enquiry.notes || enquiry.message,
        statutory: {
          fssaiNumber: db.assurance?.fssaiNumber,
          gstNumber: db.assurance?.gstNumber,
          isoCert: db.assurance?.isoCert
        }
      };
      return res.json(200, { success: true, data: quotation });
    }

    // Master Quotation / Proforma Template
    const category = query?.get('category');
    let products = db.products || [];
    if (category) {
      products = products.filter(p => p.category?.toLowerCase() === category.toLowerCase());
    }
    const quotation = {
      proformaNo: `PI-MASTER-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleDateString('en-IN'),
      category: category || 'All Wholesale FMCG Lines',
      products,
      statutory: {
        fssaiNumber: db.assurance?.fssaiNumber,
        gstNumber: db.assurance?.gstNumber,
        isoCert: db.assurance?.isoCert
      }
    };
    return res.json(200, { success: true, data: quotation });
  },

  getPartners: async (req, res) => {
    const db = getDb();
    return res.json(200, {
      success: true,
      data: {
        title: 'Authorized B2B Partner & Distribution Registry',
        date: new Date().toLocaleDateString('en-IN'),
        partners: db.partners || []
      }
    });
  }
};
