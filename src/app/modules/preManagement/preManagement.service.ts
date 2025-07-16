import { PrescriptionUITable } from "@prisma/client";
import prisma from "../../../db/db.config";


const createPreManagementIntoDB = async (payload:PrescriptionUITable) => {
    return await prisma.prescriptionUITable.create({data:payload});
};

const getPreManagementFromDB = async () => {
    return await prisma.prescriptionUITable.findMany({});
};

export const PreManagementServices = {
    createPreManagementIntoDB,
    getPreManagementFromDB,
};