// ... existing code ...
import { Router } from 'express';
import { InvestigationController } from './investigation.controller';
import auth from '../../middlewares/authorization';
import { UserType } from '../../context/userType';

const router = Router();

router.post(
  '/create-investigation',
  auth([UserType.DOCTOR, UserType.STAFF]),
  InvestigationController.createInvestigation,
);

router.get(
  '/get-investigations',
  auth([UserType.DOCTOR, UserType.STAFF]),
  InvestigationController.getAllInvestigations,
);

router.get(
  '/:id',
  auth([UserType.DOCTOR, UserType.STAFF]),
  InvestigationController.getInvestigationById,
);

router.put(
  '/:id',
  auth([UserType.DOCTOR, UserType.STAFF]),
  InvestigationController.updateInvestigation,
);

router.delete(
  '/:id',
  auth([UserType.DOCTOR, UserType.STAFF]),
  InvestigationController.deleteInvestigation,
);

export const InvestigationRoutes = router;
