import { Router } from 'express';
import validation from '../../middlewares/validation';
import { AuthController } from './doctor.controller';
import { authValidations } from './doctor.validation';
import { imageUpload, uploadImages } from '../../middlewares/multer';

const router = Router();

router.post(
  '/login',
  validation(authValidations.loginValidation),
  AuthController.login,
);
router.patch(
  '/update-doctor',
  imageUpload.single('doctorImage'),
  uploadImages,  
 AuthController.updateDoctor
);
export const AuthRoutes = router;