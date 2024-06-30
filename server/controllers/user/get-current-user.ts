import { Request, Response } from 'express';
import pgPool from '../../db/pgPool';

export const getCurrentUser = async (req: Request, res: Response) => {
  const currentUserQuery = `
  SELECT * FROM users WHERE id=$1
  `;
  const currentUserParams = [req.currentUser];
  const {
    rows: [currentUser],
  } = await pgPool.query(currentUserQuery, currentUserParams);

  res.status(200).send(currentUser || { message: 'No current user' });
};
