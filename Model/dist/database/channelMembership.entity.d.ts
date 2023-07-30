import { Channel } from './channel.entity';
import { User } from './user.entity';
import { Message } from './message.entity';
export declare class ChannelMembership {
    Userid: number;
    Channelid: number;
    Type: String;
    channel: Channel;
    user: User;
    messages: Message[];
}
