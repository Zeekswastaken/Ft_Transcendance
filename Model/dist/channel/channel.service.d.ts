import { Repository } from 'typeorm';
import { Channel } from '../database/channel.entity';
import { CreateChannelDto } from './dto/createchannel.dto';
import { ChannelMembership } from '../database/channelMembership.entity';
import { User } from '../database/user.entity';
export declare class ChannelService {
    private readonly channelRepository;
    private readonly channelMembershipRepository;
    private readonly userRepository;
    constructor(channelRepository: Repository<Channel>, channelMembershipRepository: Repository<ChannelMembership>, userRepository: Repository<User>);
    createChannel(createChannelDto: CreateChannelDto, owner: User): Promise<Channel>;
    getAllChannels(): Promise<Channel[]>;
    ChangePassword(): Promise<void>;
    hashPassword(password: String): Promise<String>;
}
