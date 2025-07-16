import { Router } from 'express';
import { PreManagementController } from './preManagement.controller';

const router = Router();

router.post('/', PreManagementController.createPreManagementController);
router.get('/', PreManagementController.getPreManagementController);
router.get('/:id', PreManagementController.getPreManagementByIdController);
router.delete('/:id', PreManagementController.deletePreManagementController);
router.patch('/:id', PreManagementController.updatePreManagementByIdController);

export const PreManagementRoutes = router;
