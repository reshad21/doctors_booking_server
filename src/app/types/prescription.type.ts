/* eslint-disable @typescript-eslint/no-explicit-any */
export type TPrescription = {
  patientId: string;
  doctorId:string;
  name: string;
  advice?: string;
  nextVisit?:string;
  tests:any[];
  medicines:any[];
  createdAt?:string;
  updatedAt?:string
};