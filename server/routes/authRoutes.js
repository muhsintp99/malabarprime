import { authController } from '../controllers/authController.js';

export async function authRoutes(method, pathname, req, res, body) {
  if (pathname === '/api/auth/login' && method === 'POST') {
    return authController.login(req, res, body);
  }
  if ((pathname === '/api/auth/me' || pathname === '/api/admin') && method === 'GET') {
    return authController.getProfile(req, res);
  }
  if ((pathname === '/api/auth/profile' || pathname === '/api/admin') && (method === 'PUT' || method === 'PATCH')) {
    return authController.updateProfile(req, res, body);
  }
  if (pathname === '/api/auth/logout' && method === 'POST') {
    return authController.logout(req, res);
  }
  return false;
}

