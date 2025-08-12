/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from '../../../db/db.config';
import AppError from '../../errors/AppError';
import { PrescriptionData } from '../../types/prescription.type';

const getExceptionalIntoDB = async () => {
  const response = await prisma.exceptionalTable.findMany();
  return response;
};
const getPrescriptionByPatientIdIntoDB = async (patientId: string) => {
  const response = await prisma.prescription.findMany({
    where: {
      patientId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      medicines: {
        select:{
          medicineName:true,
          DosageSchedule:true
        }
      },
      tests: {
        select: {
          id: true,
          description: true,
        },
      },
      chiefComplaint: true,
      diagnosis: true,
      investigation: true,
      onExaminations: true,
      patient: {
        select: {
          gender: true,
          age: true,
          name: true,
          weight: true,
        },
      },
    },
  });
  return response;
};
const createPrescriptionIntoDB = async (prescriptionData:PrescriptionData) => {
  const { 
    doctorId, 
    patientId, 
    medicines, 
    chiefComplaint = [], 
    onExaminations = [], 
    diagnosis = [], 
    nxVisit, 
    investigation = [], 
    advice 
  } = prescriptionData;

  const prescription = await prisma.prescription.create({
    data: {
      patientId,
      doctorId,
      advice,
      nextVisit: nxVisit,
      chiefComplaint: {
        create: chiefComplaint.map((complaint:any) => ({ description:complaint })),
      },
      onExaminations: {
        create: onExaminations.map((exam:any) => ({ description: exam })),
      },
      diagnosis: {
        create: diagnosis.map((diag:any) => ({ description: diag })),
      },
      investigation: {
        create: investigation.map((inv:any) => ({ description: inv })),
      },
      medicines: {
        create: medicines.map((med:any) => ({
          medicineName: med.medicineName,
          DosageSchedule: {
            create: med.DosageSchedule.map((dosage:any) => ({
              dosage: dosage.dosage,
              day: dosage.day,
              time: dosage.time,
              comment: dosage.comment || null,
            })),
          },
        })),
      },
    },
    include: {
      medicines: {
        include: {
          DosageSchedule: true,
        },
      },
      chiefComplaint: true,
      onExaminations: true,
      diagnosis: true,
      investigation: true,
    },
  });

  return prescription;
};
const updatePrescriptionIntoDB = async (id: string, prescriptionData: PrescriptionData) => {
  const {
    doctorId,
    patientId,
    medicines = [],
    chiefComplaint = [],
    onExaminations = [],
    diagnosis = [],
    nxVisit,
    investigation = [],
    advice
  } = prescriptionData;

  const updatedPrescription = await prisma.prescription.update({
    where: { id },
    data: {
      patientId,
      doctorId,
      advice,
      nextVisit: nxVisit,

      // Chief Complaint
      chiefComplaint: {
        deleteMany: {},
        create: chiefComplaint.map((complain: string) => ({
          description: complain,
        })),
      },

      // On Examinations
      onExaminations: {
        deleteMany: {},
        create: onExaminations.map((exam: string) => ({
          description: exam,
        })),
      },

      // Diagnosis
      diagnosis: {
        deleteMany: {},
        create: diagnosis.map((diag: string) => ({
          description: diag,
        })),
      },

      // Investigation
      investigation: {
        deleteMany: {},
        create: investigation.map((inv: string) => ({
          description: inv,
        })),
      },

      // Medicines + DosageSchedule
      medicines: {
        deleteMany: {},
        create: medicines.map((med: any) => ({
          medicineName: med.medicineName,
          DosageSchedule: {
            create: med.DosageSchedule.map((dosage: any) => ({
              dosage: dosage.dosage,
              day: dosage.day,
              time: dosage.time,
              comment: dosage.comment || null,
            })),
          },
        })),
      },
    },
    include: {
      medicines: {
        include: {
          DosageSchedule: true,
        },
      },
      chiefComplaint: true,
      onExaminations: true,
      diagnosis: true,
      investigation: true,
    },
  });

  return updatedPrescription;
};


const createExceptionalIntoDB = async (content: string) => {
  const isAvailable = await prisma.exceptionalTable.findFirst({
    where: {
      content: content,
    },
  });
  if (isAvailable) {
    throw new AppError(404, 'This advice is already available');
  }
  const response = await prisma.exceptionalTable.create({
    data: {
      content: content,
    },
  });

  return response;
};

export const PrescriptionServices = {
  createPrescriptionIntoDB,
  getPrescriptionByPatientIdIntoDB,
  updatePrescriptionIntoDB,
  createExceptionalIntoDB,
  getExceptionalIntoDB,
};
