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
export class UserGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaClient,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const isUserAvailable = this.reflector.get<boolean>(
      'isUserAvailable',
      context.getHandler(),
    );
    const user: any = await this.prisma.user.findFirst({
      where: { id: request.params.id || request.params.user_id },
    });
    if (user) {
      return true;
    }
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        message: `Unable to find user!`,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}