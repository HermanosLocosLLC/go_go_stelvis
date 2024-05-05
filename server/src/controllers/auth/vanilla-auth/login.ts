import { Request, Response } from 'express'
import { RequestValidationError } from '../../../errors/request-validation-error'
import { ValidationError } from '../../../errors/validation-error'
import { User } from '../../../models/user'
import { BadRequestError } from '../../../errors/bad-request-error'
import { attachCookie } from '../../../utils/attachCookie'

const login = async (req: Request, res: Response) => {
  console.log('💥 Test Login')
  console.log('🫃 req.body', req.body)
  const { email, password } = req.body

  const validationErrors = []
  if (!email) {
    validationErrors.push(new ValidationError('Provide a poper email', 'email'))
  }
  if (!password) {
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

  const passwordsMatch = user.comparePassword(password)
  if (!passwordsMatch) throw new BadRequestError('Invalid credentials')

  const jwt = user.createJwt()
  attachCookie(res, jwt)

  res.status(200).send(user)
}

export default login
