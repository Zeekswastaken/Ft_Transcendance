import { JwtService } from '@nestjs/jwt';
import { jwtDTO } from 'src/Dto/use.Dto';
import { User } from 'src/DB_tables/user.entities';
export declare class JWToken {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    private secret_key;
    generateToken(user: jwtDTO): Promise<string>;
    generateToken_2(user: jwtDTO): Promise<string>;
    verify(token: any): Promise<boolean>;
    decoded(token: any): Promise<null | User>;
}
