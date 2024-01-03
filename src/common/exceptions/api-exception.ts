import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from '../constants/error';

export class ApiException extends HttpException {
  data: any;

  constructor(
    status: HttpStatus,
    message: string | ErrorCode | Record<string, any>,
    data?: any,
  ) {
    super(message, status);
    this.data = data;
  }
}
