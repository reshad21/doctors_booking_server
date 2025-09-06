/* eslint-disable @typescript-eslint/no-explicit-any */
import { MedicineDosagesFrequencyNameInput } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';
import { User } from '../../types/user.type';
import { getDoctorIdForUser } from '../../utils/getDoctorId';

const createMedicineDosagesFrequencyNameInput = async (
  payload: MedicineDosagesFrequencyNameInput,
  user: User,
) => {
  const doctorId = await getDoctorIdForUser(user);
  const medicineDosagesFrequencyNamePayload = { ...payload, doctorId };
  return prisma.medicineDosagesFrequencyNameInput.create({ data: medicineDosagesFrequencyNamePayload });
};

const getAllMedicineDosagesFrequencyNameInputs = async (
  query: Record<string, any>,
  user: User,
) => {
  const doctorId = await getDoctorIdForUser(user);

  const medicineDosagesFrequencyNameInputQuery = builderQuery({
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
  return prisma.medicineDosagesFrequencyNameInput.findMany({
    where: medicineDosagesFrequencyNameInputQuery.where,
  });
};

const getMedicineDosagesFrequencyNameInputById = async (id: string) => {
  return prisma.medicineDosagesFrequencyNameInput.findUnique({ where: { id } });
};

const updateMedicineDosagesFrequencyNameInput = async (
  id: string,
  payload: MedicineDosagesFrequencyNameInput,
) => {
  return prisma.medicineDosagesFrequencyNameInput.update({ where: { id }, data: payload });
};

const deleteMedicineDosagesFrequencyNameInput = async (id: string) => {
  return prisma.medicineDosagesFrequencyNameInput.delete({ where: { id } });
};

export const MedicineDosagesFrequencyNameInputService = {
  createMedicineDosagesFrequencyNameInput,
  getAllMedicineDosagesFrequencyNameInputs,
  getMedicineDosagesFrequencyNameInputById,
  updateMedicineDosagesFrequencyNameInput,
  deleteMedicineDosagesFrequencyNameInput,
};
