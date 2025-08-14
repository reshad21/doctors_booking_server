import { Router } from 'express';
import { DiagnosisController } from './diagnosis.controller';

const router = Router();

router.post('/create-diagnosis', DiagnosisController.createDiagnosis);
router.get('/get-diagnoses', DiagnosisController.getAllDiagnoses);
router.get('/:id', DiagnosisController.getDiagnosisById);
router.put('/:id', DiagnosisController.updateDiagnosis);
router.delete('/:id', DiagnosisController.deleteDiagnosis);

export const DiagnosisRoutes = router;
