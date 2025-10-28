import {
  PrescriptionBodySetup,
  PrescriptionFooter,
  PrescriptionHeader,
  PrescriptionPageSetup,
  PrescriptionPatientSetup,
  PrescriptionPatientSetupFormField,
} from '@prisma/client';

export interface IPrescriptionPageSetup {
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