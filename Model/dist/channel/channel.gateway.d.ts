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
        channelID: Number;
        userID: Number;
        Pass: string;
    }): Promise<import("../database/channelMembership.entity").ChannelMembership>;
    Leave(data: {
        channelID: Number;
        userID: Number;
    }): Promise<Boolean>;
    assignAd(data: {
        channelID: Number;
        userID: Number;
        initiatorID: Number;
    }): Promise<import("../database/channelMembership.entity").ChannelMembership>;
    removeAd(data: {
        channelID: Number;
        userID: Number;
        initiatorID: Number;
    }): Promise<import("../database/channelMembership.entity").ChannelMembership>;
    mute(data: {
        channelID: Number;
        userID: Number;
        initiatorID: Number;
        amount: number;
    }): Promise<import("../database/channelMembership.entity").ChannelMembership>;
    unmute(data: {
        channelID: Number;
        userID: Number;
    }): Promise<import("../database/channelMembership.entity").ChannelMembership>;
    ban(data: {
        channelID: Number;
        userID: Number;
        initiatorID: Number;
        amount: number;
    }): Promise<import("../database/channelMembership.entity").ChannelMembership>;
    unban(data: {
        channelID: Number;
        userID: Number;
    }): Promise<import("../database/channelMembership.entity").ChannelMembership>;
}
