import { testimonialController } from '../controllers/testimonialController.js';

export async function testimonialRoutes(method, pathname, req, res, body, query, matchRoute) {
  let params;

  if (pathname === '/api/testimonials' && method === 'GET') {
    return testimonialController.getAll(req, res, query);
  }
  if (pathname === '/api/testimonials' && method === 'POST') {
    return testimonialController.create(req, res, body);
  }
  if ((params = matchRoute('/api/testimonials/:id', pathname)) && method === 'GET') {
    return testimonialController.getById(req, res, params);
  }
  if ((params = matchRoute('/api/testimonials/:id', pathname)) && (method === 'PUT' || method === 'PATCH')) {
    return testimonialController.update(req, res, params, body);
  }
  if ((params = matchRoute('/api/testimonials/:id', pathname)) && method === 'DELETE') {
    return testimonialController.delete(req, res, params);
  }
  return false;
}

