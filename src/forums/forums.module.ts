import { Module } from '@nestjs/common';
import { ForumsService } from './forums.service';
import { ForumsController } from './forums.controller';
import { PrismaClient } from '@prisma/client';
import { MembersService } from '../members/members.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    ForumsService,
    PrismaClient,
    MembersService,
    CloudinaryService,
    ConfigService,
  ],
  controllers: [ForumsController],
})
export class ForumsModule {}
