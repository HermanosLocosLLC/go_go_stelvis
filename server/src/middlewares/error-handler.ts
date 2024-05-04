import { NextFunction, Request, Response } from 'express'
import { CustomError } from '../errors/custom-error'

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(err.message)

  if (err instanceof CustomError) {
    return res.status(err.statusCode).send(err.serializeErrors())
  }

  return res
    .status(500)
    .send({ message: 'Something went wrong, please try again later' })
}
