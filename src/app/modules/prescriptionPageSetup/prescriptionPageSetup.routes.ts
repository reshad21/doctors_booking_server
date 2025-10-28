import { Router } from 'express';
import { imageUpload, uploadImages } from '../../middlewares/multer';
import { PrescriptionPageSetupController } from './prescriptionPageSetup.controller';
import { UserType } from '../../context/userType';
import auth from '../../middlewares/authorization';

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

router.put('/status/:id', PrescriptionPageSetupController.updateStatus);

router.get(
  '/',
  auth([UserType.DOCTOR, UserType.STAFF]),
  PrescriptionPageSetupController.getPrescriptionPageSetupAll,
);

router.get('/:id', PrescriptionPageSetupController.getPrescriptionPageSetup);

router.delete(
  '/:id',
  PrescriptionPageSetupController.deletePrescriptionPageSetup,
);

export const PrescriptionPageSetupRoutes = router;
