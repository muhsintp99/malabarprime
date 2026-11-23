import { getDb } from '../models/db.js';

export const statsController = {
  getStats: async (req, res) => {
    const db = getDb();
    const stats = {
      totalEnquiries: (db.enquiries || []).length,
      newEnquiries: (db.enquiries || []).filter(e => e.status === 'New').length,
      totalPartners: (db.partners || []).length,
      pendingPartners: (db.partners || []).filter(p => p.status === 'Pending').length,
      totalContacts: (db.contacts || []).length,
      unreadContacts: (db.contacts || []).filter(c => c.status === 'Unread').length,
      totalProducts: (db.products || []).length,
      totalCategories: (db.categories || []).length,
      totalBrands: (db.brands || []).length,
      totalWarehouses: (db.warehouses || []).length,
      totalInvoices: (db.invoices || []).length,
      paidInvoices: (db.invoices || []).filter(i => i.status === 'Paid').length,
      pendingInvoices: (db.invoices || []).filter(i => i.status === 'Pending' || i.status === 'Partially Paid').length,
      totalBilledAmount: (db.invoices || []).reduce((sum, i) => sum + (Number(i.grandTotal) || 0), 0),
      fssaiNumber: db.assurance?.fssaiNumber,
      gstNumber: db.assurance?.gstNumber
    };
    return res.json(200, { success: true, data: stats });
  }
};

