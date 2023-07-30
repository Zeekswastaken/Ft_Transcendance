import { ChannelMembership } from './channelMembership.entity';
export declare class Channel {
    id: number;
    Name: string;
    Type: String;
    Password: String;
    memberships: ChannelMembership[];
}
