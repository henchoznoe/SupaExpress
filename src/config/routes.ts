import { Application, Request, Response } from 'express';
import { sendSuccess } from '../middlewares/httpResponses';
import {
  globalErrorHandler,
  routeNotFoundHandler
} from '../middlewares/routesErrorHandler';
import authRoutes from '../routes/auth.routes';
import protectedRoutes from '../routes/protected.routes';
import usersRoutes from '../routes/users.routes';
import { formatDate } from '../utils/date';

export const setupRoutes = (app: Application) => {
  // Health check route
  app.get('/', async (_: Request, res: Response) => {
    sendSuccess(res, 200, '🚀 Express server is online!', {
      uptime: `${process.uptime().toFixed(0)} seconds`,
      timestamp: formatDate()
    });
  });

  // API routes
  app.use('/api/auth', authRoutes);
  app.use('/api/protected', protectedRoutes);
  app.use('/api/users', usersRoutes);

  // Errors handling middlewares
  app.use(routeNotFoundHandler);
  app.use(globalErrorHandler);
};
