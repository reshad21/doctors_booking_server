import { InvestigationInput } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';

const createInvestigationInputIntoBD = async (payload: InvestigationInput) => {
  return prisma.investigationInput.create({ data: payload });
};

const getAllInvestigationInputsFromDB = async (query: Record<string, any>) => {
  const investigationInputQuery = builderQuery({
    searchFields: ['value'],
    searchTerm: query.searchTerm,
    filter: query.filter ? JSON.parse(query.filter) : {},
    orderBy: query.orderBy ? JSON.parse(query.orderBy) : {},
    page: query.page,
    limit: query.limit,
  });

  const totalItems = await prisma.investigationInput.count({
    where: investigationInputQuery.where,
  });

  const totalPages = Math.ceil(totalItems / investigationInputQuery.take);
  const currentPage = Number(query.page) || 1;

  const data = await prisma.investigationInput.findMany({
    ...investigationInputQuery,
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

const updateInvestigationInputIntoDB = async (
  id: string,
  payload: Partial<InvestigationInput>,
) => {
  return prisma.investigationInput.update({ where: { id }, data: payload });
};

const getInvestigationInputByIdFromDB = async (id: string) => {
  return prisma.investigationInput.findUnique({
    where: { id },
    include: { doctor: true },
  });
};

const deleteInvestigationInputFromDB = async (id: string) => {
  return prisma.investigationInput.delete({ where: { id } });
};

export const InvestigationInputService = {
  createInvestigationInputIntoBD,
  getAllInvestigationInputsFromDB,
  getInvestigationInputByIdFromDB,
  updateInvestigationInputIntoDB,
  deleteInvestigationInputFromDB,
};
