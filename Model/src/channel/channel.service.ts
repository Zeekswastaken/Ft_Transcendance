import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Channel } from '../database/channel.entity';
import { CreateChannelDto } from './dto/createchannel.dto';
import { ChannelMembership } from '../database/channelMembership.entity';
import { User } from '../database/user.entity';

@Injectable()
export class ChannelService {
    constructor(
        @InjectRepository(Channel)
        private readonly channelRepository: Repository<Channel>,
        @InjectRepository(ChannelMembership)
        private readonly channelMembershipRepository: Repository<ChannelMembership>,
    ){}

    async createChannel(createChannelDto: CreateChannelDto, owner: User)
    {
        const channel = new Channel();
        channel.Name = createChannelDto.Name;
        channel.Type = createChannelDto.type;
        if (createChannelDto.type === "protected" && createChannelDto.Password)
            channel.Password = createChannelDto.Password;
        
        const savedChannel = await this.channelRepository.save(channel);
        
        const membership = new ChannelMembership();
        membership.Userid = owner.id;
        membership.Channelid = savedChannel.id
        membership.Type = "owner";

        await this.channelMembershipRepository.save(membership);
        return savedChannel;
    }
}
