import { Response, Request } from 'express';
import { UserService } from './user/user.service';
import { UserDto } from './user/use.Dto';
import { JWToken } from './auth/jwt.service';
export declare class AppController {
    private readonly userservice;
    private readonly jwt;
    constructor(userservice: UserService, jwt: JWToken);
    default(res: Response, req: Request, query: UserDto): Promise<any>;
}
