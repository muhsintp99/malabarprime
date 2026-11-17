import { productController } from '../controllers/productController.js';

export async function productRoutes(method, pathname, req, res, body, query, matchRoute) {
  let params;

  if (pathname === '/api/products' && method === 'GET') {
    return productController.getAll(req, res, query);
  }
  if (pathname === '/api/products' && method === 'POST') {
    return productController.create(req, res, body);
  }
  if ((params = matchRoute('/api/products/:id', pathname)) && method === 'GET') {
    return productController.getById(req, res, params);
  }
  if ((params = matchRoute('/api/products/:id', pathname)) && (method === 'PUT' || method === 'PATCH')) {
    return productController.update(req, res, params, body);
  }
  if ((params = matchRoute('/api/products/:id', pathname)) && method === 'DELETE') {
    return productController.delete(req, res, params);
  }
  return false;
}

