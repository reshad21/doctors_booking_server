import { Router } from 'express';
import { StaffController } from './staff.controller';
import { imageUpload, uploadImages } from '../../middlewares/multer';
import validation from '../../middlewares/validation';
import { staffValidations } from './staff.validation';

const router = Router();

router.post(
  '/create-staff',
  imageUpload.single('staffImage'),
  uploadImages,
  validation(staffValidations.crateStaffValidation),    
 StaffController.createStaff
);
router.patch(
  '/update-staff',
  imageUpload.single('staffImage'),
  uploadImages,
  // validation(staffValidations.crateStaffValidation),    
 StaffController.updateStaff
);
router.post(
  '/staff-login',
  validation(staffValidations.loginStaffValidation),    
 StaffController.login
);
router.get(
  '/get-staff',
  StaffController.getStaff
);
router.delete(
  '/:id',
  StaffController.getDelete
);

export const StaffRoutes = router;