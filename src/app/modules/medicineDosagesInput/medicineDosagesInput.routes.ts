import { Router } from 'express';
import { MedicineDosagesInputController } from './medicineDosagesInput.controller';

const router = Router();

router.post('/create-medicine-dosages', MedicineDosagesInputController.createMedicineDosagesInput);
router.get('/get-medicine-dosages', MedicineDosagesInputController.getAllMedicineDosagesInputs);
router.get('/:id', MedicineDosagesInputController.getMedicineDosagesInputById);
router.put('/:id', MedicineDosagesInputController.updateMedicineDosagesInput);
router.delete('/:id', MedicineDosagesInputController.deleteMedicineDosagesInput);

export const MedicineDosagesInputRoutes = router;
