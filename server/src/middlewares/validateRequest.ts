import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { errorHandler } from './errorHandler';

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw errorHandler('Validation failed', 400, req.baseUrl);
  }

  next();
};
