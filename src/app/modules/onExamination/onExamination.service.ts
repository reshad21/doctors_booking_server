/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';

const createOnExamination = async (payload: {title: string,value:string}) => {
  return prisma.onExaminationsInput.create({ data: payload });
};

const getAllOnExaminations = async (query: Record<string, any>) => {
  const onExaminationQueryInput = builderQuery({
    searchFields: ['title'],
    searchTerm: query.searchTerm,
    filter: query.filter ? JSON.parse(query.filter) : {},
    orderBy: query.orderBy ? JSON.parse(query.orderBy) : {},
    page: query.page,
    limit: query.limit,
  });
  return prisma.onExaminationsInput.findMany({
    where: onExaminationQueryInput.where,
  });
};

const getOnExaminationById = async (id: string) => {
  return prisma.onExaminationsInput.findUnique({ where: { id } });
};

const updateOnExamination = async (id: string, payload: any) => {
  return prisma.onExaminationsInput.update({ where: { id }, data: payload });
};

const deleteOnExamination = async (id: string) => {
  return prisma.onExaminationsInput.delete({ where: { id } });
};

export const OnExaminationService = {
  createOnExamination,
  getAllOnExaminations,
  getOnExaminationById,
  updateOnExamination,
  deleteOnExamination,
};