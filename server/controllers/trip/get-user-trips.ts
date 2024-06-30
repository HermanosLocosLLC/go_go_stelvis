import { Request, Response } from 'express';
import { NotAuthorizedError } from '../../errors/not-authorized-error';
import pgPool from '../../db/pgPool';

export const getUserTrips = async (req: Request, res: Response) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  const tripsQuery = `
  SELECT * FROM trips
  JOIN invitees ON invitees.trip_id = trips.id
  JOIN users ON invitees.invitee_id = users.id
  WHERE trips.creator=$1 OR invitees.invitee_id=$1;
  `;
  const tripsParams = [req.currentUser];
  const { rows: trips } = await pgPool.query(tripsQuery, tripsParams);

  res.status(200).send(trips);
};
