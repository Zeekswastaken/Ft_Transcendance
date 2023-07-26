import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from '../database/channel.entity';
import { ChannelMembership } from '../database/channelMembership.entity';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';

@Module({
  imports: [TypeOrmModule.forFeature([Channel, ChannelMembership])],
  controllers: [ChannelController],
  providers: [ChannelService],
})
export class ChannelModule {}