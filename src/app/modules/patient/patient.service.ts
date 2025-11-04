/* eslint-disable @typescript-eslint/no-explicit-any */
import { Patient, PatientStatus, VisitStatus } from '@prisma/client';
import prisma from '../../../db/db.config';
import { UserType } from '../../context/userType';
import { JwtPayload } from 'jsonwebtoken';
import { builderQuery } from '../../builders/prismaBuilderQuery';
import { getDoctorIdForUser } from '../../utils/getDoctorId';
import { io } from '../../../app';

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
    chamberId,
    createdAt,
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
const now = new Date();
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
      time:(now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds())?.toString(),
      visitStatus,
      chamberId,
      createdAt
    },
  });

  // ✅ Emit event so frontend knows about it
  io.emit('patient:created', newPatient);

  return newPatient;
};
const updatePatientArrivedStatusIntoDB = async (patientData: { id: string, isArrived: boolean }) => {
  const response = await prisma.patient.update({
    where: {
      id: patientData?.id
    },
    data: {
      isArrived: patientData?.isArrived
    }

  });
  return response
};

const getPatientsFromDB = async (query: Record<string, any>, user: User) => {
  const doctorId = await getDoctorIdForUser(user);
  let timezoneOffset = 0;

  if (query.filter) {
    const parsedFilter = JSON.parse(query.filter);

    // Extract timezoneOffset first if it exists
    if (parsedFilter.timezoneOffset !== undefined) {
      timezoneOffset = parsedFilter.timezoneOffset;
      delete parsedFilter.timezoneOffset;
    }

    // Handle date range filtering for createdAt
    if (parsedFilter.startDate && parsedFilter.endDate) {
      const startDate = new Date(parsedFilter.startDate);
      const endDate = new Date(parsedFilter.endDate);
      
      // Adjust for timezone offset - convert local dates to UTC
      const startUTC = new Date(startDate.getTime() + timezoneOffset * 60 * 1000);
      const endUTC = new Date(endDate.getTime() + timezoneOffset * 60 * 1000 + 86400000); // Add 1 day
      
      parsedFilter.createdAt = {
        gte: startUTC,
        lt: endUTC,
      };
      delete parsedFilter.startDate;
      delete parsedFilter.endDate;
    } else if (parsedFilter.startDate) {
      const startDate = new Date(parsedFilter.startDate);
      const startUTC = new Date(startDate.getTime() + timezoneOffset * 60 * 1000);
      
      parsedFilter.createdAt = {
        gte: startUTC,
      };
      delete parsedFilter.startDate;
    } else if (parsedFilter.endDate) {
      const endDate = new Date(parsedFilter.endDate);
      const endUTC = new Date(endDate.getTime() + timezoneOffset * 60 * 1000 + 86400000);
      
      parsedFilter.createdAt = {
        lt: endUTC,
      };
      delete parsedFilter.endDate;
    } else if (parsedFilter.createdAt) {
      // Single date filter - handle timezone properly
      const dateStr = parsedFilter.createdAt;
      const localDate = new Date(dateStr);
      
      // Calculate start and end of day in UTC for the given local date
      const startOfDayUTC = new Date(localDate.getTime() + timezoneOffset * 60 * 1000);
      const endOfDayUTC = new Date(startOfDayUTC.getTime() + 86400000); // Add 24 hours
      
      parsedFilter.createdAt = {
        gte: startOfDayUTC,
        lt: endOfDayUTC,
      };
    }

    query.filter = JSON.stringify(parsedFilter);
  }

  // The rest of your code remains unchanged
  const patientQuery = builderQuery({
    searchFields: ['name', 'phoneNumber', 'email'],
    searchTerm: query.searchTerm,
    filter: {
      doctorId,
      ...(query.filter ? JSON.parse(query.filter) : {}),
    },
    orderBy: query.orderBy ? JSON.parse(query.orderBy) : {},
    page: query.page,
    limit: query.limit,
  });

  const totalItems = (
    await prisma.patient.findMany({
      where: patientQuery.where,
      select: { id: true },
    })
  ).length;

  const currentPage = Number(query.page) || 1;
  const totalPages = Math.ceil(totalItems / patientQuery.take);

  const result = await prisma.patient.findMany({
    ...patientQuery,
    include: {
      prescription: {
        include: {
          medication: true,
          chiefComplaint: true,
          onExaminations: true,
          diagnosis: true,
          investigation: true,
          advice: true,
        },
      },
    },
  });

  return {
    meta: {
      totalItems,
      totalPages,
      currentPage,
    },
    data: result,
  };
};

const deletePatientFromDB = async (id: string) => {
  // Step 1: Delete related Visits
  await prisma.visit.deleteMany({ where: { patientId: id } });

  // Step 2: Delete related Prescriptions
  await prisma.prescription.deleteMany({ where: { patientId: id } });

  // Step 3: Now delete the patient
  const result = await prisma.patient.delete({ where: { id } });
  return result;
};
const updatePatientAmountFromDB = async (payload: any) => {
  const result = await prisma.patient.update({
    where:{id:payload?.id},
    data:{
      discountAmount:payload?.discountAmount
    }
  })

  return result
};

const updatePatientFromDB = async (id: string, payload: Partial<Patient>) => {
  return await prisma.$transaction(async (tx) => {
    // 1. Fetch existing patient info
    const existingPatient = await tx.patient.findUnique({
      where: { id },
      select: {
        visitStatus: true,
        status: true,
        chamberId: true,
        doctorId: true,
      },
    });

    if (!existingPatient) {
      throw new Error(`Patient with ID ${id} not found`);
    }

    // 2. Prepare safe update data
    const updateData: any = {
      name: payload.name,
      phoneNumber: payload.phoneNumber,
      age: payload.age,
      gender: payload.gender,
      doctorId: payload.doctorId,
      email: payload.email,
      weight: payload.weight,
      status: payload.status,
      visitedAt: payload.visitedAt,
      createdAt: payload.createdAt,
      isArrived: payload.isArrived,
    };

    if (payload.visitStatus !== undefined) {
      updateData.visitStatus = payload.visitStatus;
      if (payload.isArrived !== undefined) {
        updateData.isArrived = payload.isArrived
      }
    }

    // 3. Update patient
    const updatedPatient = await tx.patient.update({
      where: { id },
      data: updateData,
    });

    // 4. Dynamic day logic for Visit creation
    if (payload.visitStatus === VisitStatus.VISITED) {
      const effectiveStatus = payload.status || existingPatient.status;
      const effectiveDoctorId = payload.doctorId || existingPatient.doctorId;

      if (!effectiveDoctorId) {
        throw new Error('Doctor ID is required to create a visit.');
      }

      if (!effectiveStatus) {
        throw new Error('Patient status is required to create a visit.');
      }

      // Ensure chamber exists
      if (!existingPatient.chamberId) {
        throw new Error('Chamber not assigned to patient.');
      }

      const chamber = await tx.chamber.findUnique({
        where: { id: existingPatient.chamberId },
        select: {
          newPatientFee: true,
          oldPatientFee: true,
          reportFee: true,
          day: true,
        },
      });

      if (!chamber) {
        throw new Error('Chamber not found');
      }

      const visitDate = payload.visitedAt
        ? new Date(payload.visitedAt)
        : new Date();


      let fee: number | undefined;
      let allowVisit = false;

      if (effectiveStatus === PatientStatus.NEW) {
        // Removed the day threshold restriction for NEW patients
        fee = parseInt(chamber.newPatientFee);
        allowVisit = true;
      } else if (effectiveStatus === PatientStatus.OLD) {
        // Removed the day threshold restriction for OLD patients
        fee = parseInt(chamber.oldPatientFee);
        allowVisit = true;
      } else if (effectiveStatus === PatientStatus.REPORT) {
        fee = parseInt(chamber.reportFee);
        allowVisit = true;
      } else {
        throw new Error('Invalid patient status');
      }

      if (fee === undefined || isNaN(fee)) {
        throw new Error('Fee is not a valid number');
      }

      // Only create a Visit if not already created for this patient, doctor, status, and date (same day)
      const startOfDay = new Date(visitDate);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(visitDate);
      endOfDay.setHours(23, 59, 59, 999);

      const existingVisit = await tx.visit.findFirst({
        where: {
          patientId: id,
          doctorId: effectiveDoctorId,
          type: effectiveStatus,
          visitDate: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      });

      if (allowVisit && !existingVisit) {
        await tx.visit.create({
          data: {
            patientId: id,
            doctorId: effectiveDoctorId,
            visitDate: visitDate,
            type: effectiveStatus,
            fee,
            chamberId: existingPatient.chamberId,
          },
        });
      }
    }

    // If visitStatus is set to NOT_VISITED, delete all Visit records for this patient
    if (payload.visitStatus === VisitStatus.NOT_VISITED) {
      await tx.visit.deleteMany({
        where: {
          patientId: id,
        },
      });
    }

    return updatedPatient;
  });
};

const getSinglePatientFromDB = async (id: string) => {
  const result = await prisma.patient.findUnique({
    where: { id }
  })

  return result
}

export const PatientService = {
  createPatientIntoDB,
  getPatientsFromDB,
  deletePatientFromDB,
  updatePatientFromDB,
  updatePatientArrivedStatusIntoDB,
  getSinglePatientFromDB,
  updatePatientAmountFromDB
};
