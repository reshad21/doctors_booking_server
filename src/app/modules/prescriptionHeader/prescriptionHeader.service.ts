/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrescriptionHeader } from '@prisma/client';
import prisma from '../../../db/db.config';

const createPrescriptionHeaderIntoDB = async (payload: PrescriptionHeader) => {
  const result = prisma.prescriptionHeader.create({ data: payload });
  return result;
};

const getAllPrescriptionHeaderIntoDB = async (query: Record<string, any>) => {
  // const doctorId = await getDoctorIdForUser(user);
  // const onExaminationQueryInput = builderQuery({
  //   searchFields: ['title'],
  //   searchTerm: query.searchTerm,
  //   filter: {
  //     doctorId,
  //     ...(query.filter ? JSON.parse(query.filter) : {}),
  //   },
  //   orderBy: query.orderBy ? JSON.parse(query.orderBy) : {},
  //   page: query.page,
  //   limit: query.limit,
  // });
  return prisma.prescriptionHeader.findMany({});
};

const getPrescriptionHeaderById = async (id: string) => {
  return prisma.prescriptionHeader.findUnique({ where: { id } });
};

const deletePrescriptionHeaderIntoDB = async (id: string) => {
  return prisma.prescriptionHeader.delete({ where: { id } });
};

const updatePrescriptionHeaderIntoDB = async (
  id: string,
  payload: PrescriptionHeader,
) => {
  const result = prisma.prescriptionHeader.update({
    where: { id },
    data: payload,
  });
  return result;
};

export const PrescriptionHeaderService = {
  createPrescriptionHeaderIntoDB,
  updatePrescriptionHeaderIntoDB,
  deletePrescriptionHeaderIntoDB,
  getPrescriptionHeaderById,
  getAllPrescriptionHeaderIntoDB,
};
