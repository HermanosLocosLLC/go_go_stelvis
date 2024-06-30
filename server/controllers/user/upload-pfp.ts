import { Request, Response } from 'express';
import pgPool from '../../db/pgPool';
import {
  BadRequestError,
  NotAuthorizedError,
  InternalError,
} from '../../errors';
import { s3ImageUpload } from '../../utils';

export const uploadPfp = async (req: Request, res: Response) => {
  const { image } = req.body;
  if (!image) throw new BadRequestError('Please upload a proper image');

  try {
    const imageUrl = (await s3ImageUpload(image)) as string;
    const userQuery = `
  SELECT * FROM users WHERE id=$1
  `;
    const userParams = [req.currentUser];
    const {
      rows: [user],
    } = await pgPool.query(userQuery, userParams);
    if (!user) throw new NotAuthorizedError();
    user.pfp = imageUrl;
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    console.log(err);
    throw new InternalError();
  }
};
