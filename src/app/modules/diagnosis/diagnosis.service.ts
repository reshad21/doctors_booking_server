/* eslint-disable @typescript-eslint/no-explicit-any */
import { DiagnosisInput } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';
import { User } from '../../types/user.type';
import { getDoctorIdForUser } from '../../utils/getDoctorId';

const createDiagnosis = async (payload: DiagnosisInput, user: User) => {
  const doctorId = await getDoctorIdForUser(user);
  const diagnosisPayload = { ...payload, doctorId };
  return prisma.diagnosisInput.create({ data: diagnosisPayload });
};

const getAllDiagnoses = async (query: Record<string, any>, user: User) => {
  const doctorId = await getDoctorIdForUser(user);
  const diagnosisQuery = builderQuery({
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
  return prisma.diagnosisInput.findMany({
    where: diagnosisQuery.where,
  });
};

const getDiagnosisById = async (id: string) => {
  return prisma.diagnosisInput.findUnique({ where: { id } });
};

const updateDiagnosis = async (
  id: string,
  payload: { title: string; value: string },
) => {
  return prisma.diagnosisInput.update({ where: { id }, data: payload });
};

const deleteDiagnosis = async (id: string) => {
  return prisma.diagnosisInput.delete({ where: { id } });
};

export const DiagnosisService = {
  createDiagnosis,
  getAllDiagnoses,
  getDiagnosisById,
  updateDiagnosis,
  deleteDiagnosis,
};
