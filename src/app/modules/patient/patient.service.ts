import { Patient } from '@prisma/client';
import prisma from '../../../db/db.config';

// doctorId is not used in this function; patient uniqueness is based on name, phoneNumber, age, gender only
const createPatientIntoDB = async (patientData: Patient) => {
  const {
    phoneNumber,
    name,
    age,
    gender,
    doctorId,
    email,
    weight,
    status,
    visitStatus,
  } = patientData;

  const existingPatient = await prisma.patient.findFirst({
    where: {
      phoneNumber,
      doctorId,
    },
  });

  if (existingPatient) {
    // Check if patient details match
    if (  
      existingPatient.name === name &&
      existingPatient.gender === gender &&
      existingPatient.age === age
    ) {
      // Check if visitedAt is within 30 days
      if (existingPatient.visitedAt) {
        const now = new Date();
        const visitedAtDate = new Date(existingPatient.visitedAt);
        const diffInDays =
          (now.getTime() - visitedAtDate.getTime()) / (1000 * 60 * 60 * 24);
        if (diffInDays <= 30) {
          throw new Error(
            'This patient has already visited within the last 30 days. Cannot create duplicate record.',
          );
        }
      }
      throw new Error('This patient already exists');
    }
  }

  // Create new patient
  const newPatient = await prisma.patient.create({
    data: {
      name,
      phoneNumber,
      age,
      gender,
      doctorId,
      email,
      weight,
      status,
      visitStatus,
    },
  });
  return newPatient;
};

export const PatientService = { createPatientIntoDB };
