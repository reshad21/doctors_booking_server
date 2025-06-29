import { Router } from 'express';
import { TModuleRoute } from '../types/moduleRoute.type';
import { AuthRoutes } from '../modules/Doctor/doctor.routes';

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
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
