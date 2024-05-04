import { Request, Response } from 'express'

const login = async (req: Request, res: Response) => {
  console.log('💥 Test Login')
  res.status(200).send({ msg: '💥 Test Login' })
}

export default login