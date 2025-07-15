
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
const getPrescriptionByPatientIdIntoDB = async (patientId: string) => {
 
const response = await prisma.prescription.findMany({
  where:{
    patientId
  },
  orderBy: {
      createdAt: 'desc',
    },
  include:{
    medicines:true,
    tests:{
      select:{
        id:true,
        description:true,
      }
    },
    patient:{
      select:{
        gender:true,
        age:true,
        name:true,
        weight:true,
      }
    }
  }
})
return response
};
const updatePrescriptionIntoDB = async (payload: TPrescription) => {
  const { advice, nextVisit, tests, medicines,id } = payload;
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


export const PrescriptionServices = {
createPrescriptionIntoDB,
getPrescriptionByPatientIdIntoDB,
updatePrescriptionIntoDB
};
