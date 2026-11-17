import { brandController } from '../controllers/brandController.js';

export async function brandRoutes(method, pathname, req, res, body, query, matchRoute) {
  let params;

  if (pathname === '/api/brands' && method === 'GET') {
    return brandController.getAll(req, res, query);
  }
  if (pathname === '/api/brands' && method === 'POST') {
    return brandController.create(req, res, body);
  }
  if ((params = matchRoute('/api/brands/:id', pathname)) && method === 'GET') {
    return brandController.getById(req, res, params);
  }
  if ((params = matchRoute('/api/brands/:id', pathname)) && (method === 'PUT' || method === 'PATCH')) {
    return brandController.update(req, res, params, body);
  }
  if ((params = matchRoute('/api/brands/:id', pathname)) && method === 'DELETE') {
    return brandController.delete(req, res, params);
  }
  return false;
}

