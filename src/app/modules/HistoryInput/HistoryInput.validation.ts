import { z } from 'zod';

const historyInputValidation = z.object({
  body: z.object({
    value: z.string({ required_error: 'Value is required' }),
    doctorId: z.string({ required_error: 'Doctor ID is required' }),
  }),
});

export const HistoryInputValidation = {
  historyInputValidation,
};
