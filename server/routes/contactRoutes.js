import { contactController } from '../controllers/contactController.js';

export async function contactRoutes(method, pathname, req, res, body, query, matchRoute) {
  let params;

  if (pathname === '/api/contacts' && method === 'GET') {
    return contactController.getAll(req, res, query);
  }
  if (pathname === '/api/contacts' && method === 'POST') {
    return contactController.create(req, res, body);
  }
  if ((params = matchRoute('/api/contacts/:id', pathname)) && method === 'GET') {
    return contactController.getById(req, res, params);
  }
  // Support both /api/contacts/:id and /api/contacts/:id/status
  if (((params = matchRoute('/api/contacts/:id', pathname)) || (params = matchRoute('/api/contacts/:id/status', pathname))) && (method === 'PUT' || method === 'PATCH')) {
    return contactController.update(req, res, params, body);
  }
  if ((params = matchRoute('/api/contacts/:id', pathname)) && method === 'DELETE') {
    return contactController.delete(req, res, params);
  }
  return false;
}
