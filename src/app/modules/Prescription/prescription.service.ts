import prisma from '../../../db/db.config';
import AppError from '../../errors/AppError';
import { TPrescription } from '../../types/prescription.type';

const createPrescriptionIntoDB = async (payload: TPrescription) => {
  const {
    patientId,
    doctorId,
    advice,
    nextVisit,
    tests,
    medicines,
    investigation,
    onExaminations,
    chiefComplaint,
    diagnosis,
  } = payload;

  const response = await prisma.prescription.create({
    data: {
      patientId,
      doctorId,
      advice: advice as string,
      nextVisit,
      tests: {
        create: tests.map((test) => ({
          description: test.description,
        })),
      },
      chiefComplaint: {
        create: chiefComplaint.map((complain) => ({
          description: complain.description,
        })),
      },
      investigation: {
        create: investigation.map((complain) => ({
          description: complain.description,
        })),
      },
      diagnosis: {
        create: diagnosis.map((complain) => ({
          description: complain.description,
        })),
      },
      onExaminations: {
        create: onExaminations.map((complain) => ({
          description: complain.description,
        })),
      },
      medicines: {
        create: medicines.map((medicine) => ({
          medicineName: medicine.medicineName,
          dosage: medicine.dosage,
          time: medicine.time,
          day: medicine.day,
          comment: medicine.comment,
        })),
      },
    },
  });

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
      medicines: true,
      tests: {
        select: {
          id: true,
          description: true,
        },
      },
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
const updatePrescriptionIntoDB = async (payload: TPrescription) => {
  const { advice, nextVisit, tests, medicines, id } = payload;
  const response = await prisma.prescription.update({
    where: { id },
    data: {
      advice: advice as string,
      nextVisit,
      tests: {
        deleteMany: {},
        create: tests.map((test) => ({
          description: test.description,
        })),
      },
      medicines: {
        deleteMany: {},
        create: medicines.map((medicine) => ({
          medicineName: medicine.medicineName,
          dosage: medicine.dosage,
          time: medicine.time,
          day: medicine.day,
          comment: medicine.comment,
        })),
      },
    },
  });

  return response;
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
};
