import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DoesUserHasAccessToConversation } from '../../core/guards/doesUserHasAccessToConversation.guard';
import { DoesUsernameExist } from '../../core/guards/doesUsernameExist.guard';
import { ConversationsService } from './conversations.service';
import { ConversationAddUserDto } from './dto/conversation-add-user.dto';
import { ConversationDto } from './dto/conversation.dto';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationService: ConversationsService) {}

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
  async addUser(@Body() { conversation_id, username }: ConversationAddUserDto) {
    return this.conversationService.addUser(conversation_id, username);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conversationService.remove(id);
  }
}
