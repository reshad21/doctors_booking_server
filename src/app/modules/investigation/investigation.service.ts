/* eslint-disable @typescript-eslint/no-explicit-any */
import { InvestigationInput } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';
import { User } from '../../types/user.type';
import { getDoctorIdForUser } from '../../utils/getDoctorId';

const createInvestigation = async (payload: InvestigationInput, user: User) => {
  const doctorId = await getDoctorIdForUser(user);
  const investigationPayload = { ...payload, doctorId };
  return prisma.investigationInput.create({ data: investigationPayload });
};

const getAllInvestigations = async (query: Record<string, any>, user: User) => {
  const doctorId = await getDoctorIdForUser(user);
  const investigationQuery = builderQuery({
    searchFields: ['description'],
    searchTerm: query.searchTerm,
    filter: {
      doctorId,
      ...(query.filter ? JSON.parse(query.filter) : {}),
    },
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
