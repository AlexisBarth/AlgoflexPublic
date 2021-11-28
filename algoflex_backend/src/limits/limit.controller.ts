import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { LimitsService } from './limits.service';
import { CreateLimitDto } from './dto/create-limit.dto';
import { UpdateLimitDto } from './dto/update-limit.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Limits')
@Controller('limits')
export class LimitsController {
  constructor(private readonly limitsService: LimitsService) {}

  @Post()
  public async create(@Body() createLimitDto: CreateLimitDto) {
    return this.limitsService.create(createLimitDto);
  }

  @Get()
  public async findAll() {
    return this.limitsService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.limitsService.findOne(+id);
  }

  @Put(':id')
  public async update(@Param('id') id: string, @Body() updateLimitDto: UpdateLimitDto) {
    return this.limitsService.update(+id, updateLimitDto);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.limitsService.remove(+id);
  }
}
