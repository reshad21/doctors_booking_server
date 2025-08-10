// ... existing code ...
import { Router } from 'express';
import { InvestigationController } from './investigation.controller';

const router = Router();

router.post('/create-investigation', InvestigationController.createInvestigation);
router.get('/get-investigations', InvestigationController.getAllInvestigations);
router.get('/:id', InvestigationController.getInvestigationById);
router.put('/:id', InvestigationController.updateInvestigation);
router.delete('/:id', InvestigationController.deleteInvestigation);

export const InvestigationRoutes = router;
// ... existing code ...