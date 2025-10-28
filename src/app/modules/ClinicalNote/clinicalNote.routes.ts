import { Router } from 'express';
import { ClinicalNoteTemplateController } from './clinicalNote.controller';

const router = Router();

router.post('/', ClinicalNoteTemplateController.createClinicalNote);
router.get('/', ClinicalNoteTemplateController.getClinicalNote);
router.put('/', ClinicalNoteTemplateController.updateClinicalNote);

export const ClinicalTemplateRoutes = router;
