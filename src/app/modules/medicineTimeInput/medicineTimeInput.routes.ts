import { Router } from 'express';
import { MedicineTimeInputController } from './medicineTimeInput.controller';
import auth from '../../middlewares/authorization';
import { UserType } from '../../context/userType';

const router = Router();

router.post(
  '/create-medicine-time',
  auth([UserType.DOCTOR, UserType.STAFF]),
  MedicineTimeInputController.createMedicineTimeInput,
);

router.get(
  '/get-medicine-time',
  auth([UserType.DOCTOR, UserType.STAFF]),
  MedicineTimeInputController.getAllMedicineTimeInputs,
);

router.get(
  '/:id',
  auth([UserType.DOCTOR, UserType.STAFF]),
  MedicineTimeInputController.getMedicineTimeInputById,
);

router.put(
  '/:id',
  auth([UserType.DOCTOR, UserType.STAFF]),
  MedicineTimeInputController.updateMedicineTimeInput,
);

router.delete(
  '/:id',
  auth([UserType.DOCTOR, UserType.STAFF]),
  MedicineTimeInputController.deleteMedicineTimeInput,
);

export const MedicineTimeInputRoutes = router;
