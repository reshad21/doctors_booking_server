import { Router } from 'express';
import { MedicalInputController } from './medicinesList.controller';

const router = Router();

router.get('/get-medicines', MedicalInputController.getAllMedicalInputs);

router.post('/', MedicalInputController.createMedicineInput);

router.put('/:id', MedicalInputController.updateMedicineInput);

router.delete('/:id', MedicalInputController.deleteMedicineInput);

export const MedicinesRoutes = router;
