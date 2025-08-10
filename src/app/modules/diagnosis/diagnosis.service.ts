/* eslint-disable @typescript-eslint/no-explicit-any */

import { Diagnosis } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';

const createDiagnosis = async (payload: Diagnosis) => {
  return prisma.diagnosis.create({ data: payload });
};

const getAllDiagnoses = async (query: Record<string, any>) => {
  const diagnosisQuery = builderQuery({
    searchFields: ['description'],
    searchTerm: query.searchTerm,
    filter: query.filter ? JSON.parse(query.filter) : {},
    orderBy: query.orderBy ? JSON.parse(query.orderBy) : {},
    page: query.page,
    limit: query.limit,
  });
  return prisma.diagnosis.findMany({
    where: diagnosisQuery.where,
  });
};

const getDiagnosisById = async (id: string) => {
  return prisma.diagnosis.findUnique({ where: { id } });
};

const updateDiagnosis = async (id: string, payload: Diagnosis) => {
  return prisma.diagnosis.update({ where: { id }, data: payload });
};

const deleteDiagnosis = async (id: string) => {
  return prisma.diagnosis.delete({ where: { id } });
};

export const DiagnosisService = {
  createDiagnosis,
  getAllDiagnoses,
  getDiagnosisById,
  updateDiagnosis,
  deleteDiagnosis,
};
// ... existing code ...