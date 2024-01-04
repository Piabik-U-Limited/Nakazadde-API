import { Test } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { UserGuard } from './user.guard';
import { PrismaClient } from '@prisma/client';
import { ExecutionContext } from '@nestjs/common';
import { Gender } from '@prisma/client';

describe('UserGuard', () => {
  let userGuard: UserGuard;
  let reflector: Reflector;
  let prisma: PrismaClient;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UserGuard, Reflector, PrismaClient],
    }).compile();

    userGuard = moduleRef.get<UserGuard>(UserGuard);
    reflector = moduleRef.get<Reflector>(Reflector);
    prisma = moduleRef.get<PrismaClient>(PrismaClient);
  });

  let params = {
    id: '21acd1a7-3e87-47d7-ba45-ea71176ae930',
    name: 'string',
    dateOfBirth: new Date(),
    about: 'string',
    location: 'string',
    gender: Gender.Male,
    joinedAt: new Date(),
    occupation: 'string',
    
  };

  it('should be defined', () => {
    expect(userGuard).toBeDefined();
  });

  it('should not allow request when user is not available', async () => {
    jest.spyOn(prisma.user, 'findFirst').mockResolvedValue(null);
    jest.spyOn(reflector, 'get').mockReturnValue(false);

    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ params: params }),
      }),
      getHandler: () => () => {}, // modify this line to return a function
    } as unknown as ExecutionContext;

    await expect(userGuard.canActivate(context)).rejects.toThrow();
  });
  params = { ...params, id: '1b6e010e-c392-4d55-b5f9-41a25ad2cfd4' };

  it('should allow request if user is available', async () => {
    jest.spyOn(prisma.user, 'findFirst').mockResolvedValue(params);
    jest.spyOn(reflector, 'get').mockReturnValue(true); // add this line to mock reflector.get

    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ params: params }),
      }),
      getHandler: () => () => {}, // modify this line to return a function
    } as unknown as ExecutionContext;

    expect(await userGuard.canActivate(context)).toBe(true);
  });
});