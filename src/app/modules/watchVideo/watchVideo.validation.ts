
import { z } from 'zod';

const createWatchVideoValidation = z.object({
  body: z.object({
    videoFile: z.string({ required_error: 'VideoFile is required' }),
  }),
});

const updateWatchVideoValidation = z.object({
  body: z.object({
    status: z.string({ required_error: 'Status is required' }),
  }),
});



export const watchVideoValidations = {
  createWatchVideoValidation,
  updateWatchVideoValidation
};
