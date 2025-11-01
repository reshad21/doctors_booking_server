import { CoMorbiditiesInput } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';

const createCoMorbiditiesInputIntoBD = async (payload: CoMorbiditiesInput) => {
  return prisma.coMorbiditiesInput.create({ data: payload });
};

const getAllCoMorbiditiesInputsFromDB = async (query: Record<string, any>) => {
  const coMorbiditiesInputQuery = builderQuery({
    searchFields: ['value'],
    searchTerm: query.searchTerm,
    filter: query.filter ? JSON.parse(query.filter) : {},
    orderBy: query.orderBy ? JSON.parse(query.orderBy) : {},
    page: query.page,
    limit: query.limit,
  });

  const totalItems = await prisma.coMorbiditiesInput.count({
    where: coMorbiditiesInputQuery.where,
  });

  const totalPages = Math.ceil(totalItems / coMorbiditiesInputQuery.take);
  const currentPage = Number(query.page) || 1;

  const data = await prisma.coMorbiditiesInput.findMany({
    ...coMorbiditiesInputQuery,
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

const updateCoMorbiditiesInputIntoDB = async (
  id: string,
  payload: Partial<CoMorbiditiesInput>,
) => {
  return prisma.coMorbiditiesInput.update({ where: { id }, data: payload });
};

const getCoMorbiditiesInputByIdFromDB = async (id: string) => {
  return prisma.coMorbiditiesInput.findUnique({
    where: { id },
    include: { doctor: true },
  });
};

const deleteCoMorbiditiesInputFromDB = async (id: string) => {
  return prisma.coMorbiditiesInput.delete({ where: { id } });
};

export const CoMorbiditiesInputService = {
  createCoMorbiditiesInputIntoBD,
  getAllCoMorbiditiesInputsFromDB,
  getCoMorbiditiesInputByIdFromDB,
  updateCoMorbiditiesInputIntoDB,
  deleteCoMorbiditiesInputFromDB,
};

