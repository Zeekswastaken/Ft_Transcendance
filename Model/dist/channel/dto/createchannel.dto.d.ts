import { Channel } from "../../database/Channel.entity";
export declare class CreateChannelDto extends Channel {
    name: string;
    type: String;
    password?: String;
}
