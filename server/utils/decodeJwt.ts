import jwt, { JwtPayload } from 'jsonwebtoken';

interface UserPayload extends JwtPayload {
  userId: string;
}

export const decodeJwt = (token: string) => {
  try {
    console.log('Verifying jwt');
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
    console.log('PAYLOAD', payload);

    return payload.userId;
  } catch (err) {
    console.log('JWT Error:', err);
    return false;
  }
};
