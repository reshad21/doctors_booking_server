import { z } from 'zod';

const createAdviceValidation = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    content: z.string({ required_error: 'Content is required' }),
  status: z.string({ required_error: 'Status is required' }),
  }),
});

const updateAdviceValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    status: z.string().optional(),
  }),
});

export const adviceTableValidations = {
  createAdviceValidation,
  updateAdviceValidation,
};
