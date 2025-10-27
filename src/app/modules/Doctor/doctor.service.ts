/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from '../../../db/db.config';
import bcrypt from 'bcryptjs';
import AppError from '../../errors/AppError';
import { Doctor, Status } from '@prisma/client';
import { generateToken } from '../../utils/tokenGenerator';
import { TLogin } from '../../types/auth.type';
import { UserType } from '../../context/userType';
import { routeAccess } from '../../context/routeAccess';

const loginIntoDB = async (payload: TLogin) => {
  const existingDoctor = await prisma.doctor.findFirst({
    where: {
      email: payload.email,
    },
  });

  if (!existingDoctor) {
    throw new AppError(404, 'Doctor user not found with this email');
  }

  if (existingDoctor.status === Status.INACTIVE) {
    throw new AppError(403, 'Doctor user is inactive. Please contact support.');
  }

  const isPasswordMatch = await bcrypt.compare(
    payload.password as string,
    existingDoctor.password as string,
  );

  if (!isPasswordMatch) {
    throw new AppError(401, 'Password is incorrect');
  }

  const jwtPayload = {
    id: existingDoctor.id,
    email: existingDoctor.email,
    name: existingDoctor.name,
    status: existingDoctor.status,
    profilePhoto: existingDoctor.image,
    type: UserType.DOCTOR,
  };

  const accessToken = generateToken(
    jwtPayload,
    // configs.jwtSecret as string || "b7e2d1f8c9a3e6d4f5b8a1c2e9d7f3b0c4a6e8d9f1b2c3a5",
    // configs.jwtExpiresIn as string || "10d",
  );
  return {
    accessToken,
  };
};

const updateDoctorDB = async (payload: any) => {
  const existingAdmin = await prisma.doctor.findFirst({
    where: {
      id: payload.id,
    },
  });

  if (!existingAdmin) {
    throw new AppError(404, 'Doctor not found with this email');
  }

  if (existingAdmin.status === Status.INACTIVE) {
    throw new AppError(403, 'Admin user is inactive. Please contact support.');
  }
  const res = await prisma.doctor.update({
    where: {
      id: payload.id,
    },
    data: {
      name: payload.name,
      image: payload.image,
    },
  });
  return res;
};

const createDoctorIntoDB = async (data: Doctor) => {
  const existing = await prisma.doctor.findUnique({
    where: { email: data.email },
  });

  if (existing) {
    throw new Error("Doctor already exists with this email");
  }

  const hashedPass = await bcrypt.hash(data.password, 10);

  const newDoctor = await prisma.doctor.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      image: data.image ?? "N/A",
      password: hashedPass,
      routeAccess: {
        create: routeAccess.map((route) => ({
          path: route.path,
          name: route.name,
          allowed: route.allowed ?? true,
        })),
      },
    },
  });

  return newDoctor;
}

export const AuthServices = {
  loginIntoDB,
  updateDoctorDB,
  createDoctorIntoDB,
};
