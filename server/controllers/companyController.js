import { getDb, saveDb } from '../models/db.js';

const DEFAULT_CONTACT = {
  contact: '',
  whatsapp: '',
  call: '',
  emergensy: '',
  email: '',
  supportEmail: '',
  location: '',
  adress: '',
  workingHours: ''
};

export const companyController = {
  getContact: async (req, res) => {
    const db = getDb();
    const contactData = db.companyContact || DEFAULT_CONTACT;
    return res.json(200, { success: true, data: contactData });
  },

  updateContact: async (req, res, body) => {
    const db = getDb();
    const current = db.companyContact || DEFAULT_CONTACT;
    db.companyContact = {
      ...current,
      ...body,
      updatedAt: new Date().toISOString()
    };
    saveDb(db);
    return res.json(200, {
      success: true,
      message: 'Company contact and location information updated successfully',
      data: db.companyContact
    });
  }
};
