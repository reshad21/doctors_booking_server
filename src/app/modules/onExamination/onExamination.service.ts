/* eslint-disable @typescript-eslint/no-explicit-any */
import { OnExaminationsInput } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';
import { getDoctorIdForUser } from '../../utils/getDoctorId';
import { User } from '../../types/user.type';

const createOnExamination = async (
  payload: OnExaminationsInput,
  user: User,
) => {
  const doctorId = await getDoctorIdForUser(user);
  const onExaminationPayload = { ...payload, doctorId };
  return prisma.onExaminationsInput.create({ data: onExaminationPayload });
};

const getAllOnExaminations = async (query: Record<string, any>, user: User) => {
  const doctorId = await getDoctorIdForUser(user);
  const onExaminationQueryInput = builderQuery({
    searchFields: ['title'],
    searchTerm: query.searchTerm,
    filter: {
      doctorId,
      ...(query.filter ? JSON.parse(query.filter) : {}),
    },
    orderBy: query.orderBy ? JSON.parse(query.orderBy) : {},
    page: query.page,
    limit: query.limit,
  });
  return prisma.onExaminationsInput.findMany({
    where: onExaminationQueryInput.where,
  });
};

const getOnExaminationById = async (id: string) => {
  return prisma.onExaminationsInput.findUnique({ where: { id } });
};

const updateOnExamination = async (id: string, payload: any) => {
  return prisma.onExaminationsInput.update({ where: { id }, data: payload });
};

const deleteOnExamination = async (id: string) => {
  return prisma.onExaminationsInput.delete({ where: { id } });
};

export const OnExaminationService = {
  createOnExamination,
  getAllOnExaminations,
  getOnExaminationById,
  updateOnExamination,
  deleteOnExamination,
};
