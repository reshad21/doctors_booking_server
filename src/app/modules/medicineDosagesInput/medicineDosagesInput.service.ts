/* eslint-disable @typescript-eslint/no-explicit-any */
import { MedicineDosagesInput } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';
import { User } from '../../types/user.type';
import { getDoctorIdForUser } from '../../utils/getDoctorId';

const createMedicineDosagesInput = async (
  payload: MedicineDosagesInput,
  user: User,
) => {
  const doctorId = await getDoctorIdForUser(user);
  const medicineDosagesPayload = { ...payload, doctorId };
  return prisma.medicineDosagesInput.create({ data: medicineDosagesPayload });
};

const getAllMedicineDosagesInputs = async (
  query: Record<string, any>,
  user: User,
) => {
  const doctorId = await getDoctorIdForUser(user);

  const medicineDosagesInputQuery = builderQuery({
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
  return prisma.medicineDosagesInput.findMany({
    where: medicineDosagesInputQuery.where,
  });
};

const getMedicineDosagesInputById = async (id: string) => {
  return prisma.medicineDosagesInput.findUnique({ where: { id } });
};

const updateMedicineDosagesInput = async (
  id: string,
  payload: MedicineDosagesInput,
) => {
  return prisma.medicineDosagesInput.update({ where: { id }, data: payload });
};

const deleteMedicineDosagesInput = async (id: string) => {
  return prisma.medicineDosagesInput.delete({ where: { id } });
};

export const MedicineDosagesInputService = {
  createMedicineDosagesInput,
  getAllMedicineDosagesInputs,
  getMedicineDosagesInputById,
  updateMedicineDosagesInput,
  deleteMedicineDosagesInput,
};
