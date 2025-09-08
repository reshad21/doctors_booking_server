/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChiefComplaintInput } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';
import { UserType } from '../../context/userType';
import { User } from '../../types/user.type';
import { getDoctorIdForUser } from '../../utils/getDoctorId';

const createChiefComplaint = async (
  payload: ChiefComplaintInput,
  user: User,
) => {
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

  const chiefComplaintPayload = { ...payload, doctorId };

  return prisma.chiefComplaintInput.create({ data: chiefComplaintPayload });
};

const getAllChiefComplaints = async (
  query: Record<string, any>,
  user: User,
) => {
  const doctorId = await getDoctorIdForUser(user);

  const chiefComplaintQuery = builderQuery({
    searchFields: ['description'],
    searchTerm: query.searchTerm,
    filter: {
      doctorId,
      ...(query.filter ? JSON.parse(query.filter) : {}),
    },
    orderBy: query.orderBy ? JSON.parse(query.orderBy) : {},
    page: query.page,
    limit: query.limit,
  });
  return prisma.chiefComplaintInput.findMany({
    where: chiefComplaintQuery.where,
  });
};

const getChiefComplaintById = async (id: string) => {
  return prisma.chiefComplaintInput.findUnique({ where: { id } });
};

const updateChiefComplaint = async (
  id: string,
  payload: { title: string; value: string },
) => {
  return prisma.chiefComplaintInput.update({ where: { id }, data: payload });
};

const deleteChiefComplaint = async (id: string) => {
  return prisma.chiefComplaintInput.delete({ where: { id } });
};

export const ChiefComplaintService = {
  createChiefComplaint,
  getAllChiefComplaints,
  getChiefComplaintById,
  updateChiefComplaint,
  deleteChiefComplaint,
};
