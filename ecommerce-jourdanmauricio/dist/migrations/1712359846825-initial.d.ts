import { MigrationInterface, QueryRunner } from "typeorm";
export declare class Initial1712359846825 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
