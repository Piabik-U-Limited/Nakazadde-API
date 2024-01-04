import { Module } from '@nestjs/common';
import { ForumsService } from './forums.service';
import { ForumsController } from './forums.controller';
import { PrismaClient } from '@prisma/client';
import { MembersService } from '../members/members.service';

@Module({
  providers: [ForumsService, PrismaClient,MembersService],
  controllers: [ForumsController],
})
export class ForumsModule {}
