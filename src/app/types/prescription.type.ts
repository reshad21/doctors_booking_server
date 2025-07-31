/* eslint-disable @typescript-eslint/no-explicit-any */
export type TPrescription = {
  id?:string;
  patientId: string;
  doctorId:string;
  name: string;
  advice?: string;
  nextVisit?:string;
  onExaminations:any[];
  diagnosis:any[];
  investigation:any[];
  chiefComplaint:any[];
  tests:any[];
  medicines:any[];
  createdAt?:string;
  updatedAt?:string
};