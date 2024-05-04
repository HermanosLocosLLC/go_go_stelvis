import { Request, Response } from 'express'

const logout = async (req: Request, res: Response) => {
  console.log('💥 Test Logout')
  res.status(200).send({ msg: '💥 Test Logout' })
}

export default logout
