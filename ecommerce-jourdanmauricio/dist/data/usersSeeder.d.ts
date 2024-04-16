import { Users } from '../entities/users.entity';
import { Repository } from 'typeorm';
export declare class AdminUserSeeder {
    private readonly userRepository;
    constructor(userRepository: Repository<Users>);
    runAdmin(): Promise<void>;
    runCustomers(): Promise<void>;
    runTestCustomer(): Promise<void>;
}
