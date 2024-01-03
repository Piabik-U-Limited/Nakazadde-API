import { User, Gender } from '@prisma/client';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsPhoneNumber,
  IsDateString,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsDateString()
  @IsOptional()
  dateOfBirth: Date;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsPhoneNumber()
  @IsNotEmpty({ message: 'Phone number is required' })
  phone: string;

  @IsString()
  @IsOptional()
  about: string;

  @IsString()
  @IsOptional()
  gender: Gender;

  @IsString()
  @IsOptional()
  householdId: string;

  @IsString()
  @IsOptional()
  occupation: string;

  @IsString()
  @IsOptional()
  location: string;
}

export class VerifyPhoneDto {
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;
}

export class OtpDto {
  @IsString()
  @IsNotEmpty()
  verificationCode: string;
}
