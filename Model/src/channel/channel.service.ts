import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { Channel } from '../database/channel.entity';
import { createChannelDto } from './dto/createchannel.dto';
import { ChannelMembership } from '../database/channelMembership.entity';
import { User } from '../database/user.entity';
import * as bcrypt from 'bcrypt';
console.log("HEETEe");

@Injectable()
export class ChannelService {
    constructor(
        @InjectRepository(Channel)
        private readonly channelRepository: Repository<Channel>,
        @InjectRepository(ChannelMembership)
        private readonly channelMembershipRepository: Repository<ChannelMembership>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ){
        console.log('ChannelRepository:', channelRepository);
        console.log('ChannelMembershipRepository:', channelMembershipRepository);
        console.log('UserRepository:', userRepository);}
    async createChannel(createChannelDto: createChannelDto, owner: number)
    {
        console.log('--------> ', createChannelDto.Name);
        console.log('--------> ', createChannelDto.Type);
        console.log('--------> ', createChannelDto.Password);

        const channel = new Channel();
        if (createChannelDto.Type == null)
            createChannelDto.Type = "public";
        if (createChannelDto.Name == undefined)
            throw new HttpException("Channel name or Type not specified", HttpStatus.FORBIDDEN);
        channel.Name = createChannelDto.Name;
        channel.Type = createChannelDto.Type;
        const checkChannel = await this.channelRepository.findOne({ where: { Name: createChannelDto.Name } });    
        if (checkChannel)
            throw new HttpException("Channel already exists with the same name", HttpStatus.FORBIDDEN);
        if (createChannelDto.Type === "protected" && createChannelDto.Password)
        {
            const hashedPass = await this.hashPassword(createChannelDto.Password);
            channel.Password = hashedPass;
        }
        if (createChannelDto.Type === "protected" && !createChannelDto.Password)
            throw new HttpException('Password required', HttpStatus.FORBIDDEN); 
        // if (createChannelDto.type === "private")
        // {
                //TRY TO THINK OF A WAY FOR INVITATION LINKS TO WORK HERE/// FRIEND LIST
        // }
        const savedChannel = await this.channelRepository.save(channel);
        
        const membership = new ChannelMembership();
        membership.Userid = owner;
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
        const updatedmembership = await this.channelMembershipRepository.findOne({ where:
        {user: {id: user.id}
         , channel:{id:channel.id}
         , Type: 'admin' 
        }})
        if (!updatedmembership)
            throw new HttpException("The user isn't an admin", HttpStatus.FORBIDDEN);
        updatedmembership.Type = 'member';
       return await this.channelMembershipRepository.save(updatedmembership);
    }

    async joinChannel(channelID: number, userID: number, Pass: String): Promise<ChannelMembership>
    {
        const channel = await this.channelRepository.findOne({where: {id : channelID}});
        const user = await this.userRepository.findOne({where: {id: userID}});
        if (!channel || !user)
            throw new HttpException("Channel or User not found", HttpStatus.FORBIDDEN);
        const membership = await this.channelMembershipRepository.findOne({ where: {
            user: {id: user.id}
            , channel:{id:channel.id}}}
        );
        if (membership)
            throw new HttpException("The User is already in the chat", HttpStatus.FORBIDDEN);
        if (channel.Type == "protected")
        {
            if (!this.checkPassword(channelID, Pass))
                throw new HttpException("Password is incorrect", HttpStatus.FORBIDDEN);
        }
        const newmembership = new ChannelMembership();
        newmembership.Userid = user.id;
        newmembership.Channelid = channel.id
        newmembership.Type = "member";
        return await this.channelMembershipRepository.save(newmembership);
    }

    async LeaveChannel(channelID: number, userID: number): Promise<Boolean>
    {
        const channel = await this.channelRepository.findOne({where: {id : channelID}});
        const user = await this.userRepository.findOne({where: {id: userID}});
        if (!channel || !user)
            throw new HttpException("Channel or User not found", HttpStatus.FORBIDDEN);
        const membership = await this.channelMembershipRepository.findOne({ where: {
            user: {id: user.id}
            , channel:{id:channel.id}}}
        );
        if (!membership)
        throw new HttpException("The User hasn't joined the channel", HttpStatus.FORBIDDEN);
        await this.channelMembershipRepository.delete(membership.id);
        return true
    }

    async muteUser(channelID: number, userID: number, amount: number): Promise<ChannelMembership>
    {
        const channel = await this.channelRepository.findOne({where: {id: channelID}});
        const user = await this.userRepository.findOne({where: {id: userID}});
        if (!channel || !user)
            throw new HttpException("Channel or User not found", HttpStatus.FORBIDDEN);
        
        const user2 = await this.channelMembershipRepository.findOne( { where: {Userid: userID, Type: 'member'}});
        if (user2)
            throw new HttpException("This User doesn't have the rights to perform this action", HttpStatus.FORBIDDEN);

        const membership = await this.channelMembershipRepository.findOne({
            where: [
              {
                user: { id: user.id },
                channel: { id: channel.id },
                isMuted: true,
              },
              {
                user: { id: user.id },
                channel: { id: channel.id },
                isBanned: true,
              },
            ],
        });
        if (membership)
            throw new HttpException("The User might already be Muted/Banned", HttpStatus.FORBIDDEN);
        const normalmembership = await this.channelMembershipRepository.findOne({ where: {
            user: {id: user.id}
            , channel:{id:channel.id}, isMuted: false}});
        normalmembership.isMuted = true;
        //REMIND YOUSSEF TO GIVE YOU THE AMOUNT IN MINUTES
        normalmembership.muteEndDate = new Date();
        normalmembership.muteEndDate.setMinutes(normalmembership.muteEndDate.getMinutes() + amount);
        return this.channelMembershipRepository.save(normalmembership);
    }

    async banUser(channelID: number, userID: number, amount: number): Promise<ChannelMembership>
    {
        const channel = await this.channelRepository.findOne({where: {id: channelID}});
        const user = await this.userRepository.findOne({where: {id: userID}});
        if (!channel || !user)
            throw new HttpException("Channel or User not found", HttpStatus.FORBIDDEN);
        
        const user2 = await this.channelMembershipRepository.findOne( { where: {Userid: userID, Type: 'member'}});
        if (user2)
            throw new HttpException("This User doesn't have the rights to perform this action", HttpStatus.FORBIDDEN);

        const membership = await this.channelMembershipRepository.findOne({
            where: [
              {
                user: { id: user.id },
                channel: { id: channel.id },
                isMuted: true,
              },
              {
                user: { id: user.id },
                channel: { id: channel.id },
                isBanned: true,
              },
            ],
        });
        if (membership)
            throw new HttpException("The User might already be Muted/Banned", HttpStatus.FORBIDDEN);
        const normalmembership = await this.channelMembershipRepository.findOne({ where: {
            user: {id: user.id}
            , channel:{id:channel.id}, isBanned: false}});
        normalmembership.isBanned = true;
        //REMIND YOUSSEF TO GIVE YOU THE AMOUNT IN MINUTES
        normalmembership.banEndDate = new Date();
        normalmembership.banEndDate.setMinutes(normalmembership.muteEndDate.getMinutes() + amount);
        return this.channelMembershipRepository.save(normalmembership);
    }

    async unmuteUser(channelID: number, userID: number): Promise<ChannelMembership>
    {
        const channel = await this.channelRepository.findOne({where: {id: channelID}});
        const user = await this.userRepository.findOne({where: {id:userID}});
        if (!channel || !user)
            throw new HttpException("Channel or User not found", HttpStatus.FORBIDDEN);

        
         const ismuted = await this.channelMembershipRepository.findOne( { where: {user: {id: userID},
            channel: {id: channelID},
            isMuted: true}});
        if (!ismuted)
            throw new HttpException("This User isn't muted", HttpStatus.FORBIDDEN);
        
        const membership = await this.channelMembershipRepository.findOne({where:
        {
            user: {id: userID},
            channel: {id: channelID},
            isMuted : true
        }});
        membership.isMuted = false
        return await this.channelMembershipRepository.save(membership);
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
