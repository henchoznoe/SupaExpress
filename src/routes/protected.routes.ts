import { Request, Response } from 'express';
import { Router } from 'express';
import { checkRole } from '../middlewares/checkRole';
import { sendSuccess } from '../middlewares/httpResponses';
import { Roles } from '../types/role';

const router = Router();

/**
 * @swagger
 * /api/protected/admin-only:
 *   get:
 *     summary: Admin Only Route
 *     tags: [Protected]
 *     description: This route is only accessible to users with the admin role.
 *     responses:
 *       '200':
 *         user: All the user data
 *       '403':
 *         description: Forbidden. You do not have permission to access this resource.
 */
router.get(
  '/admin-only',
  checkRole([Roles.ADMIN]),
  (req: Request, res: Response) => {
    sendSuccess(res, 200, 'Hello Admin!', { user: req.user });
  }
);

/**
 * @swagger
 * /api/protected/user-or-admin:
 *   get:
 *     summary: User or Admin Route
 *     tags: [Protected]
 *     description: This route is accessible to users with either the user or admin role.
 *     responses:
 *       '200':
 *         user: All the user data
 *       '403':
 *         description: Forbidden. You do not have permission to access this resource.
 */
router.get(
  '/user-or-admin',
  checkRole([Roles.USER, Roles.ADMIN]),
  (req: Request, res: Response) => {
    sendSuccess(res, 200, 'Hello User or Admin!', { user: req.user });
  }
);

export default router;
