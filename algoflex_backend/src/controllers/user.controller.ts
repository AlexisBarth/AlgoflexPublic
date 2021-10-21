import { JsonController, Param, Body, Get, Post, Put, Delete, Authorized } from 'routing-controllers';
import { Service } from 'typedi';
import { UserService } from '../services/user.service';

@JsonController()
@Service()
export class UserController {

  constructor(
    private userService: UserService
  ) { }

  @Authorized()
  @Get('/users/me')
  getMe() {
    const user = 1
    return this.userService.findOne(1);
  }

  @Authorized()
  @Get('/users')
  getAll() {
    return this.userService.find();
  }

  @Authorized()
  @Get('/users/:id')
  getOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Post('/users')
  async post(@Body() userParam: any) {
    return await this.userService.create(userParam);
  }

  @Put('/users/:id')
  put(@Param('id') id: number, @Body() user: any) {
    return this.userService.update(id, user);
  }

  @Delete('/users/:id')
  async remove(@Param('id') id: number) {
    await this.userService.delete(id);
    return { message: `User with id '${id}' deleted` };
  }
}
