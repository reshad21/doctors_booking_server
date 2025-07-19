import { Chamber } from '@prisma/client';
import prisma from '../../../db/db.config';
import { JwtPayload } from 'jsonwebtoken';
import { UserType } from '../../context/userType';

type User = JwtPayload & { id: string; type: string };

const createChamber = async (payload: Chamber, user: User) => {
  let doctorId;

  if (user?.type === UserType.DOCTOR) {
    doctorId = user.id;
  } else if (user?.type === UserType.STAFF) {
    const staff = await prisma.staff.findUnique({ where: { id: user.id } });
    if (!staff || !staff.doctorId) {
      throw new Error('Staff is not assigned to a doctor');
    }
    doctorId = staff.doctorId;
  }

  if (!doctorId) {
    throw new Error("doctorId must be defined");
  }

  console.log(payload, 'payload');
  return prisma.chamber.create({ data: { ...payload, doctorId } });
};

const getAllChambers = async () => {
  return prisma.chamber.findMany();
};

const getChamberById = async (id: string) => {
  return prisma.chamber.findUnique({ where: { id } });
};

const updateChamber = async (id: string, payload: Chamber) => {
  return prisma.chamber.update({ where: { id }, data: payload });
};

const deleteChamber = async (id: string) => {
  return prisma.chamber.delete({ where: { id } });
};

export const ChamberService = {
  createChamber,
  getAllChambers,
  getChamberById,
  updateChamber,
  deleteChamber,
};
