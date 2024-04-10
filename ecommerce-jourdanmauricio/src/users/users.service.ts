import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import { CreateUserDto, UpdateUserDto } from './user.dto';
import { Users } from '../entities/users.entity';
import { LoginUserDto } from 'src/auth/auth.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async findAll() {
    const users = await this.usersRepository.find();
    return users;
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

  create(user: CreateUserDto): Promise<Users> {
    const newUser = this.usersRepository.create(user);

    const result = this.usersRepository.save(newUser).catch((err: any) => {
      throw new BadRequestException(err.detail);
    });
    return result;
  }

  async update(id: uuid, changes: UpdateUserDto) {
    const user = await this.findOne(id);
    this.usersRepository.merge(user, changes);
    return this.usersRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.usersRepository.delete(id);
    return user;
  }

  async signin(credentials: LoginUserDto) {
    const { email, password } = credentials;

    const user = await this.findByEmail(email);
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const matchPass = await bcrypt.compare(password, user.password);

    if (!matchPass) throw new BadRequestException('Credenciales inválidas');

    return user;
  }
}
