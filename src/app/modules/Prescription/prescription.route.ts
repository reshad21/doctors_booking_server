
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
router.post(
  '/create-createExtraAdvice',
  // validation(prescriptionValidations.prescriptionValidationSchema),   
PrescriptionController.createExtraAdvice
);
router.patch(
  '/update-prescription',
  validation(prescriptionValidations.prescriptionUpdateValidationSchema),   
PrescriptionController.updatePrescription
);
router.get(
  '/:patientId',  
PrescriptionController.getPrescriptionByPatientId
);
export const PrescriptionRoutes = router;