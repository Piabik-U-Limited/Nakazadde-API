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
export class EmailGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaClient,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const isEmailProtected = this.reflector.get<boolean>(
      'isEmailProtected',
      context.getHandler(),
    );
    const email: any = await this.prisma.emailAddress.findFirst({
      where: { email: request.body.email },
    });
    if (!email) {
      return true;
    }
    throw new HttpException(
      {
        status: HttpStatus.CONFLICT,
        message: `Email is already taken!`,
      },
      HttpStatus.CONFLICT,
    );
  }
}
