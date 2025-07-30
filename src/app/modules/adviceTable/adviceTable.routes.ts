import { Router } from 'express';
import validation from '../../middlewares/validation';
import { adviceTableValidations } from './adviceTable.validation';
import { AdviceTableController } from './adviceTable.controller';

const router = Router();

router.post(
  '/advice-create',
  validation(adviceTableValidations.createAdviceValidation),
  AdviceTableController.createAdvice,
);

router.get('/get-advice', AdviceTableController.getAllAdvices);

router.get('/:id', AdviceTableController.getAdviceById);

router.put(
  '/:id',
  validation(adviceTableValidations.updateAdviceValidation),
  AdviceTableController.updateAdvice,
);

router.delete('/:id', AdviceTableController.deleteAdvice);

export const AdviceTableRoutes = router;