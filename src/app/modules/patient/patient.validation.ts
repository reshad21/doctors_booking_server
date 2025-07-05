import { z } from 'zod';

export const createPatientZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    phoneNumber: z.string({ required_error: 'Phone number is required' }),
    age: z.string({ required_error: 'Age is required' }),
    gender: z.string({ required_error: 'Gender is required' }),
    doctorId: z.string({ required_error: 'Doctor ID is required' }),
    email: z.string().optional(),
    weight: z.string().optional(),
    status: z.string().optional(),
    visitStatus: z.string().optional(),
  }),
});

export const PatientValidation = {
  createPatientZodSchema,
};
