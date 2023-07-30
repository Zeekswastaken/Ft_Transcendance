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
exports.ChannelService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const channel_entity_1 = require("../database/channel.entity");
const channelMembership_entity_1 = require("../database/channelMembership.entity");
const user_entity_1 = require("../database/user.entity");
const bcrypt = require("bcrypt");
let ChannelService = exports.ChannelService = class ChannelService {
    constructor(channelRepository, channelMembershipRepository, userRepository) {
        this.channelRepository = channelRepository;
        this.channelMembershipRepository = channelMembershipRepository;
        this.userRepository = userRepository;
    }
    async createChannel(createChannelDto, owner) {
        const channel = new channel_entity_1.Channel();
        if (createChannelDto.Name == undefined)
            throw new common_1.HttpException("Channel name not specified", common_1.HttpStatus.FORBIDDEN);
        channel.Name = createChannelDto.Name;
        channel.Type = createChannelDto.type;
        const checkChannel = await this.channelRepository.findOne({ where: { Name: createChannelDto.Name } });
        if (checkChannel)
            throw new common_1.HttpException("Channel already exists with the same name", common_1.HttpStatus.FORBIDDEN);
        if (createChannelDto.type === "protected" && createChannelDto.Password) {
            const hashedPass = await this.hashPassword(createChannelDto.Password);
            channel.Password = hashedPass;
        }
        if (createChannelDto.type === "protected" && !createChannelDto.Password)
            throw new common_1.HttpException('Password required', common_1.HttpStatus.FORBIDDEN);
        const savedChannel = await this.channelRepository.save(channel);
        const membership = new channelMembership_entity_1.ChannelMembership();
        membership.Userid = owner.id;
        membership.Channelid = savedChannel.id;
        membership.Type = "owner";
        await this.channelMembershipRepository.save(membership);
        return savedChannel;
    }
    async getAllChannels() {
        return this.channelRepository.find({
            where: {
                Type: (0, typeorm_2.Not)("private")
            },
        });
    }
    async ChangePassword() {
    }
    async hashPassword(password) {
        const saltOrRounds = 10;
        return await bcrypt.hash(password, saltOrRounds);
    }
};
exports.ChannelService = ChannelService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(channel_entity_1.Channel)),
    __param(1, (0, typeorm_1.InjectRepository)(channelMembership_entity_1.ChannelMembership)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ChannelService);
//# sourceMappingURL=channel.service.js.map