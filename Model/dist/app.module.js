"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const guards_1 = require("./auth/guards");
const jwt_service_1 = require("./auth/jwt.service");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("./user/user.service");
const file_upload_module_1 = require("./file-upload/file-upload.module");
const upload_controller_1 = require("./file-upload/upload.controller");
const profile_module_1 = require("./profile/profile.module");
const chat_gateway_1 = require("./chat/chat.gateway");
const chat_module_1 = require("./chat/chat.module");
const chat_service_1 = require("./chat/chat.service");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, user_module_1.UserModule, file_upload_module_1.FileUploadModule, jwt_1.JwtModule.register({
                secret: "0a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
                signOptions: { expiresIn: '1m' },
            }), file_upload_module_1.FileUploadModule, profile_module_1.ProfileModule, chat_module_1.ChatModule],
        controllers: [app_controller_1.AppController, upload_controller_1.UploadController],
        providers: [app_service_1.AppService, guards_1.TokenGuard, jwt_service_1.JWToken, user_service_1.UserService, chat_gateway_1.ChatGateway, chat_service_1.ChatService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map