export declare class CreateUserDto {
    readonly name: string;
    readonly email: string;
    readonly password: string;
    readonly confPassword: string;
    readonly address: string;
    readonly phone: number;
    readonly country?: string;
    readonly city?: string;
    isAdmin: boolean;
}
declare const UpdateUserDto_base: import("@nestjs/common").Type<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
}
export declare class LoginUserDto {
    email: string;
    password: string;
}
export {};
