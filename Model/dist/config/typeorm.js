"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionSource = void 0;
const config_1 = require("@nestjs/config");
const typeorm_1 = require("typeorm");
const stats_entity_1 = require("../database/stats.entity");
const match_entity_1 = require("../database/match.entity");
const gameInvite_entity_1 = require("../database/gameInvite.entity");
const blockedUser_entity_1 = require("../database/blockedUser.entity");
const userFriends_entity_1 = require("../database/userFriends.entity");
const achievements_entity_1 = require("../database/achievements.entity");
const notifications_entity_1 = require("../database/notifications.entity");
const message_entity_1 = require("../database/message.entity");
const channel_entity_1 = require("../database/channel.entity");
const user_entity_1 = require("../database/user.entity");
const channelMembership_entity_1 = require("../database/channelMembership.entity");
const config = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'admin',
    password: 'pass',
    database: 'mydb',
    entities: [message_entity_1.Message, channel_entity_1.Channel, user_entity_1.User, channelMembership_entity_1.ChannelMembership, stats_entity_1.Stats, match_entity_1.Match, gameInvite_entity_1.GameInvite, blockedUser_entity_1.BlockedUser, userFriends_entity_1.UserFriends, achievements_entity_1.Achievements, notifications_entity_1.Notification],
    logging: true,
    synchronize: true,
    migrations: ["dist/migrations/*{.ts,.js}"],
    autoLoadEntities: true,
};
exports.default = (0, config_1.registerAs)('typeorm', () => config);
exports.connectionSource = new typeorm_1.DataSource(config);
//# sourceMappingURL=typeorm.js.map