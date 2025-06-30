import { Router } from 'express';
import validation from '../../middlewares/validation';
import { AuthController } from './doctor.controller';
import { authValidations } from './doctor.validation';

const router = Router();

router.post(
  '/login',
  validation(authValidations.loginValidation),
  AuthController.login,
);

export const AuthRoutes = router;