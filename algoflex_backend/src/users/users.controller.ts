import {
  Controller,
  ClassSerializerInterceptor,
  Get,
  UseGuards,
  Delete,
  Param,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { FirebaseAuthGuard, RolesGuard, Role, Roles, BaseRequest } from '../common';
import { User } from './entity';
import { UsersService } from './users.service';

@UseGuards(FirebaseAuthGuard, RolesGuard)
@ApiTags('Users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(Role.Admin)
  @Get()
  findAll(@Req() req: BaseRequest): Promise<User[]> {
    console.log(req.user);
    return this.usersService.findAll();
  }

  @Roles(Role.Admin)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findById(id);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<User | undefined> {
    return this.usersService.remove(id);
  }
}
