/* eslint-disable @typescript-eslint/no-explicit-any */
import { MedicineDosagesFrequencyDayInput } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';
import { User } from '../../types/user.type';
import { getDoctorIdForUser } from '../../utils/getDoctorId';

const createMedicineDosagesFrequencyDayInput = async (
  payload: MedicineDosagesFrequencyDayInput,
  user: User,
) => {
  const doctorId = await getDoctorIdForUser(user);
  const medicineDosagesFrequencyDayPayload = { ...payload, doctorId };
  return prisma.medicineDosagesFrequencyDayInput.create({ data: medicineDosagesFrequencyDayPayload });
};

const getAllMedicineDosagesFrequencyDayInputs = async (
  query: Record<string, any>,
  user: User,
) => {
  const doctorId = await getDoctorIdForUser(user);

  const medicineDosagesFrequencyDayInputQuery = builderQuery({
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
  return prisma.medicineDosagesFrequencyDayInput.findMany({
    where: medicineDosagesFrequencyDayInputQuery.where,
  });
};

const getMedicineDosagesFrequencyDayInputById = async (id: string) => {
  return prisma.medicineDosagesFrequencyDayInput.findUnique({ where: { id } });
};

const updateMedicineDosagesFrequencyDayInput = async (
  id: string,
  payload: MedicineDosagesFrequencyDayInput,
) => {
  return prisma.medicineDosagesFrequencyDayInput.update({ where: { id }, data: payload });
};

const deleteMedicineDosagesFrequencyDayInput = async (id: string) => {
  return prisma.medicineDosagesFrequencyDayInput.delete({ where: { id } });
};

export const MedicineDosagesFrequencyDayInputService = {
  createMedicineDosagesFrequencyDayInput,
  getAllMedicineDosagesFrequencyDayInputs,
  getMedicineDosagesFrequencyDayInputById,
  updateMedicineDosagesFrequencyDayInput,
  deleteMedicineDosagesFrequencyDayInput,
};
