export type TDosageNote = {
  qty: string;
  unit: string;
  freq: string;
  freqUnit: string;
};

// --- DosageSchedule ---
export type TDosageSchedule = {
  dosage?: string;
  day: string;
  time: string;
  comment?: string;
  dosageNotes?: TDosageNote[];
};

// --- Medicine ---
export type TMedicine = {
  medicineName: string;
  DosageSchedule: TDosageSchedule[];
};

// --- Prescription (for API/UI shape) ---
export type TPrescription = {
  patientId: string;
  doctorId: string;
  advice: string;
  nextVisit?: string;
  medicines: TMedicine[];
  chiefComplaint: { description: string }[];
  onExaminations: { description: string }[];
  diagnosis: { description: string }[];
  investigation: { description: string }[];
};

// --- Interfaces for internal usage ---
export interface DosageNoteData {
  qty: string;
  unit: string;
  freq: string;
  freqUnit: string;
}

export interface DosageScheduleData {
  dosage?: string;
  day: string;
  time: string;
  comment?: string;
  dosageNotes?: DosageNoteData[]; // NEW
}

export interface MedicineOption {
  value: string;
  label: string;
}

export interface MedicineData {
  medicineName: string | MedicineOption;
  DosageSchedule: DosageScheduleData[];
}

export interface PrescriptionData {
  id?: string;
  doctorId: string;
  patientId: string;
  medicines: MedicineData[];
  chiefComplaint: string[];
  onExaminations: string[];
  diagnosis: string[];
  nextVisit: string;
  investigation: string[];
  advice: string[]; // changed from [] → string[]
  prescriptionNo: string;
}
