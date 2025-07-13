import { Router } from 'express';
import { TModuleRoute } from '../types/moduleRoute.type';
import { AuthRoutes } from '../modules/Doctor/doctor.routes';
import { StaffRoutes } from '../modules/Staff/staff.route';
import { AdminRoutes } from '../modules/admin/admin.routes';
import { PrescriptionRoutes } from '../modules/Prescription/prescription.route';

const router = Router();

const moduleRoutes: TModuleRoute[] = [
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/staff',
    route: StaffRoutes,
  },
  {
    path: '/prescription',
    route: PrescriptionRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
