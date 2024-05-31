import { ValidationError } from '../../errors/validation-error';

export const validateEmail = (email: any) => {
  if (!email || typeof email !== 'string') return false;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
