import { JwtService } from '@nestjs/jwt';
import { jwtDTO } from 'src/user/use.Dto';
import { User } from 'src/user/user.entities';
export declare class JWToken {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    private secret_key;
    generateToken(user: jwtDTO): Promise<string>;
    verify(token: any): Promise<boolean>;
    decoded(token: any): Promise<null | User>;
}
