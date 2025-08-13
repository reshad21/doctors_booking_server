import { Router } from 'express';
import { OnExaminationController } from './onExamination.controller';

const router = Router();

router.post('/create-onExamination', OnExaminationController.createOnExamination);
router.get('/get-onExaminations', OnExaminationController.getAllOnExaminations);
router.get('/:id', OnExaminationController.getOnExaminationById);
router.put('/:id', OnExaminationController.updateOnExamination);
router.delete('/:id', OnExaminationController.deleteOnExamination);

export const OnExaminationRoutes = router;