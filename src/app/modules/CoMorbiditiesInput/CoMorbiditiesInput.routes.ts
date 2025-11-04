import { Router } from 'express';
import validation from '../../middlewares/validation';
import { CoMorbiditiesInputController } from './CoMorbiditiesInput.controller';
import { CoMorbiditiesInputValidation } from './CoMorbiditiesInput.validation';

const router = Router();

router.post(
  '/',
  validation(CoMorbiditiesInputValidation.coMorbiditiesInputValidation),
  CoMorbiditiesInputController.createCoMorbiditiesInput,
);

router.get('/', CoMorbiditiesInputController.getAllCoMorbiditiesInputs);
router.get('/:id', CoMorbiditiesInputController.getCoMorbiditiesInputById);

router.put(
  '/:id',
  validation(CoMorbiditiesInputValidation.coMorbiditiesInputValidation),
  CoMorbiditiesInputController.updateCoMorbiditiesInput,
);

router.delete('/:id', CoMorbiditiesInputController.deleteCoMorbiditiesInput);

export const CoMorbiditiesInputRoutes = router;

