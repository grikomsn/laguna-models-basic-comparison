import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { DatabaseService } from './services/database';
import { healthRouter } from './routes/health';
import { apiRouter } from './routes/api';

// Create Express app (without auto-initializing)
export function createApp(db: DatabaseService) {
  const app = express();

  // Middleware
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes
  app.use('/health', healthRouter);
  app.use('/api', apiRouter);

  // Root endpoint
  app.get('/', (req: Request, res: Response) => {
    res.json({
      name: 'Node Express SQLite PM2 Example',
      version: '1.0.0',
      endpoints: {
        health: '/health',
        api: '/api'
      }
    });
  });

  // 404 handler
  app.use('*', (req: Request, res: Response) => {
    res.status(404).json({
      error: 'Not Found',
      message: `Route ${req.method} ${req.path} not found`
    });
  });

  // Error handler
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(500).json({
      error: 'Internal Server Error',
      message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
  });

  return app;
}

// For backward compatibility - default export
export const defaultDb = new DatabaseService(process.env.DB_PATH || './data/database.sqlite');
export const app = createApp(defaultDb);
export { defaultDb as db };
