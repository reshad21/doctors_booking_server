
import { z } from 'zod';

const watchVideoValidation = z.object({
  body: z.object({
    VideoFile: z.string({ required_error: 'VideoFile is required' }),
  }),
});

export const watchVideoValidations = {
  watchVideoValidation,
};
