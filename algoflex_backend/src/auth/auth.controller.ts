import { Controller, Request, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard, FirebaseAuthGuard } from '../common';
import { User } from 'src/users/entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(FirebaseAuthGuard)
  @Post('login')
  public async login(@Request() req) {
    return 'loggedin';
    // return this.authService.login(req.user);
  }

  @Post('register')
  public async register(@Request() req) {
    return this.authService.register(req.body);
  }

  @Post('refresh-token')
  public async refreshToken(@Request() req) {
    return 'Refreshing token';
  }

  @UseGuards(JwtAuthGuard)
  @Get('user-info')
  public async getUserInfo(@Request() req): Promise<User> {
    console.log(req.user.userId);
    return this.authService.findById(req.user.userId);
  }
}
