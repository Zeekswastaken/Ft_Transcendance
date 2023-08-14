import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { profile } from 'console';
import { User } from 'src/database/user.entity';
import { update } from 'src/Dto/use.Dto';
import { JWToken } from 'src/auth/jwt.service';
import { UserService } from 'src/user/user.service';

@Controller('profile')
export class ProfileController {
    constructor (private readonly userservice:UserService,private readonly jwt:JWToken){}

    @Get(':username')
    async display(@Param('username') username:String,@Res() res){
        const user = await this.userservice.findByName(username);
        delete user.password;
        res.send(user);
    }
    @Put('update/:id')
    async update(@Body() Body:Partial<User>,@Res() res,@Param('id') id:number){
        if (Body)
        {
            await this.userservice.update(Body,id);
            const user = await this.userservice.findById(id); 
            console.log(user);
            const cookie = await this.jwt.generateToken_2(user);
            
            console.log(await this.jwt.decoded(cookie));
            res.send({message:'success',cookie:cookie});
        }
        else {
            res.send({message:'error'});
        }
    }
}
