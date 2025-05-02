import { Request, Response, NextFunction } from 'express';
import { sendError } from './httpResponses';
import { supabaseAdmin } from '../config/supabase';

/**
 * Middleware to check user role.
 *
 * @param {string[]} allowedRoles - Array of allowed roles (ex: ['admin', 'user'])
 */
export const checkRole = (allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Check if the request has an authorization header
      const authHeader = req.headers.authorization;
      if ( !authHeader )
        return sendError(res, 401, 'Missing authorization header');

      // Split the header to get the token
      const token = authHeader.split(' ')[1];
      if ( !token )
        return sendError(res, 401, 'Missing token');

      // Get the user from Supabase using the token
      const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
      if ( error || !user )
        return sendError(res, 401, 'Invalid token or user not found');

      // Check if the user has a role and if it is in the allowed roles
      const userRole = user.app_metadata?.role || 'user';
      if ( !userRole )
        return sendError(res, 403, 'No role assigned to the user');
      if ( !allowedRoles.includes(userRole) )
        return sendError(res, 403, 'Access denied');

      // If everything is fine, call the next middleware and attach the user to the request
      req.user = user;
      next();
    } catch ( error ) {
      return sendError(res, 500, `Error checking user role : ${error}`);
    }
  };
};
