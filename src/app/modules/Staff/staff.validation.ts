import { z } from 'zod';

const crateStaffValidation = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email format'),
    name: z
      .string({ required_error: 'Name is required' }),
    token: z
      .string({ required_error: 'token is required' }),
    phone: z
      .string({ required_error: 'phone is required' }),
       image: z.string().optional(),
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, 'Password must be at least 8 characters long'),
  }),
});


export const staffValidations = {
  crateStaffValidation,
};