import { Router } from 'express';
import { OnExaminationController } from './onExamination.controller';
import auth from '../../middlewares/authorization';
import { UserType } from '../../context/userType';

const router = Router();

router.post(
  '/create-onExamination',
  auth([UserType.DOCTOR, UserType.STAFF]),
  OnExaminationController.createOnExamination,
);

router.get(
  '/get-onExaminations',
  auth([UserType.DOCTOR, UserType.STAFF]),
  OnExaminationController.getAllOnExaminations,
);

router.get(
  '/:id',
  auth([UserType.DOCTOR, UserType.STAFF]),
  OnExaminationController.getOnExaminationById,
);

router.put(
  '/:id',
  auth([UserType.DOCTOR, UserType.STAFF]),
  OnExaminationController.updateOnExamination,
);

router.delete(
  '/:id',
  auth([UserType.DOCTOR, UserType.STAFF]),
  OnExaminationController.deleteOnExamination,
);

export const OnExaminationRoutes = router;
