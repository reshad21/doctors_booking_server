/* eslint-disable @typescript-eslint/no-explicit-any */
import { Patient, PatientStatus, VisitStatus } from '@prisma/client';
import prisma from '../../../db/db.config';
import { UserType } from '../../context/userType';
import { JwtPayload } from 'jsonwebtoken';
import { builderQuery } from '../../builders/prismaBuilderQuery';

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
    chamberId = '',
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
      chamberId,
    },
  });
  return newPatient;
};

const getPatientsFromDB = async (query: Record<string, any>) => {
  if (query.filter) {
    const parsedFilter = JSON.parse(query.filter);

    // Handle date range filtering for createdAt
    if (parsedFilter.startDate && parsedFilter.endDate) {
      parsedFilter.createdAt = {
        gte: new Date(`${parsedFilter.startDate}T00:00:00.000Z`),
        lt: new Date(`${parsedFilter.endDate}T23:59:59.999Z`),
      };
      delete parsedFilter.startDate;
      delete parsedFilter.endDate;
    } else if (parsedFilter.startDate) {
      parsedFilter.createdAt = {
        gte: new Date(`${parsedFilter.startDate}T00:00:00.000Z`),
      };
      delete parsedFilter.startDate;
    } else if (parsedFilter.endDate) {
      parsedFilter.createdAt = {
        lt: new Date(`${parsedFilter.endDate}T23:59:59.999Z`),
      };
      delete parsedFilter.endDate;
    } else if (parsedFilter.createdAt) {
      // Single date filter (legacy)
      
      const dateStr = parsedFilter.createdAt;
      parsedFilter.createdAt = {
        gte: new Date(`${dateStr}T00:00:00.000Z`),
        lt: new Date(`${dateStr}T23:59:59.999Z`),
      };
    }

    query.filter = JSON.stringify(parsedFilter);
  }

  const patientQuery = builderQuery({
    searchFields: ['name', 'phoneNumber', 'email'],
    searchTerm: query.searchTerm,
    filter: query.filter ? JSON.parse(query.filter) : {},
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

  const result = await prisma.patient.findMany(patientQuery);

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
  const result = await prisma.patient.delete({ where: { id } });
  return result;
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
    };

    if (payload.visitStatus !== undefined) {
      updateData.visitStatus = payload.visitStatus;
    }

    // 3. Update patient
    const updatedPatient = await tx.patient.update({
      where: { id },
      data: updateData,
    });

    // 4. 30-day logic for Visit creation
    if (payload.visitStatus === VisitStatus.VISITED && payload.status) {
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
        },
      });

      if (!chamber) {
        throw new Error('Chamber not found');
      }

      // Find the latest visit for this patient
      const latestVisit = await tx.visit.findFirst({
        where: { patientId: id },
        orderBy: { visitDate: 'desc' },
      });

      const visitDate = payload.visitedAt
        ? new Date(payload.visitedAt)
        : new Date();
      let daysSinceLastVisit = Infinity;
      if (latestVisit && latestVisit.visitDate) {
        const lastVisitDate = new Date(latestVisit.visitDate);
        daysSinceLastVisit =
          (visitDate.getTime() - lastVisitDate.getTime()) /
          (1000 * 60 * 60 * 24);
      }

      let fee: number | undefined;
      let allowVisit = false;

      if (payload.status === PatientStatus.NEW) {
        if (daysSinceLastVisit > 30) {
          fee = parseInt(chamber.newPatientFee);
          allowVisit = true;
        } else {
          throw new Error(
            'Patient cannot be marked as NEW within 30 days of last visit.',
          );
        }
      } else if (payload.status === PatientStatus.OLD) {
        if (daysSinceLastVisit <= 30 && daysSinceLastVisit >= 0) {
          fee = parseInt(chamber.oldPatientFee);
          allowVisit = true;
        } else {
          throw new Error(
            'Patient can only be marked as OLD within 30 days of last visit.',
          );
        }
      } else if (payload.status === PatientStatus.REPORT) {
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
          doctorId: payload.doctorId!,
          type: payload.status,
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
            doctorId: payload.doctorId!,
            visitDate: visitDate,
            type: payload.status,
            fee,
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

export const PatientService = {
  createPatientIntoDB,
  getPatientsFromDB,
  deletePatientFromDB,
  updatePatientFromDB,
};
