import { HttpException, HttpStatus } from '@nestjs/common';

export interface IValidationError {
  field: string;
  rule: string;
  message: string;
}

export class FieldValidationException extends HttpException {
  constructor(message: string, errors: IValidationError[]) {
    super(
      {
        message,
        errors,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
