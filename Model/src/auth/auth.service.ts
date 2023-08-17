import { Injectable, Res } from '@nestjs/common';
import { promises } from 'dns';
import { Response } from 'express';
import { UserDto, jwtDTO } from 'src/Dto/use.Dto';
import { User } from 'src/database/user.entity';
import { UserService } from 'src/user/user.service';
import { JWToken } from './jwt.service';
import { checkPasswordStrength } from 'src/utils/passwordChecker';
import { Stats } from 'src/database/stats.entity';

@Injectable()
export class AuthService {
    constructor(private readonly userservice:UserService,private readonly jwtoken:JWToken){}
    // singin(@Res() res:Response){
    //     res.sendFile('/Users/orbiay/Desktop/App2/app/views/login.html');
    // }
    // singup(@Res() res:Response){
    //     res.sendFile('/Users/orbiay/Desktop/App2/app/views/signup.html');
    // }
    async check_and_create(body:UserDto):Promise<String | boolean | User>{
        if (!body.username)
            return 'empty';
        if (checkPasswordStrength(body.password) == 'Weak')
            return 'weak';
        if (body.password == body.repassword)
        {
            if (await this.userservice.findByName(body.username) == null)
            {
                const user = new User();
               // console.log("************>>"+user.id);
                user.username = body.username;
                user.password = body.password;
                user.avatar_url = body.password;
                await this.userservice.save(user);
                console.log("************>>"+user.id);

                const stats = new Stats();
                user.stats = stats;
                stats.user = user;
                await this.userservice.saveStat(stats);
                //this.userservice.initStats(body);
                await this.userservice.save(user);
                console.log("************>>"+user.id);

                //await this.userservice.initStats(await this.userservice.findByName(body.username));
                return user;
            }
            else 
                return 'exists';
        }
        else
            return 'notMatch';
    }
    async validate_by_email(username:String,password:String) :Promise<User | null>
    {
        const user = await this.userservice.findByName(username);
        if (user && password == user.password && user.password && user.password != 'Oauth' )
        {
            console.log(user);
            return user;
        }
        else 
        {
            console.log(user);
            return null;
        }
    }
    async create_Oauth(body:UserDto):Promise<boolean>
    {
       const user = await this.userservice.findByName(body.username);
       if (!user)
       {
            await this.userservice.save(body);
            return true;
       }
        else
            return false;
    }
    // async generatOken(user:Partial<User>){
    //     console.log(user);
    //     return await this.jwtoken.generateToken(user);
    // }
    async generateToken_2(user:Partial<User>)
    {
        return await this.jwtoken.generateToken_2(user);
    }
    async isValid(token:String)
    {
        return await this.jwtoken.verify(token);
    }
}
