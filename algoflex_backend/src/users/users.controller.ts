import {
  Controller,
  ClassSerializerInterceptor,
  Get,
  Post,
  UseGuards,
  Put,
  Delete,
  Body,
  Param,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FirebaseAuthGuard, RolesGuard, Role, Roles } from '../common';
import { User } from './entity';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get()
  findAll(@Req() req): Promise<User[]> {
    console.log(req.user);
    return this.usersService.findAll();
  }

  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findById(id);
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin)
  // @Post()
  // create(@Body() createUserDto: CreateUserDto): Promise<User[]> {
  //   return this.usersService.findAll();
  // }

  @UseGuards(FirebaseAuthGuard)
  @Put(':userId')
  update(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(FirebaseAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(id);
  }
}
