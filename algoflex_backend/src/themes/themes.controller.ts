import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ThemesService } from './themes.service';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Themes')
@Controller('themes')
export class ThemesController {
  constructor(private readonly themesService: ThemesService) {}

  @Post()
  public async create(@Body() createThemeDto: CreateThemeDto) {
    return this.themesService.create(createThemeDto);
  }

  @Get()
  public async findAll() {
    return this.themesService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.themesService.findOne(+id);
  }

  @Put(':id')
  public async update(@Param('id') id: string, @Body() updateThemeDto: UpdateThemeDto) {
    return this.themesService.update(+id, updateThemeDto);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.themesService.remove(+id);
  }
}
