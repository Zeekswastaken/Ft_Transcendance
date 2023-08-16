import { ChannelMembership } from 'src/database/channelMembership.entity';
import { Repository } from 'typeorm';
export declare class ChatService {
    private readonly ChannelMRepo;
    constructor(ChannelMRepo: Repository<ChannelMembership>);
    getAllRooms(Userid: number): Promise<string[]>;
}
