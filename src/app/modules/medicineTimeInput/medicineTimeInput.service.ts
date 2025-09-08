/* eslint-disable @typescript-eslint/no-explicit-any */
import { MedicineTimeInput } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';
import { getDoctorIdForUser } from '../../utils/getDoctorId';
import { User } from '../../types/user.type';

const createMedicineTimeInput = async (
  payload: MedicineTimeInput,
  user: User,
) => {
  const doctorId = await getDoctorIdForUser(user);
  const medicineTimePayload = { ...payload, doctorId };
  return prisma.medicineTimeInput.create({ data: medicineTimePayload });
};

const getAllMedicineTimeInputs = async (
  query: Record<string, any>,
  user: User,
) => {
  const doctorId = await getDoctorIdForUser(user);
  const medicineTimeInputQuery = builderQuery({
    searchFields: ['value'],
    searchTerm: query.searchTerm,
    filter: {
      doctorId,
      ...(query.filter ? JSON.parse(query.filter) : {}),
    },
    orderBy: query.orderBy ? JSON.parse(query.orderBy) : {},
    page: query.page,
    limit: query.limit,
  });
  return prisma.medicineTimeInput.findMany({
    where: medicineTimeInputQuery.where,
  });
};

const getMedicineTimeInputById = async (id: string) => {
  return prisma.medicineTimeInput.findUnique({ where: { id } });
};

const updateMedicineTimeInput = async (
  id: string,
  payload: MedicineTimeInput,
) => {
  return prisma.medicineTimeInput.update({ where: { id }, data: payload });
};

const deleteMedicineTimeInput = async (id: string) => {
  return prisma.medicineTimeInput.delete({ where: { id } });
};

export const MedicineTimeInputService = {
  createMedicineTimeInput,
  getAllMedicineTimeInputs,
  getMedicineTimeInputById,
  updateMedicineTimeInput,
  deleteMedicineTimeInput,
};
