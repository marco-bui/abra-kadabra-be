import * as dotenv from 'dotenv';

dotenv.config();

export const Config = {
  ENVIRONMENT: process.env.ENVIRONMENT,
  PORT: process.env.PORT,
  JWT: {
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRED_TIME: 60 * 60 * 24 * 30,
  },
  DATABASE: {
    DATABASE_HOST: process.env.DATABASE_HOST || 'localhost',
    DATABASE_PORT: +process.env.DATABASE_PORT
      ? Number(+process.env.DATABASE_PORT)
      : +process.env.DATABASE_PORT || 5432,
    DATABASE_USER: process.env.DATABASE_USER || '',
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || '',
    DATABASE_NAME: process.env.DATABASE_NAME || 'alakazam',
  },
  CLOUDINARY: {
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_FOLDER: process.env.CLOUDINARY_FOLDER,
  },
};
