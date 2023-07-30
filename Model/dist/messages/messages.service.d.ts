import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from '../database/message.entity';
import { Repository } from 'typeorm';
import { User } from '../database/user.entity';
export declare class MessagesService {
    private messageRepository;
    private userRepository;
    constructor(messageRepository: Repository<Message>, userRepository: Repository<User>);
    getClientName(clientId: number): Promise<String | null>;
    createMessage(createMessageDto: CreateMessageDto, clientId: number): Promise<Message>;
    findAll(): Promise<Message[]>;
}
