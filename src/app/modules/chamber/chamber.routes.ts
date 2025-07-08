import { Router } from 'express';
import { chamberValidations } from './chamber.validation';
import validation from '../../middlewares/validation';
import { ChamberController } from './chamber.controller';

const router = Router();

router.post(
  '/create-chamber',
  validation(chamberValidations.createChamberValidation),
  ChamberController.createChamber,
);

router.get('/get-chambers', ChamberController.getAllChambers);
// router.get('/:id');
// router.put('/:id');
// router.delete('/:id');

export const ChamberRoutes = router;
