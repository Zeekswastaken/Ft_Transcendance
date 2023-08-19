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
exports.FriendsService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../database/user.entity");
const userFriends_entity_1 = require("../database/userFriends.entity");
const notifications_entity_1 = require("../database/notifications.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let FriendsService = exports.FriendsService = class FriendsService {
    constructor(userFriendsRepository, userRepository, notificationsRepository) {
        this.userFriendsRepository = userFriendsRepository;
        this.userRepository = userRepository;
        this.notificationsRepository = notificationsRepository;
    }
    async create(userid, recipientid) {
        const initiator = await this.userRepository.findOne({ where: { id: (0, typeorm_2.Equal)(userid) } });
        const recipient = await this.userRepository.findOne({ where: { id: (0, typeorm_2.Equal)(recipientid) } });
        if (!initiator || !recipient)
            throw new common_1.HttpException("User or Recipient not found", common_1.HttpStatus.FORBIDDEN);
        const friendship = await this.userFriendsRepository.findOne({ where: { user1: (0, typeorm_2.Equal)(userid), user2: (0, typeorm_2.Equal)(recipientid) } });
        if (friendship)
            throw new common_1.HttpException("The friend request has already been sent", common_1.HttpStatus.FORBIDDEN);
        const actualFriendship = new userFriends_entity_1.UserFriends();
        actualFriendship.user1 = initiator;
        actualFriendship.user2 = recipient;
        actualFriendship.status = "pending";
        return await this.userFriendsRepository.save(actualFriendship);
    }
    findAll() {
        return `This action returns all friends`;
    }
    async acceptRequest(userid, recipientid) {
        console.log("*****************************************");
        const friendship = await this.userFriendsRepository.findOne({ where: { user1: (0, typeorm_2.Equal)(recipientid), user2: (0, typeorm_2.Equal)(userid) } });
        if (!friendship)
            throw new common_1.HttpException("No request to accept", common_1.HttpStatus.FORBIDDEN);
        friendship.status = "accepted";
        await this.userFriendsRepository.save(friendship);
    }
    async refuseRequest(userid, recipientid) {
        const friendship = await this.userFriendsRepository.findOne({ where: { user1: (0, typeorm_2.Equal)(userid), user2: (0, typeorm_2.Equal)(recipientid) } });
        if (!friendship)
            throw new common_1.HttpException("No request to accept", common_1.HttpStatus.FORBIDDEN);
        await this.userFriendsRepository.remove(friendship);
    }
    async removeFriendship(userid, recipientid) {
        const friendship = await this.userFriendsRepository.findOne({ where: [{ user1: (0, typeorm_2.Equal)(userid), user2: (0, typeorm_2.Equal)(recipientid) }, { user1: (0, typeorm_2.Equal)(recipientid), user2: (0, typeorm_2.Equal)(userid) }] });
        if (!friendship)
            throw new common_1.HttpException("No friendship to remove", common_1.HttpStatus.FORBIDDEN);
        await this.userFriendsRepository.remove(friendship);
    }
    async getUserFriendsWithDetails(userid) {
        const friendDetails = await this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.friends', 'friendship', 'friendship.User1ID = :userid OR friendship.User2ID = :userid', { userid })
            .select(['user.id', 'user.username', 'user.avatar_url'])
            .getMany();
        return friendDetails;
    }
};
exports.FriendsService = FriendsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(userFriends_entity_1.UserFriends)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(notifications_entity_1.Notification)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], FriendsService);
//# sourceMappingURL=friends.service.js.map