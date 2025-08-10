import prisma from '../../../db/db.config';
import AppError from '../../errors/AppError';
import { TPrescription } from '../../types/prescription.type';

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
      medicines: true,
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
// const createPrescriptionIntoDB = async (payload: TPrescription) => {
//   const {
//     patientId,
//     doctorId,
//     advice,
//     nextVisit,
//     tests,
//     medicines,
//     investigation,
//     onExaminations,
//     chiefComplaint,
//     diagnosis,
//   } = payload;

//   const response = await prisma.prescription.create({
//     data: {
//       patientId,
//       doctorId,
//       advice: advice as string,
//       nextVisit,
//       tests: {
//         create: tests.map((test) => ({
//           description: test.description,
//         })),
//       },
//       chiefComplaint: {
//         create: chiefComplaint.map((complain) => ({
//           description: complain.description,
//         })),
//       },
//       investigation: {
//         create: investigation.map((complain) => ({
//           description: complain.description,
//         })),
//       },
//       diagnosis: {
//         create: diagnosis.map((complain) => ({
//           description: complain.description,
//         })),
//       },
//       onExaminations: {
//         create: onExaminations.map((complain) => ({
//           description: complain.description,
//         })),
//       },
//       medicines: {
//         create: medicines.map((medicine) => ({
//           medicineName: medicine.medicineName,
//           dosage: medicine.dosage,
//           time: medicine.time,
//           day: medicine.day,
//           comment: medicine.comment,
//         })),
//       },
//     },
//   });

//   return response;
// };


const createPrescriptionIntoDB = async (payload: TPrescription) => {
  const {
    patientId,
    doctorId,
    advice,
    nextVisit,
    medicines,
    tests,
    chiefComplaint,
    onExaminations,
    diagnosis,
    investigation,
  } = payload;

  return await prisma.$transaction(async (tx) => {
    // Create the prescription
    const prescription = await tx.prescription.create({
      data: {
        patientId,
        doctorId,
        advice,
        nextVisit,
        tests: {
          create: tests?.map((test) => ({
            description: test.description,
          })),
        },
        chiefComplaint: {
          create: chiefComplaint?.map((item) => ({
            description: item.description,
          })),
        },
        onExaminations: {
          create: onExaminations?.map((item) => ({
            description: item.description,
          })),
        },
        diagnosis: {
          create: diagnosis?.map((item) => ({
            description: item.description,
          })),
        },
        investigation: {
          create: investigation?.map((item) => ({
            description: item.description,
          })),
        },
      },
    });

    // Create medicines with their dosage schedules
    if (medicines && medicines.length > 0) {
      await Promise.all(
        medicines.map(async (medicine) => {
          const createdMedicine = await tx.medicine.create({
            data: {
              prescriptionId: prescription.id,
              medicineName: medicine.medicineName,
            },
          });

          if (medicine.DosageSchedule && medicine.DosageSchedule.length > 0) {
            await tx.dosageSchedule.createMany({
              data: medicine.DosageSchedule.map((schedule) => ({
                medicineId: createdMedicine.id,
                dosage: schedule.dosage,
                day: schedule.day,
                time: schedule.time,
                comment: schedule.comment,
              })),
            });
          }
        })
      );
    }

    return prescription;
  });
};
const updatePrescriptionIntoDB = async (payload: TPrescription) => {
  const {
    advice,
    nextVisit,
    tests,
    medicines,
    id,
    chiefComplaint,
    investigation,
    diagnosis,
    onExaminations,
  } = payload;

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

      chiefComplaint: {
        deleteMany: {},
        create: chiefComplaint.map((complain) => ({
          description: complain.description,
        })),
      },
      investigation: {
        deleteMany: {},
        create: investigation.map((complain) => ({
          description: complain.description,
        })),
      },
      diagnosis: {
        deleteMany: {},
        create: diagnosis.map((complain) => ({
          description: complain.description,
        })),
      },
      onExaminations: {
        deleteMany: {},
        create: onExaminations.map((complain) => ({
          description: complain.description,
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
  getExceptionalIntoDB,
};
