import express from 'express';
import cors from 'cors';
import { authRouter } from './routes/auth.js';
import { sweetsRouter } from './routes/sweets.js';

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
  app.use('/api/auth', authRouter);
  app.use('/api/sweets', sweetsRouter);

  app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  });

  return app;
}


