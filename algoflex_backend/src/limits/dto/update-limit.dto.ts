import { IsString } from "class-validator";

export class UpdateLimitDto {
  @IsString()
  readonly cpus: number;

  @IsString()
  readonly memory: string;
}
