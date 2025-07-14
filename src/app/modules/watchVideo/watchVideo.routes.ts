import { Router } from 'express';
import { WatchVideoController } from './watchVideo.controller';
import validation from '../../middlewares/validation';
import { watchVideoValidations } from './watchVideo.validation';

const router = Router();


router.post('/',validation(watchVideoValidations.createWatchVideoValidation), WatchVideoController.createWatchVideoController);
router.get('/', WatchVideoController.getWatchVideoController);
router.get('/:id', WatchVideoController.getWatchVideoByIdController);
router.delete('/:id', WatchVideoController.deleteWatchVideoByIdController);
router.patch('/:id', WatchVideoController.updateWatchVideoByIdController);
export const WatchVideoRoutes = router;
