import { Router, Request, Response } from 'express';
import { defaultDb } from '../index';

const router = Router();

/**
 * @route GET /health
 * @description Health check endpoint with database status
 */
router.get('/', (req: Request, res: Response) => {
  const healthStatus = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    environment: process.env.NODE_ENV || 'development'
  };

  res.status(200).json(healthStatus);
});

/**
 * @route GET /health/database
 * @description Check database connectivity
 */
router.get('/database', async (req: Request, res: Response) => {
  try {
    const dbInstance = defaultDb.getDb();

    // Simple query to test connection
    const result = dbInstance.prepare('SELECT 1 as test').get();

    res.status(200).json({
      status: 'healthy',
      database: 'connected',
      test: result
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      database: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export { router as healthRouter };
