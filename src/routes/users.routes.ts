import { Router } from 'express';
import { setUserRole } from '../controllers/users.controller';
import { checkRole } from '../middlewares/checkRole';
import { validateFields } from '../middlewares/fieldsValidation';
import { Roles } from '../types/role';
import { setRoleSchema } from '../validators/users.schema';

const router = Router();

/**
 * @swagger
 * /api/users/set-role:
 *   patch:
 *     summary: Set User Role
 *     tags: [Users]
 *     description: Set the role of a user. Only accessible by admin.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - role
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: The ID of the user whose role is to be set.
 *                 example: 12345678-1234-1234-1234-123456789012
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *                 description: The new role to assign to the user.
 *                 example: admin
 *     responses:
 *       '200':
 *         description: User role updated successfully.
 *       '403':
 *         description: Forbidden. You do not have permission to access this resource.
 */
router.patch(
  '/set-role',
  validateFields(setRoleSchema),
  checkRole([Roles.ADMIN]),
  setUserRole
);

export default router;
