import { Router } from 'express';
import { MedicalInputController } from './medicinesList.controller';

const router = Router();

router.get('/get-medicines', MedicalInputController.getAllMedicalInputs);

export const MedicinesRoutes = router;
