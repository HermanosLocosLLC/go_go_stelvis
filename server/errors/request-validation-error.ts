import { CustomError } from './custom-error';
import { ValidationError } from './validation-error';

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super('❌ Request Validation Failed');

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.param };
    });
  }
}
