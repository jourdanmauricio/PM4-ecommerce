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
export {};
