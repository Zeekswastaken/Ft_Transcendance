import { TokenExpiredError } from 'jsonwebtoken';

import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/user.entity';
import { UserDto ,MoreInfos, TO_update} from '../Dto/use.Dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}
    async save(Body:UserDto ){
        await this.userRepo.save(Body);
    }
    async update(Body:Partial<User>,id:number){
       // console.log("\n\n\n\n\body after == "+ Body);
            await this.userRepo.update(id,Body);
    }
    async findByName(username:any): Promise<User>
    {
       const user =  await this.userRepo.findOne({where :{ username: username},});
       return user;
    }
    async findById(id:any): Promise<User>
    {
       const user =  await this.userRepo.findOne({where :{ id: id}});
       return user;
    }
    //async update(Body:UserDto)
    //{
    //    await this.userRepo.update(Body);
    //}
}
