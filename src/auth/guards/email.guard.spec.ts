import { Test } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { EmailGuard } from './email.guard';
import { PrismaClient } from '@prisma/client';
import { ExecutionContext } from '@nestjs/common';

describe('EmailGuard', () => {
  let emailGuard: EmailGuard;
  let reflector: Reflector;
  let prisma: PrismaClient;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [EmailGuard, Reflector, PrismaClient],
    }).compile();

    emailGuard = moduleRef.get<EmailGuard>(EmailGuard);
    reflector = moduleRef.get<Reflector>(Reflector);
    prisma = moduleRef.get<PrismaClient>(PrismaClient);
  });

  const body = {
    id: '21acd1a7-3e87-47d7-ba45-ea71176ae930',
    email: 'existing@example.com',
    isVerified: true,
    userId: '25acd1a7-3e87-47d7-ba45-ea71176ae930',
    verifiedAt: new Date(),
  };

  it('should be defined', () => {
    expect(emailGuard).toBeDefined();
  });

  it('should allow request if email is not taken', async () => {
    jest.spyOn(prisma.emailAddress, 'findFirst').mockResolvedValue(null);
    jest.spyOn(reflector, 'get').mockReturnValue(false); // add this line to mock reflector.get

    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ body: body }),
      }),
      getHandler: () => () => {}, // modify this line to return a function
    } as unknown as ExecutionContext;

    expect(await emailGuard.canActivate(context)).toBe(true);
  });

  it('should throw exception if email is taken', async () => {
    jest.spyOn(prisma.emailAddress, 'findFirst').mockResolvedValue(body);
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ body: body }),
      }),
      getHandler: () => {},
    } as unknown as ExecutionContext;

    await expect(emailGuard.canActivate(context)).rejects.toThrow();
  });
});
