import { AdviceInput } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';

const createAdviceInputIntoBD = async (payload: AdviceInput) => {
  return prisma.adviceInput.create({ data: payload });
};

const getAllAdviceInputsFromDB = async (query: Record<string, any>) => {
  const adviceInputQuery = builderQuery({
    searchFields: ['value'],
    searchTerm: query.searchTerm,
    filter: query.filter ? JSON.parse(query.filter) : {},
    orderBy: query.orderBy ? JSON.parse(query.orderBy) : {},
    page: query.page,
    limit: query.limit,
  });

  const totalItems = await prisma.adviceInput.count({
    where: adviceInputQuery.where,
  });

  const totalPages = Math.ceil(totalItems / adviceInputQuery.take);
  const currentPage = Number(query.page) || 1;

  const data = await prisma.adviceInput.findMany({
    ...adviceInputQuery,
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

const updateAdviceInputIntoDB = async (
  id: string,
  payload: Partial<AdviceInput>,
) => {
  return prisma.adviceInput.update({ where: { id }, data: payload });
};

const getAdviceInputByIdFromDB = async (id: string) => {
  return prisma.adviceInput.findUnique({
    where: { id },
    include: { doctor: true },
  });
};

const deleteAdviceInputFromDB = async (id: string) => {
  return prisma.adviceInput.delete({ where: { id } });
};

export const AdviceInputService = {
  createAdviceInputIntoBD,
  getAllAdviceInputsFromDB,
  getAdviceInputByIdFromDB,
  updateAdviceInputIntoDB,
  deleteAdviceInputFromDB,
};
