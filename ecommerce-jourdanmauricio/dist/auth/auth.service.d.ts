import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './auth.dto';
import { CreateUserDto } from 'src/users/user.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    getAuths(): string;
    signin(credentials: LoginUserDto): Promise<{
        user: import("../entities/users.entity").Users;
        token: string;
    }>;
    signup(user: CreateUserDto): Promise<import("../entities/users.entity").Users>;
}
