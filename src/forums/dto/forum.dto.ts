import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateForumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty({ message: "Provide creator's Id" })
  userId: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  description: string;
}

export class EditForumDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  description: string;
}
