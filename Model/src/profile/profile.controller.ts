import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { profile } from 'console';
import { User } from 'src/database/user.entity';
import { update } from 'src/Dto/use.Dto';
import { JWToken } from 'src/auth/jwt.service';
import { UserService } from 'src/user/user.service';
import { ProfileService } from './profile.service';
import { checkPasswordStrength } from 'src/utils/passwordChecker';

@Controller('profile')
export class ProfileController {
    constructor (private readonly userservice:UserService,private readonly profileService:ProfileService,private readonly jwt:JWToken){}

    @Get(':username')
    async display(@Param('username') username:String,@Res() res){
        console.log(username);
        const user = await this.profileService.findByName(username);
        if (user)
        {
            console.log(user.stats);
            delete user.password;
        }
        res.send(user);
    }
    @Put('update/:id')
    async update(@Body() Body:Partial<User>,@Res() res,@Param('id') id:number){
        if (Body)
        {
            if (!Body.username)
            {
                res.send('empty');
                return;
            }
            const exist = this.userservice.findByName(Body.username);
            if (!exist)
            {
                if (checkPasswordStrength(Body.password) == 'Weak')
                {
                    res.send('weak');
                    return;
                }
                await this.userservice.update(Body,id);
                const user = await this.userservice.findById(id); 
                console.log(user.stats);
                const cookie = await this.jwt.generateToken_2(user);
            
                console.log(await this.jwt.decoded(cookie));
                res.send({message:'success',cookie:cookie});
            }
            else
                res.send({message:'username already exist',status:'failure'})
        }
        else {
            res.send({message:'error'});
        }
    }
}
