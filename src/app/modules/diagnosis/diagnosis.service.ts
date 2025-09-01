/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';

const createDiagnosis = async (payload: {title: string,value:string}) => {
  return prisma.diagnosisInput.create({ data: payload });
};

const getAllDiagnoses = async (query: Record<string, any>) => {
  const diagnosisQuery = builderQuery({
    searchFields: ['description'],
    searchTerm: query.searchTerm,
    filter: query.filter ? JSON.parse(query.filter) : {},
    orderBy: query.orderBy ? JSON.parse(query.orderBy) : {},
    page: query.page,
    limit: query.limit,
  });
  return prisma.diagnosisInput.findMany({
    where: diagnosisQuery.where,
  });
};

const getDiagnosisById = async (id: string) => {
  return prisma.diagnosisInput.findUnique({ where: { id } });
};

const updateDiagnosis = async (id: string, payload: {title: string,value:string}) => {
  return prisma.diagnosisInput.update({ where: { id }, data: payload });
};

const deleteDiagnosis = async (id: string) => {
  return prisma.diagnosisInput.delete({ where: { id } });
};

export const DiagnosisService = {
  createDiagnosis,
  getAllDiagnoses,
  getDiagnosisById,
  updateDiagnosis,
  deleteDiagnosis,
};