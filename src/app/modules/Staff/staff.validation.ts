import { z } from 'zod';

const crateStaffValidation = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email format'),
    name: z.string({ required_error: 'Name is required' }),
    doctorId: z.string({ required_error: 'doctorId is required' }),
    phone: z.string({ required_error: 'phone is required' }),
    image: z.any().optional(),
    staffImage: z.any().optional(),
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, 'Password must be at least 8 characters long'),
  }),
});

const loginStaffValidation = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email format'),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

export const allowDisallowPermissionSchema = z.object({
  body: z.array(
    z.object({
      id: z.string().uuid(),
      staffId: z.string().uuid(),
      allowed: z.boolean(),
    }),
  ),
});

export const staffValidations = {
  crateStaffValidation,
  loginStaffValidation,
  allowDisallowPermissionSchema,
};
