import { Router } from 'express';
import validationMiddleware from '../core/middleware/validation.middleware';
import UserAuthDto from '../modules/user/dto/userAuthDto';
import UserController from '../modules/user/user.controller';

const router = Router();

router.post('/user/registration', validationMiddleware(UserAuthDto), UserController.registration);
router.post('/user/login', validationMiddleware(UserAuthDto), UserController.login);
router.post('/user/logout', UserController.logout);
router.get('/user/refresh', UserController.refreshToken);

export default router;
