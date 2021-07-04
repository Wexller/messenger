import { NextFunction, Request, Response } from 'express';
import { ApiException } from '../../core/exceptions/api.exception';
import { messageService } from './message.service';
import { StatusCodes } from 'http-status-codes';

class MessageController {
  async getMessages(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      // @ts-ignore
      const { id: userId } = req.user;
      const { conversationId } = req.params;

      const messages = await messageService.getMessagesInConversation(conversationId, userId);

      return res.status(StatusCodes.OK).json(messages);
    } catch (e) {
      next(e);
    }
  }

  async getOldMessages(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { conversationId } = req.params;
      const { messageId } = req.query;

      // @ts-ignore
      const messages = await messageService.getOldMessagesInConversation(conversationId, messageId);
      return res.status(StatusCodes.OK).json(messages);
    } catch (e) {
      next(e);
    }
  }

  async getNewMessages(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { conversationId } = req.params;
      const { messageId } = req.query;

      // @ts-ignore
      const messages = await messageService.getNewMessagesInConversation(conversationId, messageId);
      return res.status(StatusCodes.OK).json(messages);
    } catch (e) {
      next(e);
    }
  }

  async newMessage(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      // @ts-ignore
      const { id: userId } = req.user;
      const { conversationId, text } = req.body;

      const newMessage = await messageService.newMessage(conversationId, userId, text);

      return res.status(StatusCodes.CREATED).json(newMessage);
    } catch (e) {
      next(e);
    }
  }
}

export const messageController = new MessageController();
