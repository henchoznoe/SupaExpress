import { z } from 'zod';

const userIdSchema = z.string({ required_error: 'userId is required.' })
  .nonempty('userId cannot be empty.')
  .uuid('userId must be a valid UUID.');

const roleSchema = z.string({ required_error: 'role is required.' })
  .nonempty('role cannot be empty.');

export const setRoleSchema = z.object({
  userId: userIdSchema,
  role: roleSchema
});
