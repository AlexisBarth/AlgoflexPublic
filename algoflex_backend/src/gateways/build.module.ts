import { Module } from '@nestjs/common';
import { BuildGateway } from './compilation/build.gateway';
import { AutoCompleteGateway } from './autocomplete/autocomplete.gateway';

@Module({
  providers: [BuildGateway, AutoCompleteGateway],
})
export class BuildModule {}
