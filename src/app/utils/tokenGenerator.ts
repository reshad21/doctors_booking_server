
import jwt, { SignOptions } from 'jsonwebtoken';
import { TJwtPayload } from '../types/auth.type';

export const generateToken = (
  jwtPayload: TJwtPayload,
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, { expiresIn: expiresIn } as SignOptions);
};