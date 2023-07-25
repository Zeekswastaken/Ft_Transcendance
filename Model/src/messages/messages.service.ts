import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from '../database/message.entity'
import { Repository, ReturnDocument } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { lstat } from 'fs';


@Injectable()
export class MessagesService {
  
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,) {}
  //DO THIS WITH A DATABASE
  // identify(name: string, clientId: string)
  // {
  //   this.clientToUser[clientId] = name;
  //   //ADD A SELECT WUERY
  //   return Object.values(this.clientToUser);
  // }

  async getClientName(clientId: string)
  {
    const id = await this.messageRepository.findOne({where:{id : clientId}});
    if (id)
      return id.name;
    else
      return null;
  }

  async createMessage(createMessageDto: CreateMessageDto, clientId: string) {
    const message = {
      id: createMessageDto.id,
      name: createMessageDto.name,
      text: createMessageDto.text,
    }
    return await this.messageRepository.save(message);
  }

  async findAll() : Promise<Message[]> {
    return this.messageRepository.find();
  }

}
