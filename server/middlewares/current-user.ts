import { NextFunction, Request, Response } from 'express';
import { InternalError } from '../errors/internal-error';
import { decodeJwt } from '../utils';

declare module 'express-serve-static-core' {
  interface Request {
    currentUser?: string;
  }
}

//middleware to check if there is a cookie
// if there is a cookie, we decode jwt and attach the current user id
export const currentUser = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const { token } = req.cookies;

  if (!token) return next();

  const userId = decodeJwt(token);
  if (!userId) {
    throw new InternalError();
  }
  req.currentUser = userId;
  return next();
};
