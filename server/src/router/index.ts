import { Router } from 'express';
import { validationMiddleware } from '../core/middleware/validation.middleware';
import { authMiddleware } from '../core/middleware/auth.middleware';
import { conversationController } from '../modules/conversation/conversation.controller';
import { ConversationStartDto } from '../modules/conversation/dto/conversationStart.dto';
import { conversationAccessMiddleware } from '../modules/conversation/conversationAccess.middleware';
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

// Friend
router.get('/friend', authMiddleware, friendController.getFriends);
router.post('/friend', authMiddleware, validationMiddleware(FriendDto), friendController.addFriend);
router.delete('/friend', authMiddleware, validationMiddleware(FriendDeleteDto), friendController.deleteFriend);

// Conversation
router.get('/conversation', authMiddleware, conversationController.getAll);
router.get(
  '/conversation/:conversationId',
  authMiddleware,
  conversationAccessMiddleware,
  conversationController.getInfo,
);
router.post(
  '/conversation/start',
  authMiddleware,
  validationMiddleware(ConversationStartDto),
  conversationController.start,
);

export default router;
