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
  // imageUpload.single('staffImage'),
  imageUpload.fields([
    { name: 'staffImage', maxCount: 1 },
  ]),
  uploadImages,
  validation(staffValidations.updateStaffValidation),    
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

router.post(
  '/staff-login',
  validation(staffValidations.loginStaffValidation),
  StaffController.login,
);

router.get('/get-staff', StaffController.getStaff);

router.delete('/:id', StaffController.getDelete);

router.put(
  '/allow-routes',
  validation(staffValidations.allowDisallowPermissionSchema),
  StaffController.allowDisallowPermissionForStaff,
);

export const StaffRoutes = router;
