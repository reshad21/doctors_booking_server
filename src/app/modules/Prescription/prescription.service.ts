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
        select: {
          medicineName: true,
          DosageSchedule: true
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
      advice:true,
      patient: {
        select: {
          id:true,
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
const getPrescriptionByIdIntoDB = async (id: string) => {
  // console.log(id);
  
  const response = await prisma.prescription.findFirst({
    where: {
      id,
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
      advice:true,
      onExaminations: true,
      patient: {
        select: {
          id:true,
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
// const createPrescriptionIntoDB = async (prescriptionData:PrescriptionData) => {
//   const { 
//     doctorId, 
//     patientId, 
//     medicines = [], 
//     chiefComplaint = [], 
//     onExaminations = [], 
//     diagnosis = [], 
//     nxVisit, 
//     investigation = [], 
//     advice = []
//   } = prescriptionData;
// console.log(medicines,"this is medicines ");

//   const prescription = await prisma.prescription.create({
//     data: {
//       patientId,
//       doctorId,
//       advice: {
//         create: (Array.isArray(advice) ? advice : []).map((complaint: any) => ({ description: complaint })),
//       },
//       nextVisit: nxVisit,
//       chiefComplaint: {
//         create: chiefComplaint.map((complaint: any) => ({ description: complaint })),
//       },
//       onExaminations: {
//         create: onExaminations.map((exam: any) => ({ description: exam })),
//       },
//       diagnosis: {
//         create: diagnosis.map((diag: any) => ({ description: diag })),
//       },
//       investigation: {
//         create: investigation.map((inv: any) => ({ description: inv })),
//       },
//       medicines: {
//         create: medicines.map((med: any) => ({
//           medicineName: med.medicineName,
//           DosageSchedule: {
//             create: med.DosageSchedule.map((dosage: any) => ({
//               dosage: dosage.dosage,
//               day: dosage.day,
//               time: dosage.time,
//               comment: dosage.comment || null,
//             })),
//           },
//         })),
//       },
//     },
//     include: {
//       medicines: {
//         include: {
//           DosageSchedule: true,
//         },
//       },
//       chiefComplaint: true,
//       onExaminations: true,
//       diagnosis: true,
//       investigation: true,
//     },
//   });

//   return prescription;
// };

const createPrescriptionIntoDB = async (prescriptionData: PrescriptionData) => {
  const { 
    doctorId, 
    patientId, 
    medicines = [], 
    chiefComplaint = [], 
    onExaminations = [], 
    diagnosis = [], 
    nxVisit, 
    investigation = [], 
    advice = []
  } = prescriptionData;

  const prescription = await prisma.prescription.create({
    data: {
      patientId,
      doctorId,
      nextVisit: nxVisit || null, // ✅ make it safe if frontend skips
      advice: {
        create: (Array.isArray(advice) ? advice : []).map((item: any) => ({
          description: item,
        })),
      },
      chiefComplaint: {
        create: (Array.isArray(chiefComplaint) ? chiefComplaint : []).map((item: any) => ({
          description: item,
        })),
      },
      onExaminations: {
        create: (Array.isArray(onExaminations) ? onExaminations : []).map((item: any) => ({
          description: item,
        })),
      },
      diagnosis: {
        create: (Array.isArray(diagnosis) ? diagnosis : []).map((item: any) => ({
          description: item,
        })),
      },
      investigation: {
        create: (Array.isArray(investigation) ? investigation : []).map((item: any) => ({
          description: item,
        })),
      },
      medicines: {
        create: (Array.isArray(medicines) ? medicines : []).map((med: any) => ({
          medicineName: med.medicineName,
          DosageSchedule: {
            create: (Array.isArray(med.DosageSchedule) ? med.DosageSchedule : []).map((dosage: any) => ({
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
      advice: true,
    },
  });

  return prescription;
};

const updatePrescriptionIntoDB = async ( prescriptionData: PrescriptionData) => {
  const {
    id,
    medicines = [],
    chiefComplaint = [],
    onExaminations = [],
    diagnosis = [],
    nxVisit,
    investigation = [],
    advice = []
  } = prescriptionData;

  const updatedPrescription = await prisma.prescription.update({
    where: { id },
    data: {
      advice: {
       deleteMany: { prescriptionId: id },
        create: advice.map((complain: string) => ({
          description: complain,
        })),
      },
      nextVisit: nxVisit,

      // Chief Complaint
      chiefComplaint: {
       deleteMany: { prescriptionId: id },
        create: chiefComplaint.map((complain: string) => ({
          description: complain,
        })),
      },

      // On Examinations
      onExaminations: {
        deleteMany: { prescriptionId: id },
        create: onExaminations.map((exam: string) => ({
          description: exam,
        })),
      },

      // Diagnosis
      diagnosis: {
        deleteMany: { prescriptionId: id },
        create: diagnosis.map((diag: string) => ({
          description: diag,
        })),
      },

      // Investigation
      investigation: {
        deleteMany: { prescriptionId: id },
        create: investigation.map((inv: string) => ({
          description: inv,
        })),
      },

      // Medicines + DosageSchedule
      medicines: {
        deleteMany: { prescriptionId: id },
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
  getPrescriptionByIdIntoDB,
  updatePrescriptionIntoDB,
  createExceptionalIntoDB,
  getExceptionalIntoDB,
};
