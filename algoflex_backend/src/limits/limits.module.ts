import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Limit } from './entities';
import { LimitsController } from './limit.controller';
import { LimitsService } from './limits.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Limit])
      ],
      controllers: [LimitsController],
      providers: [LimitsService]
})
export class LimitsModule {}