import { z } from 'zod';

const createDisplayNoticeValidation = z.object({
  body: z.object({
    description: z.string({ required_error: 'Description is required' }),
    status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
  }),
});

const updateDisplayNoticeValidation = z.object({
  body: z.object({
    description: z.string().optional(),
    status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
  }),
});

export const displayNoticeTableValidations = {
  createDisplayNoticeValidation,
  updateDisplayNoticeValidation,
};