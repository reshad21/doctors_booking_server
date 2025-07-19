import { Status } from '@prisma/client';
import prisma from '../../../db/db.config';
import AppError from '../../errors/AppError';
import { TLogin } from '../../types/auth.type';
import { TStaff } from '../../types/staff.type';
import bcrypt from 'bcryptjs';
import { UserType } from '../../context/userType';
import { generateToken } from '../../utils/tokenGenerator';
import configs from '../../configs';
import bcryptjs from 'bcryptjs';

const createStaffIntoDB = async (payload: TStaff) => {
  const existingStaff = await prisma.staff.findFirst();

  if (existingStaff) {
    throw new AppError(404, 'Staff is already created');
  }

  const doctor = await prisma.doctor.findUnique({
    where: { id: payload?.doctorId },
    select: {
      id: true,
      routeAccess: true,
    },
  });

  if (!doctor) {
    throw new AppError(404, 'Doctor not Found');
  }

  const transformedRouteAccess = doctor.routeAccess.map((route) => ({
    path: route.path,
    name: route.name,
    allowed: route.allowed,
  }));
  const password = await bcryptjs.hash(`${payload.password}`, 10);
  const response = await prisma.staff.create({
    data: {
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      image: payload.image,
      password:password,
      doctorId:payload.doctorId,
      routeAccess: {
        create: transformedRouteAccess,
      },
    },
  });

  return response;
};
const updateStaffIntoDB = async (payload: Partial<TStaff>) => {
   const id = payload?.id;

  if (!id) {
    throw new AppError(400, 'Staff id is required');
  }
  const existingStaff = await prisma.staff.findUnique({
    where: { id },
  });

  if (!existingStaff) {
    throw new AppError(404, 'Staff not found');
  }

  const updateData: any = {
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    image: payload.image,
  };

  // If password is being updated, hash it
  if (payload?.password) {
    updateData.password = await bcryptjs.hash(payload.password, 10);
  }

  const updatedStaff = await prisma.staff.update({
    where: { id },
    data: updateData,
  });

  return updatedStaff;
};

const deleteStaffIntoDB = async (id: string) => {
  const response = await prisma.staff.delete({
    where: { id },
  });
  return response;
};
const getStaffIntoDB = async () => {
  const response = await prisma.staff.findMany();
  if (response == null) {
    throw new AppError(404, 'Staff not Found');
  }
  return response;
};

const loginIntoDB = async (payload: TLogin) => {
  const existingStaff = await prisma.staff.findFirst({
    where: {
      email: payload.email,
    },
  });

  if (!existingStaff) {
    throw new AppError(404, 'Staff user not found with this email');
  }

  if (existingStaff.status === Status.INACTIVE) {
    throw new AppError(403, 'Staff user is inactive. Please contact support.');
  }

  const isPasswordMatch = await bcrypt.compare(
    payload.password as string,
    existingStaff.password as string,
  );

  if (!isPasswordMatch) {
    throw new AppError(401, 'Password is incorrect');
  }

  const jwtPayload = {
    id: existingStaff.id,
    email: existingStaff.email,
    name: existingStaff.name,
    status: existingStaff.status,
    profilePhoto: existingStaff.image,
    type: UserType.STAFF,
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

export const StaffServices = {
  createStaffIntoDB,
  updateStaffIntoDB,
  getStaffIntoDB,
  deleteStaffIntoDB,
  loginIntoDB,
};
