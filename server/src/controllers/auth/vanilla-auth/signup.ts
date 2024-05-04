import { Request, Response } from 'express'

const signup = async (req: Request, res: Response) => {
  console.log('💥 Test Signup')
  console.log('🫃 req.body', req.body)
  res.status(200).send({ msg: '💥 Test Signup' })
}

export default signup
