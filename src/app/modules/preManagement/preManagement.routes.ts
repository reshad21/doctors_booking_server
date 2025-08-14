import { Router } from 'express';
import { PreManagementController } from './preManagement.controller';
import { imageUpload, uploadImages } from '../../middlewares/multer';
import { UserType } from '../../context/userType';
import auth from '../../middlewares/authorization';

const router = Router();

router.post(
  '/',
  auth([UserType.DOCTOR, UserType.STAFF]),
  imageUpload.fields([
    { name: 'headerImage', maxCount: 1 },
    { name: 'footerImage', maxCount: 1 }
  ]),
  uploadImages,
  PreManagementController.createPreManagementController
);

router.get('/',
  auth([UserType.DOCTOR, UserType.STAFF]),
  PreManagementController.getPreManagementController
);
router.get('/:id',
  auth([UserType.DOCTOR, UserType.STAFF]),
  PreManagementController.getPreManagementByIdController
);

router.delete('/:id',
  auth([UserType.DOCTOR, UserType.STAFF]),
  PreManagementController.deletePreManagementController
);

router.patch('/:id',
  auth([UserType.DOCTOR, UserType.STAFF]),
  PreManagementController.updatePreManagementByIdController
);

export const PreManagementRoutes = router;
