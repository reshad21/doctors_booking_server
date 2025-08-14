import prisma from '../../db/db.config';
import { UserType } from '../context/userType';
import { User } from '../types/user.type';

export const getDoctorIdForUser = async (user: User): Promise<string> => {
  if (user.type === UserType.DOCTOR) return user.id;

  const staffRecord = await prisma.staff.findUnique({
    where: { id: user.id },
    select: { doctorId: true },
  });

  if (!staffRecord?.doctorId) {
    throw new Error('Staff member is not assigned to a doctor.');
  }

  return staffRecord.doctorId;
};
