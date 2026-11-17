import { getDb, saveDb } from '../models/db.js';

export const testimonialController = {
  getAll: async (req, res, query) => {
    const db = getDb();
    let result = db.testimonials || [];
    const status = query.get('status');
    if (status && status !== 'all') {
      result = result.filter(t => (t.status || 'Active').toLowerCase() === status.toLowerCase());
    }
    return res.json(200, { success: true, count: result.length, data: result });
  },

  getById: async (req, res, params) => {
    const db = getDb();
    const t = (db.testimonials || []).find(item => item.id === params.id);
    if (!t) {
      return res.json(404, { success: false, message: `Testimonial ${params.id} not found` });
    }
    return res.json(200, { success: true, data: t });
  },

  create: async (req, res, body) => {
    const db = getDb();
    if (!body.name || !body.quote) {
      return res.json(400, { success: false, message: 'Client name and quote are required' });
    }
    const newTestimonial = {
      id: body.id || `t-${Date.now()}`,
      name: body.name,
      title: body.title || 'Procurement Director',
      company: body.company || 'Retail Supermarket Chain',
      outlets: body.outlets || 'South India Territory',
      avatar: body.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      quote: body.quote,
      rating: parseInt(body.rating) || 5,
      category: body.category || 'Chocolates & Beverages',
      badge: body.badge || 'Verified Partner',
      status: body.status || 'Active'
    };
    db.testimonials = [newTestimonial, ...(db.testimonials || [])];
    saveDb(db);
    return res.json(201, { success: true, message: 'Testimonial added successfully', data: newTestimonial });
  },

  update: async (req, res, params, body) => {
    const db = getDb();
    const index = (db.testimonials || []).findIndex(item => item.id === params.id);
    if (index === -1) {
      return res.json(404, { success: false, message: `Testimonial ${params.id} not found` });
    }
    db.testimonials[index] = { ...db.testimonials[index], ...body, id: db.testimonials[index].id };
    saveDb(db);
    return res.json(200, { success: true, message: 'Testimonial updated successfully', data: db.testimonials[index] });
  },

  delete: async (req, res, params) => {
    const db = getDb();
    const exists = (db.testimonials || []).some(item => item.id === params.id);
    if (!exists) {
      return res.json(404, { success: false, message: `Testimonial ${params.id} not found` });
    }
    db.testimonials = (db.testimonials || []).filter(item => item.id !== params.id);
    saveDb(db);
    return res.json(200, { success: true, message: `Testimonial ${params.id} deleted successfully` });
  }
};

