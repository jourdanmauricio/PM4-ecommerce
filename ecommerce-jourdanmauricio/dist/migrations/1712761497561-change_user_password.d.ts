import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class ChangeUserPassword1712761497561 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}