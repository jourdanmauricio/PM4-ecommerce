import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { CreateUserDto, UpdateUserDto } from './user.dto';
import { Users } from '../entities/users.entity';
import * as bcrypt from 'bcrypt';
import { UUID } from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [users, total] = await this.usersRepository.findAndCount({
      skip: skip,
      take: limit,
    });
    return {
      page,
      limit,
      total,
      users,
    };
  }

  async findOne(id: uuid): Promise<Users> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['orders'],
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByEmail(email: string): Promise<Users> {
    const user = await this.usersRepository.findOneBy({ email });
    return user;
  }

  async create(user: CreateUserDto): Promise<Users> {
    const newUser = this.usersRepository.create(user);
    return await this.usersRepository.save(newUser);
  }

  async update(id: uuid, changes: UpdateUserDto) {
    const user = await this.findOne(id);
    if (changes.password) {
      const hashedPass = await bcrypt.hash(changes.password, 10);
      changes = { ...changes, password: hashedPass };
    }
    const updUser = this.usersRepository.merge(user, changes);
    return this.usersRepository.save(updUser);
  }

  async remove(id: UUID) {
    const user = await this.findOne(id);
    await this.usersRepository.delete(id);
    return user;
  }
}
