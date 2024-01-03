import { HttpStatus, Injectable } from '@nestjs/common';
import { ApiResponse } from './common/classes/api-response';
import { ApiMessage } from './common/constants/message';

@Injectable()
export class AppService {
  health(): ApiResponse<null> {
    return {
      status: HttpStatus.OK,
      data: null,
      pagination: null,
      message: ApiMessage.HEALTH,
    };
  }
}
