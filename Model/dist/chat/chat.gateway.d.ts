/// <reference types="node" />
import { ChatService } from './chat.service';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Server } from 'http';
export declare class ChatGateway {
    private readonly chatService;
    constructor(chatService: ChatService);
    server: Server;
    findAll(client: any, Body: any): void;
    update(updateChatDto: UpdateChatDto): string;
    remove(id: number): string;
}
