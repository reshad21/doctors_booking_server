import { JwtPayload } from 'jsonwebtoken';
import prisma from '../../../db/db.config';

const getAdminUserById = async (loggedUser: JwtPayload) => {
  const result = await prisma.doctor.findFirst({
    where: {
      id: loggedUser.id,
    },
    include: {
      routeAccess: true,
    },
  });

  return result;
};

export const AdminService = {
  getAdminUserById,
};
