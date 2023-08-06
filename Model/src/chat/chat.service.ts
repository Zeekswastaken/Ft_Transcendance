import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Server } from 'http';

@Injectable()
export class ChatService {
  // create(createChatDto: CreateChatDto) {
  //   return 'This action adds a new chat';
  // }

  findAll(server:Server) {
    server.emit(null,'Welcome to our server');
    //return `This action returns all chat`;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} chat`;
  // }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
