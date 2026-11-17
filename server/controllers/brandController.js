import { getDb, saveDb } from '../models/db.js';

export const brandController = {
  getAll: async (req, res, query) => {
    const db = getDb();
    let result = db.brands || [];
    const type = query.get('type');
    if (type && type !== 'all') {
      result = result.filter(b => b.type === type);
    }
    return res.json(200, { success: true, count: result.length, data: result });
  },

  getById: async (req, res, params) => {
    const db = getDb();
    const brand = (db.brands || []).find(b => b.id === params.id);
    if (!brand) {
      return res.json(404, { success: false, message: `Brand ${params.id} not found` });
    }
    return res.json(200, { success: true, data: brand });
  },

  create: async (req, res, body) => {
    const db = getDb();
    if (!body.name) {
      return res.json(400, { success: false, message: 'Brand name is required' });
    }
    const newBrand = {
      id: body.id || `b-${Date.now()}`,
      name: body.name,
      category: body.category || 'Consumer Packaged Goods',
      type: body.type || 'Own Brand',
      tier: body.tier || 'Exclusive Distribution',
      skus: body.skus || '20+ SKUs',
      tag: body.tag || 'AUTHORIZED',
      image: body.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
      description: body.description || ''
    };
    db.brands = [newBrand, ...(db.brands || [])];
    saveDb(db);
    return res.json(201, { success: true, message: 'Brand created successfully', data: newBrand });
  },

  update: async (req, res, params, body) => {
    const db = getDb();
    const index = (db.brands || []).findIndex(b => b.id === params.id);
    if (index === -1) {
      return res.json(404, { success: false, message: `Brand ${params.id} not found` });
    }
    db.brands[index] = { ...db.brands[index], ...body, id: db.brands[index].id };
    saveDb(db);
    return res.json(200, { success: true, message: 'Brand updated successfully', data: db.brands[index] });
  },

  delete: async (req, res, params) => {
    const db = getDb();
    const exists = (db.brands || []).some(b => b.id === params.id);
    if (!exists) {
      return res.json(404, { success: false, message: `Brand ${params.id} not found` });
    }
    db.brands = (db.brands || []).filter(b => b.id !== params.id);
    saveDb(db);
    return res.json(200, { success: true, message: `Brand ${params.id} deleted successfully` });
  }
};

