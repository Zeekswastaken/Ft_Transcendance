import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, FindOneOptions } from 'typeorm';
import { Channel } from '../database/channel.entity';
import { CreateChannelDto } from './dto/createchannel.dto';
import { ChannelMembership } from '../database/channelMembership.entity';
import { User } from '../database/user.entity';
import * as bcrypt from 'bcrypt';
import { find } from 'rxjs';
import { channel } from 'diagnostics_channel';

@Injectable()
export class ChannelService {
    constructor(
        @InjectRepository(Channel)
        private readonly channelRepository: Repository<Channel>,
        @InjectRepository(ChannelMembership)
        private readonly channelMembershipRepository: Repository<ChannelMembership>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ){}

    async createChannel(createChannelDto: CreateChannelDto, owner: User)
    {
        const channel = new Channel();
        if (createChannelDto.Name == undefined)
            throw new HttpException("Channel name not specified", HttpStatus.FORBIDDEN);
        channel.Name = createChannelDto.Name;
        channel.Type = createChannelDto.type;
        const checkChannel = await this.channelRepository.findOne({ where: { Name: createChannelDto.Name } });    
        if (checkChannel)
            throw new HttpException("Channel already exists with the same name", HttpStatus.FORBIDDEN);
        if (createChannelDto.type === "protected" && createChannelDto.Password)
        {
            const hashedPass = await this.hashPassword(createChannelDto.Password);
            channel.Password = hashedPass;
        }
        if (createChannelDto.type === "protected" && !createChannelDto.Password)
            throw new HttpException('Password required', HttpStatus.FORBIDDEN); 
        // if (createChannelDto.type === "private")
        // {
                //TRY TO THINK OF A WAY FOR INVITATION LINKS TO WORK HERE/// FRIEND LIST
        // }
        const savedChannel = await this.channelRepository.save(channel);
        
        const membership = new ChannelMembership();
        membership.Userid = owner.id;
        membership.Channelid = savedChannel.id
        membership.Type = "owner";

        await this.channelMembershipRepository.save(membership);
        return savedChannel;
    }

    async assignAdmin(channelID: number, userId: number, initiatorId: number): Promise<ChannelMembership>
    {
        const initiator = await this.userRepository.findOne({where: { id: initiatorId}});
        const channel = await this.channelRepository.findOne({ where: {id: channelID}});
        const user = await this.userRepository.findOne({where: {id: userId}});
        if (!channel || !user || !initiator)
            throw new HttpException("Channel or User not found", HttpStatus.FORBIDDEN);
        
        const membership = await this.channelMembershipRepository.findOne( { where:  {
            user: {id: user.id}
            , channel:{id: channel.id}
            , Type: 'admin'}});
        if (membership)
            throw new HttpException("The user is already an admin", HttpStatus.FORBIDDEN);
        
            const membership_init = await this.channelMembershipRepository.findOne( { where : {
            user: {id: user.id}
            , channel:{id: channel.id}
            , Type: 'owner'
        }});
        if (!membership_init)
            throw new HttpException("The user can only assign someone as admin if he's the owner of this channel", HttpStatus.FORBIDDEN);
        
        const adminmembership = await this.channelMembershipRepository.findOne( {where: {
            user: {id: user.id}
            , channel:{id: channel.id}}
        });
        adminmembership.Type = 'admin';
        return await this.channelMembershipRepository.save(adminmembership);
    }

    async removeadmin(channelID: number, userID: number, initiatorID: number): Promise<ChannelMembership>
    {
        const initiator = await this.userRepository.findOne({where: { id: initiatorID}});
        const channel = await this.channelRepository.findOne({ where: {id : channelID}});
        const user = await this.userRepository.findOne({where:{id: userID}});
        if (!channel || !user || !initiator)
            throw new HttpException("Channel or User not found", HttpStatus.FORBIDDEN);
        
        const ownermembership = await this.channelMembershipRepository.findOne( { where: {
            user: {id: initiator.id}
            , channel: {id: channel.id}
            , Type: 'owner'
        }})
        if (!ownermembership)
            throw new HttpException("The initiator should be an owner for this action to go through", HttpStatus.FORBIDDEN);
        const adminmembership = await this.channelMembershipRepository.findOne({ where:
        {user: {id: user.id}
         , channel:{id:channel.id}
         ,    
    }})
    }

    async getAllChannels(): Promise<Channel[]> 
    {
        return this.channelRepository.find({
            where: {
                Type: Not("private")
            },
        });
    }

    async  getChannel(channelID: number): Promise<Channel>
    {
        return this.channelRepository.findOne({where: {id: channelID}});
    }

    async checkPassword(channelID: number, password: String): Promise<Boolean>
    {
        if (!password)
            return false;
        const pass = await this.channelRepository.findOne({where:{ id: channelID}});
        return bcrypt.compare(password , pass);
    }


    async hashPassword(password: String): Promise<String> {
        const saltOrRounds = 10; // The number of salt rounds (recommended: 10 or higher)
        return await bcrypt.hash(password, saltOrRounds);
      }
}
