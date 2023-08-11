import { JwtService } from '@nestjs/jwt';
import { User } from 'src/DB_tables/user.entities';
export declare class JWToken {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    private secret_key;
    generateToken(user: Partial<User>): Promise<string>;
    generateToken_2(user: Partial<User>): Promise<string>;
    verify(token: any): Promise<boolean>;
    decoded(token: any): Promise<null | User>;
}
