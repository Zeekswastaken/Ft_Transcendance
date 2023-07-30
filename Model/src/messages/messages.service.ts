import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from '../database/message.entity'
import { Repository, ReturnDocument } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { lstat } from 'fs';
import { User } from '../database/user.entity';


@Injectable()
export class MessagesService {
  
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    @InjectRepository(User) private userRepository: Repository<User>,){}
    //DO THIS WITH A DATABASE
  // identify(name: string, clientId: string)
  // {
  //   this.clientToUser[clientId] = name;
  //   //ADD A SELECT WUERY
  //   return Object.values(this.clientToUser);
  // }

  async getClientName(clientId: number): Promise<String | null> {
    const message = await this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.membership', 'membership')
      .leftJoinAndSelect('membership.user', 'user')
      .where('message.id = :clientId', { clientId })
      .getOne();

    if (message && message.membership && message.membership.user) {
      return message.membership.user.username;
    } else {
      return null;
    }
  }


  async createMessage(createMessageDto: CreateMessageDto, clientId: number) {
    const user = await this.userRepository.findOne({ where: { id: clientId } });
    if (!user) {
      return null;
    }
  
    const message = new Message();
    message.id = createMessageDto.id;
    message.text = createMessageDto.text;
    message.Created_at = new Date();
    message.membership = user.memberships[0];
  
    return await this.messageRepository.save(message);
  }

  async findAll() : Promise<Message[]> {
    return this.messageRepository.find();
  }

}
