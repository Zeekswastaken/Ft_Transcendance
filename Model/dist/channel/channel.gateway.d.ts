import { ChannelService } from './channel.service';
import { createChannelDto } from './dto/createChannel.dto';
import { Socket, Server } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
export declare class ChannelGateway {
    private readonly channelService;
    private readonly jwtService;
    server: Server;
    constructor(channelService: ChannelService, jwtService: JwtService);
    create(createChannelDto: createChannelDto, client: Socket): Promise<import("../database/channel.entity").Channel>;
    findAll(): Promise<import("../database/channel.entity").Channel[]>;
    Join(data: {
        channelID: number;
        userID: number;
        Pass: string;
    }): Promise<import("../database/channelMembership.entity").ChannelMembership>;
    Leave(data: {
        channelID: number;
        userID: number;
    }): Promise<Boolean>;
    assignAd(data: {
        channelID: number;
        userID: number;
        initiatorID: number;
    }): Promise<import("../database/channelMembership.entity").ChannelMembership>;
    removeAd(data: {
        channelID: number;
        userID: number;
        initiatorID: number;
    }): Promise<import("../database/channelMembership.entity").ChannelMembership>;
}
