import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { Message } from '../database/message.entity';
import { User } from '../database/user.entity'
import { ChannelMembership } from '../database/channelMembership.entity';
import { Channel } from '../database/channel.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Message, Channel, ChannelMembership ,User])],
  providers: [MessagesGateway, MessagesService]
})
export class MessagesModule {}