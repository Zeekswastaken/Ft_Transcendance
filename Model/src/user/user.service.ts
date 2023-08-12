import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/user.entity';
import { UserDto} from '../Dto/use.Dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}
    async save(Body:UserDto){
        await this.userRepo.save(Body);
    }
    async findByemail(id:any): Promise<User>
    {
       const user = await  this.userRepo.findOne({where:{id}, relations: ['memberships'] });
       return user;
    }
}
