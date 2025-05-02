import { Request, Response } from 'express';
import { supabase, supabaseAdmin } from '../config/supabase';
import { sendError, sendSuccess } from '../middlewares/httpResponses';

/**
 * Controller to handle user registration.
 * It receives the email and password from the request body,
 * and attempts to register the user using Supabase.
 * If successful, it sends a success response with the user data.
 * If an error occurs, it sends an error response with the error message.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const { data: user, error } = await supabase.auth.signUp({ email, password });
    if ( error ) return sendError(res, 400, error.message);
    const { error: adminError } = await supabaseAdmin.auth.admin.updateUserById(<string>user.user?.id, {
      app_metadata: {
        role: 'user',
      },
    });
    if ( adminError ) return sendError(res, 500, adminError.message);
    return sendSuccess(res, 200, 'User registered successfully', {
      user: {
        id: user.user?.id,
        email: user.user?.email,
      }
    });
  } catch ( error ) {
    return sendError(res, 500, `Failed to register user: ${error}`);
  }
};

/**
 * Controller to handle user login.
 * It receives the email and password from the request body,
 * and attempts to log in the user using Supabase.
 * If successful, it sends a success response with the user data.
 * If an error occurs, it sends an error response with the error message.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if ( error ) return sendError(res, 401, error.message);
    return sendSuccess(res, 200, 'Login successful', {
      user: {
        id: data.user?.id,
        email: data.user?.email,
      },
      session: {
        access_token: data.session?.access_token,
        expires_at: data.session?.expires_at,
        refresh_token: data.session?.refresh_token,
      }
    });
  } catch ( error ) {
    return sendError(res, 500, `Failed to login user: ${error}`);
  }
};

/**
 * Controller to handle token refresh.
 * It receives the refresh token from the request body,
 * and attempts to refresh the session using Supabase.
 * If successful, it sends a success response with the new session data.
 * If an error occurs, it sends an error response with the error message.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
export const refreshToken = async (req: Request, res: Response) => {
  const { refresh_token } = req.body;
  try {
    const { data, error } = await supabase.auth.refreshSession({ refresh_token });
    if ( error ) return sendError(res, 401, error.message);
    return sendSuccess(res, 200, 'Token refreshed successfully', {
      user: {
        id: data.user?.id,
        email: data.user?.email,
      },
      session: {
        access_token: data.session?.access_token,
        expires_at: data.session?.expires_at,
        refresh_token: data.session?.refresh_token,
      }
    });
  } catch ( error ) {
    return sendError(res, 500, `Failed to refresh token: ${error}`);
  }
};
