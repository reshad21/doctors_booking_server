import prisma from '../../../db/db.config';
import bcrypt from 'bcryptjs';
import AppError from '../../errors/AppError';
import configs from '../../configs';
import { Status } from '@prisma/client';
import { generateToken } from '../../utils/tokenGenerator';
import { TLogin } from '../../types/auth.type';
import { UserType } from '../../context/userType';

const loginIntoDB = async (payload: TLogin) => {
  const existingAdmin = await prisma.doctor.findFirst({
    where: {
      email: payload.email,
    },
  });

  if (!existingAdmin) {
    throw new AppError(404, 'Admin user not found with this email');
  }

  if (existingAdmin.status === Status.INACTIVE) {
    throw new AppError(403, 'Admin user is inactive. Please contact support.');
  }

  const isPasswordMatch = await bcrypt.compare(
    payload.password as string,
    existingAdmin.password as string,
  );

  if (!isPasswordMatch) {
    throw new AppError(401, 'Password is incorrect');
  }

  const jwtPayload = {
    id: existingAdmin.id,
    email: existingAdmin.email,
    name: existingAdmin.name,
    status: existingAdmin.status,
    profilePhoto: existingAdmin.image,
    type: UserType.DOCTOR,
  };

  const accessToken = generateToken(
    jwtPayload,
    configs.jwtSecret as string,
    configs.jwtExpiresIn as string,
  );
  return {
    accessToken,
  };
};

export const AuthServices = {
  loginIntoDB,
};
