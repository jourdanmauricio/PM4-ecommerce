import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddUserIsAdmin1712850756601 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
