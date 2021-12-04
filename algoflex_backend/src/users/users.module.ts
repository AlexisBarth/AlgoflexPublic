import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity';
import { UserController } from './users.controller';
import { UsersService } from './users.service';
import { UserInfoModule } from './user-info/user-info.module';
import { UserMetaModule } from './user-meta/user-meta.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserInfoModule, UserMetaModule],
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
