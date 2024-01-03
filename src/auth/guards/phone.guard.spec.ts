import { Test } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { PhoneGuard } from './phone.guard';
import { PrismaClient } from '@prisma/client';
import { ExecutionContext } from '@nestjs/common';

describe('PhoneGuard', () => {
  let phoneGuard: PhoneGuard;
  let reflector: Reflector;
  let prisma: PrismaClient;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PhoneGuard, Reflector, PrismaClient],
    }).compile();

    phoneGuard = moduleRef.get<PhoneGuard>(PhoneGuard);
    reflector = moduleRef.get<Reflector>(Reflector);
    prisma = moduleRef.get<PrismaClient>(PrismaClient);
  });

  const body = {
    id: '21acd1a7-3e87-47d7-ba45-ea71176ae930',
    phone: '+256770000000',
    isVerified: true,
    userId: '25acd1a7-3e87-47d7-ba45-ea71176ae930',
    verifiedAt: new Date(),
  };

  it('should be defined', () => {
    expect(PhoneGuard).toBeDefined();
  });

  it('should allow request if phone number is not taken', async () => {
    jest.spyOn(prisma.phoneNumber, 'findFirst').mockResolvedValue(null);
    jest.spyOn(reflector, 'get').mockReturnValue(false); // add this line to mock reflector.get

    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ body: body }),
      }),
      getHandler: () => () => {}, // modify this line to return a function
    } as unknown as ExecutionContext;

    expect(await phoneGuard.canActivate(context)).toBe(true);
  });

  it('should throw exception if phone number is taken', async () => {
    jest.spyOn(prisma.phoneNumber, 'findFirst').mockResolvedValue(body);
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ body: body }),
      }),
      getHandler: () => {},
    } as unknown as ExecutionContext;

    await expect(phoneGuard.canActivate(context)).rejects.toThrow();
  });
});
