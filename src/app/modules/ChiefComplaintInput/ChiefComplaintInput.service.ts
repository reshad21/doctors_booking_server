import { ChiefComplaintInput } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';

const createChiefComplaintInputIntoBD = async (
  payload: ChiefComplaintInput,
) => {
  return prisma.chiefComplaintInput.create({ data: payload });
};

const getAllChiefComplaintInputsFromDB = async (query: Record<string, any>) => {
  const chiefComplaintInputQuery = builderQuery({
    searchFields: ['value'],
    searchTerm: query.searchTerm,
    filter: query.filter ? JSON.parse(query.filter) : {},
    orderBy: query.orderBy ? JSON.parse(query.orderBy) : {},
    page: query.page,
    limit: query.limit,
  });

  const totalItems = await prisma.chiefComplaintInput.count({
    where: chiefComplaintInputQuery.where,
  });

  const totalPages = Math.ceil(totalItems / chiefComplaintInputQuery.take);

  const currentPage = Number(query.page) || 1;

  const data = await prisma.chiefComplaintInput.findMany({
    ...chiefComplaintInputQuery,
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

const updateChiefComplaintInputIntoDB = async (
  id: string,
  payload: Partial<ChiefComplaintInput>,
) => {
  return prisma.chiefComplaintInput.update({ where: { id }, data: payload });
};

const getChiefComplaintInputByIdFromDB = async (id: string) => {
  return prisma.chiefComplaintInput.findUnique({
    where: { id },
    include: { doctor: true },
  });
};

const deleteChiefComplaintInputFromDB = async (id: string) => {
  return prisma.chiefComplaintInput.delete({ where: { id } });
};

export const ChiefComplaintInputService = {
  createChiefComplaintInputIntoBD,
  getAllChiefComplaintInputsFromDB,
  getChiefComplaintInputByIdFromDB,
  updateChiefComplaintInputIntoDB,
  deleteChiefComplaintInputFromDB,
};
