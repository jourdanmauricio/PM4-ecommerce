import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeUserPassword1712761497561 implements MigrationInterface {
  name = 'ChangeUserPassword1712761497561';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "password" character varying(150) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "password" character varying(20) NOT NULL`,
    );
  }
}
