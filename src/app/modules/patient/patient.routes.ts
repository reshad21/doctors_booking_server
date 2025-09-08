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

router.post(
  '/update-isArrived-status',
  auth([UserType.DOCTOR, UserType.STAFF]),
  validation(PatientValidation.updatePatientArrivedStatusZodSchema),
  PatientController.updatePatientArrivedStatus,
);

router.get(
  '/get-all-patients',
  auth([UserType.DOCTOR, UserType.STAFF]),
  PatientController.getPatientHandler,
);

router.get(
  '/get-patient/:id',
  // auth([UserType.DOCTOR, UserType.STAFF]),
  PatientController.getSinglePatient,
);

router.delete(
  '/:id',
  auth([UserType.DOCTOR, UserType.STAFF]),
  PatientController.deleteChamberHandler,
);
router.patch(
  '/amount/:id',
  auth([UserType.DOCTOR]),
  PatientController.updatePatientAmountHandler,
);

router.put(
  '/:id',
  auth([UserType.DOCTOR, UserType.STAFF]),
  validation(PatientValidation.updatePatientZodSchema),
  PatientController.updateChamberHandler,
);

export const PatientRoutes = router;
