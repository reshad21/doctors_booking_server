import { Router } from 'express';
import validation from '../../middlewares/validation';
import { DiagnosisInputController } from './DiagnosisInput.controller';
import { DiagnosisInputValidation } from './DiagnosisInput.validation';

const router = Router();

router.post(
  '/',
  validation(DiagnosisInputValidation.diagnosisInputValidation),
  DiagnosisInputController.createDiagnosisInput,
);

router.get('/', DiagnosisInputController.getAllDiagnosisInputs);
router.get('/:id', DiagnosisInputController.getDiagnosisInputById);

router.put(
  '/:id',
  validation(DiagnosisInputValidation.diagnosisInputValidation),
  DiagnosisInputController.updateDiagnosisInput,
);

router.delete('/:id', DiagnosisInputController.deleteDiagnosisInput);

export const DiagnosisInputRoutes = router;
