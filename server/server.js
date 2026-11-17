import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { handleApiRequest } from './routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

const PORT = process.env.PORT || 5001;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf'
};

const server = http.createServer(async (req, res) => {
  const urlPath = req.url.split('?')[0];

  // 1. API routes
  if (urlPath.startsWith('/api/') || urlPath === '/api') {
    return handleApiRequest(req, res);
  }

  // 2. Static uploads and public assets
  if (urlPath.startsWith('/uploads/') || urlPath.startsWith('/images/')) {
    const filePath = path.join(PUBLIC_DIR, urlPath.replace(/^\//, ''));
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      res.statusCode = 200;
      res.setHeader('Content-Type', contentType);
      res.setHeader('Access-Control-Allow-Origin', '*');
      return fs.createReadStream(filePath).pipe(res);
    }
  }

  // 3. Serve Frontend dist/ if exists (SPA HTML5 history fallback for clean URLs)
  const DIST_DIR = path.join(__dirname, '..', 'dist');
  if (fs.existsSync(DIST_DIR)) {
    let filePath = path.join(DIST_DIR, urlPath.replace(/^\//, ''));
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(DIST_DIR, 'index.html');
    }
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'text/html';
      res.statusCode = 200;
      res.setHeader('Content-Type', contentType);
      return fs.createReadStream(filePath).pipe(res);
    }
  }

  // 4. Root & Health
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({
    status: 'ONLINE',
    service: 'Malabar Prime Central Trade Desk Modular Backend API',
    version: '3.0.0',
    port: PORT,
    routes: [
      '/api/products',
      '/api/categories',
      '/api/brands',
      '/api/enquiries',
      '/api/partners',
      '/api/contacts',
      '/api/testimonials',
      '/api/assurance',
      '/api/auth/login',
      '/api/upload',
      '/api/pdf/pricelist',
      '/api/stats'
    ],
    timestamp: new Date().toISOString()
  }));
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is already active or in use by another process.`);
  } else {
    console.error('Server error:', err);
  }
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 Malabar Prime Backend API Server running on port ${PORT}`);
  console.log(`📡 Base URL: http://localhost:${PORT}/api/`);
  console.log(`🛡️  Admin Credential: malabarprime.co@gmail.com / password123`);
  console.log(`📁 Database: server/data/db.json`);
  console.log(`⚡ Uploads directory: public/uploads/`);
  console.log(`======================================================\n`);
});
