import { NextFunction, Request, Response } from 'express';
import ApiException from '../../core/exceptions/api.exception';
import FriendService from './friend.service';

class FriendController {
  async addFriend(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      // @ts-ignore
      const { id: userId } = req.user;
      const { username } = req.body;

      if (!userId) {
        return next(ApiException.UnauthorizedError());
      }

      const isAdded = await FriendService.addFriend(userId, username);
      return res.json(isAdded);
    } catch (e) {
      next(e);
    }
  }

  async deleteFriend(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      // @ts-ignore
      const { id: userId } = req.user;
      const { userId: friendId } = req.body;

      if (!userId) {
        return next(ApiException.UnauthorizedError());
      }

      const isDeleted = await FriendService.deleteFriend(userId, friendId);
      return res.json(isDeleted);
    } catch (e) {
      next(e);
    }
  }

  async getFriends(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      // @ts-ignore
      const { id: userId } = req.user;

      if (!userId) {
        return next(ApiException.UnauthorizedError());
      }

      const friends = await FriendService.getFriends(userId);
      return res.json(friends);
    } catch (e) {
      next(e);
    }
  }
}

export default new FriendController();
