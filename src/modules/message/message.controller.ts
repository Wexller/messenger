import { Body, Controller, Post, UseGuards, Request, Param, Get, ParseUUIDPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DoesUserHasAccessToConversation } from '../../core/guards/doesUserHasAccessToConversation.guard';
import { MessageDto } from './dto/message.dto';
import { MessageService } from './message.service';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @UseGuards(DoesUserHasAccessToConversation)
  @UseGuards(AuthGuard('jwt'))
  @Get(':conversation_id')
  async getMessages(@Param('conversation_id', new ParseUUIDPipe()) conversation_id: string) {
    return await this.messageService.getMessagesInConversation({
      conversation_id,
    });
  }

  @UseGuards(DoesUserHasAccessToConversation)
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() messageDto: MessageDto, @Request() req) {
    return await this.messageService.create({
      ...messageDto,
      user_id: req.user.id,
    });
  }
}
