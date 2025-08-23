/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';

const getMedicineInputsFromDB = async (query: Record<string, any>) => {
  const page = query.page || 1;
  const limit = query.limit || 10;

  // Build filter object
  const filter: any = {};
  if (query.brandName)
    filter.brandName = { contains: query.brandName, mode: 'insensitive' };
  if (query.genericName)
    filter.genericName = { contains: query.genericName, mode: 'insensitive' };

  // Build the Prisma query using builderQuery
  const prismaQuery = builderQuery({
    searchFields: ['brandName', 'genericName'],
    searchTerm: query.searchTerm || '',
    filter,
    orderBy: query.orderBy,
    page,
    limit,
  });

  // Execute the query
  const data = await prisma.medicineInput.findMany(prismaQuery);

  // Count total for pagination
  const total = await prisma.medicineInput.count({ where: prismaQuery.where });

  return {
    data,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
};

export const MedicalInputService = { getMedicineInputsFromDB };
