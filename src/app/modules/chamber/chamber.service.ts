import { Chamber } from '@prisma/client';
import prisma from '../../../db/db.config';

const createChamber = async (payload: Chamber) => {
  return prisma.chamber.create({ data: payload });
};

const getAllChambers = async () => {
  return prisma.chamber.findMany();
};

const getChamberById = async (id: string) => {
  return prisma.chamber.findUnique({ where: { id } });
};

const updateChamber = async (id: string, payload: Chamber) => {
  return prisma.chamber.update({ where: { id }, data: payload });
};

const deleteChamber = async (id: string) => {
  return prisma.chamber.delete({ where: { id } });
};

export const ChamberService = {
  createChamber,
  getAllChambers,
  getChamberById,
  updateChamber,
  deleteChamber,
};
