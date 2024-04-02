import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRespository {
  private users = [
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
      address: 'Av 7 nro 1377 depto 2',
      phone: '22122222222',
      country: 'Argentina',
      city: 'La Plata',
    },
    {
      id: 3,
      name: 'Nancy',
      email: 'nan@mail.com',
      address: 'Av 7 nro 1377 depto 3',
      phone: '22133333333',
      country: 'Argentina',
      city: 'La Plata',
    },
  ];

  async getUsers() {
    return this.users;
  }
}
