import { partnerController } from '../controllers/partnerController.js';

export async function partnerRoutes(method, pathname, req, res, body, query, matchRoute) {
  let params;

  if (pathname === '/api/partners' && method === 'GET') {
    return partnerController.getAll(req, res, query);
  }
  if (pathname === '/api/partners' && method === 'POST') {
    return partnerController.create(req, res, body);
  }
  if ((params = matchRoute('/api/partners/:id', pathname)) && method === 'GET') {
    return partnerController.getById(req, res, params);
  }
  // Support both /api/partners/:id and /api/partners/:id/status
  if (((params = matchRoute('/api/partners/:id', pathname)) || (params = matchRoute('/api/partners/:id/status', pathname))) && (method === 'PUT' || method === 'PATCH')) {
    return partnerController.update(req, res, params, body);
  }
  if ((params = matchRoute('/api/partners/:id', pathname)) && method === 'DELETE') {
    return partnerController.delete(req, res, params);
  }
  return false;
}
