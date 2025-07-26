import { Router } from 'express';
import { visitValidations } from './visit.validation';
import validation from '../../middlewares/validation';
import { VisitController } from './visit.controller';
import auth from '../../middlewares/authorization';
import { UserType } from '../../context/userType';

const router = Router();

router.post(
  '/create-visit',
  auth([UserType.DOCTOR, UserType.STAFF]),
  validation(visitValidations.createVisitValidation),
  VisitController.createVisit,
);

router.get('/get-visits', VisitController.getAllVisits);
router.get('/:id', VisitController.getVisitById);
router.put(
  '/:id',
  validation(visitValidations.updateVisitValidation),
  VisitController.updateVisit,
);
router.delete('/:id', VisitController.deleteVisit);

export const VisitRoutes = router;
