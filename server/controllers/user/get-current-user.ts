import { Request, Response } from 'express';
import { User } from '../../models/user';

export const getCurrentUser = async (req: Request, res: Response) => {
  const user = await User.findById(req.currentUser);

  res.status(200).send(user || { message: 'No current user' });
};
