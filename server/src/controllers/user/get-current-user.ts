import { Request, Response } from 'express'
import { CurrentUserRequest } from '../../middlewares/current-user'
import { NotAuthorizedError } from '../../errors/not-authorized-error'
import { User } from '../../models/user'

export const getCurrentUser = async (
  req: CurrentUserRequest,
  res: Response,
) => {
  if (!req.currentUser) throw new NotAuthorizedError()

  const user = await User.findById(req.currentUser)

  if (!user) throw new NotAuthorizedError()

  res.status(200).send(user)
}
