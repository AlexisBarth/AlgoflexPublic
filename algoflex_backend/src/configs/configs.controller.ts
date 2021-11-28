import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConfigsService } from './configs.service';
import { CreateConfigDto } from './dto/create-config.dto';
import { UpdateConfigDto } from './dto/update-config.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Configs')
@Controller('configs')
export class ConfigsController {
  constructor(private readonly configsService: ConfigsService) {}

  @Get()
  public async findAll() {
    return this.configsService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.configsService.findOne(+id);
  }

  @Post()
  public async create(@Body() createConfigDto: CreateConfigDto) {
    return this.configsService.create(createConfigDto);
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() updateConfigDto: UpdateConfigDto) {
    return this.configsService.update(+id, updateConfigDto);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.configsService.remove(+id);
  }
}


