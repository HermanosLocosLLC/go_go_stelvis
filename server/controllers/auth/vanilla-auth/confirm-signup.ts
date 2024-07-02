import { Request, Response } from 'express';
// import pgPool from '../../../db/pgPool';
import {
  BadRequestError,
  // InternalError
} from '../../../errors';
import { DateFormatter, decodeJwt } from '../../../utils';
import pgPool from '../../../db/pgPool';
import { attachAuthCookie, createJwt } from '../utils';
import { clientBaseUrl } from '../../../config/baseUrls';

export const confirmSignup = async (req: Request, res: Response) => {
  const { token } = req.query;

  if (!token) throw new BadRequestError('Invalid token');

  const userId = decodeJwt(`${token}`);
  if (!userId) {
    res.redirect(clientBaseUrl + '/confirmation-expired');
    return;
  }

  const confirmQuery = `
  UPDATE users
  SET is_active = TRUE, updated_at = NOW()
  WHERE id=$1
  RETURNING id
  `;
  const confirmParams = [userId, DateFormatter.dateToTimestamp(new Date())];
  const {
    rows: [confirmedUserId],
  } = await pgPool.query(confirmQuery, confirmParams);

  console.log(confirmedUserId);

  if (!confirmedUserId)
    throw new BadRequestError('Token is expired, please sign up again');

  const jwt = createJwt(confirmedUserId);
  attachAuthCookie(res, jwt);

  res.redirect(clientBaseUrl);
};
