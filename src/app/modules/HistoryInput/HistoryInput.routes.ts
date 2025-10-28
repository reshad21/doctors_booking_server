import { Router } from 'express';
import validation from '../../middlewares/validation';
import { HistoryInputController } from './HistoryInput.controller';
import { HistoryInputValidation } from './HistoryInput.validation';

const router = Router();

router.post(
  '/',
  validation(HistoryInputValidation.historyInputValidation),
  HistoryInputController.createHistoryInput,
);

router.get('/', HistoryInputController.getAllHistoryInputs);
router.get('/:id', HistoryInputController.getHistoryInputById);

router.put(
  '/:id',
  validation(HistoryInputValidation.historyInputValidation),
  HistoryInputController.updateHistoryInput,
);

router.delete('/:id', HistoryInputController.deleteHistoryInput);

export const HistoryInputRoutes = router;
