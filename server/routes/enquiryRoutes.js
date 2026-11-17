import { enquiryController } from '../controllers/enquiryController.js';

export async function enquiryRoutes(method, pathname, req, res, body, query, matchRoute) {
  let params;

  if (pathname === '/api/enquiries' && method === 'GET') {
    return enquiryController.getAll(req, res, query);
  }
  if (pathname === '/api/enquiries' && method === 'POST') {
    return enquiryController.create(req, res, body);
  }
  if ((params = matchRoute('/api/enquiries/:id', pathname)) && method === 'GET') {
    return enquiryController.getById(req, res, params);
  }
  // Support both /api/enquiries/:id and /api/enquiries/:id/status
  if (((params = matchRoute('/api/enquiries/:id', pathname)) || (params = matchRoute('/api/enquiries/:id/status', pathname))) && (method === 'PUT' || method === 'PATCH')) {
    return enquiryController.update(req, res, params, body);
  }
  if ((params = matchRoute('/api/enquiries/:id', pathname)) && method === 'DELETE') {
    return enquiryController.delete(req, res, params);
  }
  return false;
}
