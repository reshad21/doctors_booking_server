import { Patient } from '@prisma/client';
import prisma from '../../../db/db.config';
import { UserType } from '../../context/userType';
import { JwtPayload } from 'jsonwebtoken';

type User = JwtPayload & { id: string; type: string };

const createPatientIntoDB = async (patientData: Patient, user: User) => {
  let doctorId = patientData.doctorId;
  // Determine doctorId based on user type
  if (user?.type === UserType.DOCTOR) {
    doctorId = user.id;
  } else if (user?.type === UserType.STAFF) {
    const staff = await prisma.staff.findUnique({ where: { id: user.id } });
    if (!staff || !staff.doctorId) {
      throw new Error('Staff is not assigned to a doctor');
    }
    doctorId = staff.doctorId;
  }

  const {
    phoneNumber,
    name,
    age,
    gender,
    email = '',
    weight = '',
    status = 'NEW',
    visitStatus = 'NOT_VISITED',
  } = patientData;

  if (!name || !phoneNumber || !age || !gender || !doctorId) {
    throw new Error('Missing required patient fields');
  }

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

const getPatientsFromDB = async () => {
  const result = await prisma.patient.findMany();
  return result;
};


export const PatientService = { createPatientIntoDB, getPatientsFromDB };
