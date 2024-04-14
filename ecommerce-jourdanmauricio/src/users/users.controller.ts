import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { UsersService } from './users.service';
import { UpdateUserDto } from './user.dto';
import { AuthGuard } from './../guards/auth.guard';
import { Roles } from './../decorators/roles.decorator';
import { Role } from './../models/roles.enum';
import { RolesGuard } from './../guards/roles.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @SerializeOptions({
    groups: ['role:admin'],
  })
  getUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  getUserById(@Param('id', ParseUUIDPipe) id: uuid) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: uuid,
    @Body() payload: UpdateUserDto,
  ) {
    return this.usersService.update(id, payload);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseUUIDPipe) id: uuid) {
    return this.usersService.remove(id);
  }
}
