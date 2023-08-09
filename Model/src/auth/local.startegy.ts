import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local';
import { AuthService } from "./auth.service";
import { User } from "src/DB_tables/user.entities";
import { Injectable } from "@nestjs/common";
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authservice:AuthService){
        super();
    }
    async validate(username:String , password:String):Promise<User | null>{

        const user = await this.authservice.validate_by_email(username,password);
        if (!user)
        {
            console.log(user);
            return null;
        }
        console.log(user);
        return user;
    }
}