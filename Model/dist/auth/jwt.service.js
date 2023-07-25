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
exports.JWToken = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let JWToken = class JWToken {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.secret_key = 'k9vL9fr02UHQm1I7C5sO8bjdMnG3FpWz';
    }
    async generateToken(user) {
        return this.jwtService.sign(user);
    }
    async verify(token) {
        try {
            if (token) {
                const decoded = await this.jwtService.verifyAsync(token, { secret: this.secret_key.toString() });
                console.log('Decoded:', decoded);
                const currentTime = Math.floor(Date.now() / 1000);
                if (decoded.exp > currentTime) {
                    console.log('EHO EHO');
                    return true;
                }
                else {
                    return false;
                }
            }
            else
                return false;
        }
        catch (error) {
            console.log('4');
            return false;
        }
    }
    async decoded(token) {
        try {
            if (token) {
                const user = await this.jwtService.verifyAsync(token, { secret: this.secret_key.toString() });
                console.log('Decoded:', user);
                return user;
            }
            else
                return null;
        }
        catch (error) {
            console.log('4---------------->>>>');
            return null;
        }
    }
};
JWToken = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], JWToken);
exports.JWToken = JWToken;
//# sourceMappingURL=jwt.service.js.map