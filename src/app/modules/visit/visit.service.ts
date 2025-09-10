/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from '../../../db/db.config';
import { JwtPayload } from 'jsonwebtoken';
import { UserType } from '../../context/userType';
import { Visit } from '@prisma/client';
import { builderQuery } from '../../builders/prismaBuilderQuery';
import { getDoctorIdForUser } from '../../utils/getDoctorId';

type User = JwtPayload & { id: string; type: string };

const createVisit = async (payload: Visit, user: User) => {
  let doctorId: string | undefined;

  if (user?.type === UserType.DOCTOR) {
    doctorId = user.id;
  } else if (user?.type === UserType.STAFF) {
    const staff = await prisma.staff.findUnique({ where: { id: user.id } });
    if (!staff || !staff.doctorId) {
      throw new Error('Staff is not assigned to a doctor');
    }
    doctorId = staff.doctorId;
  }

  if (!doctorId) {
    throw new Error('Doctor ID is required to create a visit');
  }

  const visitPayload = { ...payload, doctorId };
  return prisma.visit.create({ data: visitPayload });
};

const getAllVisits = async (query: Record<string, any>, user: User) => {
  const doctorId = await getDoctorIdForUser(user);

  // Parse filter
  let filter = query.filter || {};

  if (typeof filter === 'string') {
    try {
      filter = JSON.parse(filter);
    } catch {
      filter = {};
    }
  }

  // Always ensure doctorId is in filter
  filter.doctorId = doctorId;

  // Handle date range filters
  if (filter.startDate && filter.endDate) {
    filter.visitDate = {
      gte: new Date(`${filter.startDate}T00:00:00.000Z`),
      lt: new Date(`${filter.endDate}T23:59:59.999Z`),
    };
    delete filter.startDate;
    delete filter.endDate;
  } else if (filter.startDate) {
    filter.visitDate = {
      gte: new Date(`${filter.startDate}T00:00:00.000Z`),
      lt: new Date(`${filter.startDate}T23:59:59.999Z`),
    };
    delete filter.startDate;
  } else if (filter.endDate) {
    filter.visitDate = {
      lt: new Date(`${filter.endDate}T23:59:59.999Z`),
    };
    delete filter.endDate;
  }

  // Build query
  const visitQuery = builderQuery({
    searchFields: query.searchFields || [],
    searchTerm: query.searchTerm || '',
    filter,
    orderBy: query.orderBy || {},
    page: query.page || 1,
    limit: query.limit || 10,
  });

  // Fetch visits
  // return prisma.visit.findMany(visitQuery);
  return prisma.visit.findMany({
    where: {
      ...visitQuery.where
    },
    include: {
      patient:{
        select:{
          discountAmount:true,
          chamberId:true,
        }
      }  
    }
  });
};

const getVisitById = async (id: string) => {
  return prisma.visit.findUnique({ where: { id } });
};

const updateVisit = async (id: string, payload: Visit) => {
  return prisma.visit.update({ where: { id }, data: payload });
};

const deleteVisit = async (id: string) => {
  return prisma.visit.delete({ where: { id } });
};

export const VisitService = {
  createVisit,
  getAllVisits,
  getVisitById,
  updateVisit,
  deleteVisit,
};
