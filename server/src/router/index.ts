import { Router } from 'express';
import validationMiddleware from '../core/middleware/validation.middleware';
import authMiddleware from '../core/middleware/auth.middleware';
import FriendDto from '../modules/friend/dto/friend.dto';
import UserAuthDto from '../modules/user/dto/userAuth.dto';
import UserController from '../modules/user/user.controller';
import FriendController from '../modules/friend/friend.controller';

const router = Router();

// User
router.post('/user/registration', validationMiddleware(UserAuthDto), UserController.registration);
router.post('/user/login', validationMiddleware(UserAuthDto), UserController.login);
router.post('/user/logout', UserController.logout);
router.get('/user/refresh', UserController.refreshToken);

// Friends
router.get('/friend', authMiddleware, FriendController.getFriends);
router.post('/friend', authMiddleware, validationMiddleware(FriendDto), FriendController.addFriend);
router.delete('/friend', authMiddleware, validationMiddleware(FriendDto), FriendController.removeFriend);

export default router;
