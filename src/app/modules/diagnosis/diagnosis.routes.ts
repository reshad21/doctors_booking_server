import { Router } from 'express';
import { DiagnosisController } from './diagnosis.controller';
import auth from '../../middlewares/authorization';
import { UserType } from '../../context/userType';

const router = Router();

router.post(
  '/create-diagnosis',
  auth([UserType.DOCTOR, UserType.STAFF]),
  DiagnosisController.createDiagnosis,
);

router.get(
  '/get-diagnoses',
  auth([UserType.DOCTOR, UserType.STAFF]),
  DiagnosisController.getAllDiagnoses,
);

router.get(
  '/:id',
  auth([UserType.DOCTOR, UserType.STAFF]),
  DiagnosisController.getDiagnosisById,
);

router.put(
  '/:id',
  auth([UserType.DOCTOR, UserType.STAFF]),
  DiagnosisController.updateDiagnosis,
);

router.delete(
  '/:id',
  auth([UserType.DOCTOR, UserType.STAFF]),
  DiagnosisController.deleteDiagnosis,
);

export const DiagnosisRoutes = router;
