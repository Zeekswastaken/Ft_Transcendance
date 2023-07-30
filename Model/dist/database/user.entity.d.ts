import { ChannelMembership } from "./channelMembership.entity";
export declare class User {
    id: number;
    username: String;
    birthday: Date;
    gender: String;
    avatar_URL: String;
    memberships: ChannelMembership[];
}
