import { NotAuthorizedError } from '../errors/not-authorized-error';
import { Request, Response, NextFunction } from 'express';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // check if req.currentUser exists
  if (req.currentUser) return next();
  // if not throw a not authorized error
  throw new NotAuthorizedError();
};
