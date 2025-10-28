import { Router } from 'express';
import validation from '../../middlewares/validation';
import { ChiefComplaintInputValidation } from './ChiefComplaintInput.validation';
import { ChiefComplaintInputController } from './ChiefComplaintInput.controller';

const router = Router();

router.post(
  '/',
  validation(ChiefComplaintInputValidation.chiefComplaintInputValidation),
  ChiefComplaintInputController.createChiefComplaintInput,
);

router.get('/', ChiefComplaintInputController.getAllChiefComplaintInputs);
router.get('/:id', ChiefComplaintInputController.getChiefComplaintInputById);

router.put(
  '/:id',
  validation(ChiefComplaintInputValidation.chiefComplaintInputValidation),
  ChiefComplaintInputController.updateChiefComplaintInput,
);

router.delete('/:id', ChiefComplaintInputController.deleteChiefComplaintInput);

export const ChiefComplaintInputRoutes = router;
