import { MedicineTimeInput } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';

const createMedicineTimeInput = async (payload: MedicineTimeInput) => {
    return prisma.medicineTimeInput.create({ data: payload });
};

const getAllMedicineTimeInputs = async (query: Record<string, any>) => {
    const medicineTimeInputQuery = builderQuery({
        searchFields: ['value'],
        searchTerm: query.searchTerm,
        filter: query.filter ? JSON.parse(query.filter) : {},
        orderBy: query.orderBy ? JSON.parse(query.orderBy) : {},
        page: query.page,
        limit: query.limit,
    });
    return prisma.medicineTimeInput.findMany({
        where: medicineTimeInputQuery.where,
    });
};

const getMedicineTimeInputById = async (id: string) => {
    return prisma.medicineTimeInput.findUnique({ where: { id } });
};

const updateMedicineTimeInput = async (id: string, payload: MedicineTimeInput) => {
    return prisma.medicineTimeInput.update({ where: { id }, data: payload });
};

const deleteMedicineTimeInput = async (id: string) => {
    return prisma.medicineTimeInput.delete({ where: { id } });
};

export const MedicineTimeInputService = {
    createMedicineTimeInput,
    getAllMedicineTimeInputs,
    getMedicineTimeInputById,
    updateMedicineTimeInput,
    deleteMedicineTimeInput,
};
