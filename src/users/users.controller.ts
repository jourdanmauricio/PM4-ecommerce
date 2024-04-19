import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Put,
  Query,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from './../guards/auth.guard';
import { RolesGuard } from './../guards/roles.guard';
import { Roles } from './../decorators/roles.decorator';
import { Role } from './../models/roles.enum';
import { UsersService } from './users.service';
import { UpdateUserDto } from './user.dto';
import { UUID } from 'crypto';

@ApiBearerAuth()
@ApiTags('Users')
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
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Número de página',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Número máximo de usuarios a retornar',
  })
  getUsers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ) {
    return this.usersService.findAll(page, limit);
  }

  @Get(':id')
  getUserById(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() payload: UpdateUserDto,
  ) {
    return this.usersService.update(id, payload);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.usersService.remove(id);
  }
}
