import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';
import { Theme } from './entities/theme.entity';

@Injectable()
export class ThemesService {
  constructor(
    @InjectRepository(Theme)
    private readonly themeRepository: Repository<Theme>
  ) {}

  async findAll(): Promise<Theme[]> {
    return this.themeRepository.find();
  }

  async findOne(id: number): Promise<Theme> {
    const theme = await this.themeRepository.findOne(id);
    if (!theme) {
      throw new NotFoundException(`Theme ${id} not found`);
    }
    return theme;
  }

  async create(createThemeDto: CreateThemeDto): Promise<Theme> {
    return this.themeRepository.save(createThemeDto);
  }

  async update(id: number, updateThemeDto: UpdateThemeDto): Promise<string> {
    return `This action updates a #${id} ${updateThemeDto} theme`;
  }

  async remove(id: number): Promise<Theme> {
    const theme = await this.themeRepository.findOne(id);
    if (!theme) {
      throw new NotFoundException(`Theme #${id} not found`);
    }
    return this.themeRepository.remove(theme);
  }
}
