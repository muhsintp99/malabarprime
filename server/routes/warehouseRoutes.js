import { warehouseController } from '../controllers/warehouseController.js';

export async function warehouseRoutes(method, pathname, req, res, body, query, matchRoute) {
  let params;

  if (pathname === '/api/warehouses' && method === 'GET') {
    return warehouseController.getAll(req, res);
  }
  if (pathname === '/api/warehouses' && method === 'POST') {
    return warehouseController.create(req, res, body);
  }
  if ((params = matchRoute('/api/warehouses/:id', pathname)) && method === 'GET') {
    return warehouseController.getById(req, res, params);
  }
  if ((params = matchRoute('/api/warehouses/:id', pathname)) && (method === 'PUT' || method === 'PATCH')) {
    return warehouseController.update(req, res, params, body);
  }
  if ((params = matchRoute('/api/warehouses/:id', pathname)) && method === 'DELETE') {
    return warehouseController.delete(req, res, params);
  }
  return false;
}
