import { IsArray, IsString } from "class-validator";
import { Role } from "src/users/entity";

export class RegisterDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsString({ each: true })
  readonly roles: string[];
}
