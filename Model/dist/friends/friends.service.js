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
        const initiator = await this.userRepository.findOne({ where: { id: (0, typeorm_2.Equal)(userid) }, relations: ['friendsassender', 'friendsasreceiver'] });
        const recipient = await this.userRepository.findOne({ where: { id: (0, typeorm_2.Equal)(recipientid) }, relations: ['friendsassender', 'friendsasreceiver'], });
        if (!initiator || !recipient)
            throw new common_1.HttpException("User or Recipient not found", common_1.HttpStatus.FORBIDDEN);
        const friendship = await this.userFriendsRepository.findOne({ where: [{ sender: (0, typeorm_2.Equal)(userid), receiver: (0, typeorm_2.Equal)(recipientid) }, { sender: (0, typeorm_2.Equal)(recipientid), receiver: (0, typeorm_2.Equal)(userid) }] });
        if (friendship)
            throw new common_1.HttpException("The friend request has already been sent", common_1.HttpStatus.FORBIDDEN);
        const actualFriendship = new userFriends_entity_1.UserFriends();
        actualFriendship.sender = initiator;
        actualFriendship.receiver = recipient;
        actualFriendship.status = "pending";
        await this.userFriendsRepository.save(actualFriendship);
        initiator.friendsassender = [actualFriendship];
        console.log(initiator.friendsassender);
        recipient.friendsasreceiver = [actualFriendship];
        await this.userRepository.save([initiator, recipient]);
        console.log("--------------------------> ", recipient.friendsasreceiver[0].receiver);
        return actualFriendship;
    }
    findAll() {
        return `This action returns all friends`;
    }
    async acceptRequest(userid, recipientid) {
        var _a, _b;
        const friendship = await this.userFriendsRepository.findOne({
            where: { sender: (0, typeorm_2.Equal)(recipientid), receiver: (0, typeorm_2.Equal)(userid) }
        });
        if (!friendship) {
            throw new common_1.HttpException("No request to accept", common_1.HttpStatus.FORBIDDEN);
        }
        friendship.status = "accepted";
        console.log(friendship.receiver);
        await this.userFriendsRepository.save(friendship);
        const accepting = await this.userRepository.findOne({
            where: { id: (0, typeorm_2.Equal)(userid) },
            relations: ['friendsassender', 'friendsasreceiver']
        });
        const waiting = await this.userRepository.findOne({
            where: { id: (0, typeorm_2.Equal)(recipientid) },
            relations: ['friendsassender', 'friendsasreceiver']
        });
        if (!accepting || !waiting) {
            throw new common_1.HttpException("Users not found", common_1.HttpStatus.FORBIDDEN);
        }
        console.log("======> ", accepting);
        console.log("**********> ", accepting.friendsasreceiver[0]);
        console.log("---------> ", (_a = accepting.friendsasreceiver[0]) === null || _a === void 0 ? void 0 : _a.receiver);
        const friendsassenderhip = accepting.friendsassender.find(friend => friend.receiver.id === recipientid);
        if (friendsassenderhip) {
            friendsassenderhip.status = "accepted";
        }
        const friendsasreceiverhip = waiting.friendsassender.find(friend => friend.sender.id === userid);
        if (friendsasreceiverhip) {
            friendsasreceiverhip.status = "accepted";
        }
        console.log("****************> ", (_b = waiting.friendsassender[0]) === null || _b === void 0 ? void 0 : _b.receiver);
        await this.userRepository.save([accepting, waiting]);
    }
    async refuseRequest(userid, recipientid) {
        const friendship = await this.userFriendsRepository.findOne({ where: { sender: (0, typeorm_2.Equal)(userid), receiver: (0, typeorm_2.Equal)(recipientid) } });
        if (!friendship)
            throw new common_1.HttpException("No request to accept", common_1.HttpStatus.FORBIDDEN);
        await this.userFriendsRepository.remove(friendship);
    }
    async removeFriendship(userid, recipientid) {
        const friendship = await this.userFriendsRepository.findOne({ where: [{ sender: (0, typeorm_2.Equal)(userid), receiver: (0, typeorm_2.Equal)(recipientid) }, { sender: (0, typeorm_2.Equal)(recipientid), receiver: (0, typeorm_2.Equal)(userid) }] });
        if (!friendship)
            throw new common_1.HttpException("No friendship to remove", common_1.HttpStatus.FORBIDDEN);
        await this.userFriendsRepository.remove(friendship);
    }
    async getUserFriends(userid) {
        console.log("Here");
        const friendDetails = await this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.friendsassender', 'user_friendship', 'user_friendship.status = \'accepted\' AND (user_friendship.sender = :userid OR user_friendship.receiver = :userid)', { userid })
            .leftJoinAndSelect('user.friendsasreceiver', 'user_friendship2', 'user_friendship2.status = \'accepted\' AND (user_friendship2.receiver = :userid OR user_friendship2.sender = :userid)', { userid })
            .where('user.id = :userid', { userid });
        const userWithFriendships = await friendDetails.getOne();
        console.log("User with friendships", userWithFriendships);
        if (userWithFriendships) {
            console.log("----0-0-0-0-0- ", userWithFriendships.friendsassender[0]);
            const friendsWithDetails = [
                ...userWithFriendships.friendsassender.map(friendship => {
                    var _a, _b, _c;
                    return ({
                        id: (_a = friendship.receiver) === null || _a === void 0 ? void 0 : _a.id,
                        username: (_b = friendship.receiver) === null || _b === void 0 ? void 0 : _b.username,
                        avatar_url: (_c = friendship.receiver) === null || _c === void 0 ? void 0 : _c.avatar_url,
                    });
                }),
                ...userWithFriendships.friendsasreceiver.map(friendship => {
                    var _a, _b, _c;
                    return ({
                        id: (_a = friendship.sender) === null || _a === void 0 ? void 0 : _a.id,
                        username: (_b = friendship.sender) === null || _b === void 0 ? void 0 : _b.username,
                        avatar_url: (_c = friendship.sender) === null || _c === void 0 ? void 0 : _c.avatar_url,
                    });
                }),
            ];
            console.log("Friend Details:", friendsWithDetails);
            return friendsWithDetails;
        }
        else {
            console.log("No Friend Details found.");
        }
        return [];
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