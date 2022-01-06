import { Controller, Get, Post, Body, Param, Delete, UseGuards, UnauthorizedException, Req } from '@nestjs/common';
import { UserMetaService } from './user-meta.service';
import { CreateUserMetaDto } from './dto/create-user-meta.dto';
import { ApiTags } from '@nestjs/swagger';
import { BaseRequest, FirebaseAuthGuard, RequestUser, Role, Roles, RolesGuard } from 'src/common';

@ApiTags('Users metadata')
@UseGuards(FirebaseAuthGuard, RolesGuard)
@Controller('users/:userParam/meta')
export class UserMetaController {
  constructor(private readonly userMetaService: UserMetaService) {}

  @Get()
  findAll(@Req() req: BaseRequest, @Param('userParam') userParam: string) {
    this.verifyAccessToMetadata(req.user, userParam);
    return this.userMetaService.findAll(userParam);
  }

  @Get(':questionId')
  findOne(
    @Req() req: BaseRequest,
    @Param('userParam') userParam: string,
    @Param('questionId') questionId: string,
  ) {
    this.verifyAccessToMetadata(req.user, userParam);
    return this.userMetaService.findOne(userParam, questionId);
  }

  @Post()
  create(
    @Req() req: BaseRequest,
    @Param('userParam') userParam: string,
    @Body() createUserMetaDto: CreateUserMetaDto,
  ) {
    this.verifyAccessToMetadata(req.user, userParam);
    return this.userMetaService.create(userParam, createUserMetaDto);
  }

  @Roles(Role.Admin)
  @Delete(':metaId')
  remove(
    @Req() req: BaseRequest,
    @Param('userParam') userParam: string,
    @Param('metaId') metaId: string
  ) {
    this.verifyAccessToMetadata(req.user, userParam);
    return this.userMetaService.remove(metaId);
  }

  verifyAccessToMetadata(user: RequestUser | undefined, requestedUserInfo: string): void {
    if (user?.uid !== requestedUserInfo && user?.role !== Role.Admin) {
      throw new UnauthorizedException('UNAUTHORIZED');
    }
  }
}
