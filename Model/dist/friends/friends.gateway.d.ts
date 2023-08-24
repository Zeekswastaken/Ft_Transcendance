import { FriendsService } from './friends.service';
import { JwtService } from '@nestjs/jwt';
import { Socket, Server } from 'socket.io';
export declare class FriendsGateway {
    private readonly friendsService;
    private readonly jwtService;
    server: Server;
    constructor(friendsService: FriendsService, jwtService: JwtService);
    create(data: {
        userID: Number;
        recipientID: Number;
    }, client: Socket): Promise<import("../database/userFriends.entity").UserFriends>;
    accept(data: {
        userID: Number;
        recipientID: Number;
    }, client: Socket): Promise<void>;
    deny(data: {
        userID: Number;
        recipientID: Number;
    }, client: Socket): Promise<void>;
    remove(data: {
        userID: Number;
        recipientID: Number;
    }, client: Socket): Promise<void>;
    getAll(data: {
        userID: Number;
    }, client: Socket): Promise<import("../database/user.entity").User[]>;
    check(data: {
        userID: Number;
        recipientID: Number;
    }, client: Socket): Promise<boolean>;
}
