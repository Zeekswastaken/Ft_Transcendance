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
exports.fortytwo_Controller = exports.googleController = exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const use_Dto_1 = require("../Dto/use.Dto");
const local_startegy_1 = require("./local.startegy");
const passport_1 = require("@nestjs/passport");
let AuthController = class AuthController {
    constructor(authservice, localStrategy) {
        this.authservice = authservice;
        this.localStrategy = localStrategy;
    }
    singin(res) {
        this.authservice.singin(res);
    }
    singup(res) {
        this.authservice.singup(res);
    }
    async create(Body, res) {
        if (await this.authservice.check_and_create(Body) != null) {
            res.sendFile('/Users/orbiay/Desktop/App2/app/views/login.html');
        }
        else
            return {
                user: Body,
                message: 'something wrong with email or password',
            };
    }
    async checking(Body, res) {
        const user = await this.localStrategy.validate(Body.email, Body.password);
        if (!user) {
            var obj = {
                token: 'error',
                user: Body,
                message: 'something wrong with email or password'
            };
            res.send(obj);
            return obj;
        }
        else {
            const jwtoken = await this.authservice.generatOken(Body);
            var obj = {
                token: jwtoken,
                user: Body,
                message: 'the user entrance secssufully'
            };
            res.send(obj);
            return obj;
        }
    }
};
__decorate([
    (0, common_1.Get)('signin'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "singin", null);
__decorate([
    (0, common_1.Get)('signup'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "singup", null);
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [use_Dto_1.UserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [use_Dto_1.UserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "checking", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService, local_startegy_1.LocalStrategy])
], AuthController);
exports.AuthController = AuthController;
let googleController = class googleController {
    constructor(authservice) {
        this.authservice = authservice;
    }
    googlelogin() {
        console.log("Auth/google");
    }
    async googleloginredirect(req, res) {
        console.log("CallBack");
        const user = await req.user;
        console.log(user);
        if (await this.authservice.create_Oauth(user) == true) {
            const cookie_token = await this.authservice.generatOken(user);
            res.cookie('jwt', cookie_token, {
                httpOnly: true,
            });
            res.setHeader('Authorization', `Bearer ${cookie_token}`);
            console.log('coockie token = ' + cookie_token);
            res.status(200).redirect("http://localhost:3001/");
        }
        else {
            console.log('error');
            const cookie_token = await this.authservice.generatOken(user);
            console.log('create token2');
            res.cookie('jwt', cookie_token, {
                httpOnly: true,
            });
            console.log('coockie token = ' + cookie_token + "\n\n\n\n");
            res.setHeader('Authorization', `Bearer ${cookie_token}`);
            res.status(200).redirect("http://localhost:3001/");
            return {
                token: cookie_token,
                user: user,
                message: 'the user already exist'
            };
        }
    }
};
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    (0, common_1.Get)('google'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], googleController.prototype, "googlelogin", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    (0, common_1.Get)('from-google'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], googleController.prototype, "googleloginredirect", null);
googleController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], googleController);
exports.googleController = googleController;
let fortytwo_Controller = class fortytwo_Controller {
    constructor(authservice) {
        this.authservice = authservice;
    }
    googlelogin(req, res) {
        console.log("heloWorld");
    }
    async fortytwo_loginredirect(req, res) {
        console.log("CallBack");
        const user = await req.user;
        if (await this.authservice.create_Oauth(user) == true) {
            const cookie_token = await this.authservice.generatOken(user);
            res.setHeader('Authorization', `Bearer ${cookie_token}`);
            console.log('coockie token = ' + cookie_token);
            res.status(200).redirect("http://localhost:3001/");
            const user_data = { token: cookie_token,
                user: user,
                message: 'the email already exist' };
            return user_data;
        }
        else {
            console.log('error');
            const cookie_token = await this.authservice.generatOken(user);
            console.log('create token2');
            res.cookie('Access Token', cookie_token, {
                httpOnly: true,
            });
            console.log('coockie token = ' + cookie_token);
            res.setHeader('Authorization', `Bearer ${cookie_token}`);
            res.status(200).redirect("http://localhost:3001/");
            const user_data = { token: cookie_token,
                user: user,
                message: 'the email already exist' };
            return user_data;
        }
    }
};
__decorate([
    (0, common_1.Get)('42'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('42')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], fortytwo_Controller.prototype, "googlelogin", null);
__decorate([
    (0, common_1.Get)('from-42'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('42')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], fortytwo_Controller.prototype, "fortytwo_loginredirect", null);
fortytwo_Controller = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], fortytwo_Controller);
exports.fortytwo_Controller = fortytwo_Controller;
//# sourceMappingURL=auth.controller.js.map