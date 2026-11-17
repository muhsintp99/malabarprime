import { categoryController } from '../controllers/categoryController.js';

export async function categoryRoutes(method, pathname, req, res, body, query, matchRoute) {
  let params;

  if (pathname === '/api/categories' && method === 'GET') {
    return categoryController.getAll(req, res);
  }
  if (pathname === '/api/categories' && method === 'POST') {
    return categoryController.create(req, res, body);
  }
  if ((params = matchRoute('/api/categories/:id', pathname)) && method === 'GET') {
    return categoryController.getById(req, res, params);
  }
  if ((params = matchRoute('/api/categories/:id', pathname)) && (method === 'PUT' || method === 'PATCH')) {
    return categoryController.update(req, res, params, body);
  }
  if ((params = matchRoute('/api/categories/:id', pathname)) && method === 'DELETE') {
    return categoryController.delete(req, res, params);
  }
  return false;
}

