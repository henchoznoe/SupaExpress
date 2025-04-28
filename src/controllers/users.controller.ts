import { Request, Response } from 'express';
import { Roles } from '../types/role';
import { sendError, sendSuccess } from '../middlewares/httpResponses';
import { supabaseAdmin } from '../config/supabaseAdmin';

export const setUserRole = async (req: Request, res: Response) => {
  const { userId, role } = req.body;
  if ( !Object.values(Roles).includes(role) )
    return sendError(res, 400, 'Invalid role');
  try {
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      app_metadata: {
        role,
      }
    });
    if ( error ) return sendError(res, 500, error.message);
    return sendSuccess(res, 200, 'User role updated successfully', data);
  } catch ( error ) {
    return sendError(res, 500, `Failed to update user role: ${error}`);
  }
};
