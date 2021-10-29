import { JsonController, Param, Body, Get, Post, Put, Delete, Authorized } from 'routing-controllers';
import { Service } from 'typedi';
import { ThemeImageService } from '../services/themeImage.service';

@JsonController()
@Service()
export class ThemeImageController {

  constructor(
    private themeImageService: ThemeImageService
  ) { }

  @Authorized()
  @Get('/themeImages')
  getAll() {
    return this.themeImageService.find();
  }

  @Authorized()
  @Get('/themeImages/:id')
  getOne(@Param('id') id: number) {
    return this.themeImageService.findOne(id);
  }

  @Post('/themeImages')
  async post(@Body() userParam: any) {
    return await this.themeImageService.create(userParam);
  }

  @Put('/themeImages/:id')
  put(@Param('id') id: number, @Body() user: any) {
    return this.themeImageService.update(id, user);
  }

  @Delete('/themeImages/:id')
  async remove(@Param('id') id: number) {
    await this.themeImageService.delete(id);
    return { message: `User with id '${id}' deleted` };
  }
}