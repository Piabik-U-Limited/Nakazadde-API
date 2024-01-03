import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PhoneGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaClient,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const phone: any = await this.prisma.phoneNumber.findFirst({
      where: { phone: request.body.phone },
    });
    if (!phone) {
      return true;
    }
    throw new HttpException(
      {
        status: HttpStatus.CONFLICT,
        message: `Phone number is already taken!`,
      },
      HttpStatus.CONFLICT,
    );
  }
}
