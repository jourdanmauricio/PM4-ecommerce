export declare class CreateUserDto {
    readonly name: string;
    readonly email: string;
    readonly password: string;
    readonly address: string;
    readonly phone: number;
    readonly country?: string;
    readonly city?: string;
}
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
}
declare const LoginUserDto_base: import("@nestjs/mapped-types").MappedType<Pick<CreateUserDto, "email" | "password">>;
export declare class LoginUserDto extends LoginUserDto_base {
}
export {};
