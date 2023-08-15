import { Repository } from 'typeorm';
import { User } from '../database/user.entity';
import { UserDto } from '../Dto/use.Dto';
export declare class UserService {
    private readonly userRepo;
    constructor(userRepo: Repository<User>);
    save(Body: UserDto): Promise<void>;
    saveByObj(Body: User): Promise<void>;
    update(Body: Partial<User>, id: number): Promise<void>;
    findByName(username: any): Promise<User>;
    findById(id: any): Promise<User>;
}
