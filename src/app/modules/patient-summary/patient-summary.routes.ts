import { Router } from 'express';
import { PatientSummaryController } from './patient-summary.controller';
import auth from '../../middlewares/authorization';
import { UserType } from '../../context/userType';

const router = Router();

router.get(
  '/get-patient-summary',
  auth([UserType.DOCTOR, UserType.STAFF]),
  PatientSummaryController.getPatientSummary,
);

export const PatientSummaryRoutes = router;
