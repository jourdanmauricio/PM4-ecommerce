import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/users.entity';
import { Repository } from 'typeorm';
import { generateUsers } from './user.fake';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserSeeder {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async runAdmin() {
    const users = await this.userRepository.find();

    if (users.length) return;

    // Admin
    const adminUser = new Users();
    adminUser.name = 'Mauricio Jourdan';
    adminUser.email = 'jourdanmau@mail.com';
    adminUser.password = await bcrypt.hash(process.env.USERS_PASSWORD, 10);
    adminUser.phone = 2214529298;
    adminUser.country = 'Argentina';
    adminUser.address = 'Av 7 nro 1532';
    adminUser.city = 'La Plata';
    adminUser.isAdmin = true;
    await this.userRepository.save(adminUser);
  }

  async runCustomers() {
    const user = await this.userRepository.findOneBy({
      isAdmin: false,
    });

    if (user) return;

    const customers = generateUsers(22);

    // Customers
    for await (const customer of customers) {
      const newCustomer = new Users();
      newCustomer.name = customer.name;
      newCustomer.email = customer.email;
      newCustomer.password = await bcrypt.hash(process.env.USERS_PASSWORD, 10);
      newCustomer.phone = customer.phone;
      newCustomer.country = customer.country;
      newCustomer.address = customer.address;
      newCustomer.city = customer.city;
      newCustomer.isAdmin = false;
      await this.userRepository.save(newCustomer);
    }
  }

  async runTestCustomer() {
    const user = await this.userRepository.findOneBy({
      email: 'jourdanpao@mail.com',
    });

    if (user) return;

    // Customer
    const customerUser = new Users();
    customerUser.name = 'Paola Jourdan';
    customerUser.email = 'jourdanpao@mail.com';
    customerUser.password = await bcrypt.hash(process.env.USERS_PASSWORD, 10);
    customerUser.phone = 2214529298;
    customerUser.country = 'Argentina';
    customerUser.address = 'Av 7 nro 1532';
    customerUser.city = 'La Plata';
    customerUser.isAdmin = false;
    await this.userRepository.save(customerUser);
  }
}
