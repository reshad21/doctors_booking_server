import { Router } from 'express';
import validation from '../../middlewares/validation';
import { displayNoticeTableValidations } from './displayNoticeTable.validation';
import { DisplayNoticeTableController } from './displayNoticeTable.controller';
import auth from '../../middlewares/authorization';
import { UserType } from '../../context/userType';

const router = Router();

router.post(
  '/notice-create',
  auth([UserType.DOCTOR, UserType.STAFF]),
  validation(displayNoticeTableValidations.createDisplayNoticeValidation),
  DisplayNoticeTableController.createDisplayNotice,
);

router.get(
  '/get-notice',
  auth([UserType.DOCTOR, UserType.STAFF]),
  DisplayNoticeTableController.getAllDisplayNotices,
);

router.get(
  '/:id',
  auth([UserType.DOCTOR, UserType.STAFF]),
  DisplayNoticeTableController.getDisplayNoticeById,
);

router.put(
  '/:id',
  auth([UserType.DOCTOR, UserType.STAFF]),
  validation(displayNoticeTableValidations.updateDisplayNoticeValidation),
  DisplayNoticeTableController.updateDisplayNotice,
);

router.delete(
  '/:id',
  auth([UserType.DOCTOR, UserType.STAFF]),
  DisplayNoticeTableController.deleteDisplayNotice,
);

export const DisplayNoticeTableRoutes = router;
