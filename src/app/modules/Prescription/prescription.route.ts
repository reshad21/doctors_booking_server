import { Router } from 'express';
import { PrescriptionController } from './prescription.controller';
import auth from '../../middlewares/authorization';
import { UserType } from '../../context/userType';

const router = Router();

router.get('/exceptional-advice', PrescriptionController.getExceptionalAdvice);
router.get('/:patientId', PrescriptionController.getPrescriptionByPatientId);
router.get('/single/:id', PrescriptionController.getPrescriptionById);
router.post(
  '/create-prescription',
  auth([UserType.DOCTOR, UserType.STAFF]),
  // validation(prescriptionValidations.prescriptionValidationSchema),
  PrescriptionController.createPrescription,
);


// router.patch(
//   '/update-prescription',
//   // validation(prescriptionValidations.prescriptionUpdateValidationSchema),
//   PrescriptionController.updatePrescription,
// );

export const PrescriptionRoutes = router;
