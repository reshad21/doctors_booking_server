/* eslint-disable @typescript-eslint/no-explicit-any */
import { OnExaminations } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';

const createOnExamination = async (payload: OnExaminations) => {
  return prisma.onExaminations.create({ data: payload });
};

const getAllOnExaminations = async (query: Record<string, any>) => {
  const onExaminationQuery = builderQuery({
    searchFields: ['description'],
    searchTerm: query.searchTerm,
    filter: query.filter ? JSON.parse(query.filter) : {},
    orderBy: query.orderBy ? JSON.parse(query.orderBy) : {},
    page: query.page,
    limit: query.limit,
  });
  return prisma.onExaminations.findMany({
    where: onExaminationQuery.where,
  });
};

const getOnExaminationById = async (id: string) => {
  return prisma.onExaminations.findUnique({ where: { id } });
};

const updateOnExamination = async (id: string, payload: any) => {
  return prisma.onExaminations.update({ where: { id }, data: payload });
};

const deleteOnExamination = async (id: string) => {
  return prisma.onExaminations.delete({ where: { id } });
};

export const OnExaminationService = {
  createOnExamination,
  getAllOnExaminations,
  getOnExaminationById,
  updateOnExamination,
  deleteOnExamination,
};