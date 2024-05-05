import { Request, Response } from 'express'
import { ValidationError } from '../../../errors/validation-error'
import { RequestValidationError } from '../../../errors/request-validation-error'
import { User } from '../../../models/user'
import { BadRequestError } from '../../../errors/bad-request-error'
import { attachCookie } from '../../../utils/attachCookie'

const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const validationErrors = []
  if (!email || typeof email !== 'string') {
    validationErrors.push(new ValidationError('Provide a poper email', 'email'))
  }
  if (!password || typeof password !== 'string' || password.length < 7) {
    validationErrors.push(
      new ValidationError('Provide a poper password', 'password'),
    )
  }
  if (validationErrors.length) {
    throw new RequestValidationError(validationErrors)
  }

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    throw new BadRequestError('User already exists')
  }

  const newUser = User.build({
    email,
    password,
    userType: 'gogo',
  })
  await newUser.save()

  const jwt = newUser.createJwt()
  attachCookie(res, jwt)

  res.status(200).send(newUser)
}

export default signup
