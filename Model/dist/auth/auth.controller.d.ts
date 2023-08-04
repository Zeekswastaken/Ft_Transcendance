import { UserService } from './../user/user.service';
import { AuthService } from './auth.service';
import { UserDto } from 'src/Dto/use.Dto';
import { LocalStrategy } from './local.startegy';
import { Response } from 'express';
import { JWToken } from './jwt.service';
export declare class AuthController {
    private readonly authservice;
    private readonly localStrategy;
    private readonly userservice;
    private readonly jwtservice;
    constructor(authservice: AuthService, localStrategy: LocalStrategy, userservice: UserService, jwtservice: JWToken);
    modyfiy(Body: any, res: Response): Promise<void>;
    create(Body: UserDto, res: any): Promise<void>;
    checking(Body: UserDto, res: Response): Promise<void>;
    log_out(Body: any, res: Response): Promise<void>;
}
export declare class googleController {
    private readonly authservice;
    constructor(authservice: AuthService);
    googlelogin(): void;
    googleloginredirect(req: any, res: Response): Promise<{
        status: number;
        token: string;
        user: any;
        message: string;
    }>;
}
export declare class fortytwo_Controller {
    private readonly authservice;
    constructor(authservice: AuthService);
    googlelogin(req: any, res: any): void;
    fortytwo_loginredirect(req: any, res: Response): Promise<{
        token: string;
        user: any;
        message: string;
    }>;
}
