
import { z } from 'zod';

const createWatchVideoValidation = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    videoFile: z.string({ required_error: 'VideoFile is required' }),
  }),
});

const updateWatchVideoValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    status: z.string().optional(),
  }),
});



export const watchVideoValidations = {
  createWatchVideoValidation,
  updateWatchVideoValidation
};
