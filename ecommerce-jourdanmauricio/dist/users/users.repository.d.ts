import { CreateUserDto, UpdateUserDto, User } from './user.dto';
import { SigninDto } from 'src/auth/auth.dto';
export declare class UsersRespository {
    private users;
    getUsers(): Promise<User[]>;
    getById(id: number): Promise<User>;
    createUser(user: CreateUserDto): Promise<{
        name: string;
        email: string;
        password: string;
        address: string;
        phone: string;
        country?: string;
        city?: string;
        id: number;
    }>;
    updateUser(id: number, changes: UpdateUserDto): Promise<User>;
    deleteUser(id: number): Promise<{
        id: number;
    }>;
    signin(credentials: SigninDto): Promise<User>;
}
