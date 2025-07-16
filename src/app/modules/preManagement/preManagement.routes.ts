import { Router } from 'express';
import { PreManagementController } from './preManagement.controller';

const router = Router();

router.post('/', PreManagementController.createPreManagementController);
router.get('/', PreManagementController.getPreManagementController);

export const PreManagementRoutes = router;
