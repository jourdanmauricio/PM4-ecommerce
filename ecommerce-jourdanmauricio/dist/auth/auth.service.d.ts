import { SigninDto } from './auth.dto';
import { UsersService } from 'src/users/users.service';
export declare class AuthService {
    private usersService;
    constructor(usersService: UsersService);
    getAuths(): string;
    signin(credentials: SigninDto): Promise<import("../users/users.entity").User>;
}
