/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChiefComplaint } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';

const createChiefComplaint = async (payload: ChiefComplaint) => {
  return prisma.chiefComplaint.create({ data: payload });
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
  return prisma.chiefComplaint.findMany({
    where: chiefComplaintQuery.where,
  });
};

const getChiefComplaintById = async (id: string) => {
  return prisma.chiefComplaint.findUnique({ where: { id } });
};

const updateChiefComplaint = async (id: string, payload: ChiefComplaint) => {
  return prisma.chiefComplaint.update({ where: { id }, data: payload });
};

const deleteChiefComplaint = async (id: string) => {
  return prisma.chiefComplaint.delete({ where: { id } });
};

export const ChiefComplaintService = {
  createChiefComplaint,
  getAllChiefComplaints,
  getChiefComplaintById,
  updateChiefComplaint,
  deleteChiefComplaint,
};