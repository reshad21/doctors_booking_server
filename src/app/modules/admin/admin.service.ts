import { JwtPayload } from 'jsonwebtoken';
import prisma from '../../../db/db.config';
import { UserType } from '../../context/userType';

const getAdminUserById = async (loggedUser: JwtPayload) => {
  if (loggedUser.type ===  UserType.DOCTOR) {
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

export const AdminService = {
  getAdminUserById,
};
