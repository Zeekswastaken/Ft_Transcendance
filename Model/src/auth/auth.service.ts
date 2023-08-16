import { Injectable, Res } from '@nestjs/common';
import { promises } from 'dns';
import { Response } from 'express';
import { UserDto, jwtDTO } from 'src/Dto/use.Dto';
import { User } from 'src/database/user.entity';
import { UserService } from 'src/user/user.service';
import { JWToken } from './jwt.service';
import { checkPasswordStrength } from 'src/utils/passwordChecker';
import * as speakeasy from 'speakeasy';
@Injectable()
export class AuthService {
    constructor(private readonly userservice:UserService,private readonly jwtoken:JWToken){}
    // singin(@Res() res:Response){
    //     res.sendFile('/Users/orbiay/Desktop/App2/app/views/login.html');
    // }
    // singup(@Res() res:Response){
    //     res.sendFile('/Users/orbiay/Desktop/App2/app/views/signup.html');
    // }
    async generateSecret(userid:Number): Promise<User> {
        const user = await this.userservice.findById(userid);
        user.twoFactorSecret = speakeasy.generateSecret().base32;
        this.userservice.saveByObj(user);
        return (user);
    }

    async generateQrCodeUri(userid: Number): Promise<string> {
        const user = await this.userservice.findById(userid);
        return speakeasy.otpauthURL({
         secret: user.twoFactorSecret,
         label: user.username,
         issuer: 'Pong',
       });
    }

    async verifyToken(token: string, userid: Number): Promise<boolean> {
        const user = await this.userservice.findById(userid);
        if (speakeasy.totp.verify({
          secret: user.twoFactorSecret,
          encoding: 'base32',
          token,
        }))
        {
            user.twoFactorEnabled = true;
            return true;
        }
        return false;
      }
    
    async check_and_create(body:UserDto):Promise<String | boolean>{
        if (!body.username)
            return 'empty';
        if (checkPasswordStrength(body.password) == 'Weak')
            return 'weak';
        if (body.password == body.repassword)
        {
            if (await this.userservice.findByName(body.username) == null)
            {
                await this.userservice.save(body);
                return true;
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
