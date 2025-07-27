import { z } from 'zod';

const createVisitValidation = z.object({
  body: z.object({
    patientId: z.string({ required_error: 'Patient ID is required' }),
    doctorId: z.string({ required_error: 'Doctor ID is required' }),
    visitDate: z.string().optional(),
    type: z.enum(['NEW', 'OLD', 'REPORT']),
    fee: z.number({ required_error: 'Fee is required' }),
  }),
});

const updateVisitValidation = z.object({
  body: z.object({
    visitDate: z.string().optional(),
    type: z.enum(['NEW', 'OLD', 'REPORT']).optional(),
    fee: z.number().optional(),
  }),
});

export const visitValidations = {
  createVisitValidation,
  updateVisitValidation,
};
