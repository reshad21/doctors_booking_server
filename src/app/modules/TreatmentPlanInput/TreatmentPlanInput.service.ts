import { TreatmentPlanInput } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';

const createTreatmentPlanInputIntoBD = async (payload: TreatmentPlanInput) => {
  return prisma.treatmentPlanInput.create({ data: payload });
};

const getAllTreatmentPlanInputsFromDB = async (query: Record<string, any>) => {
  const treatmentPlanInputQuery = builderQuery({
    searchFields: ['value'],
    searchTerm: query.searchTerm,
    filter: query.filter ? JSON.parse(query.filter) : {},
    orderBy: query.orderBy ? JSON.parse(query.orderBy) : {},
    page: query.page,
    limit: query.limit,
  });

  const totalItems = await prisma.treatmentPlanInput.count({
    where: treatmentPlanInputQuery.where,
  });

  const totalPages = Math.ceil(totalItems / treatmentPlanInputQuery.take);
  const currentPage = Number(query.page) || 1;

  const data = await prisma.treatmentPlanInput.findMany({
    ...treatmentPlanInputQuery,
    include: { doctor: true },
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

const updateTreatmentPlanInputIntoDB = async (
  id: string,
  payload: Partial<TreatmentPlanInput>,
) => {
  return prisma.treatmentPlanInput.update({ where: { id }, data: payload });
};

const getTreatmentPlanInputByIdFromDB = async (id: string) => {
  return prisma.treatmentPlanInput.findUnique({
    where: { id },
    include: { doctor: true },
  });
};

const deleteTreatmentPlanInputFromDB = async (id: string) => {
  return prisma.treatmentPlanInput.delete({ where: { id } });
};

export const TreatmentPlanInputService = {
  createTreatmentPlanInputIntoBD,
  getAllTreatmentPlanInputsFromDB,
  getTreatmentPlanInputByIdFromDB,
  updateTreatmentPlanInputIntoDB,
  deleteTreatmentPlanInputFromDB,
};

