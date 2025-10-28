import { OnExaminationsInput } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';

const createOnExaminationsInputIntoBD = async (
  payload: OnExaminationsInput,
) => {
  return prisma.onExaminationsInput.create({ data: payload });
};

const getAllOnExaminationsInputsFromDB = async (query: Record<string, any>) => {
  const onExaminationsInputQuery = builderQuery({
    searchFields: ['value'],
    searchTerm: query.searchTerm,
    filter: query.filter ? JSON.parse(query.filter) : {},
    orderBy: query.orderBy ? JSON.parse(query.orderBy) : {},
    page: query.page,
    limit: query.limit,
  });

  const totalItems = await prisma.onExaminationsInput.count({
    where: onExaminationsInputQuery.where,
  });

  const totalPages = Math.ceil(totalItems / onExaminationsInputQuery.take);
  const currentPage = Number(query.page) || 1;

  const data = await prisma.onExaminationsInput.findMany({
    ...onExaminationsInputQuery,
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

const updateOnExaminationsInputIntoDB = async (
  id: string,
  payload: Partial<OnExaminationsInput>,
) => {
  return prisma.onExaminationsInput.update({ where: { id }, data: payload });
};

const getOnExaminationsInputByIdFromDB = async (id: string) => {
  return prisma.onExaminationsInput.findUnique({
    where: { id },
    include: { doctor: true },
  });
};

const deleteOnExaminationsInputFromDB = async (id: string) => {
  return prisma.onExaminationsInput.delete({ where: { id } });
};

export const OnExaminationsInputService = {
  createOnExaminationsInputIntoBD,
  getAllOnExaminationsInputsFromDB,
  getOnExaminationsInputByIdFromDB,
  updateOnExaminationsInputIntoDB,
  deleteOnExaminationsInputFromDB,
};
