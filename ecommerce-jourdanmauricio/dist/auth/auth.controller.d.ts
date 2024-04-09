import { AuthService } from './auth.service';
import { SigninDto } from './auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getAuths(): string;
    signin(credentials: SigninDto): Promise<import("../entities/users.entity").Users>;
}
