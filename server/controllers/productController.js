import { getDb, saveDb } from '../models/db.js';

export const productController = {
  getAll: async (req, res, query) => {
    const db = getDb();
    let result = db.products || [];
    const cat = query.get('category');
    const stock = query.get('stock');
    const q = query.get('search');

    if (cat && cat !== 'all') {
      result = result.filter(p => p.category === cat);
    }
    if (stock) {
      result = result.filter(p => p.stockStatus === stock);
    }
    if (q) {
      const searchStr = q.toLowerCase();
      result = result.filter(p => 
        (p.name && p.name.toLowerCase().includes(searchStr)) ||
        (p.sku && p.sku.toLowerCase().includes(searchStr)) ||
        (p.brand && p.brand.toLowerCase().includes(searchStr))
      );
    }
    return res.json(200, { success: true, count: result.length, data: result });
  },

  getById: async (req, res, params) => {
    const db = getDb();
    const product = (db.products || []).find(p => p.id === params.id || p.sku === params.id);
    if (!product) {
      return res.json(404, { success: false, message: `Product ${params.id} not found` });
    }
    return res.json(200, { success: true, data: product });
  },

  create: async (req, res, body) => {
    const db = getDb();
    if (!body.name) {
      return res.json(400, { success: false, message: 'Product title (name) is required' });
    }
    const newProduct = {
      id: body.id || `mp-${Date.now().toString().slice(-6)}`,
      sku: body.sku || `MP-${Math.floor(1000 + Math.random() * 9000)}`,
      name: body.name,
      category: body.category || 'chocolates',
      brand: body.brand || 'MALABAR PRIME',
      packSize: body.packSize || '24 x 250g Master Pack',
      moq: body.moq || '5 Master Cartons',
      wholesaleRange: body.wholesaleRange || '₹85 - ₹98 / unit',
      mrp: body.mrp || '₹150',
      stockStatus: body.stockStatus || 'In Stock',
      shelfLife: body.shelfLife || '12 Months',
      origin: body.origin || 'Kerala, India',
      fssai: body.fssai || db.assurance?.fssaiNumber || '',
      image: body.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
      description: body.description || ''
    };
    db.products = [newProduct, ...(db.products || [])];
    saveDb(db);
    return res.json(201, { success: true, message: 'Product created successfully', data: newProduct });
  },

  update: async (req, res, params, body) => {
    const db = getDb();
    const index = (db.products || []).findIndex(p => p.id === params.id || p.sku === params.id);
    if (index === -1) {
      return res.json(404, { success: false, message: `Product ${params.id} not found` });
    }
    db.products[index] = { ...db.products[index], ...body, id: db.products[index].id };
    saveDb(db);
    return res.json(200, { success: true, message: 'Product updated successfully', data: db.products[index] });
  },

  delete: async (req, res, params) => {
    const db = getDb();
    const exists = (db.products || []).some(p => p.id === params.id || p.sku === params.id);
    if (!exists) {
      return res.json(404, { success: false, message: `Product ${params.id} not found` });
    }
    db.products = (db.products || []).filter(p => p.id !== params.id && p.sku !== params.id);
    saveDb(db);
    return res.json(200, { success: true, message: `Product ${params.id} deleted successfully` });
  }
};

