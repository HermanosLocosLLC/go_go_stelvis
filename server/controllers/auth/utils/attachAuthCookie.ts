import { Response } from 'express';

export const attachAuthCookie = (res: Response, jwt: string) => {
  res.cookie('token', jwt, {
    httpOnly: true,
    secure: false,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
  });
};
