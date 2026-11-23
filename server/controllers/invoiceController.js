import { getDb, saveDb } from '../models/db.js';

function computeInvoiceTotals(items = [], discount = 0, shippingFee = 0, isInterstate = false) {
  let subtotal = 0;
  let cgst = 0;
  let sgst = 0;
  let igst = 0;

  for (const item of items) {
    const qty = Number(item.quantity) || 1;
    const rate = Number(item.rate) || 0;
    const gstPct = Number(item.gstRate) || 0;
    const itemSub = qty * rate;
    subtotal += itemSub;

    const itemTax = (itemSub * gstPct) / 100;
    if (isInterstate) {
      igst += itemTax;
    } else {
      cgst += itemTax / 2;
      sgst += itemTax / 2;
    }
  }

  const taxTotal = cgst + sgst + igst;
  const numDiscount = Number(discount) || 0;
  const numShipping = Number(shippingFee) || 0;
  const grandTotal = Math.max(0, subtotal + taxTotal - numDiscount + numShipping);

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    cgst: Math.round(cgst * 100) / 100,
    sgst: Math.round(sgst * 100) / 100,
    igst: Math.round(igst * 100) / 100,
    taxTotal: Math.round(taxTotal * 100) / 100,
    discount: numDiscount,
    shippingFee: numShipping,
    grandTotal: Math.round(grandTotal * 100) / 100
  };
}

export const invoiceController = {
  getAll: async (req, res, query) => {
    const db = getDb();
    let invoices = [...(db.invoices || [])];

    if (query) {
      const status = query.get('status');
      const search = query.get('search');
      if (status && status !== 'all') {
        invoices = invoices.filter(inv => (inv.status || '').toLowerCase() === status.toLowerCase());
      }
      if (search) {
        const q = search.toLowerCase();
        invoices = invoices.filter(inv => 
          (inv.invoiceNumber || '').toLowerCase().includes(q) ||
          (inv.buyerName || '').toLowerCase().includes(q) ||
          (inv.buyerGst || '').toLowerCase().includes(q) ||
          (inv.id || '').toLowerCase().includes(q)
        );
      }
    }

    return res.json(200, {
      success: true,
      count: invoices.length,
      data: invoices
    });
  },

  getById: async (req, res, params) => {
    const db = getDb();
    const invoice = (db.invoices || []).find(inv => inv.id === params.id || inv.invoiceNumber === params.id);
    if (!invoice) {
      return res.json(404, { success: false, message: `Invoice ${params.id} not found` });
    }
    return res.json(200, { success: true, data: invoice });
  },

  create: async (req, res, body) => {
    const db = getDb();
    if (!body.buyerName) {
      return res.json(400, { success: false, message: 'Buyer store or company name is required' });
    }

    const currentCount = (db.invoices || []).length;
    const invId = body.id || `INV-${Date.now()}`;
    const invNumber = body.invoiceNumber || `MP/26-27/${String(currentCount + 1).padStart(3, '0')}`;

    const items = Array.isArray(body.items) && body.items.length > 0 
      ? body.items 
      : [{
          name: body.productTitle || 'Wholesale Commodity Master Pack',
          sku: body.sku || 'MP-GENERIC',
          hsn: body.hsn || '1806',
          quantity: Number(body.quantity) || 1,
          unit: body.unit || 'Cases',
          rate: Number(body.rate) || 1000,
          gstRate: Number(body.gstRate) || 18,
          amount: (Number(body.quantity) || 1) * (Number(body.rate) || 1000)
        }];

    const totals = computeInvoiceTotals(items, body.discount, body.shippingFee, body.isInterstate);

    const newInvoice = {
      id: invId,
      invoiceNumber: invNumber,
      date: body.date || new Date().toISOString().split('T')[0],
      dueDate: body.dueDate || new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0],
      buyerName: body.buyerName.trim(),
      buyerContact: body.buyerContact || '',
      buyerEmail: body.buyerEmail || '',
      buyerGst: body.buyerGst || '',
      buyerAddress: body.buyerAddress || '',
      warehouseId: body.warehouseId || '',
      warehouseName: body.warehouseName || (db.warehouses?.[0]?.name || 'Central Mega Depot'),
      items,
      ...totals,
      status: body.status || 'Pending',
      paymentMethod: body.paymentMethod || 'Bank Transfer (NEFT/RTGS)',
      paidAmount: body.status === 'Paid' ? totals.grandTotal : (Number(body.paidAmount) || 0),
      notes: body.notes || 'Goods once dispatched are governed by standard FSSAI quality assurance. Payment via RTGS/NEFT/UPI.'
    };

    db.invoices = [newInvoice, ...(db.invoices || [])];
    saveDb(db);

    return res.json(201, {
      success: true,
      message: 'Tax invoice created successfully',
      data: newInvoice
    });
  },

  update: async (req, res, params, body) => {
    const db = getDb();
    const index = (db.invoices || []).findIndex(inv => inv.id === params.id);
    if (index === -1) {
      return res.json(404, { success: false, message: `Invoice ${params.id} not found` });
    }

    const current = db.invoices[index];
    const items = body.items || current.items;
    const discount = body.discount !== undefined ? body.discount : current.discount;
    const shippingFee = body.shippingFee !== undefined ? body.shippingFee : current.shippingFee;
    const isInterstate = body.isInterstate !== undefined ? body.isInterstate : (current.igst > 0);

    const totals = computeInvoiceTotals(items, discount, shippingFee, isInterstate);

    const updated = {
      ...current,
      ...body,
      ...totals,
      items,
      id: current.id,
      invoiceNumber: body.invoiceNumber || current.invoiceNumber
    };

    if (body.status === 'Paid' && !body.paidAmount) {
      updated.paidAmount = totals.grandTotal;
    }

    db.invoices[index] = updated;
    saveDb(db);

    return res.json(200, {
      success: true,
      message: 'Invoice updated successfully',
      data: updated
    });
  },

  delete: async (req, res, params) => {
    const db = getDb();
    const exists = (db.invoices || []).some(inv => inv.id === params.id);
    if (!exists) {
      return res.json(404, { success: false, message: `Invoice ${params.id} not found` });
    }

    db.invoices = (db.invoices || []).filter(inv => inv.id !== params.id);
    saveDb(db);

    return res.json(200, {
      success: true,
      message: 'Invoice deleted successfully',
      id: params.id
    });
  }
};
