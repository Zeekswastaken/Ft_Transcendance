import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { ChannelService } from './channel.service';
import { createChannelDto } from './dto/createChannel.dto';
import { Socket, Server } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@UseGuards(AuthGuard())
export class ChannelGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly channelService: ChannelService,
              private readonly jwtService: JwtService) {}

  @SubscribeMessage('createChannel')
  async create(@MessageBody() createChannelDto: createChannelDto, @ConnectedSocket() client: Socket) {
    try{
    // console.log("====> ", client.id);
      console.log("it kinda worked");
      const token = client.handshake.query.token;
      const decodedToken = this.jwtService.verify(token.toString());
      const userid = decodedToken.sub;
      const channel = await this.channelService.createChannel(createChannelDto, userid);
      this.server.emit('channel', channel);
      return channel;
    } catch (error)
    {
      console.error('Error creating channel: ', error.message);
      throw error;
    }
  }
  
  @SubscribeMessage('findAllChannels')
  async findAll() {
    return await this.channelService.getAllChannels();
  }
}