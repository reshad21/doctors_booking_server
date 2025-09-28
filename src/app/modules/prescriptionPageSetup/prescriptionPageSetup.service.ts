import {
  PrescriptionBodySetup,
  PrescriptionFooter,
  PrescriptionHeader,
  PrescriptionPageSetup,
  PrescriptionPatientSetup,
} from '@prisma/client';
import prisma from '../../../db/db.config';

interface IPrescriptionPageSetup {
  pageSetup: PrescriptionPageSetup;
  patientSection: PrescriptionPatientSetup;
  bodySection: PrescriptionBodySetup;
  footerSection: PrescriptionFooter;
  headerSection: PrescriptionHeader;
}

const createPrescriptionPageSetupIntoDB = async (
  payload: IPrescriptionPageSetup,
) => {
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
        ...payload.patientSection,
        
      },
    });
    const bodySection = await prisma.prescriptionBodySetup.create({
      data: payload.bodySection,
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
};

export const PrescriptionPageSetupService = {
  createPrescriptionPageSetupIntoDB,
};
