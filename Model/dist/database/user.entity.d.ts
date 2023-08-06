import { ChannelMembership } from "./channelMembership.entity";
export declare class User {
    id: number;
    username: String;
    birthday: Date;
    email: String;
    gender: String;
    password: String;
    avatar_URL: String;
    memberships: ChannelMembership[];
}
