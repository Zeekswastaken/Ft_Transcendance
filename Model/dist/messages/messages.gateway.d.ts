import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Socket, Server } from 'socket.io';
export declare class MessagesGateway {
    private readonly messagesService;
    server: Server;
    constructor(messagesService: MessagesService);
    create(createMessageDto: CreateMessageDto, client: Socket): Promise<{
        id: string;
        name: string;
        text: string;
    } & import("./entities/message.entity").Message>;
    findAll(): Promise<import("./entities/message.entity").Message[]>;
    typing(isTyping: boolean, client: Socket): Promise<void>;
}
