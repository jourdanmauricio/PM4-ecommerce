import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './../src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminUserSeeder {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async run() {
    const adminUser = new Users();
    adminUser.name = 'Mauricio Jourdan';
    adminUser.email = 'jourdanmau@mail.com';
    adminUser.password =
      '$2b$10$XH0t3k84pQiznk/b0EBA7.mlS6NePpzKeHguJp96zw00B.Wh6Lrse';
    adminUser.phone = 2214529298;
    adminUser.country = 'Argentina';
    adminUser.address = 'Av 7 nro 1532';
    adminUser.city = 'La Plata';
    adminUser.isAdmin = true;
    await this.userRepository.save(adminUser);

    const customerUser = new Users();
    customerUser.name = 'Paola Jourdan';
    customerUser.email = 'jourdanpao@mail.com';
    customerUser.password =
      '$2b$10$XH0t3k84pQiznk/b0EBA7.mlS6NePpzKeHguJp96zw00B.Wh6Lrse';
    customerUser.phone = 2214529298;
    customerUser.country = 'Argentina';
    customerUser.address = 'Av 7 nro 1532';
    customerUser.city = 'La Plata';
    customerUser.isAdmin = false;
    await this.userRepository.save(customerUser);
  }
}
