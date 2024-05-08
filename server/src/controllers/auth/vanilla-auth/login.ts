import { Request, Response } from 'express'
import { RequestValidationError } from '../../../errors/request-validation-error'
import { ValidationError } from '../../../errors/validation-error'
import { User } from '../../../models/user'
import { BadRequestError } from '../../../errors/bad-request-error'
import { attachCookie } from '../../../utils/attachCookie'
import { validateEmail } from '../../../utils/requestValidators/validateEmail'

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  // INPUT VALIDATION
  const validationErrors = []
  if (!validateEmail(email)) {
    validationErrors.push(new ValidationError('Provide a poper email', 'email'))
  }
  if (!password || typeof password !== 'string') {
    validationErrors.push(
      new ValidationError('Provide a poper password', 'password'),
    )
  }
  if (validationErrors.length) {
    throw new RequestValidationError(validationErrors)
  }

  const user = await User.findOne({ email })
  if (!user) throw new BadRequestError('No user associated with this email')
  if (user.userType !== 'gogo')
    throw new BadRequestError(
      'Account uses other authentication means. Try logging in with Google, Facebook or Discord',
    )

  // ignore warning - comparePassword is async - must use await
  const passwordsMatch = await user.comparePassword(password)
  console.log('passwordsMatch:', passwordsMatch)

  if (!passwordsMatch) throw new BadRequestError('Invalid credentials')

  const jwt = user.createJwt()
  attachCookie(res, jwt)

  res.status(200).send(user)
}

export default login
