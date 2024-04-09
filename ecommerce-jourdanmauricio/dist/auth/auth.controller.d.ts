import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getAuths(): string;
    signin(credentials: LoginUserDto): Promise<import("../entities/users.entity").Users>;
}
