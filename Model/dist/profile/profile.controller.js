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
exports.ProfileController = void 0;
const common_1 = require("@nestjs/common");
const use_Dto_1 = require("../Dto/use.Dto");
const jwt_service_1 = require("../auth/jwt.service");
const user_service_1 = require("../user/user.service");
let ProfileController = exports.ProfileController = class ProfileController {
    constructor(userservice, jwt) {
        this.userservice = userservice;
        this.jwt = jwt;
    }
    async display(username, res) {
        const user = await this.userservice.findByName(username);
        res.send(user);
    }
    async update(Body, res, id) {
        if (Body) {
            await this.userservice.update(Body, id);
            const user = await this.userservice.findByName(id);
            const cookie = this.jwt.generateToken_2(user);
            res.send({ message: 'success', cookie: cookie });
        }
        else {
            res.send({ message: 'error' });
        }
    }
};
__decorate([
    (0, common_1.Get)(':username'),
    __param(0, (0, common_1.Param)('username')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "display", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [use_Dto_1.update, Object, Number]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "update", null);
exports.ProfileController = ProfileController = __decorate([
    (0, common_1.Controller)('profile'),
    __metadata("design:paramtypes", [user_service_1.UserService, jwt_service_1.JWToken])
], ProfileController);
//# sourceMappingURL=profile.controller.js.map