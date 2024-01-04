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
export class MemberGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaClient,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const isMemberAvailable = this.reflector.get<boolean>(
      'ismemberAvailable',
      context.getHandler(),
    );
    const member: any = await this.prisma.member.findFirst({
      where: {
        id:
          request.params.id ||
          request.params.member_id ||
          request.body.memberId,
      },
    });
    if (member) {
      return true;
    }
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        message: `Unable to find member!`,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
