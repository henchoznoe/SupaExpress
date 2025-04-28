import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { sendError } from './httpResponses';

/**
 * Middleware to validate request fields using express-validator.
 * If validation fails, it sends an error response with the first validation error message.
 * If validation passes, it calls the next middleware in the stack.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 */
export const fieldsValidation = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if ( !errors.isEmpty() ) return sendError(res, 400, errors.array()[0].msg);
  next();
};
