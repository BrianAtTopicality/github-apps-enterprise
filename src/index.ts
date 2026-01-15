import express from 'express';
import { App } from '@octokit/app';
import dotenv from 'dotenv';
import promClient from 'prom-client';

dotenv.config();

const app = new App({
  appId: process.env.GITHUB_APP_ID!,
  privateKey: process.env.GITHUB_PRIVATE_KEY!,
  webhooks: {
    secret: process.env.WEBHOOK_SECRET!
  }
});

const server = express();
const port = process.env.PORT || 3000;

// Prometheus metrics
const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });

const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  register
});

// Health check endpoint
server.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Metrics endpoint  
server.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Webhook endpoint
server.post('/webhooks', express.json(), async (req, res) => {
  const end = httpRequestDuration.startTimer();
  try {
    await app.webhooks.verifyAndReceive({
      id: req.headers['x-github-delivery'] as string,
      name: req.headers['x-github-event'] as any,
      signature: req.headers['x-hub-signature-256'] as string,
      payload: req.body
    });
    res.status(200).send('OK');
    end({ method: 'POST', route: '/webhooks', status_code: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).send('Error');
    end({ method: 'POST', route: '/webhooks', status_code: 500 });
  }
});

// Start server
server.listen(port, () => {
  console.log(`GitHub Apps server running on port ${port}`);
  console.log(`Health check: http://localhost:${port}/health`);
  console.log(`Metrics: http://localhost:${port}/metrics`);
});

export default app;
