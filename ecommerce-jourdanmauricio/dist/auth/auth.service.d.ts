import { UsersRespository } from 'src/users/users.repository';
import { SigninDto } from './auth.dto';
export declare class AuthService {
    private usersRepository;
    constructor(usersRepository: UsersRespository);
    getAuths(): string;
    signin(credentials: SigninDto): Promise<import("../users/user.dto").User>;
}
