import { getDb, saveDb } from '../models/db.js';

const DEFAULT_CONTACT = {
  contact: 'Central Trade Desk Director',
  whatsapp: '+91 98470 12345',
  call: '+91 98470 12345',
  emergensy: '+91 94470 99999',
  email: 'wholesale@malabarprime.com',
  supportEmail: 'support@malabarprime.com',
  location: 'Kozhikode, Kerala (NH-66 Logistics Hub)',
  adress: 'Central Distribution Hub, NH-66 Logistics Corridor, Ramanattukara, Kozhikode, Kerala 673633',
  workingHours: 'Mon - Sat: 8:00 AM - 9:00 PM (24/7 Cold Chain Telemetry Dispatch)'
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
