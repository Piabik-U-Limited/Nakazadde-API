import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtTokenService } from './jwt-token/jwt-token.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [AuthService,ConfigService,JwtService,JwtTokenService],
  controllers: [AuthController]
})
export class AuthModule {}
