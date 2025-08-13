import { Router } from 'express';
import validation from '../../middlewares/validation';
import { adviceTableValidations } from './adviceTable.validation';
import { AdviceTableController } from './adviceTable.controller';
import { UserType } from '../../context/userType';
import auth from '../../middlewares/authorization';

const router = Router();

router.post(
  '/advice-create',
  auth([UserType.DOCTOR, UserType.STAFF]),
  validation(adviceTableValidations.createAdviceValidation),
  AdviceTableController.createAdvice,
);

router.get('/get-advice',
  auth([UserType.DOCTOR, UserType.STAFF]),
  AdviceTableController.getAllAdvices
);

router.get('/:id', AdviceTableController.getAdviceById);

router.put(
  '/:id',
  validation(adviceTableValidations.updateAdviceValidation),
  AdviceTableController.updateAdvice,
);

router.delete('/:id', AdviceTableController.deleteAdvice);

export const AdviceTableRoutes = router;