import { JsonController, Param, Body, Get, Post, Put, Delete, Authorized } from 'routing-controllers';
import { Service } from 'typedi';
import { ThemeService } from '../services/theme.service';

@JsonController()
@Service()
export class ThemeController {

  constructor(
    private themeService: ThemeService
  ) { }

  @Authorized()
  @Get('/themes')
  getAll() {
    return this.themeService.find();
  }

  @Authorized()
  @Get('/themes/:id')
  getOne(@Param('id') id: number) {
    return this.themeService.findOne(id);
  }

  @Post('/themes')
  async post(@Body() userParam: any) {
    return await this.themeService.create(userParam);
  }

  @Put('/themes/:id')
  put(@Param('id') id: number, @Body() user: any) {
    return this.themeService.update(id, user);
  }

  @Delete('/themes/:id')
  async remove(@Param('id') id: number) {
    await this.themeService.delete(id);
    return { message: `User with id '${id}' deleted` };
  }
}