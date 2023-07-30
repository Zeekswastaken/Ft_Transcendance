import { ChannelService } from './channel.service';
import { CreateChannelDto } from './dto/createChannel.dto';
export declare class ChannelController {
    private readonly channelService;
    constructor(channelService: ChannelService);
    createChannel(CreateChannelDto: CreateChannelDto, req: any): Promise<import("../database/channel.entity").Channel>;
    getAllChannels(): Promise<import("../database/channel.entity").Channel[]>;
}
