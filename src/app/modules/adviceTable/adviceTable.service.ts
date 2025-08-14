/* eslint-disable @typescript-eslint/no-explicit-any */
import { AdviceTable } from '@prisma/client';
import prisma from '../../../db/db.config';
import { User } from '../../types/user.type';
import { getDoctorIdForUser } from '../../utils/getDoctorId';

const createAdvice = async (payload: AdviceTable) => {
  return prisma.adviceTable.create({ data: payload });
};

const getAllAdvices = async (user: User) => {
  const doctorId = await getDoctorIdForUser(user);
  return prisma.adviceTable.findMany({
    where: { doctorId },
  });
};

const getAdviceById = async (id: string) => {
  return prisma.adviceTable.findUnique({ where: { id } });
};

const updateAdvice = async (id: string, payload: any) => {
  return prisma.adviceTable.update({ where: { id }, data: payload });
};

const deleteAdvice = async (id: string) => {
  return prisma.adviceTable.delete({ where: { id } });
};

export const AdviceTableService = {
  createAdvice,
  getAllAdvices,
  getAdviceById,
  updateAdvice,
  deleteAdvice,
};
