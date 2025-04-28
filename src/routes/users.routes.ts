import { Router } from 'express';
import { checkRole } from '../middlewares/checkRole';
import { Roles } from '../types/role';
import { validateFields } from '../middlewares/fieldsValidation';
import { setRoleSchema } from '../validators/users.schema';
import { setUserRole } from '../controllers/users.controller';

const router = Router();

router.patch(
  '/set-role',
  validateFields(setRoleSchema),
  checkRole([Roles.ADMIN]),
  setUserRole
);

export default router;
