import { Request, Response } from 'express'

const signup = async (req: Request, res: Response) => {
  console.log('💥 Test Signup')
  res.status(200).send({ msg: '💥 Test Signup' })
}

export default signup
