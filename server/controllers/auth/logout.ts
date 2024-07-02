import { Request, Response } from 'express';

export const logout = (_req: Request, res: Response) => {
  res.cookie('token', null, {
    httpOnly: true,
    secure: false,
    expires: new Date(Date.now() + 500),
  });

  res.status(200).send({ message: 'success' });
};
