import { Router } from 'express';
import { StaffController } from './staff.controller';
import { imageUpload, uploadImages } from '../../middlewares/multer';
import validation from '../../middlewares/validation';
import { staffValidations } from './staff.validation';
import { UserType } from '../../context/userType';
import auth from '../../middlewares/authorization';

const router = Router();

router.post(
  '/create-staff',
  auth([UserType.DOCTOR, UserType.STAFF]),
  imageUpload.single('staffImage'),
  uploadImages,
  validation(staffValidations.crateStaffValidation),
  StaffController.createStaff,
);

router.patch(
  '/update-staff',
  auth([UserType.DOCTOR, UserType.STAFF]),
  imageUpload.single('staffImage'),
  uploadImages,
  validation(staffValidations.updateStaffValidation),
  StaffController.updateStaff,
);

router.post(
  '/staff-login',
  validation(staffValidations.loginStaffValidation),
  StaffController.login,
);

router.get(
  '/get-staff',
  auth([UserType.DOCTOR, UserType.STAFF]),
  StaffController.getStaff,
);
router.get(
  '/get-staffs-doctor',
  auth([UserType.STAFF]),
  StaffController.staffsDoctor,
);

router.delete(
  '/:id',
  auth([UserType.DOCTOR, UserType.STAFF]),
  StaffController.getDelete,
);

router.put(
  '/allow-routes',
  auth([UserType.DOCTOR, UserType.STAFF]),
  validation(staffValidations.allowDisallowPermissionSchema),
  StaffController.allowDisallowPermissionForStaff,
);

export const StaffRoutes = router;
