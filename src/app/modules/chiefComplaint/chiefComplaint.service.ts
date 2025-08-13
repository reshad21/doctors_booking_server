/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';

const createChiefComplaint = async (payload:{title: string,value:string}) => {
  return prisma.chiefComplaintInput.create({ data: payload });
};

const getAllChiefComplaints = async (query: Record<string, any>) => {
  const chiefComplaintQuery = builderQuery({
    searchFields: ['description'],
    searchTerm: query.searchTerm,
    filter: query.filter ? JSON.parse(query.filter) : {},
    orderBy: query.orderBy ? JSON.parse(query.orderBy) : {},
    page: query.page,
    limit: query.limit,
  });
  return prisma.chiefComplaintInput.findMany({
    where: chiefComplaintQuery.where,
  });
};

const getChiefComplaintById = async (id: string) => {
  return prisma.chiefComplaintInput.findUnique({ where: { id } });
};

const updateChiefComplaint = async (id: string, payload: {title: string,value:string}) => {
  return prisma.chiefComplaintInput.update({ where: { id }, data: payload });
};

const deleteChiefComplaint = async (id: string) => {
  return prisma.chiefComplaintInput.delete({ where: { id } });
};

export const ChiefComplaintService = {
  createChiefComplaint,
  getAllChiefComplaints,
  getChiefComplaintById,
  updateChiefComplaint,
  deleteChiefComplaint,
};