import { Router } from 'express';
import { AdminController } from './admin.controller';
import auth from '../../middlewares/authorization';
import { UserType } from '../../context/userType';

const router = Router();

router.get('/me', auth([UserType.DOCTOR, UserType.STAFF]), AdminController.getAdminById);
router.patch('/admin-password', auth([UserType.DOCTOR]), AdminController.updateAdminPassById);
router.patch('/staff-password', auth([UserType.STAFF]), AdminController.updateStaffPassById);

export const AdminRoutes = router;
