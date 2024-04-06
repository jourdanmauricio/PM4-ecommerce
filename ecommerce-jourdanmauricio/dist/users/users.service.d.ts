import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { SigninDto } from 'src/auth/auth.dto';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findOne(id: uuid): Promise<User>;
    findByEmail(email: string): Promise<User>;
    create(user: CreateUserDto): Promise<User>;
    update(id: uuid, changes: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<User>;
    signin(credentials: SigninDto): Promise<User>;
}
