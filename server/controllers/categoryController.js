import { getDb, saveDb } from '../models/db.js';

export const categoryController = {
  getAll: async (req, res) => {
    const db = getDb();
    return res.json(200, { success: true, count: (db.categories || []).length, data: db.categories || [] });
  },

  getById: async (req, res, params) => {
    const db = getDb();
    const cat = (db.categories || []).find(c => c.id === params.id);
    if (!cat) {
      return res.json(404, { success: false, message: `Category ${params.id} not found` });
    }
    return res.json(200, { success: true, data: cat });
  },

  create: async (req, res, body) => {
    const db = getDb();
    if (!body.name) {
      return res.json(400, { success: false, message: 'Category name is required' });
    }
    const slug = (body.id || body.name).toLowerCase().trim().replace(/[^a-z0-9]/g, '-');
    const newCat = {
      id: slug,
      name: body.name,
      icon: body.icon || 'Package',
      description: body.description || ''
    };
    db.categories = [...(db.categories || []), newCat];
    saveDb(db);
    return res.json(201, { success: true, message: 'Category created successfully', data: newCat });
  },

  update: async (req, res, params, body) => {
    const db = getDb();
    const index = (db.categories || []).findIndex(c => c.id === params.id);
    if (index === -1) {
      return res.json(404, { success: false, message: `Category ${params.id} not found` });
    }
    db.categories[index] = { ...db.categories[index], ...body, id: db.categories[index].id };
    saveDb(db);
    return res.json(200, { success: true, message: 'Category updated successfully', data: db.categories[index] });
  },

  delete: async (req, res, params) => {
    const db = getDb();
    const exists = (db.categories || []).some(c => c.id === params.id);
    if (!exists) {
      return res.json(404, { success: false, message: `Category ${params.id} not found` });
    }
    db.categories = (db.categories || []).filter(c => c.id !== params.id);
    saveDb(db);
    return res.json(200, { success: true, message: `Category ${params.id} deleted successfully` });
  }
};

