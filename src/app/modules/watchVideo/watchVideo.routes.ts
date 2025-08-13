import { Router } from 'express';
import { WatchVideoController } from './watchVideo.controller';
import validation from '../../middlewares/validation';
import { watchVideoValidations } from './watchVideo.validation';
import { UserType } from '../../context/userType';
import auth from '../../middlewares/authorization';

const router = Router();

router.post(
  '/',
  auth([UserType.DOCTOR, UserType.STAFF]),
  validation(watchVideoValidations.createWatchVideoValidation),
  WatchVideoController.createWatchVideoController,
);
router.get(
  '/',
  auth([UserType.DOCTOR, UserType.STAFF]),
  WatchVideoController.getWatchVideoController,
);

router.get(
  '/active',
  auth([UserType.DOCTOR, UserType.STAFF]),
  WatchVideoController.getOnlyActiveVideo,
);
router.get(
  '/:id',
  auth([UserType.DOCTOR, UserType.STAFF]),
  WatchVideoController.getWatchVideoByIdController,
);

router.delete(
  '/:id',
  auth([UserType.DOCTOR, UserType.STAFF]),
  WatchVideoController.deleteWatchVideoByIdController,
);

router.patch(
  '/:id',
  auth([UserType.DOCTOR, UserType.STAFF]),
  WatchVideoController.updateWatchVideoByIdController,
);

export const WatchVideoRoutes = router;
