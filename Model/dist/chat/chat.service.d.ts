/// <reference types="node" />
import { UpdateChatDto } from './dto/update-chat.dto';
import { Server } from 'http';
export declare class ChatService {
    findAll(server: Server): void;
    update(id: number, updateChatDto: UpdateChatDto): string;
    remove(id: number): string;
}
