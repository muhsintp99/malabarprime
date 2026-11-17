import { policyController } from '../controllers/policyController.js';

export async function policyRoutes(method, pathname, req, res, body, query, matchRoute) {
  // GET /api/policies
  if (pathname === '/api/policies' && method === 'GET') {
    await policyController.getPolicies(req, res);
    return true;
  }

  // POST /api/policies/reset
  if (pathname === '/api/policies/reset' && method === 'POST') {
    await policyController.resetPolicies(req, res);
    return true;
  }

  // POST /api/policies (Create new policy)
  if (pathname === '/api/policies' && method === 'POST') {
    await policyController.createPolicy(req, res, body);
    return true;
  }

  // Parametric route: /api/policies/:id
  const params = matchRoute('/api/policies/:id', pathname);
  if (params && params.id) {
    if (method === 'GET') {
      await policyController.getPolicy(req, res, params.id);
      return true;
    }
    if (method === 'PUT' || method === 'PATCH') {
      await policyController.updatePolicy(req, res, params.id, body);
      return true;
    }
    if (method === 'DELETE') {
      await policyController.deletePolicy(req, res, params.id);
      return true;
    }
  }

  return false;
}
