import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { profile } from 'console';
import { update } from 'src/Dto/use.Dto';
import { JWToken } from 'src/auth/jwt.service';
import { UserService } from 'src/user/user.service';

@Controller('profile')
export class ProfileController {
    constructor (private readonly userservice:UserService,private readonly jwt:JWToken){}

    @Get(':username')
    async display(@Param('username') username:String,@Res() res){
        const user = await this.userservice.findByName(username);
        res.send(user);
    }
    @Put('update/:username')
    async update(@Body() Body:update,@Res() res,@Param('username') username:String){
        if (Body)
        {
            await this.userservice.update(Body,username);
            const user = await this.userservice.findByName(username); 
            const coockie = this.jwt.generateToken_2(user);
            res.send({message:'success',coockie:coockie});
        }
        else {
            res.send({message:'error'});
        }
    }
}
