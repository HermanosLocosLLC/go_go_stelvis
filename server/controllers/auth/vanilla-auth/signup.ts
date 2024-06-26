import { Request, Response } from 'express';
import { ValidationError } from '../../../errors/validation-error';
import { RequestValidationError } from '../../../errors/request-validation-error';
import { BadRequestError } from '../../../errors/bad-request-error';
import { attachCookie } from '../../../utils/attachCookie';
import { validateEmail } from '../../../utils/requestValidators/validateEmail';
import { validatePassword } from '../../../utils/requestValidators/validatePassword';
import { Password } from './utils/password';
import pgPool from '../../../db/pgPool';
import { createJwt } from './utils/createJwt';

const signup = async (req: Request, res: Response) => {
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
  const { rows: existingUserResult } = await pgPool.query(
    existingUserQuery,
    existingUserValues,
  );
  if (existingUserResult[0]) {
    throw new BadRequestError('User already exists');
  }

  // SIGN UP NEW USER
  const hashedPass = await Password.hashPassword(password);
  const signupQuery = `
    INSERT INTO users (email, password)
    VALUES($1, $2);
  `;
  const signupValues = [email, hashedPass];
  const { rows: signupResult } = await pgPool.query(signupQuery, signupValues);
  // const newUser = User.build({
  //   email,
  //   password,
  //   userType: 'gogo',
  // });
  // await newUser.save();

  const jwt = createJwt(signupResult[0].id);
  attachCookie(res, jwt);

  res.status(201).send(signupResult[0]);
};

export default signup;
