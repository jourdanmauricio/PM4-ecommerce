import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from 'src/users/user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getAuths(): string;
    createUser(user: CreateUserDto): Promise<import("../entities/users.entity").Users>;
    signin(credentials: LoginUserDto): Promise<{
        user: import("../entities/users.entity").Users;
        token: string;
    }>;
}
