import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaClient } from '@prisma/client';
import { UsersController } from './users.controller';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [UsersService, PrismaClient, CloudinaryService, ConfigService],
  controllers: [UsersController],
})
export class UsersModule {}
