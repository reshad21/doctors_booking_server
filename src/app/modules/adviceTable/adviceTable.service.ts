/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from '../../../db/db.config';

const createAdvice = async (payload: any) => {
  console.log(payload);
  
  return prisma.adviceTable.create({ data: payload });
};

const getAllAdvices = async () => {
  return prisma.adviceTable.findMany();
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