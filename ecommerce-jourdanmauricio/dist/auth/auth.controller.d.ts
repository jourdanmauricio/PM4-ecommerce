import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './../users/user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(user: CreateUserDto): Promise<import("../entities/users.entity").Users>;
    signin(credentials: LoginUserDto): Promise<{
        user: import("../entities/users.entity").Users;
        token: string;
    }>;
}
