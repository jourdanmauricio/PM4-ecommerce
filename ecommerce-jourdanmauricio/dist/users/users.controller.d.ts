import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { v4 as uuid } from 'uuid';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(): Promise<import("./users.entity").User[]>;
    getUserById(id: uuid): Promise<import("./users.entity").User>;
    createUser(user: CreateUserDto): Promise<import("./users.entity").User>;
    updateUser(id: uuid, payload: UpdateUserDto): Promise<import("./users.entity").User>;
    deleteUser(id: uuid): Promise<import("./users.entity").User>;
}
