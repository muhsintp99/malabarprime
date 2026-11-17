import { getDb, saveDb } from '../models/db.js';

export const partnerController = {
  getAll: async (req, res, query) => {
    const db = getDb();
    let result = db.partners || [];
    const type = query.get('type');
    const status = query.get('status');
    if (type && type !== 'all') {
      result = result.filter(p => p.type === type);
    }
    if (status && status !== 'all') {
      result = result.filter(p => p.status.toLowerCase() === status.toLowerCase());
    }
    return res.json(200, { success: true, count: result.length, data: result });
  },

  getById: async (req, res, params) => {
    const db = getDb();
    const partner = (db.partners || []).find(p => p.id === params.id || p.refCode === params.id);
    if (!partner) {
      return res.json(404, { success: false, message: `Partner ${params.id} not found` });
    }
    return res.json(200, { success: true, data: partner });
  },

  create: async (req, res, body) => {
    const db = getDb();
    const pType = body.type || 'retailer';
    const prefix = pType === 'retailer' ? 'RET' : pType === 'distributor' ? 'DST' : 'SPL';
    const newPartner = {
      id: body.id || `app-${Date.now()}`,
      refCode: body.refCode || `MP-${prefix}-${Math.floor(10000 + Math.random() * 90000)}`,
      date: body.date || new Date().toLocaleString('en-IN'),
      businessName: body.businessName || 'Supermarket Retail Enterprise',
      contactPerson: body.contactPerson || 'Procurement In-Charge',
      phone: body.phone || 'N/A',
      email: body.email || 'N/A',
      city: body.city || 'Kerala, India',
      gstin: body.gstin || 'Pending',
      type: pType,
      categoryInterest: body.categoryInterest || 'All Categories',
      estimatedMonthlyVolume: body.estimatedMonthlyVolume || '₹1,00,000 - ₹5,00,000',
      status: body.status || 'Pending',
      notes: body.notes || ''
    };
    db.partners = [newPartner, ...(db.partners || [])];
    saveDb(db);
    return res.json(201, { success: true, message: 'Partner application submitted successfully', data: newPartner });
  },

  update: async (req, res, params, body) => {
    const db = getDb();
    const index = (db.partners || []).findIndex(p => p.id === params.id || p.refCode === params.id);
    if (index === -1) {
      return res.json(404, { success: false, message: `Partner ${params.id} not found` });
    }
    db.partners[index] = { ...db.partners[index], ...body, id: db.partners[index].id };
    saveDb(db);
    return res.json(200, { success: true, message: 'Partner application updated successfully', data: db.partners[index] });
  },

  delete: async (req, res, params) => {
    const db = getDb();
    const exists = (db.partners || []).some(p => p.id === params.id || p.refCode === params.id);
    if (!exists) {
      return res.json(404, { success: false, message: `Partner ${params.id} not found` });
    }
    db.partners = (db.partners || []).filter(p => p.id !== params.id && p.refCode !== params.id);
    saveDb(db);
    return res.json(200, { success: true, message: `Partner application ${params.id} deleted successfully` });
  }
};

