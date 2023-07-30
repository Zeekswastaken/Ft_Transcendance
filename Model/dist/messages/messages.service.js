"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const message_entity_1 = require("../database/message.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const user_entity_1 = require("../database/user.entity");
let MessagesService = exports.MessagesService = class MessagesService {
    constructor(messageRepository, userRepository) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
    }
    async getClientName(clientId) {
        const message = await this.messageRepository
            .createQueryBuilder('message')
            .leftJoinAndSelect('message.membership', 'membership')
            .leftJoinAndSelect('membership.user', 'user')
            .where('message.id = :clientId', { clientId })
            .getOne();
        if (message && message.membership && message.membership.user) {
            return message.membership.user.username;
        }
        else {
            return null;
        }
    }
    async createMessage(createMessageDto, clientId) {
        const user = await this.userRepository.findOne({ where: { id: clientId } });
        if (!user) {
            return null;
        }
        const message = new message_entity_1.Message();
        message.id = createMessageDto.id;
        message.text = createMessageDto.text;
        message.Created_at = new Date();
        message.membership = user.memberships[0];
        return await this.messageRepository.save(message);
    }
    async findAll() {
        return this.messageRepository.find();
    }
};
exports.MessagesService = MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(message_entity_1.Message)),
    __param(1, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], MessagesService);
//# sourceMappingURL=messages.service.js.map