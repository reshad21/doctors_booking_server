import { Router } from 'express';
import { WatchVideoController } from './watchVideo.controller';

const router = Router();


router.post('/', WatchVideoController.createWatchVideoController);
router.get('/', WatchVideoController.getWatchVideoController);
router.get('/:id', WatchVideoController.getWatchVideoByIdController);
router.delete('/:id', WatchVideoController.deleteWatchVideoByIdController);
router.patch('/:id', WatchVideoController.updateWatchVideoByIdController);
export const WatchVideoRoutes = router;
