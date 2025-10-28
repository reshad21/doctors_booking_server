import { Router } from 'express';
import validation from '../../middlewares/validation';
import { NextVisitInputController } from './NextVisitInput.controller';
import { NextVisitInputValidation } from './NextVisitInput.validation';

const router = Router();

router.post(
  '/',
  validation(NextVisitInputValidation.nextVisitInputValidation),
  NextVisitInputController.createNextVisitInput,
);

router.get('/', NextVisitInputController.getAllNextVisitInputs);
router.get('/:id', NextVisitInputController.getNextVisitInputById);

router.put(
  '/:id',
  validation(NextVisitInputValidation.nextVisitInputValidation),
  NextVisitInputController.updateNextVisitInput,
);

router.delete('/:id', NextVisitInputController.deleteNextVisitInput);

export const NextVisitInputRoutes = router;
