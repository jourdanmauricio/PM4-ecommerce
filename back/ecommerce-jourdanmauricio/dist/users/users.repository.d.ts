export declare class UsersRespository {
    private users;
    getUsers(): Promise<({
        id: number;
        name: string;
        email: string;
        password: string;
        address: string;
        phone: string;
        country: string;
        city: string;
    } | {
        id: number;
        name: string;
        email: string;
        address: string;
        phone: string;
        country: string;
        city: string;
        password?: undefined;
    })[]>;
}
