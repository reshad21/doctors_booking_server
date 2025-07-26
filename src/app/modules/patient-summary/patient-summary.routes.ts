import { Router } from 'express';
import { PatientSummaryController } from './patient-summary.controller';

const router = Router();

router.get('/get-patient-summary', PatientSummaryController.getPatientSummary);

export const PatientSummaryRoutes = router;
