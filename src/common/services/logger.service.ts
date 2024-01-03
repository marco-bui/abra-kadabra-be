import { Injectable } from '@nestjs/common';
import { Logger } from 'winston';
import * as winston from 'winston';
import { WinstonConfig } from '../config/winston.config';

@Injectable()
export class LoggerService {
  private readonly logger: Logger;

  constructor() {
    this.logger = winston.createLogger(WinstonConfig);
  }

  infor(message: string) {
    this.logger.log({ level: 'info', message });
  }

  debug(message: string) {
    this.logger.log({ level: 'debug', message });
  }

  warn(message: string) {
    this.logger.log({ level: 'warn', message });
  }

  error(message: string) {
    this.logger.log({ level: 'error', message });
  }
}
