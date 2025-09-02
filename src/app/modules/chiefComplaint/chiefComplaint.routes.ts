// ... existing code ...
import { Router } from 'express';
import { ChiefComplaintController } from './chiefComplaint.controller';
import auth from '../../middlewares/authorization';
import { UserType } from '../../context/userType';

const router = Router();

router.post(
  '/create-chiefComplaint',
  auth([UserType.DOCTOR, UserType.STAFF]),
  ChiefComplaintController.createChiefComplaint,
);

router.get(
  '/get-chiefComplaints',
  auth([UserType.DOCTOR, UserType.STAFF]),
  ChiefComplaintController.getAllChiefComplaints,
);

router.get(
  '/:id',
  auth([UserType.DOCTOR, UserType.STAFF]),
  ChiefComplaintController.getChiefComplaintById,
);

router.put(
  '/:id',
  auth([UserType.DOCTOR, UserType.STAFF]),
  ChiefComplaintController.updateChiefComplaint,
);

router.delete(
  '/:id',
  auth([UserType.DOCTOR, UserType.STAFF]),
  ChiefComplaintController.deleteChiefComplaint,
);

export const ChiefComplaintRoutes = router;
