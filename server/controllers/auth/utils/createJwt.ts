import jwt from 'jsonwebtoken';

export const createJwt = (userId: string, confirmed = true) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: confirmed
      ? process.env.JWT_LIFETIME
      : process.env.JWT_CONFIRM_LIFETIME,
  });
};
