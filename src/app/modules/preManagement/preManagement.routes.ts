import { Router } from 'express';
import { PreManagementController } from './preManagement.controller';
import { imageUpload, uploadImages } from '../../middlewares/multer';

const router = Router();

// router.post('/', imageUpload.fields([{ name: 'headerImage', maxCount: 1 }]),uploadImages, PreManagementController.createPreManagementController);

// router.post('/', imageUpload.single('headerImage'), uploadImages, PreManagementController.createPreManagementController);

// router.post(
//     '/',
//     imageUpload.single('headerImage'),
//     imageUpload.single('footerImage'),
//     uploadImages,
//     PreManagementController.createPreManagementController,
// );

router.post(
  '/',
  imageUpload.fields([
    { name: 'headerImage', maxCount: 1 },
    { name: 'footerImage', maxCount: 1 }
  ]),
  uploadImages,
  PreManagementController.createPreManagementController
);


router.get('/', PreManagementController.getPreManagementController);
router.get('/:id', PreManagementController.getPreManagementByIdController);
router.delete('/:id', PreManagementController.deletePreManagementController);
router.patch('/:id', PreManagementController.updatePreManagementByIdController);

export const PreManagementRoutes = router;
