import * as bcrypt from 'bcrypt';
import { Config } from '../../config/config';

export const hash = async (plainPassword: string, salt: string): Promise<string> => {
  return await bcrypt.hash(plainPassword + salt + Config.JWT.JWT_SECRET_KEY, 10);
};

export const compare = async (
  plainPassword: string,
  salt: string,
  encryptedPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(
    plainPassword + salt + Config.JWT.JWT_SECRET_KEY,
    encryptedPassword,
  );
};
