import { getDb, saveDb } from '../models/db.js';

export const authController = {
  login: async (req, res, body) => {
    const db = getDb();
    const email = (body.email || '').trim().toLowerCase();
    const password = (body.password || '').trim();

    if (email === db.admin.email.toLowerCase() && password === db.admin.password) {
      const session = {
        email: db.admin.email,
        name: db.admin.name,
        role: db.admin.role,
        token: `MP_SEC_${Date.now()}_${Math.random().toString(36).slice(2)}`,
        loginAt: new Date().toISOString()
      };
      return res.json(200, { success: true, message: 'Authentication successful', user: session });
    }
    return res.json(401, { success: false, message: 'Invalid admin credentials. Please use malabarprime.co@gmail.com and password123' });
  },

  getProfile: async (req, res) => {
    const db = getDb();
    const { password, ...safeAdmin } = db.admin;
    return res.json(200, { success: true, data: safeAdmin });
  },

  updateProfile: async (req, res, body) => {
    const db = getDb();
    db.admin = {
      ...db.admin,
      ...(body.name && { name: body.name }),
      ...(body.email && { email: body.email.trim().toLowerCase() }),
      ...(body.password && { password: body.password.trim() }),
      ...(body.role && { role: body.role })
    };
    saveDb(db);
    const { password, ...safeAdmin } = db.admin;
    return res.json(200, { success: true, message: 'Administrator profile updated', data: safeAdmin });
  },

  logout: async (req, res) => {
    return res.json(200, { success: true, message: 'Logged out successfully' });
  }
};

