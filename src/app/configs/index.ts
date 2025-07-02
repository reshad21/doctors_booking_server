import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(process.cwd(), '.env'),
});

export default {
  PORT: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_ExpiresIn,
  serverUrl: process.env.SERVER_URL,
  clientUrl: process.env.CLIENT_URL,
  adminEmail: process.env.ADMIN_EMAIL,
  adminPass: process.env.ADMIN_PASS,
  adminFullName: process.env.ADMIN_FULLNAME,
};
