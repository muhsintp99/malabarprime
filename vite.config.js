import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { handleApiRequest } from './server/apiRouter.js'
import { initDb } from './server/models/db.js'

// Integrated Backend API Middleware Plugin
const apiBackendPlugin = () => ({
  name: 'malabar-prime-backend-api',
  async configureServer(server) {
    // Connect to MongoDB Atlas when dev server starts
    await initDb().catch(err => {
      console.warn('[Vite API Middleware] MongoDB Atlas notice:', err.message);
    });

    server.middlewares.use(async (req, res, next) => {
      if (req.url && (req.url.startsWith('/api/') || req.url === '/api')) {
        await handleApiRequest(req, res);
      } else {
        next();
      }
    });
  }
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), apiBackendPlugin()],
  server: {
    port: 3000,
    host: true
  }
})

