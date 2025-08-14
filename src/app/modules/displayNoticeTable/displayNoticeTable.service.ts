/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';
import { UserType } from '../../context/userType';
import { User } from '../../types/user.type';
import { getDoctorIdForUser } from '../../utils/getDoctorId';

const createDisplayNotice = async (payload: any, user: User) => {
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
    throw new Error('Doctor ID is required to create a chamber');
  }

  const noticePayload = { ...payload, doctorId };
  return prisma.displayNoticeTable.create({ data: noticePayload });
};

const getAllDisplayNotices = async (query: Record<string, any>, user: User) => {
  const doctorId = await getDoctorIdForUser(user);

  const noticeQuery = builderQuery({
    searchFields: ['name'],
    searchTerm: query.searchTerm,
    filter: {
      doctorId,
      ...(query.filter ? JSON.parse(query.filter) : {}),
    },
    orderBy: query.orderBy ? JSON.parse(query.orderBy) : {},
    page: query.page,
    limit: query.limit,
  });

  return prisma.displayNoticeTable.findMany({
    where: noticeQuery.where,
  });
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
