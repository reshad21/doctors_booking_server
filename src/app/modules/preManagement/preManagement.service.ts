import { PrescriptionUITable } from "@prisma/client";
import prisma from "../../../db/db.config";
import { User } from "../../types/user.type";


const createPreManagementIntoDB = async (payload: PrescriptionUITable) => {
    return await prisma.prescriptionUITable.create({ data: payload });
};

const getPreManagementFromDB = async (user: User) => {
    return await prisma.prescriptionUITable.findMany({
        where: { doctorId: user.id }
    });
};

const getPreManagementByIdFromDB = async (id: string) => {
    return await prisma.prescriptionUITable.findUnique({ where: { id } });
}

const deletePreManagementFromDB = async (id: string) => {
    return await prisma.prescriptionUITable.delete({ where: { id } });
}

const updatePreManagementByIdFromDB = async (id: string, payload: PrescriptionUITable) => {
    return await prisma.prescriptionUITable.update({ where: { id }, data: payload });
}

export const PreManagementServices = {
    createPreManagementIntoDB,
    getPreManagementFromDB,
    getPreManagementByIdFromDB,
    deletePreManagementFromDB,
    updatePreManagementByIdFromDB

};