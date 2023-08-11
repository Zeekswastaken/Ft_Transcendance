import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
export declare class ChatGateway {
    private readonly chatService;
    constructor(chatService: ChatService);
    create(createChatDto: CreateChatDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(updateChatDto: UpdateChatDto): string;
    remove(id: number): string;
}
