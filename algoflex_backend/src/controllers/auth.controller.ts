import { JsonController, Param, Body, Post } from 'routing-controllers';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

// class BaseUser {
//   @IsNotEmpty()
//   public firstName: string;

//   @IsNotEmpty()
//   public lastName: string;

//   @IsEmail()
//   @IsNotEmpty()
//   public email: string;

//   @IsNotEmpty()
//   public username: string;
// }

@JsonController()
export class AuthController {

  constructor(
    private authService: AuthService
  ) { }

  // @Get()
    // @ResponseSchema(UserResponse, { isArray: true })
    // public find(): Promise<User[]> {
    //   return this.userService.find();
    // }

  @Post('/auth/login')
  authenticate() {
    console.log(this.authService);
    return 'await this.authService.find()';
  }

  @Post('/auth/register')
  post(@Body() userParam: User) {
    // const user = new User();
    // user.firstName = userParam.firstName;
    // user.lastName = userParam.lastName;
    // user.age = 25;
    // await connection.manager.save(user);
    // console.log("Saved a new user with id: " + user.id);
    // return user;
  }
}
