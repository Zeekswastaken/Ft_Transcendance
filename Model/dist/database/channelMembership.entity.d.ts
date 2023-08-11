import { Channel } from './channel.entity';
import { User } from './user.entity';
import { Message } from './message.entity';
export declare class ChannelMembership {
    id: number;
    Userid: number;
    Channelid: number;
    Type: string;
    isMuted: boolean;
    isBanned: boolean;
    muteEndDate: Date;
    banEndDate: Date;
    channel: Channel;
    user: User;
    messages: Message[];
}
