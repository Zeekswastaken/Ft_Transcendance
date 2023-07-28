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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const jwt_service_1 = require("./jwt.service");
let AuthService = class AuthService {
    constructor(userservice, jwtoken) {
        this.userservice = userservice;
        this.jwtoken = jwtoken;
    }
    singin(res) {
        res.sendFile('/Users/orbiay/Desktop/App2/app/views/login.html');
    }
    singup(res) {
        res.sendFile('/Users/orbiay/Desktop/App2/app/views/signup.html');
    }
    async check_and_create(body) {
        if (body.password == body.confirmpassword) {
            if (await this.userservice.findByemail(body.email) == null) {
                await this.userservice.save(body);
                return true;
            }
            else
                return false;
        }
        else
            return false;
    }
    async validate_by_email(email, password) {
        const user = await this.userservice.findByemail(email);
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
        const user = await this.userservice.findByemail(body.email);
        if (!user) {
            await this.userservice.save(body);
            return true;
        }
        else
            return false;
    }
    async generatOken(user) {
        return await this.jwtoken.generateToken(user);
    }
    async isValid(token) {
        return await this.jwtoken.verify(token);
    }
};
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthService.prototype, "singin", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthService.prototype, "singup", null);
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService, jwt_service_1.JWToken])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map