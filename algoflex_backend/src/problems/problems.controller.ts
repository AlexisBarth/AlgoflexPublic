import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Problems')
@Controller('problems')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}

  @Get()
  public async findAll() {
    return this.problemsService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.problemsService.findOne(+id);
  }

  @Post()
  public async create(@Body() createProblemDto: CreateProblemDto) {
    return this.problemsService.create(createProblemDto);
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() updateProblemDto: UpdateProblemDto) {
    return this.problemsService.update(+id, updateProblemDto);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.problemsService.remove(+id);
  }
}
