import { Router } from 'express';
import { MedicineDosagesFrequencyDayInputController } from './medicineDosagesFrequencyDayInput.controller';
import auth from '../../middlewares/authorization';
import { UserType } from '../../context/userType';

const router = Router();

router.post(
  '/create-medicine-dosages-frequency-day',
  auth([UserType.DOCTOR, UserType.STAFF]),
  MedicineDosagesFrequencyDayInputController.createMedicineDosagesFrequencyDayInput,
);

router.get(
  '/get-medicine-dosages-frequency-day',
  auth([UserType.DOCTOR, UserType.STAFF]),
  MedicineDosagesFrequencyDayInputController.getAllMedicineDosagesFrequencyDayInputs,
);

router.get(
  '/:id',
  auth([UserType.DOCTOR, UserType.STAFF]),
  MedicineDosagesFrequencyDayInputController.getMedicineDosagesFrequencyDayInputById,
);

router.put(
  '/:id',
  auth([UserType.DOCTOR, UserType.STAFF]),
  MedicineDosagesFrequencyDayInputController.updateMedicineDosagesFrequencyDayInput,
);

router.delete(
  '/:id',
  auth([UserType.DOCTOR, UserType.STAFF]),
  MedicineDosagesFrequencyDayInputController.deleteMedicineDosagesFrequencyDayInput,
);

export const MedicineDosagesFrequencyDayInputRoutes = router;
