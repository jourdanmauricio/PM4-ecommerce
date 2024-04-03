import { UsersRespository } from './users.repository';
import { CreateUserDto, UpdateUserDto, User } from './user.dto';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: UsersRespository);
    getUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User>;
    createUser(user: CreateUserDto): Promise<User>;
    updateUser(id: number, changes: UpdateUserDto): Promise<User>;
    deleteUser(id: number): Promise<{
        id: number;
    }>;
}
