import { IsString } from "class-validator";

export class CreateLimitDto {
  @IsString()
  readonly cpus: number;

  @IsString()
  readonly memory: string;
}
