import { MigrationInterface, QueryRunner } from "typeorm";
export declare class Initial1712432012400 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
