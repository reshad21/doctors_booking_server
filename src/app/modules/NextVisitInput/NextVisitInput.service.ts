import { NextVisitInput } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';

const createNextVisitInputIntoBD = async (payload: NextVisitInput) => {
  return prisma.nextVisitInput.create({ data: payload });
};

const getAllNextVisitInputsFromDB = async (query: Record<string, any>) => {
  const nextVisitInputQuery = builderQuery({
    searchFields: ['value'],
    searchTerm: query.searchTerm,
    filter: query.filter ? JSON.parse(query.filter) : {},
    orderBy: query.orderBy ? JSON.parse(query.orderBy) : {},
    page: query.page,
    limit: query.limit,
  });

  const totalItems = await prisma.nextVisitInput.count({
    where: nextVisitInputQuery.where,
  });

  const totalPages = Math.ceil(totalItems / nextVisitInputQuery.take);
  const currentPage = Number(query.page) || 1;

  const data = await prisma.nextVisitInput.findMany({
    ...nextVisitInputQuery,
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

const updateNextVisitInputIntoDB = async (
  id: string,
  payload: Partial<NextVisitInput>,
) => {
  return prisma.nextVisitInput.update({ where: { id }, data: payload });
};

const getNextVisitInputByIdFromDB = async (id: string) => {
  return prisma.nextVisitInput.findUnique({
    where: { id },
    include: { doctor: true },
  });
};

const deleteNextVisitInputFromDB = async (id: string) => {
  return prisma.nextVisitInput.delete({ where: { id } });
};

export const NextVisitInputService = {
  createNextVisitInputIntoBD,
  getAllNextVisitInputsFromDB,
  getNextVisitInputByIdFromDB,
  updateNextVisitInputIntoDB,
  deleteNextVisitInputFromDB,
};
