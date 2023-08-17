import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { FriendsService } from './friends.service';
import { JwtService } from '@nestjs/jwt';
import { Socket, Server } from 'socket.io';
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class FriendsGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly friendsService: FriendsService,
              private readonly jwtService: JwtService) {}

  @SubscribeMessage('sendFriendRequest')
  async create(@MessageBody() data: { userID: Number, recipientID: Number}) {
    return await this.friendsService.create(data.userID, data.recipientID);
  }

  @SubscribeMessage('getAllFriends')
  findAll() {
    return this.friendsService.findAll();
  }

  // @SubscribeMessage('findOneFriend')
  // findOne(@MessageBody() id: number) {
  //   return this.friendsService.findOne(id);
  // }

  @SubscribeMessage('acceptFriendRequest')
  async accept(@MessageBody() data: { userID: Number, recipientID: Number}) {
    return await this.friendsService.acceptRequest(data.userID, data.recipientID);
  }

  @SubscribeMessage('denyFriendRequest')
  async deny(@MessageBody() data: { userID: Number, recipientID: Number}) {
    return await this.friendsService.refuseRequest(data.userID, data.recipientID);
  }
  
  @SubscribeMessage('Unfriend')
  remove(@MessageBody() data: { userID: Number, recipientID: Number}) {
    return this.friendsService.removeFriendship(data.userID, data.recipientID);
  }
}
