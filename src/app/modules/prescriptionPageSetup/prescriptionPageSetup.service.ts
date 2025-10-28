/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from '../../../db/db.config';
import AppError from '../../errors/AppError';
import { User } from '../../types/user.type';
import { getDoctorIdForUser } from '../../utils/getDoctorId';
import { IPrescriptionPageSetup } from './prescription.types';

const createPrescriptionPageSetupIntoDB = async (
  payload: IPrescriptionPageSetup,
) => {
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

const updatePrescriptionPageSetupInDB = async (
  id: string,
  payload: Partial<IPrescriptionPageSetup>,
) => {
  const prescriptionSetup = await prisma.prescriptionSetup.findUnique({
    where: { id },
    include: {
      PrescriptionFooter: true,
      PrescriptionHeader: true,
    },
  });

  if (!prescriptionSetup) {
    throw new AppError(404, 'Prescription setup not found');
  }

  return await prisma.$transaction(async (prisma) => {
    let updatedPageSetup,
      updatedPatientSection,
      updatedBodySection,
      updatedFooterSection,
      updatedHeaderSection;

    if (payload.pageSetup) {
      updatedPageSetup = await prisma.prescriptionPageSetup.updateMany({
        where: { prescriptionSetupId: id },
        data: {
          totalHeight: String(payload.pageSetup.totalHeight),
          totalWidth: String(payload.pageSetup.totalWidth),
          leftMargin: String(payload.pageSetup.leftMargin),
          rightMargin: String(payload.pageSetup.rightMargin),
          topMargin: String(payload.pageSetup.topMargin),
          bottomMargin: String(payload.pageSetup.bottomMargin),
        },
      });
    }

    if (payload.patientSection) {
      const { formFields, ...rest } = payload.patientSection;
      updatedPatientSection = await prisma.prescriptionPatientSetup.updateMany({
        where: { prescriptionSetupId: id },
        data: { ...rest },
      });

      if (formFields) {
        // Remove old fields
        await prisma.prescriptionPatientSetupFormField.deleteMany({
          where: {
            prescriptionPatientSetup: {
              prescriptionSetupId: id,
            },
          },
        });
        // Add new fields
        const patientSectionRecord =
          await prisma.prescriptionPatientSetup.findFirst({
            where: { prescriptionSetupId: id },
          });
        if (patientSectionRecord) {
          await prisma.prescriptionPatientSetupFormField.createMany({
            data: formFields.map((field) => ({
              prescriptionPatientSetupId: patientSectionRecord.id,
              defaultValue: field.defaultValue,
              label: field.label,
              order: String(field.order),
              placeholder: field.placeholder,
              required: field.required,
              row: String(field.row),
              type: field.type,
              widthInches: String(field.widthInches),
            })),
          });
        }
      }
    }

    if (payload.bodySection) {
      updatedBodySection = await prisma.prescriptionBodySetup.updateMany({
        where: { prescriptionSetupId: id },
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
    }

    if (payload.footerSection) {
      updatedFooterSection = await prisma.prescriptionFooter.updateMany({
        where: { prescriptionSetupId: id },
        data: {
          ...payload.footerSection,
          logo: payload.footerSection.logo
            ? payload.footerSection.logo
            : prescriptionSetup.PrescriptionFooter[0].logo,
        },
      });
    }

    if (payload.headerSection) {
      updatedHeaderSection = await prisma.prescriptionHeader.updateMany({
        where: { prescriptionSetupId: id },
        data: {
          ...payload.headerSection,
          logo: payload.headerSection.logo
            ? payload.headerSection.logo
            : prescriptionSetup.PrescriptionHeader[0].logo,
        },
      });
    }

    return {
      pageSetup: updatedPageSetup,
      patientSection: updatedPatientSection,
      bodySection: updatedBodySection,
      footerSection: updatedFooterSection,
      headerSection: updatedHeaderSection,
    };
  });
};

const getPrescriptionPageSetupAll = async (user: User) => {
  const doctorId = await getDoctorIdForUser(user);
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

const getPrescriptionPageSetup = async (id: string) => {
  const response = await prisma.prescriptionSetup.findUniqueOrThrow({
    where: { id },
    include: {
      chamber: true,
      doctor: true,
      PrescriptionBodySetup: true,
      PrescriptionHeader: true,
      PrescriptionFooter: true,
      PrescriptionPageSetup: true,
      PrescriptionPatientSetup: {
        include: {
          prescriptionPatientSetupFormField: true,
        },
      },
    },
  });

  return response;
};

const deletePrescriptionPageSetup = async (id: string) => {
  const response = await prisma.prescriptionSetup.delete({ where: { id } });

  return response;
};

const updateStatus = async (id: string) => {
  const existingStatus = await prisma.prescriptionSetup.findUniqueOrThrow({
    where: { id },
  });

  const newStatus = !(existingStatus.isActive ?? false);

  const response = await prisma.prescriptionSetup.update({
    where: { id },
    data: {
      isActive: newStatus,
    },
  });

  return response;
};

export const PrescriptionPageSetupService = {
  createPrescriptionPageSetupIntoDB,
  updatePrescriptionPageSetupInDB,
  getPrescriptionPageSetupAll,
  getPrescriptionPageSetup,
  deletePrescriptionPageSetup,
  updateStatus,
};
