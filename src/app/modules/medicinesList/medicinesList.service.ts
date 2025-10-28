/* eslint-disable @typescript-eslint/no-explicit-any */
import { MedicineInput } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';

const getMedicineInputsFromDB = async (query: Record<string, any>) => {
  const page = query.page || 1;
  const limit = query.limit || 10;
  const searchTerm = query.searchTerm || '';

  // Build filter object
  const filter: any = {};
  if (query.brandName) filter.brandName = { contains: query.brandName };

  // If there's a search term, use relevance-based ordering
  if (searchTerm) {
    const skip = (page - 1) * limit;

    // Convert search term to uppercase for case-insensitive comparison
    const upperSearchTerm = searchTerm.toUpperCase();

    // Use raw SQL for better search with case-insensitive LIKE
    const exactMatches = await prisma.$queryRaw`
      SELECT * FROM MedicineInput 
      WHERE UPPER(brandName) LIKE ${`${upperSearchTerm}%`}
      ORDER BY brandName ASC
      LIMIT ${limit} OFFSET ${skip}
    `;

    // Count exact matches
    const exactCount = await prisma.$queryRaw`
      SELECT COUNT(*) as count FROM MedicineInput 
      WHERE UPPER(brandName) LIKE ${`${upperSearchTerm}%`}
    `;

    const exactTotal = Number((exactCount as any)[0].count);

    // If we have enough exact matches, return them
    if ((exactMatches as any[]).length >= limit) {
      const totalAllMatches = await prisma.$queryRaw`
        SELECT COUNT(*) as count FROM MedicineInput 
        WHERE UPPER(brandName) LIKE ${`%${upperSearchTerm}%`}
      `;

      return {
        data: exactMatches,
        page,
        limit,
        total: Number((totalAllMatches as any)[0].count),
        totalPages: Math.ceil(
          Number((totalAllMatches as any)[0].count) / limit,
        ),
      };
    }

    // Get remaining slots with contains matches (but not starts with)
    const remainingLimit = limit - (exactMatches as any[]).length;
    const containsMatches = await prisma.$queryRaw`
      SELECT * FROM MedicineInput 
      WHERE UPPER(brandName) LIKE ${`%${upperSearchTerm}%`}
      AND NOT UPPER(brandName) LIKE ${`${upperSearchTerm}%`}
      ORDER BY brandName ASC
      LIMIT ${remainingLimit} OFFSET ${Math.max(0, skip - exactTotal)}
    `;

    // Get total counts
    const totalAllMatches = await prisma.$queryRaw`
      SELECT COUNT(*) as count FROM MedicineInput 
      WHERE UPPER(brandName) LIKE ${`%${upperSearchTerm}%`}
    `;

    return {
      data: [...(exactMatches as any[]), ...(containsMatches as any[])],
      page,
      limit,
      total: Number((totalAllMatches as any)[0].count),
      totalPages: Math.ceil(Number((totalAllMatches as any)[0].count) / limit),
    };
  }

  // Use the builder for non-search queries
  const prismaQuery = builderQuery({
    searchFields: ['brandName'],
    searchTerm,
    filter,
    orderBy: query.orderBy || { brandName: 'asc' },
    page,
    limit,
  });

  const data = await prisma.medicineInput.findMany(prismaQuery);
  const total = await prisma.medicineInput.count({ where: prismaQuery.where });

  return {
    data,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
};

const createMedicineInputIntoDB = async (payload: MedicineInput) => {
  const lastMedicineSerialNumber = await prisma.medicineInput.findFirst({
    orderBy: { serialNo: 'desc' },
  });
  const response = await prisma.medicineInput.create({
    data: {
      ...payload,
      serialNo: lastMedicineSerialNumber
        ? lastMedicineSerialNumber.serialNo + 1
        : 1,
    },
  });

  return response;
};

const updateMedicineInputInDB = async (
  id: string,
  payload: Partial<MedicineInput>,
) => {
  const response = await prisma.medicineInput.update({
    where: { id },
    data: payload,
  });

  return response;
};

const deleteMedicineInputFromDB = async (id: string) => {
  const response = await prisma.medicineInput.delete({
    where: { id },
  });

  return response;
};

export const MedicalInputService = {
  getMedicineInputsFromDB,
  createMedicineInputIntoDB,
  updateMedicineInputInDB,
  deleteMedicineInputFromDB,
};
