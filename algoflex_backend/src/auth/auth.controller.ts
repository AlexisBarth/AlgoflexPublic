import { Controller, Request, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard, FirebaseAuthGuard } from '../common';
import { User } from 'src/users/entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Request() req) {
    return this.authService.login(req.body);
  }

  @UseGuards(FirebaseAuthGuard)
  @Get('user-info')
  public async getUserInfo(@Request() req): Promise<User> {
    return this.authService.findById(req.uid);
  }
}
