import { Prescription } from '@prisma/client';
import prisma from '../../../db/db.config';
import AppError from '../../errors/AppError';
import { User } from '../../types/user.type';
import { getDoctorIdForUser } from '../../utils/getDoctorId';

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
      medication: {
        select: {
          instructionNotes: true
        },
      },
      chiefComplaint: true,
      diagnosis: true,
      investigation: true,
      onExaminations: true,
      advice: true,
      coMorbidities: true,
      treatmentPlan: true,
      doctor: true,
      history: true,
      nextVisit: true,
      patient: {
        select: {
          id: true,
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
  const response = await prisma.prescription.findFirst({
    where: {
      id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      medication: {
        select: {
          instructionNotes: true
        },
      },
      chiefComplaint: true,
      diagnosis: true,
      investigation: true,
      onExaminations: true,
      advice: true,
      coMorbidities: true,
      treatmentPlan: true,
      doctor: true,
      history: true,
      nextVisit: true,
      patient: {
        select: {
          id: true,
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

const createPrescriptionIntoDB = async (data: Prescription, user: User) => {

  const {} = data;
  const doctorId = await getDoctorIdForUser(user);

  const formattedData = {
    patientId: data.patientId,
    doctorId,
    history: {
      create: {
        general: { createMany: { data: data.historyGeneral || [] } },
        drug: { createMany: { data: data.historyDrug || [] } },
        personal: { createMany: { data: data.historyPersonal || [] } },
        family: { createMany: { data: data.historyFamily || [] } },
      },
    },
    medication: {
      create: data.medications.map((m: any) => ({
        ...m,
        instructionNotes: { create: m.instructionNotes || [] },
      })),
    },
    diagnosis: { createMany: { data: data.diagnosis || [] } },
  };

  const prescription = await prisma.prescription.create({
    data: formattedData,
    include: {
      medication: { include: { instructionNotes: true } },
      history: {
        include: {
          general: true,
          drug: true,
          personal: true,
          family: true,
        },
      },
      diagnosis: true,
    },
  });

  return prescription;
};

// const updatePrescriptionIntoDB = async (prescriptionData: PrescriptionData) => {
//   const {
//     id,
//     medicines = [],
//     chiefComplaint = [],
//     onExaminations = [],
//     diagnosis = [],
//     nextVisit,
//     investigation = [],
//     advice = [],
//   } = prescriptionData;

//   const updatedPrescription = await prisma.prescription.update({
//     where: { id },
//     data: {
//       nextVisit,

//       advice: {
//         deleteMany: { prescriptionId: id },
//         create: (advice ?? []).map((d) => ({ description: d })),
//       },

//       chiefComplaint: {
//         deleteMany: { prescriptionId: id },
//         create: (chiefComplaint ?? []).map((d) => ({ description: d })),
//       },

//       onExaminations: {
//         deleteMany: { prescriptionId: id },
//         create: (onExaminations ?? []).map((d) => ({ description: d })),
//       },

//       diagnosis: {
//         deleteMany: { prescriptionId: id },
//         create: (diagnosis ?? []).map((d) => ({ description: d })),
//       },

//       investigation: {
//         deleteMany: { prescriptionId: id },
//         create: (investigation ?? []).map((d) => ({ description: d })),
//       },

//       medicines: {
//         deleteMany: { prescriptionId: id },
//         create: (medicines ?? []).map((med) => ({
//           // Extract medicine name from object or use string directly
//           medicineName:
//             typeof med.medicineName === 'object'
//               ? med.medicineName.value || med.medicineName.label
//               : med.medicineName,
//           DosageSchedule: {
//             create: (med.DosageSchedule ?? []).map((dosage) => ({
//               dosage: dosage.dosage ?? null,
//               day: dosage.day,
//               time: dosage.time,
//               comment: dosage.comment ?? null,
//               ...(Array.isArray(dosage.dosageNotes) && dosage.dosageNotes.length
//                 ? {
//                     dosageNotes: {
//                       create: dosage.dosageNotes.map((n) => ({
//                         qty: n.qty,
//                         unit: n.unit,
//                         freq: n.freq,
//                         freqUnit: n.freqUnit,
//                       })),
//                     },
//                   }
//                 : {}),
//             })),
//           },
//         })),
//       },
//     },
//     include: {
//       medicines: {
//         include: {
//           DosageSchedule: {
//             include: { dosageNotes: true },
//           },
//         },
//       },
//       chiefComplaint: true,
//       onExaminations: true,
//       diagnosis: true,
//       investigation: true,
//       advice: true,
//     },
//   });

//   return updatedPrescription;
// };

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
  // updatePrescriptionIntoDB,
  getPrescriptionByPatientIdIntoDB,
  getPrescriptionByIdIntoDB,
  createExceptionalIntoDB,
  getExceptionalIntoDB,
};
