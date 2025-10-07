/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PrescriptionBodySetup,
  PrescriptionFooter,
  PrescriptionHeader,
  PrescriptionPageSetup,
  PrescriptionPatientSetup,
  PrescriptionPatientSetupFormField,
} from '@prisma/client';
import prisma from '../../../db/db.config';
import AppError from '../../errors/AppError';
import { JwtPayload } from 'jsonwebtoken';

interface IPrescriptionPageSetup {
  pageSetup: PrescriptionPageSetup;
  patientSection: PrescriptionPatientSetup & {
    formFields: PrescriptionPatientSetupFormField[];
  };
  bodySection: PrescriptionBodySetup;
  footerSection: PrescriptionFooter;
  headerSection: PrescriptionHeader;
  doctorId: string;
  chamberId: string;
}

const createPrescriptionPageSetupIntoDB = async (
  payload: IPrescriptionPageSetup,
) => {
  console.log('payload', payload);

  const response = await prisma.$transaction(async (prisma) => {
    const prescriptionSetup = await prisma.prescriptionSetup.findFirst({
      where: {
        doctorId: payload.doctorId,
        chamberId: payload.chamberId,
      },
    });

    if (prescriptionSetup) {
      throw new AppError(
        404,
        'Already have a prescription setup for this chamber',
      );
    }

    const newPrescriptionSetup = await prisma.prescriptionSetup.create({
      data: {
        doctorId: payload.doctorId,
        chamberId: payload.chamberId,
      },
    });

    const pageSetup = await prisma.prescriptionPageSetup.create({
      data: {
        totalHeight: String(payload.pageSetup.totalHeight),
        totalWidth: String(payload.pageSetup.totalWidth),
        leftMargin: String(payload.pageSetup.leftMargin),
        rightMargin: String(payload.pageSetup.rightMargin),
        topMargin: String(payload.pageSetup.topMargin),
        bottomMargin: String(payload.pageSetup.bottomMargin),
        prescriptionSetupId: newPrescriptionSetup.id,
      },
    });
    const patientSection = await prisma.prescriptionPatientSetup.create({
      data: {
        ...(() => {
          const { formFields, ...rest } = payload.patientSection;
          return {
            ...rest,
            prescriptionSetupId: newPrescriptionSetup.id,
          };
        })(),
        prescriptionPatientSetupFormField: {
          create: payload?.patientSection?.formFields?.map((field) => ({
            defaultValue: field.defaultValue,
            label: field.label,
            order: String(field.order),
            placeholder: field.placeholder,
            required: field.required,
            row: String(field.row),
            type: field.type,
            widthInches: String(field.widthInches),
          })),
        },
      },
    });
    const bodySection = await prisma.prescriptionBodySetup.create({
      data: {
        ...payload.bodySection,
        prescriptionSetupId: newPrescriptionSetup.id,
        bodyLeftSideTopMargin: String(
          payload.bodySection.bodyLeftSideTopMargin,
        ),
        bodyLeftSideWidth: String(payload.bodySection.bodyLeftSideWidth),
        bodyRightSideTopMargin: String(
          payload.bodySection.bodyRightSideTopMargin,
        ),
        bodyRightSideWidth: String(payload.bodySection.bodyRightSideWidth),
      },
    });
    const footerSection = await prisma.prescriptionFooter.create({
      data: {
        ...payload.footerSection,
        prescriptionSetupId: newPrescriptionSetup.id,
      },
    });
    const headerSection = await prisma.prescriptionHeader.create({
      data: {
        ...payload.headerSection,
        prescriptionSetupId: newPrescriptionSetup.id,
      },
    });
    return {
      pageSetup,
      patientSection,
      bodySection,
      footerSection,
      headerSection,
    };
  });

  return response;
};

const getPrescriptionPageSetupAll = async (doctorId: string) => {
  const response = await prisma.prescriptionSetup.findMany({
    where: {
      doctorId: doctorId,
    },
    include: {
      chamber: true,
      doctor: true,
      PrescriptionBodySetup: true,
      PrescriptionHeader: true,
      PrescriptionPageSetup: true,
      PrescriptionPatientSetup: {
        include: {
          prescriptionPatientSetupFormField: true,
        },
      },
      PrescriptionFooter: true,
    },
  });

  return response;
};

export const PrescriptionPageSetupService = {
  createPrescriptionPageSetupIntoDB,
  getPrescriptionPageSetupAll,
};
