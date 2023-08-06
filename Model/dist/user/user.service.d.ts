import { Repository } from 'typeorm';
import { User } from '../database/user.entity';
import { UserDto } from '../Dto/use.Dto';
export declare class UserService {
    private readonly userRepo;
    constructor(userRepo: Repository<User>);
    save(Body: UserDto): Promise<void>;
    findByemail(email: any): Promise<User>;
}
