import { Router } from 'express';
import validation from '../../middlewares/validation';
import { displayNoticeTableValidations } from './displayNoticeTable.validation';
import { DisplayNoticeTableController } from './displayNoticeTable.controller';

const router = Router();

router.post(
  '/notice-create',
  validation(displayNoticeTableValidations.createDisplayNoticeValidation),
  DisplayNoticeTableController.createDisplayNotice,
);

router.get('/get-notice', DisplayNoticeTableController.getAllDisplayNotices);

router.get('/:id', DisplayNoticeTableController.getDisplayNoticeById);

router.put(
  '/:id',
  validation(displayNoticeTableValidations.updateDisplayNoticeValidation),
  DisplayNoticeTableController.updateDisplayNotice,
);

router.delete('/:id', DisplayNoticeTableController.deleteDisplayNotice);

export const DisplayNoticeTableRoutes = router;
