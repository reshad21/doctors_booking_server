
// import jwt, { SignOptions } from 'jsonwebtoken';
// import { TJwtPayload } from '../types/auth.type';

// export const generateToken = (
//   jwtPayload: TJwtPayload,
//   secret: string,
//   expiresIn: string
// ) => {
//   return jwt.sign(jwtPayload, secret, { expiresIn: expiresIn } as SignOptions);
// };

import jwt, { SignOptions } from 'jsonwebtoken';
import { TJwtPayload } from '../types/auth.type';

export const generateToken = (
  jwtPayload: TJwtPayload,
) => {
// return jwt.sign(jwtPayload, secret, { expiresIn: expiresIn } as SignOptions);
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

return jwt.sign(jwtPayload, "b7e2d1f8c9a3e6d4f5b8a1c2e9d7f3b0c4a6e8d9f1b2c3a5", {
  expiresIn: EXPIRES_IN
} as SignOptions);

};