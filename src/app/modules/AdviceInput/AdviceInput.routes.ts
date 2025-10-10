import { Router } from 'express';
import validation from '../../middlewares/validation';
import { AdviceInputController } from './AdviceInput.controller';
import { AdviceInputValidation } from './AdviceInput.validation';

const router = Router();

router.post(
  '/',
  validation(AdviceInputValidation.adviceInputValidation),
  AdviceInputController.createAdviceInput,
);

router.get('/', AdviceInputController.getAllAdviceInputs);
router.get('/:id', AdviceInputController.getAdviceInputById);

router.put(
  '/:id',
  validation(AdviceInputValidation.adviceInputValidation),
  AdviceInputController.updateAdviceInput,
);

router.delete('/:id', AdviceInputController.deleteAdviceInput);

export const AdviceInputRoutes = router;
