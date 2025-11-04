/* eslint-disable @typescript-eslint/no-explicit-any */
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

const createPrescriptionIntoDB = async (rawData: any, user: User) => {
  const doctorId = await getDoctorIdForUser(user);

  const formattedData = {
    patientId: rawData.patientId,
    doctorId,
    
    // Chief Complaints
    chiefComplaint: {
      create: rawData.chiefComplaint?.complaints?.map((c: any) => ({
        label: c.label,
        duration: c.duration,
        unit: c.unit,
        notes: c.notes,
      })) || [],
    },

    // On Examinations
    onExaminations: {
      create: rawData.examinations?.examinations?.map((e: any) => ({
        label: e.label,
        notes: e.notes,
      })) || [],
    },

    // Diagnosis
    diagnosis: {
      create: rawData.diagnosis?.diagnosis?.map((d: any) => ({
        label: d.label,
        notes: d.notes,
      })) || [],
    },

    // Investigations
    investigation: {
      create: rawData.investigations?.investigations?.map((i: any) => ({
        label: i.label,
        notes: i.notes,
      })) || [],
    },

    // Advice
    advice: {
      create: rawData.advices?.advices?.map((a: any) => ({
        label: a.label,
        notes: a.notes,
      })) || [],
    },

    // Treatment Plan
    treatmentPlan: {
      create: rawData.treatmentPlan?.treatmentPlan?.map((t: any) => ({
        label: t.label,
        notes: t.notes,
      })) || [],
    },

    // Co-Morbidities
    coMorbidities: {
      create: rawData.coMorbidities?.coMorbidities?.map((c: any) => ({
        label: c.label,
        notes: c.notes,
      })) || [],
    },

    // Medications
    medication: {
      create: rawData.medications?.medications?.map((m: any) => ({
        name: m.name,
        dosage: m.dosage,
        frequency: m.frequency || '',
        duration: m.duration,
        showInPrescription: m.showInPrescription ?? true,
        instructionNotes: {
          create: {
            beforeEating: m.instructions?.beforeEating || false,
            afterEating: m.instructions?.afterEating || false,
            notes: m.instructions?.notes || '',
          },
        },
      })) || [],
    },

    // Next Visit (one-to-one relation)
    ...(rawData.nextVisit?.nextVisit && {
      nextVisit: {
        create: {
          durationType: rawData.nextVisit.nextVisit.durationType,
          durationValue: rawData.nextVisit.nextVisit.durationValue,
          notes: rawData.nextVisit.nextVisit.notes || '',
          showInReport: rawData.nextVisit.nextVisit.showInReport ?? true,
          withPatient: rawData.nextVisit.nextVisit.withPatient ?? true,
        },
      },
    }),

    // History - Create one history record with nested relations
    ...(rawData.history && {
      history: {
        create: {
          general: {
            create: rawData.history.general?.map((h: any) => ({
              label: h.label,
              duration: h.duration || '',
              unit: h.unit || '',
              notes: h.notes || '',
            })) || [],
          },
          drug: {
            create: rawData.history.drugs?.map((d: string) => ({
              drugName: d,
            })) || [],
          },
          investigation: {
            create: rawData.history.investigations?.map((i: any) => ({
              label: i.label,
              notes: i.notes || '',
            })) || [],
          },
          personal: {
            create: rawData.history.personal?.map((p: any) => ({
              label: p.label,
              duration: p.duration || '',
              unit: p.unit || '',
              notes: p.notes || '',
            })) || [],
          },
          family: {
            create: rawData.history.family?.map((f: any) => ({
              label: f.label,
              duration: f.duration || '',
              unit: f.unit || '',
              notes: f.notes || '',
            })) || [],
          },
        },
      },
    }),
  };

  const prescription = await prisma.prescription.create({
    data: formattedData,
    include: {
      medication: { 
        include: { instructionNotes: true } 
      },
      chiefComplaint: true,
      onExaminations: true,
      diagnosis: true,
      investigation: true,
      advice: true,
      treatmentPlan: true,
      coMorbidities: true,
      nextVisit: true,
      history: {
        include: {
          general: true,
          drug: true,
          investigation: true,
          personal: true,
          family: true,
        },
      },
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
