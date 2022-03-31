import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';

import { ThemesService } from './themes.service';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';
import { FirebaseAuthGuard, RolesGuard, Roles, Role } from 'src/common';

@ApiTags('Themes')
@Controller('problems/themes')
export class ThemesController {
  constructor(private readonly themesService: ThemesService) {}

  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles(Role.Admin)
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
    return this.themesService.findOne(id);
  }

  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Put(':id')
  public async update(@Param('id') id: string, @Body() updateThemeDto: UpdateThemeDto) {
    return this.themesService.update(+id, updateThemeDto);
  }

  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.themesService.remove(id);
  }
}
