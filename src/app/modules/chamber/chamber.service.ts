/* eslint-disable @typescript-eslint/no-explicit-any */
import { Chamber } from '@prisma/client';
import prisma from '../../../db/db.config';
import { UserType } from '../../context/userType';
import { builderQuery } from '../../builders/prismaBuilderQuery';
import { User } from '../../types/user.type';
import { getDoctorIdForUser } from '../../utils/getDoctorId';

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
    throw new Error('Doctor ID is required to create a chamber');
  }

  const chamberPayload = { ...payload, doctorId };
  return prisma.chamber.create({ data: chamberPayload });
};

const getAllChambers = async (query: Record<string, any>, user: User) => {
  const doctorId = await getDoctorIdForUser(user);

  const chamberQuery = builderQuery({
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

  return prisma.chamber.findMany({
    where: chamberQuery.where,
  });
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
