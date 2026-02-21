import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    // Dev mock for /api/send-report when RESEND_API_KEY is not set
    {
      name: 'mock-api',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if ((req.url === '/api/send-report' || req.url === '/api/join-waitlist') && req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => (body += chunk));
            req.on('end', () => {
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(JSON.stringify({ success: true, mock: true }));
            });
            return;
          }
          next();
        });
      },
    },
  ],
  server: {
    port: 3000,
  },
})
