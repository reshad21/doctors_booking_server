// types/prescription.types.ts
export type TDosageSchedule = {
  dosage: string;
  day: string;
  time: string;
  comment?: string;
};

export type TMedicine = {
  medicineName: string;
  DosageSchedule: TDosageSchedule[];
};

export type TPrescription = {
  patientId: string;
  doctorId: string;
  advice: string;
  nextVisit?: string;
  medicines: TMedicine[];
  tests: { description: string }[];
  chiefComplaint: { description: string }[];
  onExaminations: { description: string }[];
  diagnosis: { description: string }[];
  investigation: { description: string }[];
};

export interface DosageScheduleData {
  dosage: string;
  day: string;
  time: string;
  comment?: string;
}

export interface MedicineData {
  medicineName: string;
  DosageSchedule: DosageScheduleData[];
}

export interface PrescriptionData {
  id?: string ;
  doctorId: string;
  patientId: string;
  medicines: MedicineData[];
  chiefComplaint: string[];
  onExaminations: string[];
  diagnosis: string[];
  nextVisit: string;
  investigation: string[];
  advice: [];
}