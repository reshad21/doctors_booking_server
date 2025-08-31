import { Router } from 'express';
import { TModuleRoute } from '../types/moduleRoute.type';
import { AuthRoutes } from '../modules/Doctor/doctor.routes';
import { StaffRoutes } from '../modules/Staff/staff.route';
import { AdminRoutes } from '../modules/admin/admin.routes';
import { PrescriptionRoutes } from '../modules/Prescription/prescription.route';
import { MessageRoutes } from '../modules/Message/message.route';
import { WatchVideoRoutes } from '../modules/watchVideo/watchVideo.routes';
import { PatientRoutes } from '../modules/patient/patient.routes';
import { ChamberRoutes } from '../modules/chamber/chamber.routes';
import { PreManagementRoutes } from '../modules/preManagement/preManagement.routes';
import { VisitRoutes } from '../modules/visit/visit.routes';
import { PatientSummaryRoutes } from '../modules/patient-summary/patient-summary.routes';
import { DisplayNoticeTableRoutes } from '../modules/displayNoticeTable/displayNoticeTable.routes';
import { AdviceTableRoutes } from '../modules/adviceTable/adviceTable.routes';
import { OnExaminationRoutes } from '../modules/onExamination/onExamination.routes';
import { InvestigationRoutes } from '../modules/investigation/investigation.routes';
import { ChiefComplaintRoutes } from '../modules/chiefComplaint/chiefComplaint.routes';
import { DiagnosisRoutes } from '../modules/diagnosis/diagnosis.routes';
import { MedicinesRoutes } from '../modules/medicinesList/medicinesList.routes';
import { MedicineTimeInputRoutes } from '../modules/medicineTimeInput/medicineTimeInput.routes';
import { MedicineDosagesInputRoutes } from '../modules/medicineDosagesInput/medicineDosagesInput.routes';

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
  {
    path: '/preManagement',
    route: PreManagementRoutes,
  },
  {
    path: '/visit',
    route: VisitRoutes,
  },
  {
    path: '/patient-summary',
    route: PatientSummaryRoutes,
  },
  {
    path: '/notice',
    route: DisplayNoticeTableRoutes,
  },
  {
    path: '/advice',
    route: AdviceTableRoutes,
  },
  {
    path: '/on-examination',
    route: OnExaminationRoutes,
  },
  {
    path: '/investigation',
    route: InvestigationRoutes,
  },
  {
    path: '/chief-complaint',
    route: ChiefComplaintRoutes,
  },
  {
    path: '/diagnosis',
    route: DiagnosisRoutes,
  },
  {
    path: '/medicines',
    route: MedicinesRoutes,
  },
  {
    path: '/medicine-time',
    route: MedicineTimeInputRoutes,
  },
  {
    path: '/medicine-dosages',
    route: MedicineDosagesInputRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
