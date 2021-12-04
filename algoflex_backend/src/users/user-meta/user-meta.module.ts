import { Module } from '@nestjs/common';
import { UserMetaService } from './user-meta.service';
import { UserMetaController } from './user-meta.controller';

@Module({
  controllers: [UserMetaController],
  providers: [UserMetaService]
})
export class UserMetaModule {}
