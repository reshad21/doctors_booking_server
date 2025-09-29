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

interface IPrescriptionPageSetup {
  pageSetup: PrescriptionPageSetup;
  patientSection: PrescriptionPatientSetup & {
    formFields: PrescriptionPatientSetupFormField[];
  };
  bodySection: PrescriptionBodySetup;
  footerSection: PrescriptionFooter;
  headerSection: PrescriptionHeader;
}

const createPrescriptionPageSetupIntoDB = async (
  payload: IPrescriptionPageSetup,
) => {
  console.log('payload', payload);

  const response = await prisma.$transaction(async (prisma) => {
    const pageSetup = await prisma.prescriptionPageSetup.create({
      data: {
        ...payload.pageSetup,
        totalHeight: String(payload.pageSetup.totalHeight),
        totalWidth: String(payload.pageSetup.totalWidth),
        leftMargin: String(payload.pageSetup.leftMargin),
        rightMargin: String(payload.pageSetup.rightMargin),
        topMargin: String(payload.pageSetup.topMargin),
        bottomMargin: String(payload.pageSetup.bottomMargin),
      },
    });
    const patientSection = await prisma.prescriptionPatientSetup.create({
      data: {
        ...(() => {
          const { formFields, ...rest } = payload.patientSection;
          return rest;
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
            doctorId: payload.patientSection.doctorId,
          })),
        },
      },
    });
    const bodySection = await prisma.prescriptionBodySetup.create({
      data: {
        ...payload.bodySection,
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
      data: payload.footerSection,
    });
    const headerSection = await prisma.prescriptionHeader.create({
      data: payload.headerSection,
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
  const response = await prisma.$transaction(async (prisma) => {
    const pageSetup = await prisma.prescriptionPageSetup.findMany({
      where: { doctorId },
    });
    const patientSection = await prisma.prescriptionPatientSetup.findMany({
      where: { doctorId },
      include: { prescriptionPatientSetupFormField: true },
    });
    const bodySection = await prisma.prescriptionBodySetup.findMany({
      where: { doctorId },
    });
    const footerSection = await prisma.prescriptionFooter.findMany({
      where: { doctorId },
    });
    const headerSection = await prisma.prescriptionHeader.findMany({
      where: { doctorId },
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

export const PrescriptionPageSetupService = {
  createPrescriptionPageSetupIntoDB,
  getPrescriptionPageSetupAll,
};
