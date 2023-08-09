import { Channel } from "../../database/Channel.entity";
export declare class createChannelDto extends Channel {
    name: string;
    type: String;
    password?: String;
}
