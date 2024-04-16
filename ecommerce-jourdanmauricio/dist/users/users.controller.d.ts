/// <reference types="node" />
import { UsersService } from './users.service';
import { UpdateUserDto } from './user.dto';
import { UUID } from 'crypto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(page: number, limit: number): Promise<{
        page: number;
        total: number;
        users: import("../entities/users.entity").Users[];
    }>;
    getUserById(id: UUID): Promise<import("../entities/users.entity").Users>;
    updateUser(id: UUID, payload: UpdateUserDto): Promise<import("../entities/users.entity").Users>;
    deleteUser(id: UUID): Promise<import("../entities/users.entity").Users>;
}
