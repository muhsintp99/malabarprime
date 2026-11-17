export function corsMiddleware(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  if (req.method.toUpperCase() === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return true; // handled preflight
  }
  return false;
}

