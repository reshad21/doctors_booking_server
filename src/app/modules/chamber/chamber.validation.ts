import { z } from 'zod';

const createChamberValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'Chamber name is required' }),
    address: z.string({ required_error: 'Chamber address is required' }),
    oldPatientFee: z.string({ required_error: 'Old patient fee is required' }),
    newPatientFee: z.string({ required_error: 'New patient fee is required' }),
    reportFee: z.string({ required_error: 'Report fee is required' }),
    status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
    startTime: z.string({ required_error: 'Start time is required' }).optional(),
    endTime: z.string({ required_error: 'End time is required' }).optional(),
    doctorId: z.string({ required_error: 'Doctor ID is required' }),
  }),
});

export const chamberValidations = {
  createChamberValidation,
};
