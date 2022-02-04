import { Module } from "@nestjs/common";
import { BuildGateway } from "./build.gateway";

@Module({
    providers: [BuildGateway]
})
export class BuildModule {}