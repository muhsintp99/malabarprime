import { getDb, saveDb } from '../models/db.js';

export const enquiryController = {
  getAll: async (req, res, query) => {
    const db = getDb();
    let result = db.enquiries || [];
    const status = query.get('status');
    if (status && status !== 'all') {
      result = result.filter(e => e.status.toLowerCase() === status.toLowerCase());
    }
    return res.json(200, { success: true, count: result.length, data: result });
  },

  getById: async (req, res, params) => {
    const db = getDb();
    const enquiry = (db.enquiries || []).find(e => e.id === params.id);
    if (!enquiry) {
      return res.json(404, { success: false, message: `Enquiry ${params.id} not found` });
    }
    return res.json(200, { success: true, data: enquiry });
  },

  create: async (req, res, body) => {
    const db = getDb();
    const newEnquiry = {
      id: body.id || `RFQ-${Math.floor(1000 + Math.random() * 9000)}`,
      date: body.date || new Date().toLocaleString('en-IN'),
      buyerCompany: body.buyerCompany || 'Direct Wholesale Buyer',
      contactPerson: body.contactPerson || 'Store Manager',
      phone: body.phone || 'N/A',
      location: body.location || 'South India Depot',
      gstin: body.gstin || 'N/A',
      status: body.status || 'New',
      items: Array.isArray(body.items) ? body.items : [],
      totalCases: body.totalCases || (Array.isArray(body.items) ? body.items.reduce((s, i) => s + (i.quantity || 1), 0) : 1),
      estimatedValue: body.estimatedValue || '₹1,50,000',
      notes: body.notes || ''
    };
    db.enquiries = [newEnquiry, ...(db.enquiries || [])];
    saveDb(db);
    return res.json(201, { success: true, message: 'Wholesale enquiry created successfully', data: newEnquiry });
  },

  update: async (req, res, params, body) => {
    const db = getDb();
    const index = (db.enquiries || []).findIndex(e => e.id === params.id);
    if (index === -1) {
      return res.json(404, { success: false, message: `Enquiry ${params.id} not found` });
    }
    db.enquiries[index] = { ...db.enquiries[index], ...body, id: db.enquiries[index].id };
    saveDb(db);
    return res.json(200, { success: true, message: 'Enquiry updated successfully', data: db.enquiries[index] });
  },

  delete: async (req, res, params) => {
    const db = getDb();
    const exists = (db.enquiries || []).some(e => e.id === params.id);
    if (!exists) {
      return res.json(404, { success: false, message: `Enquiry ${params.id} not found` });
    }
    db.enquiries = (db.enquiries || []).filter(e => e.id !== params.id);
    saveDb(db);
    return res.json(200, { success: true, message: `Enquiry ${params.id} deleted successfully` });
  }
};

