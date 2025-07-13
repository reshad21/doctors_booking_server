
import prisma from '../../../db/db.config';
import { TPrescription } from '../../types/prescription.type';

const createPrescriptionIntoDB = async (payload: TPrescription) => {
  const { patientId, doctorId, advice, nextVisit, tests, medicines } = payload;

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


export const PrescriptionServices = {
createPrescriptionIntoDB
};
