import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
export declare class MessagesService {
    private messageRepository;
    constructor(messageRepository: Repository<Message>);
    getClientName(clientId: string): Promise<string>;
    createMessage(createMessageDto: CreateMessageDto, clientId: string): Promise<{
        id: string;
        name: string;
        text: string;
    } & Message>;
    findAll(): Promise<Message[]>;
}
