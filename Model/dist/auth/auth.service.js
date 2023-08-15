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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const jwt_service_1 = require("./jwt.service");
const passwordChecker_1 = require("../utils/passwordChecker");
const speakeasy = require("speakeasy");
let AuthService = exports.AuthService = class AuthService {
    constructor(userservice, jwtoken) {
        this.userservice = userservice;
        this.jwtoken = jwtoken;
    }
    async generateSecret(userid) {
        const user = await this.userservice.findById(userid);
        user.twoFactorSecret = speakeasy.generateSecret().base32;
        this.userservice.saveByObj(user);
        return (user);
    }
    async generateQrCodeUri(userid, secret) {
        const user = await this.userservice.findById(userid);
        return speakeasy.otpauthURL({
            secret,
            label: user.username,
            issuer: 'Pong',
        });
    }
    async verifyToken(secret, token, userid) {
        if (speakeasy.totp.verify({
            secret,
            encoding: 'base32',
            token,
        })) {
            const user = await this.userservice.findById(userid);
            user.twoFactorEnabled = true;
            return true;
        }
        return false;
    }
    async check_and_create(body) {
        if (!body.username)
            return 'empty';
        if ((0, passwordChecker_1.checkPasswordStrength)(body.password) == 'Weak')
            return 'weak';
        if (body.password == body.repassword) {
            if (await this.userservice.findByName(body.username) == null) {
                await this.userservice.save(body);
                return true;
            }
            else
                return 'exists';
        }
        else
            return 'notMatch';
    }
    async validate_by_email(username, password) {
        const user = await this.userservice.findByName(username);
        if (user && password == user.password && user.password && user.password != 'Oauth') {
            console.log(user);
            return user;
        }
        else {
            console.log(user);
            return null;
        }
    }
    async create_Oauth(body) {
        const user = await this.userservice.findByName(body.username);
        if (!user) {
            await this.userservice.save(body);
            return true;
        }
        else
            return false;
    }
    async generateToken_2(user) {
        return await this.jwtoken.generateToken_2(user);
    }
    async isValid(token) {
        return await this.jwtoken.verify(token);
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService, jwt_service_1.JWToken])
], AuthService);
//# sourceMappingURL=auth.service.js.map