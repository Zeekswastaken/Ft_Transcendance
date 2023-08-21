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
exports.FriendsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const friends_service_1 = require("./friends.service");
const jwt_1 = require("@nestjs/jwt");
const socket_io_1 = require("socket.io");
let FriendsGateway = exports.FriendsGateway = class FriendsGateway {
    constructor(friendsService, jwtService) {
        this.friendsService = friendsService;
        this.jwtService = jwtService;
    }
    async create(data, client) {
        try {
            const request = await this.friendsService.create(data.userID, data.recipientID);
            console.log("}}}}}}}}}}");
            try {
                const message = "It has been sent";
                client.emit('friendRequest', request);
            }
            catch (error) {
                console.error('Error emitting friendRequest event: ', error.message);
            }
            console.log("{{{{{{{{{{{{{{{{");
            return request;
        }
        catch (error) {
            console.error('Error sending the friend request: ', error.message);
            client.emit('error', error.message);
            throw error;
        }
    }
    async accept(data, client) {
        try {
            console.log("-------> user ");
            console.log("-------> user ", data.userID);
            console.log("-------> recipient ", data.recipientID);
            return await this.friendsService.acceptRequest(data.userID, data.recipientID);
        }
        catch (error) {
            console.error('Error accepting the friend request: ', error.message);
            client.emit('error', error.message);
            throw error;
        }
    }
    async deny(data, client) {
        try {
            return await this.friendsService.refuseRequest(data.userID, data.recipientID);
        }
        catch (error) {
            console.error('Error refusing the friend request: ', error.message);
            client.emit('error', error.message);
            throw error;
        }
    }
    remove(data, client) {
        try {
            return this.friendsService.removeFriendship(data.userID, data.recipientID);
        }
        catch (error) {
            console.error('Error unfriending the user: ', error.message);
            client.emit('error', error.message);
            throw error;
        }
    }
    async getAll(data, client) {
        try {
            const details = await this.friendsService.getUserFriends(data.userID);
            console.log(details);
            return details;
        }
        catch (error) {
            console.error('Error getting the friends of the user: ', error.message);
            client.emit('error', error.message);
            throw error;
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], FriendsGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendFriendRequest'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], FriendsGateway.prototype, "create", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('acceptFriendRequest'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], FriendsGateway.prototype, "accept", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('denyFriendRequest'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], FriendsGateway.prototype, "deny", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('Unfriend'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], FriendsGateway.prototype, "remove", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getAllFriends'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], FriendsGateway.prototype, "getAll", null);
exports.FriendsGateway = FriendsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [friends_service_1.FriendsService,
        jwt_1.JwtService])
], FriendsGateway);
//# sourceMappingURL=friends.gateway.js.map