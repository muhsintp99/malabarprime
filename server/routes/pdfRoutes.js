import { pdfController } from '../controllers/pdfController.js';

export async function pdfRoutes(method, pathname, req, res, query, matchRoute) {
  let params;

  if (pathname === '/api/pdf/pricelist' && method === 'GET') {
    return pdfController.getPriceList(req, res);
  }
  if ((params = matchRoute('/api/pdf/quotation/:id', pathname)) && method === 'GET') {
    return pdfController.getQuotation(req, res, params, query);
  }
  if (pathname === '/api/pdf/quotation' && method === 'GET') {
    return pdfController.getQuotation(req, res, null, query);
  }
  if (pathname === '/api/pdf/partners' && method === 'GET') {
    return pdfController.getPartners(req, res);
  }
  return false;
}
