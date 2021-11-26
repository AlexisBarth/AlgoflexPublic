import { Module } from '@nestjs/common';
import { ThemesService } from './themes.service';
import { ThemesController } from './themes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Theme } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Theme])
  ],
  controllers: [ThemesController],
  providers: [ThemesService]
})
export class ThemesModule {}
