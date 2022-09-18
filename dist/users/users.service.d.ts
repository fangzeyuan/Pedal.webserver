import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<Users>);
    findAll(): Promise<Users[]>;
    findOne(_sid: string): Promise<Users>;
    remove(id: string): Promise<void>;
}
