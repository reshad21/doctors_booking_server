/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';

const createInvestigation = async (payload: {title: string,value:string}) => {
  return prisma.investigationInput.create({ data: payload });
};

const getAllInvestigations = async (query: Record<string, any>) => {
  const investigationQuery = builderQuery({
    searchFields: ['description'],
    searchTerm: query.searchTerm,
    filter: query.filter ? JSON.parse(query.filter) : {},
    orderBy: query.orderBy ? JSON.parse(query.orderBy) : {},
    page: query.page,
    limit: query.limit,
  });
  return prisma.investigationInput.findMany({
    where: investigationQuery.where,
  });
};

const getInvestigationById = async (id: string) => {
  return prisma.investigationInput.findUnique({ where: { id } });
};

const updateInvestigation = async (id: string, payload: any) => {
  return prisma.investigationInput.update({ where: { id }, data: payload });
};

const deleteInvestigation = async (id: string) => {
  return prisma.investigationInput.delete({ where: { id } });
};

export const InvestigationService = {
  createInvestigation,
  getAllInvestigations,
  getInvestigationById,
  updateInvestigation,
  deleteInvestigation,
};
// ... existing code ...