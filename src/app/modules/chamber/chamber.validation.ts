import { z } from 'zod';

const createChamberValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'Chamber name is required' }),
    address: z.string({ required_error: 'Chamber address is required' }),
    oldPatientFee: z.string({ required_error: 'Old patient fee is required' }),
    newPatientFee: z.string({ required_error: 'New patient fee is required' }),
    reportFee: z.string({ required_error: 'Report fee is required' }),
    status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
    startTime: z
      .string({ required_error: 'Start time is required' })
      .optional(),
    endTime: z.string({ required_error: 'End time is required' }).optional(),
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
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  }),
});

export const chamberValidations = {
  createChamberValidation,
  updateChamberValidation,
};
