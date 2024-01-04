import { Test } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { MemberGuard } from './member.guard';
import { PrismaClient } from '@prisma/client';
import { ExecutionContext } from '@nestjs/common';
import { MembershipStatus } from '@prisma/client';

describe('memberGuard', () => {
  let memberGuard: MemberGuard;
  let reflector: Reflector;
  let prisma: PrismaClient;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [MemberGuard, Reflector, PrismaClient],
    }).compile();

    memberGuard = moduleRef.get<MemberGuard>(MemberGuard);
    reflector = moduleRef.get<Reflector>(Reflector);
    prisma = moduleRef.get<PrismaClient>(PrismaClient);
  });

  let params = {
    id: '21acd1a7-3e87-47d7-ba45-ea71176ae930',

    forumId: '2eacd1a7-3e87-47d7-ba45-ea71176ae930',
    userId: '23acd1a7-3e87-47d7-ba45-ea71176ae930',
    joinedAt: new Date(),
    status: MembershipStatus.Active,
  };

  it('should be defined', () => {
    expect(memberGuard).toBeDefined();
  });

  it('should not allow request when member is not available', async () => {
    jest.spyOn(prisma.member, 'findFirst').mockResolvedValue(null);
    jest.spyOn(reflector, 'get').mockReturnValue(false);

    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ params: params }),
      }),
      getHandler: () => () => {}, // modify this line to return a function
    } as unknown as ExecutionContext;

    await expect(memberGuard.canActivate(context)).rejects.toThrow();
  });
  params = { ...params, id: '1b6e010e-c392-4d55-b5f9-41a25ad2cfd4' };

  it('should allow request if member is available', async () => {
    jest.spyOn(prisma.member, 'findFirst').mockResolvedValue(params);
    jest.spyOn(reflector, 'get').mockReturnValue(true); // add this line to mock reflector.get

    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ params: params }),
      }),
      getHandler: () => () => {}, // modify this line to return a function
    } as unknown as ExecutionContext;

    expect(await memberGuard.canActivate(context)).toBe(true);
  });
});
