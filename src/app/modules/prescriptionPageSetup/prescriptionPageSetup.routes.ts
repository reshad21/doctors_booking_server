import { Router } from 'express';
import { imageUpload, uploadImages } from '../../middlewares/multer';
import { PrescriptionPageSetupController } from './prescriptionPageSetup.controller';

const router = Router();

router.post(
  '/',
  imageUpload.fields([
    { name: 'headerLogo', maxCount: 1 },
    { name: 'footerLogo', maxCount: 1 },
  ]),
  uploadImages,
  PrescriptionPageSetupController.createPrescriptionPageSetup,
);

router.put(
  '/:id',
  imageUpload.fields([
    { name: 'headerLogo', maxCount: 1 },
    { name: 'footerLogo', maxCount: 1 },
  ]),
  uploadImages,
  PrescriptionPageSetupController.updatePrescriptionPageSetup,
);

router.get('/', PrescriptionPageSetupController.getPrescriptionPageSetupAll);

router.get('/:id', PrescriptionPageSetupController.getPrescriptionPageSetup);

export const PrescriptionPageSetupRoutes = router;
