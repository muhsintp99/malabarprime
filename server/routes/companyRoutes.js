import { companyController } from '../controllers/companyController.js';

export async function companyRoutes(method, pathname, req, res, body, query, matchRoute) {
  // GET /api/company or /api/company/contact
  if ((pathname === '/api/company' || pathname === '/api/company/contact') && method === 'GET') {
    await companyController.getContact(req, res);
    return true;
  }

  // PUT/POST /api/company or /api/company/contact
  if ((pathname === '/api/company' || pathname === '/api/company/contact') && (method === 'PUT' || method === 'POST')) {
    await companyController.updateContact(req, res, body);
    return true;
  }

  return false;
}
