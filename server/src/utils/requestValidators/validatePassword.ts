import { ValidationError } from '../../errors/validation-error'

export const validatePassword = (password: any) => {
  if (!password || typeof password !== 'string') {
    return new ValidationError('Please provide a valid password', 'password')
  }

  const passwordRegex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{7,20}$/

  if (!passwordRegex.test(password)) {
    return new ValidationError(
      'Password must be between 7 and 20 characters long, include at least 1 letter, 1 number and 1 special character (such as !@#$%^&*()_+)',
      'password',
    )
  }

  return true
}
