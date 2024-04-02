import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(): Promise<({
        id: number;
        name: string;
        email: string;
        password: string;
        address: string;
        phone: string;
        country: string;
        city: string;
    } | {
        id: number;
        name: string;
        email: string;
        address: string;
        phone: string;
        country: string;
        city: string;
        password?: undefined;
    })[]>;
}
