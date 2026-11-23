import { invoiceController } from '../controllers/invoiceController.js';

export async function invoiceRoutes(method, pathname, req, res, body, query, matchRoute) {
  let params;

  // GET /api/invoices
  if (pathname === '/api/invoices' && method === 'GET') {
    return invoiceController.getAll(req, res, query);
  }

  // POST /api/invoices
  if (pathname === '/api/invoices' && method === 'POST') {
    return invoiceController.create(req, res, body);
  }

  // GET /api/invoices/:id
  if ((params = matchRoute('/api/invoices/:id', pathname)) && method === 'GET') {
    return invoiceController.getById(req, res, params);
  }

  // PUT /api/invoices/:id
  if ((params = matchRoute('/api/invoices/:id', pathname)) && (method === 'PUT' || method === 'PATCH')) {
    return invoiceController.update(req, res, params, body);
  }

  // DELETE /api/invoices/:id
  if ((params = matchRoute('/api/invoices/:id', pathname)) && method === 'DELETE') {
    return invoiceController.delete(req, res, params);
  }

  return false;
}
