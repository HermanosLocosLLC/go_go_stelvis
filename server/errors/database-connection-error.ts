import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;

  constructor() {
    super('❌ Error connecting to the database');

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Something went wrong, please try again later' }];
  }
}
