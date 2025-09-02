import { Router } from 'express';
import { MedicineDosagesInputController } from './medicineDosagesInput.controller';
import auth from '../../middlewares/authorization';
import { UserType } from '../../context/userType';

const router = Router();

router.post(
  '/create-medicine-dosages',
  auth([UserType.DOCTOR, UserType.STAFF]),
  MedicineDosagesInputController.createMedicineDosagesInput,
);

router.get(
  '/get-medicine-dosages',
  auth([UserType.DOCTOR, UserType.STAFF]),
  MedicineDosagesInputController.getAllMedicineDosagesInputs,
);

router.get(
  '/:id',
  auth([UserType.DOCTOR, UserType.STAFF]),
  MedicineDosagesInputController.getMedicineDosagesInputById,
);

router.put(
  '/:id',
  auth([UserType.DOCTOR, UserType.STAFF]),
  MedicineDosagesInputController.updateMedicineDosagesInput,
);

router.delete(
  '/:id',
  auth([UserType.DOCTOR, UserType.STAFF]),
  MedicineDosagesInputController.deleteMedicineDosagesInput,
);

export const MedicineDosagesInputRoutes = router;
