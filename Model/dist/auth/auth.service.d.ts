import { UserDto } from 'src/Dto/use.Dto';
import { User } from 'src/database/user.entity';
import { UserService } from 'src/user/user.service';
import { JWToken } from './jwt.service';
export declare class AuthService {
    private readonly userservice;
    private readonly jwtoken;
    constructor(userservice: UserService, jwtoken: JWToken);
    generateSecret(userid: Number): Promise<User>;
    generateQrCodeUri(userid: Number, secret: string): Promise<string>;
    verifyToken(secret: string, token: string, userid: Number): Promise<boolean>;
    check_and_create(body: UserDto): Promise<String | boolean>;
    validate_by_email(username: String, password: String): Promise<User | null>;
    create_Oauth(body: UserDto): Promise<boolean>;
    generateToken_2(user: Partial<User>): Promise<String>;
    isValid(token: String): Promise<boolean>;
}
