import { Router } from 'express';
import { TModuleRoute } from '../types/moduleRoute.type';
import { AuthRoutes } from '../modules/Doctor/doctor.routes';
import { AdminRoutes } from '../modules/admin/admin.routes';

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
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
