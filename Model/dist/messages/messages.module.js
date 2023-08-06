"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const messages_service_1 = require("./messages.service");
const messages_gateway_1 = require("./messages.gateway");
const message_entity_1 = require("../database/message.entity");
const user_entity_1 = require("../database/user.entity");
const channelMembership_entity_1 = require("../database/channelMembership.entity");
const channel_entity_1 = require("../database/channel.entity");
let MessagesModule = exports.MessagesModule = class MessagesModule {
};
exports.MessagesModule = MessagesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([message_entity_1.Message, channel_entity_1.Channel, channelMembership_entity_1.ChannelMembership, user_entity_1.User])],
        providers: [messages_gateway_1.MessagesGateway, messages_service_1.MessagesService]
    })
], MessagesModule);
//# sourceMappingURL=messages.module.js.map