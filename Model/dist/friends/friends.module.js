"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendsModule = void 0;
const common_1 = require("@nestjs/common");
const friends_service_1 = require("./friends.service");
const friends_gateway_1 = require("./friends.gateway");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../database/user.entity");
const userFriends_entity_1 = require("../database/userFriends.entity");
const channel_entity_1 = require("../database/channel.entity");
const jwt_1 = require("@nestjs/jwt");
const notifications_entity_1 = require("../database/notifications.entity");
let FriendsModule = exports.FriendsModule = class FriendsModule {
};
exports.FriendsModule = FriendsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, userFriends_entity_1.UserFriends, channel_entity_1.Channel, notifications_entity_1.Notification]), jwt_1.JwtModule.register({
                secret: "0a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
                signOptions: { expiresIn: '1h' },
            })],
        providers: [friends_gateway_1.FriendsGateway, friends_service_1.FriendsService],
        exports: [typeorm_1.TypeOrmModule]
    })
], FriendsModule);
//# sourceMappingURL=friends.module.js.map