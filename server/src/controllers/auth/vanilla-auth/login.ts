import { Request, Response } from 'express'
import { RequestValidationError } from '../../../errors/request-validation-error'
import { ValidationError } from '../../../errors/validation-error'

const login = async (req: Request, res: Response) => {
  console.log('💥 Test Login')
  console.log('🫃 req.body', req.body)
  const { email, password } = req.body

  const validationError = []
  if (!email) {
    validationError.push(new ValidationError('Provide a poper email', 'email'))
  }
  if (!password) {
    validationError.push(
      new ValidationError('Provide a poper password', 'password'),
    )
  }
  if (validationError.length) {
    throw new RequestValidationError(validationError)
  }

  res.status(200).send({ msg: '💥 Test Login' })
}

export default login
