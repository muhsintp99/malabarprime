import { getDb, saveDb } from '../models/db.js';

export const warehouseController = {
  getAll: async (req, res) => {
    const db = getDb();
    return res.json(200, { success: true, count: (db.warehouses || []).length, data: db.warehouses || [] });
  },

  getById: async (req, res, params) => {
    const db = getDb();
    const hub = (db.warehouses || []).find(w => w.id === params.id);
    if (!hub) {
      return res.json(404, { success: false, message: `Warehouse hub ${params.id} not found` });
    }
    return res.json(200, { success: true, data: hub });
  },

  create: async (req, res, body) => {
    const db = getDb();
    if (!body.name) {
      return res.json(400, { success: false, message: 'Warehouse name is required' });
    }
    const slug = (body.id || body.name).toLowerCase().trim().replace(/[^a-z0-9]/g, '-');
    const newHub = {
      id: slug || `wh-${Date.now()}`,
      name: body.name,
      city: body.city || '',
      capacity: body.capacity || '',
      features: Array.isArray(body.features) 
        ? body.features 
        : (body.features ? String(body.features).split(',').map(s => s.trim()).filter(Boolean) : []),
      coverage: body.coverage || '',
      dispatchTime: body.dispatchTime || ''
    };
    db.warehouses = [...(db.warehouses || []), newHub];
    saveDb(db);
    return res.json(201, { success: true, message: 'Warehouse hub created successfully', data: newHub });
  },

  update: async (req, res, params, body) => {
    const db = getDb();
    const index = (db.warehouses || []).findIndex(w => w.id === params.id);
    if (index === -1) {
      return res.json(404, { success: false, message: `Warehouse hub ${params.id} not found` });
    }
    const features = body.features !== undefined
      ? (Array.isArray(body.features) ? body.features : String(body.features).split(',').map(s => s.trim()).filter(Boolean))
      : db.warehouses[index].features;

    db.warehouses[index] = {
      ...db.warehouses[index],
      ...body,
      features,
      id: db.warehouses[index].id
    };
    saveDb(db);
    return res.json(200, { success: true, message: 'Warehouse hub updated successfully', data: db.warehouses[index] });
  },

  delete: async (req, res, params) => {
    const db = getDb();
    const exists = (db.warehouses || []).some(w => w.id === params.id);
    if (!exists) {
      return res.json(404, { success: false, message: `Warehouse hub ${params.id} not found` });
    }
    db.warehouses = (db.warehouses || []).filter(w => w.id !== params.id);
    saveDb(db);
    return res.json(200, { success: true, message: 'Warehouse hub deleted successfully', id: params.id });
  }
};
