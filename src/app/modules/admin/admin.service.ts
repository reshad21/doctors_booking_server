import { JwtPayload } from 'jsonwebtoken';
import prisma from '../../../db/db.config';
import { UserType } from '../../context/userType';
import AppError from '../../errors/AppError';
import bcryptjs from 'bcryptjs';

const getAdminUserById = async (loggedUser: JwtPayload) => {
  if (loggedUser.type === UserType.DOCTOR) {
    return await prisma.doctor.findFirst({
      where: { id: loggedUser.id },
      include: { routeAccess: true },
    });
  }

  if (loggedUser.type === UserType.STAFF) {
    return await prisma.staff.findFirst({
      where: { id: loggedUser.id },
      include: { routeAccess: true },
    });
  }

  throw new Error('Invalid user type');
};
const updateAdminPassById = async (payload: {
  password: string;
  oldPassword:string
  id: string;
}) => {
  const adminExists = await prisma.doctor.findUnique({
    where: {
      id: payload?.id,
    },
  });
  if (!adminExists) {
    throw new AppError(401, 'Invalid Doctor Id');
  }

  const isPasswordMatch = bcryptjs.compareSync(
    payload.oldPassword,
    adminExists.password,
  );
  if (!isPasswordMatch) {
    throw new AppError(401, 'Invalid Old Password');
  }
  const password = await bcryptjs.hash(payload?.password ?? 'password', 10);
  const res = await prisma.doctor.update({
    where: {
      id: payload?.id,
    },
    data: {
      password: password,
    },
  });
  return res;
};

export const AdminService = {
  getAdminUserById,
  updateAdminPassById,
};
