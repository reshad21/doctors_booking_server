// ... existing code ...
import { Router } from 'express';
import { ChiefComplaintController } from './chiefComplaint.controller';


const router = Router();

router.post('/create-chiefComplaint', ChiefComplaintController.createChiefComplaint);
router.get('/get-chiefComplaints', ChiefComplaintController.getAllChiefComplaints);
router.get('/:id', ChiefComplaintController.getChiefComplaintById);
router.put('/:id', ChiefComplaintController.updateChiefComplaint);
router.delete('/:id', ChiefComplaintController.deleteChiefComplaint);

export const ChiefComplaintRoutes = router;
// ... existing code ...