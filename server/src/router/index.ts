import { Router } from 'express';
import { validationMiddleware } from '../core/middleware/validation.middleware';
import { authMiddleware } from '../core/middleware/auth.middleware';
import { FriendDto } from '../modules/friend/dto/friend.dto';
import { FriendDeleteDto } from '../modules/friend/dto/friendDelete.dto';
import { UserAuthDto } from '../modules/user/dto/userAuth.dto';
import { userController } from '../modules/user/user.controller';
import { friendController } from '../modules/friend/friend.controller';

const router = Router();

// User
router.post('/user/registration', validationMiddleware(UserAuthDto), userController.registration);
router.post('/user/login', validationMiddleware(UserAuthDto), userController.login);
router.post('/user/logout', userController.logout);
router.get('/user/refresh', userController.refreshToken);

// Friends
router.get('/friend', authMiddleware, friendController.getFriends);
router.post('/friend', authMiddleware, validationMiddleware(FriendDto), friendController.addFriend);
router.delete('/friend', authMiddleware, validationMiddleware(FriendDeleteDto), friendController.deleteFriend);

export default router;
