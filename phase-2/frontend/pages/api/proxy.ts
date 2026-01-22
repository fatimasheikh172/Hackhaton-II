import { NextApiRequest, NextApiResponse } from 'next';
import httpProxy from 'http-proxy';

// Create a proxy server instance
const proxy = httpProxy.createProxyServer();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise<void>((resolve, reject) => {
    // Get the target backend URL from environment variables
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000';

    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
      res.status(200).end();
      resolve();
      return;
    }

    // Remove /api/proxy prefix from the URL before proxying
    const targetPath = req.url?.replace(/^\/api\/proxy/, '') || '/';

    // Proxy the request to the backend
    proxy.web(
      req as any,
      res as any,
      {
        target: backendUrl,
        changeOrigin: true,
      },
      (err: Error) => {
        console.error('Proxy error:', err);
        res.status(500).json({ error: 'Proxy error' });
        reject(err);
      }
    );

    // Handle proxy response
    proxy.once('proxyRes', () => {
      resolve();
    });
  });
}

// Export config to allow API routes to handle body parsing
export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};