import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(): Promise<import("./user.dto").User[]>;
    getUserById(id: string): Promise<import("./user.dto").User>;
    createUser(user: CreateUserDto): Promise<import("./user.dto").User>;
    updateUser(id: string, payload: UpdateUserDto): Promise<import("./user.dto").User>;
    deleteUser(id: string): Promise<{
        id: number;
    }>;
}
