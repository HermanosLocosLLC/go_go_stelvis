import { CustomError } from './custom-error';

export class InternalError extends CustomError {
  statusCode = 500;

  constructor() {
    super('❌ Something went wrong');

    Object.setPrototypeOf(this, InternalError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Something went wrong, please try again later' }];
  }
}
