import { z } from 'zod';

const loginValidation = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email format'),
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, 'Password must be at least 8 characters long'),
  }),
});


const createDoctorSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email format"),
    password: z.string(),
    phone: z.string().min(10, "Phone number is too short"),
    image: z.string().optional(),
  })
});


export const authValidations = {
  loginValidation,
  createDoctorSchema
};