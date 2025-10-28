import { Router } from 'express';
import validation from '../../middlewares/validation';
import { InvestigationInputController } from './InvestigationInput.controller';
import { InvestigationInputValidation } from './InvestigationInput.validation';

const router = Router();

router.post(
  '/',
  validation(InvestigationInputValidation.investigationInputValidation),
  InvestigationInputController.createInvestigationInput,
);

router.get('/', InvestigationInputController.getAllInvestigationInputs);
router.get('/:id', InvestigationInputController.getInvestigationInputById);

router.put(
  '/:id',
  validation(InvestigationInputValidation.investigationInputValidation),
  InvestigationInputController.updateInvestigationInput,
);

router.delete('/:id', InvestigationInputController.deleteInvestigationInput);

export const InvestigationInputRoutes = router;
