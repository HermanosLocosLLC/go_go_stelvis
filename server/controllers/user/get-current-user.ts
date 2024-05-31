import { Request, Response } from 'express';
import { CurrentUserRequest } from '../../middlewares/current-user';
import { NotAuthorizedError } from '../../errors/not-authorized-error';
import { User } from '../../models/user';

export const getCurrentUser = async (
  req: CurrentUserRequest,
  res: Response,
) => {
  const user = await User.findById(req.currentUser);

  res.status(200).send(user || { message: 'No current user' });
};
