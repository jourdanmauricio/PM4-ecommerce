import { v4 as uuid } from 'uuid';
import { UsersService } from './users.service';
import { UpdateUserDto } from './user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(): Promise<import("../entities/users.entity").Users[]>;
    getUserById(id: uuid): Promise<import("../entities/users.entity").Users>;
    updateUser(id: uuid, payload: UpdateUserDto): Promise<import("../entities/users.entity").Users>;
    deleteUser(id: uuid): Promise<import("../entities/users.entity").Users>;
}
