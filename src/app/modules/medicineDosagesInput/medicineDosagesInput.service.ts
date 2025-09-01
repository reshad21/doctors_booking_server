import { MedicineDosagesInput } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';

const createMedicineDosagesInput = async (payload: MedicineDosagesInput) => {
    return prisma.medicineDosagesInput.create({ data: payload });
};

const getAllMedicineDosagesInputs = async (query: Record<string, any>) => {
    const medicineDosagesInputQuery = builderQuery({
        searchFields: ['value'],
        searchTerm: query.searchTerm,
        filter: query.filter ? JSON.parse(query.filter) : {},
        orderBy: query.orderBy ? JSON.parse(query.orderBy) : {},
        page: query.page,
        limit: query.limit,
    });
    return prisma.medicineDosagesInput.findMany({
        where: medicineDosagesInputQuery.where,
    });
};

const getMedicineDosagesInputById = async (id: string) => {
    return prisma.medicineDosagesInput.findUnique({ where: { id } });
};

const updateMedicineDosagesInput = async (id: string, payload: MedicineDosagesInput) => {
    return prisma.medicineDosagesInput.update({ where: { id }, data: payload });
};

const deleteMedicineDosagesInput = async (id: string) => {
    return prisma.medicineDosagesInput.delete({ where: { id } });
};

export const MedicineDosagesInputService = {
    createMedicineDosagesInput,
    getAllMedicineDosagesInputs,
    getMedicineDosagesInputById,
    updateMedicineDosagesInput,
    deleteMedicineDosagesInput,
};
