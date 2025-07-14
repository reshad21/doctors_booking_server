
import { Router } from 'express';
import { PrescriptionController } from './prescription.controller';
import { prescriptionValidations } from './prescription.validation';
import validation from '../../middlewares/validation';

const router = Router();

router.post(
  '/create-prescription',
  validation(prescriptionValidations.prescriptionValidationSchema),   
PrescriptionController.createPrescription
);
router.get(
  '/:patientId',  
PrescriptionController.getPrescriptionByPatientId
);
export const PrescriptionRoutes = router;