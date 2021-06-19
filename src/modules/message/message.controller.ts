import { Body, Controller, Post, UseGuards, Request, Param, Get, ParseUUIDPipe, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DoesUserHasAccessToConversation } from '../../core/guards/doesUserHasAccessToConversation.guard';
import { MessageDto } from './dto/message.dto';
import { MessageService } from './message.service';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @UseGuards(DoesUserHasAccessToConversation)
  @UseGuards(AuthGuard('jwt'))
  @Get(':conversationId')
  async getMessages(@Param('conversationId', new ParseUUIDPipe()) conversationId: string, @Request() req) {
    return await this.messageService.getMessagesInConversation({
      conversationId,
      userId: req.user.id,
    });
  }

  @UseGuards(DoesUserHasAccessToConversation)
  @UseGuards(AuthGuard('jwt'))
  @Get(':conversationId/load_old_messages')
  async getOldMessages(
    @Param('conversationId', new ParseUUIDPipe()) conversationId: string,
    @Query('messageId') messageId: string,
  ) {
    return await this.messageService.getOldMessagesInConversation({
      conversationId,
      messageId,
    });
  }

  @UseGuards(DoesUserHasAccessToConversation)
  @UseGuards(AuthGuard('jwt'))
  @Get(':conversationId/load_new_messages')
  async getNewMessages(
    @Param('conversationId', new ParseUUIDPipe()) conversationId: string,
    @Query('messageId') messageId: string,
  ) {
    return await this.messageService.getNewMessagesInConversation({
      conversationId,
      messageId,
    });
  }

  @UseGuards(DoesUserHasAccessToConversation)
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() messageDto: MessageDto, @Request() req) {
    return await this.messageService.create({
      ...messageDto,
      userId: req.user.id,
    });
  }
}
