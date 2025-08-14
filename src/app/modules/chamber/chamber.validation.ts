import { z } from 'zod';

const createChamberValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'Chamber name is required' }),
    address: z.string().optional(),
    oldPatientFee: z.string({ required_error: 'Old patient fee is required' }),
    newPatientFee: z.string({ required_error: 'New patient fee is required' }),
    reportFee: z.string({ required_error: 'Report fee is required' }),
    status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
    day: z.string().optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  }),
});

const updateChamberValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    address: z.string().optional(),
    oldPatientFee: z.string().optional(),
    newPatientFee: z.string().optional(),
    reportFee: z.string().optional(),
    status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
    days: z.string().optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  }),
});

export const chamberValidations = {
  createChamberValidation,
  updateChamberValidation,
};
