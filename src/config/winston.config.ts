import { LoggerOptions, format, transports } from 'winston';

export const WinstonConfig: LoggerOptions = {
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
  ],
};
