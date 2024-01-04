import { Test } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { ForumGuard } from './forum.guard';
import { PrismaClient } from '@prisma/client';
import { ExecutionContext } from '@nestjs/common';
import { Gender } from '@prisma/client';

describe('forumGuard', () => {
  let forumGuard: ForumGuard;
  let reflector: Reflector;
  let prisma: PrismaClient;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ForumGuard, Reflector, PrismaClient],
    }).compile();

    forumGuard = moduleRef.get<ForumGuard>(ForumGuard);
    reflector = moduleRef.get<Reflector>(Reflector);
    prisma = moduleRef.get<PrismaClient>(PrismaClient);
  });

  let params = {
    id: '21acd1a7-3e87-47d7-ba45-ea71176ae930',
    name: 'string',
    creatorId: '2eacd1a7-3e87-47d7-ba45-ea71176ae930',
    createdAt: new Date(),
    description: 'string',
  };

  it('should be defined', () => {
    expect(forumGuard).toBeDefined();
  });

  it('should not allow request when forum is not available', async () => {
    jest.spyOn(prisma.forum, 'findFirst').mockResolvedValue(null);
    jest.spyOn(reflector, 'get').mockReturnValue(false);

    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ params: params }),
      }),
      getHandler: () => () => {}, // modify this line to return a function
    } as unknown as ExecutionContext;

    await expect(forumGuard.canActivate(context)).rejects.toThrow();
  });
  params = { ...params, id: '1b6e010e-c392-4d55-b5f9-41a25ad2cfd4' };

  it('should allow request if forum is available', async () => {
    jest.spyOn(prisma.forum, 'findFirst').mockResolvedValue(params);
    jest.spyOn(reflector, 'get').mockReturnValue(true); // add this line to mock reflector.get

    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ params: params }),
      }),
      getHandler: () => () => {}, // modify this line to return a function
    } as unknown as ExecutionContext;

    expect(await forumGuard.canActivate(context)).toBe(true);
  });
});
