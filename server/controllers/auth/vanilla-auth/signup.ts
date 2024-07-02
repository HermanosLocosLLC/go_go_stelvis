import { Request, Response } from 'express';
import pgPool from '../../../db/pgPool';
import {
  ValidationError,
  RequestValidationError,
  BadRequestError,
  InternalError,
} from '../../../errors';
import { Password, createJwt, validatePassword } from '../utils';
import { Email, validateEmail } from '../../../utils';

export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // INPUT VALIDATION
  const validationErrors = [];
  // VALIDATE EMAIL
  if (!validateEmail(email)) {
    validationErrors.push(
      new ValidationError('Please provide a valid email', 'email'),
    );
  }
  // VALIDATE PASSWORD
  const passwordValidation = validatePassword(password);
  if (passwordValidation instanceof ValidationError) {
    validationErrors.push(passwordValidation);
  }
  // IF VALIDATION ERRORS, THROW REQUEST VALIDATION ERROR
  if (validationErrors.length) {
    throw new RequestValidationError(validationErrors);
  }

  // CHECK IF USER ALREADY EXISTS
  const existingUserQuery = `
    SELECT * FROM users WHERE email=$1
  `;
  const existingUserValues = [email];
  const {
    rows: [existingUser],
  } = await pgPool.query(existingUserQuery, existingUserValues);
  if (existingUser && existingUser.is_active) {
    throw new BadRequestError('User already exists');
  }

  // SIGN UP NEW USER
  const hashedPass = await Password.hashPassword(password);
  const signupQuery = `
    INSERT INTO users (email, password, user_type, is_active)
    VALUES($1, $2, $3, $4)
    RETURNING id, email, user_type;
  `;
  const signupValues = [email, hashedPass, 'gogo', 'FALSE'];
  const {
    rows: [newUser],
  } = await pgPool.query(signupQuery, signupValues);

  if (!newUser) throw new InternalError();
  const confirmationToken = createJwt(newUser.id, false);
  const url = `${req.protocol}://${req.get(
    'host',
  )}/api/v1/auth/gogo/confirm?token=${confirmationToken}`;
  const emailHelper = new Email(newUser, url);
  await emailHelper.sendSignupConfirmation();

  res
    .status(201)
    .send({ message: "Thank you for signing up! Please confirm you're email" });
};
