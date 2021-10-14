import { JsonController, Param, Body, Get, Post, Put, Delete, Authorized } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { UserService } from '../services/user.service';

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
@Service()
export class UserController {

  constructor(
    private userService: UserService
  ) { }

  // @Get() 
    // @ResponseSchema(UserResponse, { isArray: true })
    // public find(): Promise<User[]> {
    //   return this.userService.find();
    // }

  @Authorized()
  @Get('/users')
  getAll() {
    return this.userService.find();
    // return 'This action returns user #' + id;
  }

  @Authorized()
  @Get('/users/:id')
  getOne(@Param('id') id: number) {
    return this.userService.find();
    // return 'This action returns user #' + id;
  }

  @Post('/users')
  post(@Body() user: any) {
    return 'Saving user...';
  }

  @Put('/users/:id')
  put(@Param('id') id: number, @Body() user: any) {
    return 'Updating a user...';
  }

  @Delete('/users/:id')
  remove(@Param('id') id: number) {
    return 'Removing user...';
  }
}
