import { getDb, saveDb } from '../models/db.js';

export const contactController = {
  getAll: async (req, res, query) => {
    const db = getDb();
    let result = db.contacts || [];
    const status = query.get('status');
    if (status && status !== 'all') {
      result = result.filter(c => c.status.toLowerCase() === status.toLowerCase());
    }
    return res.json(200, { success: true, count: result.length, data: result });
  },

  getById: async (req, res, params) => {
    const db = getDb();
    const msg = (db.contacts || []).find(c => c.id === params.id);
    if (!msg) {
      return res.json(404, { success: false, message: `Contact message ${params.id} not found` });
    }
    return res.json(200, { success: true, data: msg });
  },

  create: async (req, res, body) => {
    const db = getDb();
    if (!body.name || !body.message) {
      return res.json(400, { success: false, message: 'Name and message are required fields' });
    }
    const newMsg = {
      id: body.id || `msg-${Date.now()}`,
      date: body.date || new Date().toLocaleString('en-IN'),
      name: body.name,
      phone: body.phone || 'N/A',
      email: body.email || 'N/A',
      subject: body.subject || 'Wholesale Distribution Inquiry',
      message: body.message,
      status: body.status || 'Unread'
    };
    db.contacts = [newMsg, ...(db.contacts || [])];
    saveDb(db);
    return res.json(201, { success: true, message: 'Contact message recorded successfully', data: newMsg });
  },

  update: async (req, res, params, body) => {
    const db = getDb();
    const index = (db.contacts || []).findIndex(c => c.id === params.id);
    if (index === -1) {
      return res.json(404, { success: false, message: `Contact message ${params.id} not found` });
    }
    db.contacts[index] = { ...db.contacts[index], ...body, id: db.contacts[index].id };
    saveDb(db);
    return res.json(200, { success: true, message: 'Contact message updated successfully', data: db.contacts[index] });
  },

  delete: async (req, res, params) => {
    const db = getDb();
    const exists = (db.contacts || []).some(c => c.id === params.id);
    if (!exists) {
      return res.json(404, { success: false, message: `Contact message ${params.id} not found` });
    }
    db.contacts = (db.contacts || []).filter(c => c.id !== params.id);
    saveDb(db);
    return res.json(200, { success: true, message: `Contact message ${params.id} deleted successfully` });
  }
};

