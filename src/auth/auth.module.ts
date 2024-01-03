import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtTokenService } from './jwt-token/jwt-token.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { MailService } from '../mail/mail.service';
import { OtpService } from '../otp/otp.service';

@Module({
  providers: [
    AuthService,
    JwtTokenService,
    JwtService,
    ConfigService,
    PrismaClient,
    MailService,
    OtpService
  ],
  controllers: [AuthController],
})
export class AuthModule {}
