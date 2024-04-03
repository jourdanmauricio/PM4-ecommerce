import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, User } from './user.dto';
import { SigninDto } from 'src/auth/auth.dto';

@Injectable()
export class UsersRespository {
  private users: User[] = [
    {
      id: 1,
      name: 'Mauri',
      email: 'mauri@mail.com',
      password: '12345678',
      address: 'Av 7 nro 1377 depto 1',
      phone: '22111111111',
      country: 'Argentina',
      city: 'La Plata',
    },
    {
      id: 2,
      name: 'Paola',
      email: 'pao@mail.com',
      password: '12345678',
      address: 'Av 7 nro 1377 depto 2',
      phone: '22122222222',
      country: 'Argentina',
      city: 'La Plata',
    },
    {
      id: 3,
      name: 'Nancy',
      email: 'nan@mail.com',
      password: '12345678',
      address: 'Av 7 nro 1377 depto 3',
      phone: '22133333333',
      country: 'Argentina',
      city: 'La Plata',
    },
  ];

  async getUsers() {
    return this.users;
  }

  async getById(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async createUser(user: CreateUserDto) {
    const id = this.users.length + 1;
    this.users = [...this.users, { id, ...user }];
    return { id, ...user };
  }

  async updateUser(id: number, changes: UpdateUserDto) {
    const user: User = await this.getById(id);

    if (user) {
      const index = this.users.findIndex((item) => item.id === id);
      this.users[index] = {
        ...user,
        ...changes,
      };
      return this.users[index];
    }
    return null;
  }

  async deleteUser(id: number) {
    const index = this.users.findIndex((item) => item.id === id);

    if (index === -1) throw new NotFoundException('User not found');

    this.users.splice(index, 1);

    return { id };
  }

  async signin(credentials: SigninDto) {
    const { email, password } = credentials;
    console.log(password);

    const user = this.users.find((user) => user.email === email);
    if (!user) throw new UnauthorizedException('Email o password incorrectos');

    if (user.password !== password)
      throw new UnauthorizedException('Email o password incorrectos');

    return user;
  }
}
