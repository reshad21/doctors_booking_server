import { Router } from 'express';
import validation from '../../middlewares/validation';
import { OnExaminationsInputController } from './OnExaminationsInput.controller';
import { OnExaminationsInputValidation } from './OnExaminationsInput.validation';

const router = Router();

router.post(
  '/',
  validation(OnExaminationsInputValidation.onExaminationsInputValidation),
  OnExaminationsInputController.createOnExaminationsInput,
);

router.get('/', OnExaminationsInputController.getAllOnExaminationsInputs);
router.get('/:id', OnExaminationsInputController.getOnExaminationsInputById);

router.put(
  '/:id',
  validation(OnExaminationsInputValidation.onExaminationsInputValidation),
  OnExaminationsInputController.updateOnExaminationsInput,
);

router.delete('/:id', OnExaminationsInputController.deleteOnExaminationsInput);

export const OnExaminationsInputRoutes = router;
