import { Request, Response } from 'express';
import { supabaseAdmin } from '../config/supabase';
import { sendError, sendSuccess } from '../middlewares/httpResponses';
import { Roles } from '../types/role';

/**
 * Controller to handle user role assignment.
 * It receives the userId and role from the request body,
 * and attempts to update the user's role using Supabase.
 * If successful, it sends a success response with the updated user data.
 * If an error occurs, it sends an error response with the error message.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
export const setUserRole = async (req: Request, res: Response) => {
  const { userId, role } = req.body;
  if (!Object.values(Roles).includes(role))
    return sendError(res, 400, 'Invalid role');
  try {
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
      userId,
      {
        app_metadata: {
          role
        }
      }
    );
    if (error) return sendError(res, 500, error.message);
    return sendSuccess(res, 200, 'User role updated successfully', data);
  } catch (error) {
    return sendError(res, 500, `Failed to update user role: ${error}`);
  }
};
