import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class MembersService {
  constructor(private prisma: PrismaClient) {}

  async joinForum(forumId: string, userId: string) {
    await this.checkFirstIsMember(userId, forumId);
    await this.prisma.member.create({
      data: { userId, forumId },
    });
    return { message: `Your request has been sent to admin for approval` };
  }

  async getMember(id: string) {
    return await this.prisma.member.findFirst({
      where: { id },
    });
  }

  async getAllMembers(forumId: string) {
    return await this.prisma.member.findMany({
      where: { AND: { forumId, status: 'Active' } },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: { select: { email: true } },
            photo: { select: { url: true } },
            phone: { select: { phone: true } },
          },
        },
        admin: true,
      },
    });
  }

  async getAllPendingMembers(forumId: string) {
    return await this.prisma.member.findMany({
      where: { AND: { forumId, status: 'Pending' } },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: { select: { email: true } },
            photo: { select: { url: true } },
            phone: { select: { phone: true } },
          },
        },
        admin: true,
      },
    });
  }
  async getAllPreviousMembers(forumId: string) {
    return await this.prisma.member.findMany({
      where: { AND: { forumId, status: 'Removed' } },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: { select: { email: true } },
            photo: { select: { url: true } },
            phone: { select: { phone: true } },
          },
        },
        admin: true,
      },
    });
  }

  async acceptMember(id: string) {
    const member = await this.prisma.member.update({
      where: { id },
      data: { status: 'Active' },
      select: { user: { select: { name: true } } },
    });
    return `${member.user.name} accepted `;
  }

  async declineMember(id: string) {
    const member = await this.prisma.member.delete({
      where: { id },
      select: { user: { select: { name: true } } },
    });
    return `${member.user.name} was declined `;
  }

  async removeMember(id: string) {
    const removedMember = await this.prisma.member.delete({
      where: { id },
      include: { user: { select: { name: true } } },
    });
    return `${removedMember.user.name} removed `;
  }

  private async checkFirstIsMember(userId: string, forumId: string) {
    const member = await this.prisma.member.findFirst({ where: { userId, forumId } });
    if (member) {
    let message;

    if (member.status === 'Pending') {
      message = 'You already sent a request to join the forum';
    } else if (member.status === 'Active') {
      message = 'You are already a member';
    } else if (member.status === 'Removed') {
      message = 'You are already removed from the forum';
    }

    throw new HttpException({ message }, HttpStatus.CONFLICT);
  }
    
  }
}
