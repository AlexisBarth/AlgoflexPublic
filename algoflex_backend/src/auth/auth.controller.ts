import { Controller, Req, Get, Post, UseGuards, Body, NotFoundException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { User } from 'src/users/entity';
import { BaseRequest, FirebaseAuthGuard } from '../common';
import { LoginDto } from './dto';
const fs = require('fs')

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @UseGuards(FirebaseAuthGuard)
  @Get('user-info')
  public async getUserInfo(@Req() req: BaseRequest): Promise<User | undefined> {
    if (!req.user) {
      throw new NotFoundException();
    }
    return this.authService.findById(req.user.uid);
  }

  @Get('ping')
  public async ping() {
    fs.readFile('/tmp/algoflex_autocomplete/file.cpp', 'utf8' , (err: any, data: any) => {
      if (err) {
        console.error(err)
        return
      }
      console.log(data)
    })
    return {
      status: "success",
      message: "pong",
    };
  }
}
