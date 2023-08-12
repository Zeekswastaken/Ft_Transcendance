import { Response } from 'express';
import { UserDto, jwtDTO } from 'src/Dto/use.Dto';
import { User } from 'src/database/user.entity';
import { UserService } from 'src/user/user.service';
import { JWToken } from './jwt.service';
export declare class AuthService {
    private readonly userservice;
    private readonly jwtoken;
    constructor(userservice: UserService, jwtoken: JWToken);
    singin(res: Response): Promise<void>;
    singup(res: Response): void;
    check_and_create(body: UserDto): Promise<boolean>;
    validate_by_email(email: String, password: String): Promise<User | null>;
    create_Oauth(body: UserDto): Promise<boolean>;
    generatOken(user: jwtDTO): Promise<string>;
    isValid(token: String): Promise<boolean>;
}
