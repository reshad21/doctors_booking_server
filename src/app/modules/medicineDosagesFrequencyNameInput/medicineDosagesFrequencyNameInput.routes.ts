import { Router } from 'express';
import { MedicineDosagesFrequencyNameInputController } from './medicineDosagesFrequencyNameInput.controller';
import auth from '../../middlewares/authorization';
import { UserType } from '../../context/userType';

const router = Router();

router.post(
  '/create-medicine-dosages-frequency-name',
  auth([UserType.DOCTOR, UserType.STAFF]),
  MedicineDosagesFrequencyNameInputController.createMedicineDosagesFrequencyNameInput,
);

router.get(
  '/get-medicine-dosages-frequency-name',
  auth([UserType.DOCTOR, UserType.STAFF]),
  MedicineDosagesFrequencyNameInputController.getAllMedicineDosagesFrequencyNameInputs,
);

router.get(
  '/:id',
  auth([UserType.DOCTOR, UserType.STAFF]),
  MedicineDosagesFrequencyNameInputController.getMedicineDosagesFrequencyNameInputById,
);

router.put(
  '/:id',
  auth([UserType.DOCTOR, UserType.STAFF]),
  MedicineDosagesFrequencyNameInputController.updateMedicineDosagesFrequencyNameInput,
);

router.delete(
  '/:id',
  auth([UserType.DOCTOR, UserType.STAFF]),
  MedicineDosagesFrequencyNameInputController.deleteMedicineDosagesFrequencyNameInput,
);

export const MedicineDosagesFrequencyNameInputRoutes = router;
