import { Router } from 'express';
import { TModuleRoute } from '../types/moduleRoute.type';
import { AuthRoutes } from '../modules/Doctor/doctor.routes';
import { StaffRoutes } from '../modules/Staff/staff.route';
import { AdminRoutes } from '../modules/admin/admin.routes';
import { WatchVideoRoutes } from '../modules/watchVideo/watchVideo.routes';
import { PrescriptionRoutes } from '../modules/Prescription/prescription.route';
import { PatientRoutes } from '../modules/patient/patient.routes';
import { ChamberRoutes } from '../modules/chamber/chamber.routes';
import { MessageRoutes } from '../modules/Message/message.route';

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
    path: '/watch-video',
    route: WatchVideoRoutes,
  },
  {
    path: '/patients',
    route: PatientRoutes,
  },
  {
    path: '/chamber',
    route: ChamberRoutes,
  },
  {
    path: '/prescription',
    route: PrescriptionRoutes,
  },
  {
    path: '/message',
    route: MessageRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
