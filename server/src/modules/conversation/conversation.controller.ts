import { NextFunction, Request, Response } from 'express';
import { ApiException } from '../../core/exceptions/api.exception';
import { conversationService } from './conversation.service';

class ConversationController {
  async getInfo(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      // @ts-ignore
      const { id: userId } = req.user;
      const { conversationId } = req.params;

      const conversation = await conversationService.getConversationInfo(conversationId, userId);

      return res.json(conversation);
    } catch (e) {
      next(e);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      // @ts-ignore
      const { id: userId } = req.user;

      const conversations = await conversationService.getAll(userId);
      return res.json(conversations);
    } catch (e) {
      next(e);
    }
  }

  async start(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      // @ts-ignore
      const { id: userId } = req.user;
      const { friendId } = req.body;

      if (userId === friendId) {
        return next(ApiException.BadRequest("You can't start a conversation with yourself"));
      }

      const conversation = await conversationService.startPrivate(userId, friendId);
      return res.json(conversation);
    } catch (e) {
      next(e);
    }
  }
}

export const conversationController = new ConversationController();
