import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { Users } from '../entities/users.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<Users>);
    findAll(): Promise<Users[]>;
    findOne(id: uuid): Promise<Users>;
    findByEmail(email: string): Promise<Users>;
    create(user: CreateUserDto): Promise<Users>;
    update(id: uuid, changes: UpdateUserDto): Promise<Users>;
    remove(id: number): Promise<Users>;
}
