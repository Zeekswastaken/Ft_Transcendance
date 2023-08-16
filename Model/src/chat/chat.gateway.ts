// src/websocket-gateway/websocket-gateway.gateway.ts
import { Inject, Injectable } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { JWToken } from 'src/auth/jwt.service';
import { User } from 'src/database/user.entity';
@Injectable()
@WebSocketGateway()
export class WebsocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
 constructor (private readonly chatservice:ChatService, private readonly jwt:JWToken){}
  @WebSocketServer()
  server: Server;
  @SubscribeMessage('joinDuo')
  async handleConnection(client: Socket) {
    const token = client.handshake.query.token;
    if (await this.jwt.verify(token))
    {
      const user = await this.jwt.decoded(token);
      const rooms  = await this.chatservice.getAllRooms(user.id as number);
      rooms.forEach(room=>{client.join(room)})
      console.log(`Client connected: ${client.id}`);
    }
  }

  handleDisconnect(client: Socket) {
    const token = client.handshake.query.token;
    console.log(`Client disconnected: ${client.id}`);
  }

  afterInit(server: Server) {
    console.log('WebSocket gateway initialized');
  }
  @SubscribeMessage('Duo')
  handleMessage(client: Socket, payload: {message:string,channelId:number}) {

    // client.to(payload.channelId).emit(payload.message);
  }
}
