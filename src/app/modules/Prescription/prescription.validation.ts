import { z } from 'zod';

export const prescriptionValidationSchema = z.object({
  body: z.object({
    patientId: z.string().min(1, 'patientId is required'),
    doctorId: z.string().min(1, 'doctorId is required'),
    name: z.string().min(1, 'Name is required'),
    advice: z.string().optional(),
    nextVisit: z.string().optional(),

    tests: z
      .array(
        z.object({
          description: z.string().min(1, 'Test description is required'),
        }),
      )
      .optional(),

    medicines: z
      .array(
        z.object({
          medicineName: z.string().min(1, 'Medicine name is required'),
          dosage: z.string().min(1, 'Dosage is required'),
          day: z.string().min(1, 'Day is required'),
          time: z.string().min(1, 'Time is required'),
          comment: z.string().optional(),
        }),
      )
      .optional(),

    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
  }),
});
export const prescriptionUpdateValidationSchema = z.object({
  body: z.object({
    id: z.string().min(1, 'Id is required').optional(),
    patientId: z.string().min(1, 'patientId is required').optional(),
    doctorId: z.string().min(1, 'doctorId is required').optional(),
    name: z.string().min(1, 'Name is required').optional(),
    advice: z.string().optional(),
    nextVisit: z.string().optional(),

    tests: z
      .array(
        z.object({
          description: z.string().min(1, 'Test description is required'),
        }),
      )
      .optional(),

    medicines: z
      .array(
        z.object({
          medicineName: z.string().min(1, 'Medicine name is required').optional(),
          dosage: z.string().min(1, 'Dosage is required').optional(),
          day: z.string().min(1, 'Day is required').optional(),
          time: z.string().min(1, 'Time is required').optional(),
          comment: z.string().optional(),
        }),
      )
      .optional(),

    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
  }),
});

export const prescriptionValidations = {
  prescriptionValidationSchema,
  prescriptionUpdateValidationSchema
};
