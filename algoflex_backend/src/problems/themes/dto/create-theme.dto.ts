import { IsString } from "class-validator";

export class CreateThemeDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  imageUrl: string;
}
