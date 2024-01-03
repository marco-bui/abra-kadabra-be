import * as dotenv from 'dotenv';

dotenv.config();

export const Config = {
  ENVIRONMENT: process.env.ENVIRONMENT,
  PORT: process.env.PORT,
};
