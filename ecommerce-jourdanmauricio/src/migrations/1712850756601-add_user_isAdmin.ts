import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserIsAdmin1712850756601 implements MigrationInterface {
  name = 'AddUserIsAdmin1712850756601';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "is_admin" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_admin"`);
  }
}
