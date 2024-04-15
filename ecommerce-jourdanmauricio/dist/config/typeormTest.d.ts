import { DataSource } from 'typeorm';
declare const _default: (() => {
    type: string;
    database: string;
    host: string;
    port: number;
    username: string;
    password: string;
    autoLoadEntities: boolean;
    synchronize: boolean;
    dropSchema: boolean;
    logging: boolean;
    entities: string[];
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    type: string;
    database: string;
    host: string;
    port: number;
    username: string;
    password: string;
    autoLoadEntities: boolean;
    synchronize: boolean;
    dropSchema: boolean;
    logging: boolean;
    entities: string[];
}>;
export default _default;
export declare const connectionSource: DataSource;
