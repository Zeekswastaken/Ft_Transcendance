import { AuthService } from './auth.service';
import { UserDto } from 'src/Dto/use.Dto';
import { LocalStrategy } from './local.startegy';
import { Response } from 'express';
export declare class AuthController {
    private readonly authservice;
    private readonly localStrategy;
    constructor(authservice: AuthService, localStrategy: LocalStrategy);
    create(Body: UserDto, res: Response): Promise<void>;
    checking(Body: UserDto, res: Response): Promise<void>;
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
