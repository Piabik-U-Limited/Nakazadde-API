import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ForumGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaClient,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const isforumAvailable = this.reflector.get<boolean>(
      'isforumAvailable',
      context.getHandler(),
    );
    const forum: any = await this.prisma.forum.findFirst({
      where: {
        id:
          request.params.id || request.params.forum_id || request.body.forumId,
      },
    });
    if (forum) {
      return true;
    }
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        message: `Unable to find forum!`,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
