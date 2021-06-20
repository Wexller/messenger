import { Router } from 'express';
import validationMiddleware from '../core/middleware/validation.middleware';
import UserAuthDto from '../modules/user/dto/userAuthDto';
import userController from '../modules/user/user.controller';

const router = Router();

router.post('/user/registration', validationMiddleware(UserAuthDto), userController.registration);
router.post('/user/login', validationMiddleware(UserAuthDto), userController.login);
router.post('/user/logout', userController.logout);
router.get('/user/refresh', userController.refreshToken);

export default router;
