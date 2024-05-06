import { Request, Response } from 'express'
import { googleOAuth2Client } from './util/googleOAuth2'
import { InternalError } from '../../../errors/internal-error'
import axios from 'axios'
import { User } from '../../../models/user'
import { attachCookie } from '../../../utils/attachCookie'
import { GoogleUserInfo } from './util/googleUserType'
import { clientBaseUrl } from '../../../utils/baseUrls'
import { BadRequestError } from '../../../errors/bad-request-error'

export const googleLogin = async (req: Request, res: Response) => {
  const { code } = req.query

  if (!code || typeof code !== 'string') {
    throw new InternalError()
  }

  try {
    const { tokens } = await googleOAuth2Client.getToken(code)
    googleOAuth2Client.setCredentials(tokens)

    const userInfoResponse: GoogleUserInfo = await axios(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      },
    )
    const {
      given_name: firstName,
      family_name: lastName,
      picture: pfp,
      email,
    } = userInfoResponse.data

    const currentUser = await User.findOne({ email })
    if (currentUser) {
      const jwt = currentUser.createJwt()
      attachCookie(res, jwt)
      res.redirect(clientBaseUrl)
      return
    }

    const newUser = User.build({
      firstName,
      lastName,
      email,
      pfp,
      userType: 'google',
    })
    await newUser.save()
    const jwt = newUser.createJwt()
    attachCookie(res, jwt)
    res.redirect(clientBaseUrl)
    return
  } catch (err) {
    console.log('❌ Error in googleLogin')

    throw new InternalError()
  }
}
