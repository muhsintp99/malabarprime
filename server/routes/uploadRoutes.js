import { uploadController } from '../controllers/uploadController.js';

export async function uploadRoutes(method, pathname, req, res, body, query, matchRoute) {
  let params;

  if (pathname === '/api/upload' && method === 'POST') {
    return uploadController.uploadFile(req, res, body);
  }
  if ((params = matchRoute('/api/upload/:filename', pathname)) && method === 'DELETE') {
    return uploadController.deleteFile(req, res, params);
  }
  return false;
}

