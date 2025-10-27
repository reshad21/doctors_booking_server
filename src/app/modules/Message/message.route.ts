import { Router } from 'express';
import validation from '../../middlewares/validation';
import { MessageController } from './message.controller';
import { MessageValidation } from './message.validation';

const router = Router();

router.post(
  '/single-message',
  validation(MessageValidation.singleMessageZodSchema),
 MessageController.sendMessageHandler
);

router.post(
  '/message',
  validation(MessageValidation.messageZodSchema),
 MessageController.sendMultipleMessageHandler
);

export const MessageRoutes = router;
