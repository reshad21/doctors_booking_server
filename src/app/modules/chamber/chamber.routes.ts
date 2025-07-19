import { Router } from 'express';
import { chamberValidations } from './chamber.validation';
import validation from '../../middlewares/validation';
import { ChamberController } from './chamber.controller';
import auth from '../../middlewares/authorization';
import { UserType } from '../../context/userType';

const router = Router();

router.post(
  '/create-chamber',
  auth([UserType.DOCTOR, UserType.STAFF]),
  validation(chamberValidations.createChamberValidation),
  ChamberController.createChamber,
);

router.get('/get-chambers', ChamberController.getAllChambers);

router.get('/:id', ChamberController.getChamberById);

router.put(
  '/:id',
  auth([UserType.DOCTOR, UserType.STAFF]),
  validation(chamberValidations.updateChamberValidation),
  ChamberController.updateChamber,
);

router.delete(
  '/:id',
  auth([UserType.DOCTOR, UserType.STAFF]),
  ChamberController.deleteChamber
);

export const ChamberRoutes = router;
