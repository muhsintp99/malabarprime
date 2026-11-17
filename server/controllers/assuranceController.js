import { getDb, saveDb } from '../models/db.js';

export const assuranceController = {
  getAssurance: async (req, res) => {
    const db = getDb();
    return res.json(200, { success: true, data: db.assurance || {} });
  },

  updateAssurance: async (req, res, body) => {
    const db = getDb();
    db.assurance = {
      ...db.assurance,
      ...body,
      certifications: body.certifications || db.assurance.certifications || []
    };
    saveDb(db);
    return res.json(200, { success: true, message: 'Assurance & statutory compliance updated', data: db.assurance });
  },

  getAllCerts: async (req, res) => {
    const db = getDb();
    return res.json(200, { success: true, count: (db.assurance?.certifications || []).length, data: db.assurance?.certifications || [] });
  },

  getCertById: async (req, res, params) => {
    const db = getDb();
    const cert = (db.assurance?.certifications || []).find(c => c.id === params.id);
    if (!cert) {
      return res.json(404, { success: false, message: `Certification ${params.id} not found` });
    }
    return res.json(200, { success: true, data: cert });
  },

  createCert: async (req, res, body) => {
    const db = getDb();
    if (!body.title) {
      return res.json(400, { success: false, message: 'Certification title is required' });
    }
    const newCert = {
      id: body.id || `cert-${Date.now()}`,
      title: body.title,
      issuer: body.issuer || 'Regulatory Food Safety Authority',
      standard: body.standard || 'Accredited Standard',
      validTill: body.validTill || 'Permanent',
      desc: body.desc || ''
    };
    db.assurance.certifications = [...(db.assurance.certifications || []), newCert];
    saveDb(db);
    return res.json(201, { success: true, message: 'Certification added successfully', data: newCert });
  },

  updateCert: async (req, res, params, body) => {
    const db = getDb();
    const index = (db.assurance?.certifications || []).findIndex(c => c.id === params.id);
    if (index === -1) {
      return res.json(404, { success: false, message: `Certification ${params.id} not found` });
    }
    db.assurance.certifications[index] = { ...db.assurance.certifications[index], ...body, id: db.assurance.certifications[index].id };
    saveDb(db);
    return res.json(200, { success: true, message: 'Certification updated successfully', data: db.assurance.certifications[index] });
  },

  deleteCert: async (req, res, params) => {
    const db = getDb();
    const exists = (db.assurance?.certifications || []).some(c => c.id === params.id);
    if (!exists) {
      return res.json(404, { success: false, message: `Certification ${params.id} not found` });
    }
    db.assurance.certifications = (db.assurance?.certifications || []).filter(c => c.id !== params.id);
    saveDb(db);
    return res.json(200, { success: true, message: `Certification ${params.id} deleted successfully` });
  }
};

