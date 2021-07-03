import { NextFunction, Request, Response } from 'express';
import { ApiException } from '../../core/exceptions/api.exception';
import { User } from '../user/user.entity';
import { Conversation } from './conversation.entity';

export const conversationAccessMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const { id: userId } = req.user;
    const { conversationId } = req.params;

    const conversation = await Conversation.findOne({
      include: {
        model: User,
      },
      where: {
        id: conversationId,
        '$users.id$': userId,
      },
    });

    if (conversation) {
      next();
    } else {
      ApiException.BadRequest("You don't have an access to this conversation");
    }
  } catch (e) {
    next(e);
  }
};
