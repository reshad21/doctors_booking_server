import { Router } from 'express';
import auth from '../../middlewares/authorization';
import { UserType } from '../../context/userType';
import validation from '../../middlewares/validation';
import { PatientValidation } from './patient.validation';
import { PatientController } from './patient.controller';

const router = Router();

router.post(
  '/create-patient',
  auth([UserType.DOCTOR, UserType.STAFF]),
  validation(PatientValidation.createPatientZodSchema),
  PatientController.createPatientHandler,
);

export const PatientRoutes = router;
