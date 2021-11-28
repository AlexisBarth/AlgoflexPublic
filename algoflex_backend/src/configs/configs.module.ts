import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigsController } from './configs.controller';
import { ConfigsService } from './configs.service';
import { Config } from './entities';

@Module({
  imports: [
      TypeOrmModule.forFeature([Config])
    ],
    controllers: [ConfigsController],
    providers: [ConfigsService]
})
export class ConfigsModule {}

