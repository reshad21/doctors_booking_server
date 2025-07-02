import { Router } from 'express';
import { TModuleRoute } from '../types/moduleRoute.type';
import { AuthRoutes } from '../modules/Doctor/doctor.routes';
import { StaffRoutes } from '../modules/Staff/staff.route';

const router = Router();

const moduleRoutes: TModuleRoute[] = [
  // {
  //   path: '/users',
  //   route: UserRoutes,
  // },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/staff',
    route: StaffRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
