/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from '../../../db/db.config';

const createDisplayNotice = async (payload: any) => {
  return prisma.displayNoticeTable.create({ data: payload });
};

const getAllDisplayNotices = async () => {
  return prisma.displayNoticeTable.findMany();
};

const getDisplayNoticeById = async (id: string) => {
  return prisma.displayNoticeTable.findUnique({ where: { id } });
};

const updateDisplayNotice = async (id: string, payload: any) => {
  return prisma.displayNoticeTable.update({ where: { id }, data: payload });
};

const deleteDisplayNotice = async (id: string) => {
  return prisma.displayNoticeTable.delete({ where: { id } });
};

export const DisplayNoticeTableService = {
  createDisplayNotice,
  getAllDisplayNotices,
  getDisplayNoticeById,
  updateDisplayNotice,
  deleteDisplayNotice,
};