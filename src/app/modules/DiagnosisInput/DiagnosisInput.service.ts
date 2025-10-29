import { DiagnosisInput } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';

const createDiagnosisInputIntoBD = async (payload: DiagnosisInput) => {
  return prisma.diagnosisInput.create({ data: payload });
};

const getAllDiagnosisInputsFromDB = async (query: Record<string, any>) => {
  const diagnosisInputQuery = builderQuery({
    searchFields: ['value'],
    searchTerm: query.searchTerm,
    filter: query.filter ? JSON.parse(query.filter) : {},
    orderBy: query.orderBy ? JSON.parse(query.orderBy) : {},
    page: query.page,
    limit: query.limit,
  });

  const totalItems = await prisma.diagnosisInput.count({
    where: diagnosisInputQuery.where,
  });

  const totalPages = Math.ceil(totalItems / diagnosisInputQuery.take);
  const currentPage = Number(query.page) || 1;

  const data = await prisma.diagnosisInput.findMany({
    ...diagnosisInputQuery,
  });

  return {
    meta: {
      totalItems,
      totalPages,
      currentPage,
    },
    data,
  };
};

const updateDiagnosisInputIntoDB = async (
  id: string,
  payload: Partial<DiagnosisInput>,
) => {
  return prisma.diagnosisInput.update({ where: { id }, data: payload });
};

const getDiagnosisInputByIdFromDB = async (id: string) => {
  return prisma.diagnosisInput.findUnique({
    where: { id },
    include: { doctor: true },
  });
};

const deleteDiagnosisInputFromDB = async (id: string) => {
  return prisma.diagnosisInput.delete({ where: { id } });
};

export const DiagnosisInputService = {
  createDiagnosisInputIntoBD,
  getAllDiagnosisInputsFromDB,
  getDiagnosisInputByIdFromDB,
  updateDiagnosisInputIntoDB,
  deleteDiagnosisInputFromDB,
};
