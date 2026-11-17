import { assuranceController } from '../controllers/assuranceController.js';

export async function assuranceRoutes(method, pathname, req, res, body, query, matchRoute) {
  let params;

  if (pathname === '/api/assurance' && method === 'GET') {
    return assuranceController.getAssurance(req, res);
  }
  if (pathname === '/api/assurance' && (method === 'PUT' || method === 'PATCH')) {
    return assuranceController.updateAssurance(req, res, body);
  }
  if (pathname === '/api/assurance/certifications' && method === 'GET') {
    return assuranceController.getAllCerts(req, res);
  }
  if (pathname === '/api/assurance/certifications' && method === 'POST') {
    return assuranceController.createCert(req, res, body);
  }
  if ((params = matchRoute('/api/assurance/certifications/:id', pathname)) && method === 'GET') {
    return assuranceController.getCertById(req, res, params);
  }
  if ((params = matchRoute('/api/assurance/certifications/:id', pathname)) && (method === 'PUT' || method === 'PATCH')) {
    return assuranceController.updateCert(req, res, params, body);
  }
  if ((params = matchRoute('/api/assurance/certifications/:id', pathname)) && method === 'DELETE') {
    return assuranceController.deleteCert(req, res, params);
  }
  return false;
}

