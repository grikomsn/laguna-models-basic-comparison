import { Router, Request, Response } from 'express';

const router = Router();

/**
 * @route GET /api
 * @description API root endpoint
 */
router.get('/', (req: Request, res: Response) => {
  res.json({
    version: '1.0.0',
    endpoints: {
      users: '/users',
      posts: '/posts'
    }
  });
});

/**
 * @route GET /api/users
 * @description Get all users
 */
router.get('/users', (req: Request, res: Response) => {
  res.json({
    message: 'Users endpoint',
    users: []
  });
});

/**
 * @route GET /api/users/:id
 * @description Get user by ID
 */
router.get('/users/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `User ${id}`,
    user: { id, name: 'Example User' }
  });
});

/**
 * @route GET /api/posts
 * @description Get all posts
 */
router.get('/posts', (req: Request, res: Response) => {
  res.json({
    message: 'Posts endpoint',
    posts: []
  });
});

export { router as apiRouter };
