import { Request, Response } from 'express';
import pgPool from '../../../db/pgPool';
import {
  ValidationError,
  RequestValidationError,
  BadRequestError,
} from '../../../errors';
import { createJwt, attachAuthCookie, Password } from '../utils';
import { validateEmail } from '../../../utils';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // INPUT VALIDATION
  const validationErrors = [];
  if (!validateEmail(email)) {
    validationErrors.push(
      new ValidationError('Provide a poper email', 'email'),
    );
  }
  if (!password || typeof password !== 'string') {
    validationErrors.push(
      new ValidationError('Provide a poper password', 'password'),
    );
  }
  if (validationErrors.length) {
    throw new RequestValidationError(validationErrors);
  }

  const userQuery = `SELECT * FROM users WHERE email=$1`;
  const userParams = [email];
  const {
    rows: [user],
  } = await pgPool.query(userQuery, userParams);
  if (!user) throw new BadRequestError('No user associated with this email');
  if (user.user_type !== 'gogo')
    throw new BadRequestError(
      'Account uses other authentication means. Try logging in with Google',
    );

  // ignore warning - comparePassword is async - must use await
  const passwordsMatch = await Password.comparePassword(
    password,
    user.password,
  );
  console.log('passwordsMatch:', passwordsMatch);

  if (!passwordsMatch) throw new BadRequestError('Invalid credentials');

  const jwt = createJwt(user.id);
  attachAuthCookie(res, jwt);

  res.status(200).send(user);
};
