import express from 'express';
import health from './healthcheck';

const app = express();

app.get('/health', (_req, res) => res.json(health()));

export default app;
