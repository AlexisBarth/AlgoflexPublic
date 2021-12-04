import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CodingQuestionsService } from './coding-questions.service';
import { CreateCodingQuestionDto } from './dto/create-coding-question.dto';
import { UpdateCodingQuestionDto } from './dto/update-coding-question.dto';

@Controller('coding-questions')
export class CodingQuestionsController {
  constructor(private readonly codingQuestionsService: CodingQuestionsService) {}

  @Post()
  create(@Body() createCodingQuestionDto: CreateCodingQuestionDto) {
    return this.codingQuestionsService.create(createCodingQuestionDto);
  }

  @Get()
  findAll() {
    return this.codingQuestionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.codingQuestionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCodingQuestionDto: UpdateCodingQuestionDto) {
    return this.codingQuestionsService.update(+id, updateCodingQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.codingQuestionsService.remove(+id);
  }
}
