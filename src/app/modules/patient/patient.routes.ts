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

router.get(
  '/get-all-patients',
  auth([UserType.DOCTOR, UserType.STAFF]),
  PatientController.getPatientHandler,
);

router.delete(
  '/:id',
  auth([UserType.DOCTOR, UserType.STAFF]),
  PatientController.deleteChamberHandler,
);

router.put(
  '/:id',
  auth([UserType.DOCTOR, UserType.STAFF]),
  PatientController.updateChamberHandler,
);

export const PatientRoutes = router;
