import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { ApiResponse } from './common/classes/api-response';

@Controller('common')
@ApiTags('Common')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  health(): ApiResponse<null> {
    return this.appService.health();
  }
}
