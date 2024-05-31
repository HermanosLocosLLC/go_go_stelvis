import { CurrentUserRequest } from './current-user'
import { NotAuthorizedError } from '../errors/not-authorized-error'
import { NextFunction, Response } from 'express'

export const requireAuth = (
  req: CurrentUserRequest,
  res: Response,
  next: NextFunction,
) => {
  // check if req.currentUser exists
  if (req.currentUser) return next()
  // if not throw a not authorized error
  throw new NotAuthorizedError()
}
