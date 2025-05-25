import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<import("typeorm").InsertResult>;
    findAll(): Promise<User[]>;
    findOne(email: string): Promise<User>;
    findOneBy(params: string[]): Promise<User>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    getUserByEmail(email: string): Promise<User>;
}
