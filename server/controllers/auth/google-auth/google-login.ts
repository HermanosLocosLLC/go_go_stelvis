import axios from 'axios';
import { Request, Response } from 'express';
import { googleOAuth2Client } from './util/googleOAuth2';
import { InternalError } from '../../../errors/internal-error';
import { attachCookie } from '../../../utils/attachCookie';
import { GoogleUserInfo } from './util/googleUserType';
import { clientBaseUrl } from '../../../utils/baseUrls';
import pgPool from '../../../db/pgPool';
import { createJwt } from '../vanilla-auth/utils/createJwt';

export const googleLogin = async (req: Request, res: Response) => {
  const { code, error } = req.query;

  if (error) {
    return res.redirect(clientBaseUrl + '/landing');
  }

  if (!code || typeof code !== 'string') {
    throw new InternalError();
  }

  try {
    const { tokens } = await googleOAuth2Client.getToken(code);
    googleOAuth2Client.setCredentials(tokens);

    const userInfoResponse: GoogleUserInfo = await axios(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      },
    );
    const {
      given_name: first_name,
      family_name: last_name,
      picture: pfp,
      email,
    } = userInfoResponse.data;

    const currentUserQuery = `
    SELECT * FROM users WHERE email=$1;
    `;
    const currentUserParams = [email];
    const {
      rows: [currentUser],
    } = await pgPool.query(currentUserQuery, currentUserParams);
    if (currentUser) {
      const jwt = createJwt(currentUser.id);
      attachCookie(res, jwt);
      res.redirect(clientBaseUrl);
      return;
    }

    const newUserQuery = `
    INSERT INTO users (email, first_name, last_name, pfp, user_type)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, email, first_name, last_name, pfp, user_type;
    `;
    const newUserParams = [email, first_name, last_name, pfp, 'google'];
    const {
      rows: [newUser],
    } = await pgPool.query(newUserQuery, newUserParams);
    const jwt = createJwt(newUser.id);
    attachCookie(res, jwt);
    res.redirect(clientBaseUrl);
    return;
  } catch (err) {
    console.log('❌ Error in googleLogin');

    throw new InternalError();
  }
};
