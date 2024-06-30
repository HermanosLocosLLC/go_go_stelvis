import { Request, Response } from 'express';
import { BadRequestError } from '../../errors/bad-request-error';
import pgPool from '../../db/pgPool';

export const getTripById = async (req: Request, res: Response) => {
  const { tripId } = req.params;

  if (!tripId) {
    throw new BadRequestError('Invalid Trip');
  }

  const tripQuery = `
    SELECT * from trips WHERE id=$1
  `;
  const tripParams = [tripId];
  const {
    rows: [trip],
  } = await pgPool.query(tripQuery, tripParams);

  if (!trip) {
    throw new BadRequestError('Invalid Trip ID');
  }

  res.send(trip);
};
