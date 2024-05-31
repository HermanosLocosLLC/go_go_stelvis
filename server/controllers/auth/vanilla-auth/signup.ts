import { Request, Response } from 'express';
import { ValidationError } from '../../../errors/validation-error';
import { RequestValidationError } from '../../../errors/request-validation-error';
import { User } from '../../../models/user';
import { BadRequestError } from '../../../errors/bad-request-error';
import { attachCookie } from '../../../utils/attachCookie';
import { validateEmail } from '../../../utils/requestValidators/validateEmail';
import { validatePassword } from '../../../utils/requestValidators/validatePassword';
import { CustomError } from '../../../errors/custom-error';

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
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new BadRequestError('User already exists');
  }

  // SIGN UP NEW USER
  const newUser = User.build({
    email,
    password,
    userType: 'gogo',
  });
  await newUser.save();

  const jwt = newUser.createJwt();
  attachCookie(res, jwt);

  res.status(201).send(newUser);
};

export default signup;
