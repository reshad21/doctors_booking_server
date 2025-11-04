import { Router } from 'express';
import validation from '../../middlewares/validation';
import { TreatmentPlanInputController } from './TreatmentPlanInput.controller';
import { TreatmentPlanInputValidation } from './TreatmentPlanInput.validation';

const router = Router();

router.post(
  '/',
  validation(TreatmentPlanInputValidation.treatmentPlanInputValidation),
  TreatmentPlanInputController.createTreatmentPlanInput,
);

router.get('/', TreatmentPlanInputController.getAllTreatmentPlanInputs);
router.get('/:id', TreatmentPlanInputController.getTreatmentPlanInputById);

router.put(
  '/:id',
  validation(TreatmentPlanInputValidation.treatmentPlanInputValidation),
  TreatmentPlanInputController.updateTreatmentPlanInput,
);

router.delete('/:id', TreatmentPlanInputController.deleteTreatmentPlanInput);

export const TreatmentPlanInputRoutes = router;

