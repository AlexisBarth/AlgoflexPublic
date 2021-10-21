import { JsonController, Param, Body, Post } from 'routing-controllers';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@JsonController()
export class AuthController {

  constructor(
    private authService: AuthService
  ) { }

  @Post('/auth/login')
  authenticate() {
    console.log(this.authService);
    return 'await this.authService.find()';
  }

  @Post('/auth/register')
  post(@Body() userParam: User) {
    return "Creating user";
  }
}
