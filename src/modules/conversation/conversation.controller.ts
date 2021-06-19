import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DoesUserHasAccessToConversation } from '../../core/guards/doesUserHasAccessToConversation.guard';
import { DoesUsernameExist } from '../../core/guards/doesUsernameExist.guard';
import { UserConversationService } from '../user-conversation/user-conversation.service';
import { ConversationService } from './conversation.service';
import { ConversationAddUserDto } from './dto/conversation-add-user.dto';
import { ConversationLastMessageUpdateDto } from './dto/conversation-last-message-update.dto';
import { ConversationDto } from './dto/conversation.dto';
import { IConversation } from './interfaces/conversation.interface';

@Controller('conversations')
export class ConversationController {
  constructor(
    private readonly conversationService: ConversationService,
    private readonly userConversationService: UserConversationService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() conversationDto: ConversationDto, @Request() req) {
    return this.conversationService.create(conversationDto, req.user.record);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(@Request() req) {
    return this.conversationService.findAll(req.user.id);
  }

  @UseGuards(DoesUsernameExist)
  @UseGuards(DoesUserHasAccessToConversation)
  @UseGuards(AuthGuard('jwt'))
  @Post('add_user')
  async addUser(@Body() { conversationId, username }: ConversationAddUserDto) {
    return await this.conversationService.addUser(conversationId, username);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conversationService.remove(id);
  }

  @UseGuards(DoesUsernameExist)
  @UseGuards(AuthGuard('jwt'))
  @Post('start')
  async start(@Request() req): Promise<IConversation> {
    const userNames = {
      requestedUser: req.user.username,
      targetUser: req.requestedUser.username,
    };

    const userRecords = {
      requestedUserRecord: req.user.record,
      targetUserRecord: req.requestedUser.record,
    };

    return await this.conversationService.startConversation(userNames, userRecords);
  }

  @UseGuards(DoesUserHasAccessToConversation)
  @UseGuards(AuthGuard('jwt'))
  @Post('update_last_message_id')
  async updateLastMessageId(
    @Body() { conversationId, messageId }: ConversationLastMessageUpdateDto,
    @Request() req,
  ): Promise<{ messageId: string }> {
    return await this.userConversationService.updateLastReadMessage({
      conversationId,
      messageId,
      userId: req.user.id,
      lastReadMessageAt: new Date(),
    });
  }
}
