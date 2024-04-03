export declare class User {
    readonly id: number;
    readonly name: string;
    readonly email: string;
    readonly password: string;
    readonly address: string;
    readonly phone: string;
    readonly country?: string;
    readonly city?: string;
}
declare const CreateUserDto_base: import("@nestjs/mapped-types").MappedType<Omit<User, "id">>;
export declare class CreateUserDto extends CreateUserDto_base {
}
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
}
export {};
