import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { Gender } from '@prisma/client';

export class EditUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Gender cannot be empty' })
  @IsEnum(Gender, { message: 'Gender must be either Male or Female' })
  gender: Gender;

  @IsOptional()
  @IsNotEmpty({ message: 'Date of Birth cannot be empty' })
  @IsDateString()
  dateOfBirth: Date;

  @IsOptional()
  @IsNotEmpty({ message: 'About cannot be empty' })
  @IsString()
  about: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Occupation cannot be empty' })
  @IsString()
  occupation: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Location cannot be empty' })
  @IsString()
  location: string;
}
