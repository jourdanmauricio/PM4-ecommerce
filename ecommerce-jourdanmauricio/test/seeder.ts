import { MigrationInterface, QueryRunner } from 'typeorm';
// import { Users } from 'src/entities/users.entity'

export class adminSeeder implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const user = {
      // id: '7ef136e4-f80e-4077-818d-1ba72f750aed',
      name: 'Mauricio Jourdan',
      email: 'jourdanmau@mail.com',
      password: '$2b$10$XH0t3k84pQiznk/b0EBA7.mlS6NePpzKeHguJp96zw00B.Wh6Lrse',
      phone: '2214529298',
      country: 'Argentina',
      address: 'Av 7 nro 1532',
      city: 'La Plata',
      isAdmin: true,
    };

    await queryRunner.manager.save(user);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
