import { corsMiddleware } from '../middlewares/corsMiddleware.js';
import { parseBody } from '../models/db.js';
import { statsController } from '../controllers/statsController.js';

import { authRoutes } from './authRoutes.js';
import { productRoutes } from './productRoutes.js';
import { categoryRoutes } from './categoryRoutes.js';
import { brandRoutes } from './brandRoutes.js';
import { enquiryRoutes } from './enquiryRoutes.js';
import { partnerRoutes } from './partnerRoutes.js';
import { contactRoutes } from './contactRoutes.js';
import { testimonialRoutes } from './testimonialRoutes.js';
import { assuranceRoutes } from './assuranceRoutes.js';
import { uploadRoutes } from './uploadRoutes.js';
import { pdfRoutes } from './pdfRoutes.js';
import { companyRoutes } from './companyRoutes.js';
import { policyRoutes } from './policyRoutes.js';
import { warehouseRoutes } from './warehouseRoutes.js';

// Route Pattern Matcher
export function matchRoute(pattern, pathname) {
  const patternParts = pattern.split('/').filter(Boolean);
  const pathParts = pathname.split('/').filter(Boolean);
  if (patternParts.length !== pathParts.length) return null;
  const params = {};
  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i].startsWith(':')) {
      params[patternParts[i].slice(1)] = decodeURIComponent(pathParts[i]);
    } else if (patternParts[i] !== pathParts[i]) {
      return null;
    }
  }
  return params;
}

// Master HTTP Request Handler
export async function handleApiRequest(req, res) {
  // 1. CORS Preflight & Header setup
  if (corsMiddleware(req, res)) {
    return;
  }

  // 2. Attach JSON response helper
  res.json = (status, payload) => {
    res.statusCode = status;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(payload));
  };

  const parsedUrl = new URL(req.url, 'http://localhost');
  const pathname = parsedUrl.pathname.replace(/\/$/, '') || '/';
  const method = req.method.toUpperCase();
  const query = parsedUrl.searchParams;

  // 3. Health & Stats routes
  if (pathname === '/api' || pathname === '/api/health') {
    return res.json(200, {
      status: 'ONLINE',
      service: 'Malabar Prime Central Trade Desk API (Modular Architecture)',
      version: '3.0.0',
      timestamp: new Date().toISOString()
    });
  }

  if (pathname === '/api/stats' && method === 'GET') {
    return statsController.getStats(req, res);
  }

  // 4. Parse incoming JSON body for state-changing requests
  let body = {};
  if (['POST', 'PUT', 'PATCH'].includes(method)) {
    body = await parseBody(req);
  }

  try {
    // 5. Delegate to Modular Route Handlers
    let handled = false;

    handled = await authRoutes(method, pathname, req, res, body);
    if (handled !== false) return;

    handled = await productRoutes(method, pathname, req, res, body, query, matchRoute);
    if (handled !== false) return;

    handled = await categoryRoutes(method, pathname, req, res, body, query, matchRoute);
    if (handled !== false) return;

    handled = await brandRoutes(method, pathname, req, res, body, query, matchRoute);
    if (handled !== false) return;

    handled = await enquiryRoutes(method, pathname, req, res, body, query, matchRoute);
    if (handled !== false) return;

    handled = await partnerRoutes(method, pathname, req, res, body, query, matchRoute);
    if (handled !== false) return;

    handled = await contactRoutes(method, pathname, req, res, body, query, matchRoute);
    if (handled !== false) return;

    handled = await testimonialRoutes(method, pathname, req, res, body, query, matchRoute);
    if (handled !== false) return;

    handled = await assuranceRoutes(method, pathname, req, res, body, query, matchRoute);
    if (handled !== false) return;

    handled = await uploadRoutes(method, pathname, req, res, body, query, matchRoute);
    if (handled !== false) return;

    handled = await pdfRoutes(method, pathname, req, res, query, matchRoute);
    if (handled !== false) return;

    handled = await companyRoutes(method, pathname, req, res, body, query, matchRoute);
    if (handled !== false) return;

    handled = await policyRoutes(method, pathname, req, res, body, query, matchRoute);
    if (handled !== false) return;

    handled = await warehouseRoutes(method, pathname, req, res, body, query, matchRoute);
    if (handled !== false) return;

    // 6. Route Not Found
    return res.json(404, {
      success: false,
      message: `Endpoint ${method} ${pathname} not found on Malabar Prime API`
    });

  } catch (error) {
    console.error('[Master Router Error]', error);
    return res.json(500, {
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
}

