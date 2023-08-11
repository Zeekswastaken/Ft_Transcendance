import { Repository } from 'typeorm';
import { Channel } from '../database/channel.entity';
import { createChannelDto } from './dto/createchannel.dto';
import { ChannelMembership } from '../database/channelMembership.entity';
import { User } from '../database/user.entity';
export declare class ChannelService {
    private readonly channelRepository;
    private readonly channelMembershipRepository;
    private readonly userRepository;
    constructor(channelRepository: Repository<Channel>, channelMembershipRepository: Repository<ChannelMembership>, userRepository: Repository<User>);
    createChannel(createChannelDto: createChannelDto, owner: number): Promise<Channel>;
    assignAdmin(channelID: number, userId: number, initiatorId: number): Promise<ChannelMembership>;
    removeadmin(channelID: number, userID: number, initiatorID: number): Promise<ChannelMembership>;
    joinChannel(channelID: number, userID: number, Pass: String): Promise<ChannelMembership>;
    LeaveChannel(channelID: number, userID: number): Promise<Boolean>;
    muteUser(channelID: number, userID: number, amount: number): Promise<ChannelMembership>;
    banUser(channelID: number, userID: number, amount: number): Promise<ChannelMembership>;
    unmuteUser(channelID: number, userID: number): Promise<ChannelMembership>;
    getAllChannels(): Promise<Channel[]>;
    getChannel(channelID: number): Promise<Channel>;
    checkPassword(channelID: number, password: String): Promise<Boolean>;
    hashPassword(password: String): Promise<String>;
}
