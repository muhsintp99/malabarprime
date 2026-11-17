import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { handleApiRequest } from './server/apiRouter.js'

// Integrated Backend API Middleware Plugin
const apiBackendPlugin = () => ({
  name: 'malabar-prime-backend-api',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (req.url && req.url.startsWith('/api/')) {
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

