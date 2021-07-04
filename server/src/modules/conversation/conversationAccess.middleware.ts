import { NextFunction, Request, Response } from 'express';
import { ApiException } from '../../core/exceptions/api.exception';
import { User } from '../user/user.entity';
import { Conversation } from './conversation.entity';

export const conversationAccessMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const { id: userId } = req.user;
    const conversationId = req.params.conversationId || req.body.conversationId;
    const uuidV4Pattern = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

    if (!uuidV4Pattern.test(conversationId)) {
      return next(ApiException.BadRequest('Incorrect conversation UUID'));
    }

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
