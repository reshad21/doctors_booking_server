import { z } from 'zod';

export const singleMessageZodSchema = z.object({
  body: z.object({
    message: z.string({ required_error: 'Message is required' }),
    number: z.string({ required_error: 'Number is required' }),
    
  }),
});
export const messageZodSchema = z.object({
  body: z.object({
    message: z.string({ required_error: 'Message is required' }),
    
  }),
});

export const MessageValidation = {
  singleMessageZodSchema,
  messageZodSchema
};
