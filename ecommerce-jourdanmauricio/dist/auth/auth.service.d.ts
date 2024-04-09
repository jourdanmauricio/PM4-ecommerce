import { LoginUserDto } from './auth.dto';
import { UsersService } from 'src/users/users.service';
export declare class AuthService {
    private usersService;
    constructor(usersService: UsersService);
    getAuths(): string;
    signin(credentials: LoginUserDto): Promise<import("../entities/users.entity").Users>;
}
