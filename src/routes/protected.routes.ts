import { Router } from 'express';
import { checkRole } from '../middlewares/checkRole';
import { sendSuccess } from '../middlewares/httpResponses';
import { Roles } from '../types/role';

const router = Router();

router.get(
  '/admin-only',
  checkRole([Roles.ADMIN]),
  (req, res) => {
    sendSuccess(res, 200, 'Hello Admin!', {});
  }
);

router.get(
  '/user-or-admin',
  checkRole([Roles.USER, Roles.ADMIN]),
  (req, res) => {
    sendSuccess(res, 200, 'Hello User or Admin!', {});
  }
);

export default router;
