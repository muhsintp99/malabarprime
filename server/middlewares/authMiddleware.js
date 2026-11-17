import { getDb } from '../models/db.js';

export function authMiddleware(req, res) {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();

  // If no auth token provided or token invalid
  if (!token) {
    res.statusCode = 401;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      success: false,
      message: 'Unauthorized: Authentication token is missing or expired.'
    }));
    return false;
  }

  // Token is valid if it matches our active session format
  if (token.startsWith('MP_SEC_')) {
    return true;
  }

  res.statusCode = 403;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    success: false,
    message: 'Forbidden: Invalid authorization credentials.'
  }));
  return false;
}

