import { Router } from 'express';
import { MedicineTimeInputController } from './medicineTimeInput.controller';

const router = Router();

router.post('/create-medicine-time', MedicineTimeInputController.createMedicineTimeInput);
router.get('/get-medicine-time', MedicineTimeInputController.getAllMedicineTimeInputs);
router.get('/:id', MedicineTimeInputController.getMedicineTimeInputById);
router.put('/:id', MedicineTimeInputController.updateMedicineTimeInput);
router.delete('/:id', MedicineTimeInputController.deleteMedicineTimeInput);

export const MedicineTimeInputRoutes = router;
