/* eslint-disable @typescript-eslint/no-explicit-any */
import { HistoryInput } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';

const createHistoryInputIntoBD = async (payload: HistoryInput) => {
  return prisma.historyInput.create({ data: payload });
};

const getAllHistoryInputsFromDB = async (query: Record<string, any>) => {
  const historyInputQuery = builderQuery({
    searchFields: ['value'],
    searchTerm: query.searchTerm,
    filter: query.filter ? JSON.parse(query.filter) : {},
    orderBy: query.orderBy ? JSON.parse(query.orderBy) : {},
    page: query.page,
    limit: query.limit,
  });

  const totalItems = await prisma.historyInput.count({
    where: historyInputQuery.where,
  });

  const totalPages = Math.ceil(totalItems / historyInputQuery.take);
  const currentPage = Number(query.page) || 1;

  const data = await prisma.historyInput.findMany({
    ...historyInputQuery,
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

const updateHistoryInputIntoDB = async (
  id: string,
  payload: Partial<HistoryInput>,
) => {
  return prisma.historyInput.update({ where: { id }, data: payload });
};

const getHistoryInputByIdFromDB = async (id: string) => {
  return prisma.historyInput.findUnique({
    where: { id },
    include: { doctor: true },
  });
};

const deleteHistoryInputFromDB = async (id: string) => {
  return prisma.historyInput.delete({ where: { id } });
};

export const HistoryInputService = {
  createHistoryInputIntoBD,
  getAllHistoryInputsFromDB,
  getHistoryInputByIdFromDB,
  updateHistoryInputIntoDB,
  deleteHistoryInputFromDB,
};
