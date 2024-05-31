import { Request, Response } from 'express'
import { BadRequestError } from '../../errors/bad-request-error'
import { s3ImageUpload } from '../../utils/aws/s3ImageUpload'
import { InternalError } from '../../errors/internal-error'
import { CurrentUserRequest } from '../../middlewares/current-user'
import { User } from '../../models/user'
import { NotAuthorizedError } from '../../errors/not-authorized-error'

export const uploadPfp = async (req: CurrentUserRequest, res: Response) => {
  const { image } = req.body
  if (!image) throw new BadRequestError('Please upload a proper image')

  try {
    const imageUrl = (await s3ImageUpload(image)) as string
    const user = await User.findById(req.currentUser)
    if (!user) throw new NotAuthorizedError()
    user.pfp = imageUrl
    await user.save()
    res.status(201).send(user)
  } catch (err) {
    console.log(err)
    throw new InternalError()
  }
}
