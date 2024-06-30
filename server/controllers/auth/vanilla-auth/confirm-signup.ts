import { Request, Response } from 'express';
// import pgPool from '../../../db/pgPool';
import {
  BadRequestError,
  // InternalError
} from '../../../errors';

export const confirmSignup = async (req: Request, res: Response) => {
  const { token } = req.query;

  if (!token) throw new BadRequestError('Invalid token');

  // const confirmationQuery = ``;
  // const confirmationParams = [token];
  // const {
  //   rows: [confirmedUser],
  // } = await pgPool.query(confirmationQuery, confirmationParams);

  // if (!confirmedUser) throw new InternalError()

  res.send('OK');
};
