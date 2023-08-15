"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const channel_service_1 = require("./channel.service");
const socket_io_1 = require("socket.io");
const jwt_1 = require("@nestjs/jwt");
let ChannelGateway = exports.ChannelGateway = class ChannelGateway {
    constructor(channelService, jwtService) {
        this.channelService = channelService;
        this.jwtService = jwtService;
    }
    async create(createChannelDto, client) {
        try {
            const userid = 1;
            const channel = await this.channelService.createChannel(createChannelDto, userid);
            this.server.emit('channel', channel);
            if (channel.Type === 'private') {
                const invitationLink = this.channelService.generateInvitationLink(channel.id);
                console.log("----------> ", invitationLink);
                client.emit('invitationLink', invitationLink);
            }
            return channel;
        }
        catch (error) {
            console.error('Error creating channel: ', error.message);
            client.emit('error', error.message);
            throw error;
        }
    }
    async findAll() {
        return await this.channelService.getAllChannels();
    }
    async Join(data) {
        try {
            const channelID = 1;
            const userID = data.userID;
            const Pass = data.Pass;
            const userid = 2;
            return await this.channelService.joinChannel(channelID, userid, Pass);
        }
        catch (error) {
            console.error('Error joining channel: ', error.message);
            throw error;
        }
    }
    async Leave(data) {
        try {
            const channelID = data.channelID;
            const userID = data.userID;
            console.log("--------> ", data.channelID);
            console.log("--------> ", data.userID);
            const userid = 1;
            const channelid = 1;
            return await this.channelService.LeaveChannel(channelid, userid);
        }
        catch (error) {
            console.error('Error leaving channel: ', error.message);
            throw error;
        }
    }
    async assignAd(data) {
        try {
            const channelID = data.channelID;
            const userID = data.userID;
            console.log("--------> ", data.channelID);
            console.log("--------> ", data.userID);
            const userid = 2;
            const channelid = 1;
            const initiatorid = 1;
            return await this.channelService.assignAdmin(channelid, userid, initiatorid);
        }
        catch (error) {
            console.error('Error assigning admin: ', error.message);
            throw error;
        }
    }
    async removeAd(data) {
        try {
            const channelID = data.channelID;
            const userID = data.userID;
            console.log("--------> ", data.channelID);
            console.log("--------> ", data.userID);
            const userid = 2;
            const channelid = 4;
            const initiatorid = 1;
            return await this.channelService.removeAdmin(channelid, userid, initiatorid);
        }
        catch (error) {
            console.error('Error removing admin: ', error.message);
            throw error;
        }
    }
    async mute(data) {
        try {
            const channelID = data.channelID;
            const userID = data.userID;
            const initiatorID = data.initiatorID;
            const amount = data.amount;
            return await this.channelService.muteUser(channelID, userID, initiatorID, amount);
        }
        catch (error) {
            console.error('Error muting user: ', error.message);
            throw error;
        }
    }
    async unmute(data) {
        try {
            const channelID = data.channelID;
            const userID = data.userID;
            return await this.channelService.unmuteUser(channelID, userID);
        }
        catch (error) {
            console.error('Error unmuting user: ', error.message);
            throw error;
        }
    }
    async ban(data) {
        try {
            const channelID = data.channelID;
            const userID = data.userID;
            const initiatorID = data.initiatorID;
            const amount = data.amount;
            return await this.channelService.banUser(channelID, userID, initiatorID, amount);
        }
        catch (error) {
            console.error('Error banning user: ', error.message);
            throw error;
        }
    }
    async unban(data) {
        try {
            const channelID = data.channelID;
            const userID = data.userID;
            return await this.channelService.unbanUser(channelID, userID);
        }
        catch (error) {
            console.error('Error unmuting user: ', error.message);
            throw error;
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChannelGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('createChannel'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChannelGateway.prototype, "create", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('findAllChannels'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChannelGateway.prototype, "findAll", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinChannel'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChannelGateway.prototype, "Join", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('LeaveChannel'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChannelGateway.prototype, "Leave", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('assignAdmin'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChannelGateway.prototype, "assignAd", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('removeAdmin'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChannelGateway.prototype, "removeAd", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('muteUser'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChannelGateway.prototype, "mute", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('unmuteUser'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChannelGateway.prototype, "unmute", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('banUser'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChannelGateway.prototype, "ban", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('unbanUser'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChannelGateway.prototype, "unban", null);
exports.ChannelGateway = ChannelGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [channel_service_1.ChannelService,
        jwt_1.JwtService])
], ChannelGateway);
//# sourceMappingURL=channel.gateway.js.map